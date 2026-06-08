"""
storage.py — Persistenza su SQLite con interfaccia dict-like.

Sostituisce i dizionari in memoria con contenitori che salvano automaticamente
su database. Ogni "store" è una tabella key-value dove il valore è JSON.
Così il codice esistente (USERS[email] = {...}) continua a funzionare,
ma i dati sopravvivono ai riavvii del server.
"""
import sqlite3, json, threading, os

_DB_PATH = os.environ.get('DB_PATH', os.path.join(os.path.dirname(__file__), 'toto_calcio.db'))
_lock = threading.Lock()

def _conn():
    c = sqlite3.connect(_DB_PATH, check_same_thread=False)
    c.execute("PRAGMA journal_mode=WAL")  # concorrenza migliore
    return c

_db = _conn()

def _init():
    with _lock:
        _db.execute("""CREATE TABLE IF NOT EXISTS kv (
            store TEXT NOT NULL,
            key   TEXT NOT NULL,
            value TEXT NOT NULL,
            PRIMARY KEY (store, key)
        )""")
        _db.commit()
_init()


class PersistentDict:
    """Dizionario che si salva su SQLite a ogni modifica.

    Le chiavi sono stringhe; i valori sono serializzati in JSON.
    Caricato interamente in memoria all'avvio per letture veloci,
    riscrive su DB a ogni set/del.
    """
    def __init__(self, store_name):
        self._store = store_name
        self._cache = {}
        self._load()

    def _load(self):
        with _lock:
            rows = _db.execute(
                "SELECT key, value FROM kv WHERE store=?", (self._store,)
            ).fetchall()
        for k, v in rows:
            try:
                self._cache[k] = json.loads(v)
            except Exception:
                self._cache[k] = v

    def _persist(self, key):
        val = json.dumps(self._cache[key], ensure_ascii=False)
        with _lock:
            _db.execute(
                "INSERT INTO kv(store,key,value) VALUES(?,?,?) "
                "ON CONFLICT(store,key) DO UPDATE SET value=excluded.value",
                (self._store, key, val)
            )
            _db.commit()

    def _delete(self, key):
        with _lock:
            _db.execute("DELETE FROM kv WHERE store=? AND key=?", (self._store, key))
            _db.commit()

    # ── dict interface ──────────────────────────────────────────────
    def __getitem__(self, key):       return self._cache[key]
    def __setitem__(self, key, value):
        self._cache[key] = value
        self._persist(key)
    def __delitem__(self, key):
        del self._cache[key]
        self._delete(key)
    def __contains__(self, key):      return key in self._cache
    def __iter__(self):               return iter(self._cache)
    def __len__(self):                return len(self._cache)
    def get(self, key, default=None): return self._cache.get(key, default)
    def keys(self):                   return self._cache.keys()
    def values(self):                 return self._cache.values()
    def items(self):                  return self._cache.items()
    def pop(self, key, *args):
        if key in self._cache:
            val = self._cache.pop(key)
            self._delete(key)
            return val
        if args:
            return args[0]
        raise KeyError(key)
    def clear(self):
        self._cache.clear()
        with _lock:
            _db.execute("DELETE FROM kv WHERE store=?", (self._store,))
            _db.commit()

    def save(self, key):
        """Forza il salvataggio dopo una modifica IN-PLACE del valore
        (es. USERS[email]['pw'] = ...) che __setitem__ non intercetta."""
        if key in self._cache:
            self._persist(key)

    def save_all(self):
        for k in list(self._cache.keys()):
            self._persist(k)
