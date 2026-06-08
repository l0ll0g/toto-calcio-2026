# Database permanente con Supabase (PostgreSQL)

Con Supabase il database vive separato dall'app: i dati NON si cancellano mai,
nemmeno quando aggiorni o riavvii l'app. Ed è gratis. In più puoi ispezionarlo
con TablePlus o dall'interfaccia web di Supabase.

## 1. Crea il progetto Supabase

1. Vai su https://supabase.com e registrati (gratis, anche con GitHub).
2. "New Project" → dai un nome (es. "toto-calcio"), scegli una password per il
   database (ANNOTALA) e la region più vicina (Frankfurt/EU West).
3. Attendi ~2 minuti che il progetto sia pronto.

## 2. Copia la stringa di connessione (DATABASE_URL)

1. Nel progetto: icona ingranaggio "Project Settings" → "Database".
2. Sezione "Connection string" → scegli la tab **URI**.
3. Copia la stringa, è simile a:
   postgresql://postgres.xxxx:[PASSWORD]@aws-0-eu-...pooler.supabase.com:6543/postgres
4. Sostituisci [PASSWORD] (o [YOUR-PASSWORD]) con la password scelta al passo 1.

   NB: usa la stringa "Connection pooling" (porta 6543) se disponibile:
   è la più adatta a un'app web.

## 3. Collega l'app (su Render)

1. Render → tuo servizio → "Environment".
2. Aggiungi una variabile:
       DATABASE_URL = (la stringa copiata sopra, con la password vera)
3. Salva. Render farà un nuovo deploy: da quel momento l'app usa Supabase.

   Appena presente DATABASE_URL, l'app passa automaticamente a PostgreSQL.
   Senza, resta su SQLite (utile in locale). Nessun'altra modifica al codice.

## 4. La tabella si crea da sola

Al primo avvio l'app crea automaticamente la tabella `kv`. Non devi creare
nulla a mano su Supabase.

## 5. Ispezionare i dati

**Dall'interfaccia Supabase**: menu "Table Editor" → tabella `kv`. Vedi tutto.

**Con TablePlus**:
  - New connection → PostgreSQL
  - Inserisci host, porta, user, password, database presi dalla stessa pagina
    "Database" di Supabase (oppure incolla la connection string).
  - Connect → vedi la tabella `kv` con tutti gli utenti e i pronostici.

  Query utili (SQL di TablePlus o Supabase):
    -- tutti gli utenti
    SELECT key AS email, value FROM kv WHERE store='profiles';
    -- quanti pronostici per utente
    SELECT key AS email, jsonb_object_keys(value) FROM kv WHERE store='predictions';

## 6. Struttura dei dati

Una sola tabella `kv` con: store (tipo dato), key (di solito l'email), value
(JSON). Gli "store" sono: users, profiles, predictions, ko_pred, submitted,
results, leagues, user_leagues, topscorer_pred, final_pred, special_results,
ko_submitted, reset_tokens.

## In locale resta SQLite

Sul tuo Mac, senza DATABASE_URL, l'app continua a usare il file toto_calcio.db.
Così sviluppi in locale e vai in produzione su Supabase senza cambiare codice.
