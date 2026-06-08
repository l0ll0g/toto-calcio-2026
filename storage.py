"""
storage.py — Persistenza con interfaccia dict-like.

Due backend, scelti automaticamente:
  • PostgreSQL (es. Supabase)  se è presente la variabile DATABASE_URL
  • SQLite (file locale)       altrimenti (sviluppo in locale)

L'interfaccia (PersistentDict) è identica nei due casi: il resto dell'app
non cambia di una riga. Ogni "store" è una riga key-value con valore JSON.
"""
import os, json, threading

DATABASE_URL = os.environ.get('DATABASE_URL', '').strip()
USE_PG = bool(DATABASE_URL)
_lock = threading.Lock()


# ════════════════════════════════════════════════════════════════════════
#  BACKEND POSTGRES (Supabase)
# ════════════════════════════════════════════════════════════════════════
if USE_PG:
    import psycopg2, time as _time
    from psycopg2.extras import RealDictCursor

    _dsn = DATABASE_URL
    if 'sslmode=' not in _dsn:
        _dsn += ('&' if '?' in _dsn else '?') + 'sslmode=require'

    # NB: con il pooler di Supabase + hosting effimero, le connessioni inattive
    # vengono chiuse. Per robustezza apriamo una connessione FRESCA per ogni
    # operazione e la chiudiamo subito, con un retry se la connessione e' morta.
    def _connect():
        return psycopg2.connect(_dsn, connect_timeout=10)

    # test di connessione all'avvio (non fatale: l'app parte comunque)
    try:
        _c = _connect(); _c.close()
        print('[STORAGE] Connessione PostgreSQL (Supabase) riuscita', flush=True)
    except Exception as _e:
        print(f'[STORAGE][ERRORE] Connessione PostgreSQL fallita: {_e}', flush=True)

    _STALE = (psycopg2.OperationalError, psycopg2.InterfaceError)

    def _pg(query, params=None, fetch=False):
        last_err = None
        for _attempt in range(3):
            conn = None
            try:
                conn = _connect()
                with conn.cursor(cursor_factory=RealDictCursor) as cur:
                    cur.execute(query, params or ())
                    rows = cur.fetchall() if fetch else None
                conn.commit()
                return rows
            except _STALE as e:
                last_err = e
                try:
                    if conn: conn.close()
                except Exception:
                    pass
                _time.sleep(0.3 * (_attempt + 1))   # piccola pausa e riprova
                continue
            except Exception:
                if conn:
                    try: conn.rollback()
                    except Exception: pass
                    try: conn.close()
                    except Exception: pass
                raise
            finally:
                if conn and not conn.closed:
                    try: conn.close()
                    except Exception: pass
        raise last_err

    def _init():
        _pg("""CREATE TABLE IF NOT EXISTS kv (
            store TEXT NOT NULL, key TEXT NOT NULL, value JSONB NOT NULL,
            PRIMARY KEY (store, key)
        )""")
    _init()

    class PersistentDict:
        def __init__(self, store_name):
            self._store = store_name; self._cache = {}; self._load()
        def _load(self):
            rows = _pg("SELECT key, value FROM kv WHERE store=%s", (self._store,), fetch=True)
            for r in rows or []: self._cache[r['key']] = r['value']
        def _persist(self, key):
            val = json.dumps(self._cache[key], ensure_ascii=False)
            with _lock:
                _pg("""INSERT INTO kv(store,key,value) VALUES(%s,%s,%s)
                       ON CONFLICT (store,key) DO UPDATE SET value=EXCLUDED.value""",
                    (self._store, key, val))
        def _delete(self, key):
            with _lock: _pg("DELETE FROM kv WHERE store=%s AND key=%s", (self._store, key))
        def __getitem__(self, key):       return self._cache[key]
        def __setitem__(self, key, value): self._cache[key]=value; self._persist(key)
        def __delitem__(self, key):       del self._cache[key]; self._delete(key)
        def __contains__(self, key):      return key in self._cache
        def __iter__(self):               return iter(self._cache)
        def __len__(self):                return len(self._cache)
        def get(self, key, default=None): return self._cache.get(key, default)
        def keys(self):                   return self._cache.keys()
        def values(self):                 return self._cache.values()
        def items(self):                  return self._cache.items()
        def pop(self, key, *args):
            if key in self._cache:
                v=self._cache.pop(key); self._delete(key); return v
            if args: return args[0]
            raise KeyError(key)
        def clear(self):
            self._cache.clear()
            with _lock: _pg("DELETE FROM kv WHERE store=%s", (self._store,))
        def save(self, key):
            if key in self._cache: self._persist(key)
        def save_all(self):
            for k in list(self._cache.keys()): self._persist(k)


# ════════════════════════════════════════════════════════════════════════
#  BACKEND SQLITE (sviluppo locale)
# ════════════════════════════════════════════════════════════════════════
else:
    import sqlite3
    _DB_PATH = os.environ.get('DB_PATH', os.path.join(os.path.dirname(__file__), 'toto_calcio.db'))
    _db = sqlite3.connect(_DB_PATH, check_same_thread=False)
    _db.execute("PRAGMA journal_mode=WAL")

    def _init():
        with _lock:
            _db.execute("""CREATE TABLE IF NOT EXISTS kv (
                store TEXT NOT NULL, key TEXT NOT NULL, value TEXT NOT NULL,
                PRIMARY KEY (store, key)
            )""")
            _db.commit()
    _init()

    class PersistentDict:
        def __init__(self, store_name):
            self._store = store_name; self._cache = {}; self._load()
        def _load(self):
            with _lock:
                rows = _db.execute("SELECT key, value FROM kv WHERE store=?", (self._store,)).fetchall()
            for k, v in rows:
                try: self._cache[k] = json.loads(v)
                except Exception: self._cache[k] = v
        def _persist(self, key):
            val = json.dumps(self._cache[key], ensure_ascii=False)
            with _lock:
                _db.execute("INSERT INTO kv(store,key,value) VALUES(?,?,?) "
                            "ON CONFLICT(store,key) DO UPDATE SET value=excluded.value",
                            (self._store, key, val))
                _db.commit()
        def _delete(self, key):
            with _lock:
                _db.execute("DELETE FROM kv WHERE store=? AND key=?", (self._store, key)); _db.commit()
        def __getitem__(self, key):       return self._cache[key]
        def __setitem__(self, key, value): self._cache[key]=value; self._persist(key)
        def __delitem__(self, key):       del self._cache[key]; self._delete(key)
        def __contains__(self, key):      return key in self._cache
        def __iter__(self):               return iter(self._cache)
        def __len__(self):                return len(self._cache)
        def get(self, key, default=None): return self._cache.get(key, default)
        def keys(self):                   return self._cache.keys()
        def values(self):                 return self._cache.values()
        def items(self):                  return self._cache.items()
        def pop(self, key, *args):
            if key in self._cache:
                v=self._cache.pop(key); self._delete(key); return v
            if args: return args[0]
            raise KeyError(key)
        def clear(self):
            self._cache.clear()
            with _lock:
                _db.execute("DELETE FROM kv WHERE store=?", (self._store,)); _db.commit()
        def save(self, key):
            if key in self._cache: self._persist(key)
        def save_all(self):
            for k in list(self._cache.keys()): self._persist(k)


def backend_name():
    return 'PostgreSQL (Supabase)' if USE_PG else 'SQLite (locale)'