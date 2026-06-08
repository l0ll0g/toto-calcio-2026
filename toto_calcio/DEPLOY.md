# Guida al deploy — Totò Calcio 2026

L'app è pronta per andare online. Ecco come pubblicarla in sicurezza.

## 1. Prima di tutto: la SECRET_KEY

È la cosa più importante. Genera una chiave segreta casuale:

    python3 -c "import secrets; print(secrets.token_hex(32))"

Copia la stringa che ottieni: la imposterai come variabile d'ambiente `SECRET_KEY`
sul tuo hosting. **Senza, le sessioni non sono sicure.**

## 2. Avvio in locale (per provare)

    pip install -r requirements.txt
    export SECRET_KEY="incolla-qui-la-chiave"
    gunicorn wsgi:app --bind 0.0.0.0:5001

Apri http://localhost:5001
(In sviluppo puoi anche usare `python3 app.py`, ma per il sito vero usa gunicorn.)

## 3. Variabili d'ambiente da impostare sull'hosting

| Variabile           | Obbligatoria | A cosa serve                                    |
|---------------------|:------------:|-------------------------------------------------|
| `SECRET_KEY`        | ✅           | Firma i cookie di sessione (sicurezza)          |
| `PRODUCTION`        | consigliata  | =1 attiva i cookie sicuri (HTTPS)               |
| `FOOTBALL_DATA_KEY` | opzionale    | Risultati live veri (vedi LIVE_RESULTS_README)  |
| `DB_PATH`           | opzionale    | Percorso del database su disco persistente      |

Vedi `.env.example` per il modello completo.

## 4. Deploy su un hosting (esempi)

### Render.com (gratis, semplice)
1. Carica il codice su un repo GitHub (il `.gitignore` esclude già DB e segreti).
2. Su Render: "New Web Service" → collega il repo.
3. Build command:  `pip install -r requirements.txt`
4. Start command:  `gunicorn wsgi:app`
5. In "Environment" aggiungi `SECRET_KEY` e `PRODUCTION=1`.
6. **Importante**: aggiungi un "Persistent Disk" e imposta `DB_PATH` a un percorso
   su quel disco (es. `/data/toto_calcio.db`), altrimenti il database si azzera
   a ogni deploy.

### Railway / Fly.io / Heroku
Stessa logica: usano il `Procfile` già incluso. Imposta le variabili d'ambiente
nel pannello del provider e collega un volume persistente per il database.

## 5. Il database

I dati (utenti, pronostici, risultati, classifiche) sono salvati in un file
SQLite `toto_calcio.db`. **Sopravvive ai riavvii**, ma su molti hosting il
filesystem è effimero: per non perdere i dati a ogni deploy, monta un disco
persistente e punta `DB_PATH` lì.

Per un backup manuale basta copiare il file `toto_calcio.db`.

## 6. Account admin

L'admin è fisso: `lorenzogucci05@gmail.com`. Registralo come utente normale dal
sito: appena fatto avrà accesso al Pannello Admin (risultati, token reset,
risultati speciali, export Excel).

## 7. Checklist finale prima del lancio

- [ ] `SECRET_KEY` impostata sull'hosting
- [ ] `PRODUCTION=1` impostata
- [ ] Database su disco persistente (`DB_PATH`)
- [ ] HTTPS attivo (quasi tutti gli hosting lo danno gratis)
- [ ] Account admin registrato
- [ ] (Opzionale) `FOOTBALL_DATA_KEY` per i risultati live veri

---

## 8. HTTPS e sicurezza — come funziona

**Non devi gestire i certificati a mano.** Gli hosting moderni (Render, Railway,
Fly.io, Vercel, ecc.) forniscono **HTTPS automatico e gratuito**: si occupano
loro del certificato SSL (Let's Encrypt) e lo rinnovano da soli. Tu carichi il
codice, loro mettono il lucchetto.

L'app è già predisposta per stare dietro al loro reverse proxy:

- **ProxyFix**: l'app riconosce che la connessione esterna è HTTPS anche se al
  suo interno arriva come HTTP dal proxy (è il funzionamento normale).
- **Redirect HTTPS**: con `PRODUCTION=1`, ogni richiesta http viene reindirizzata
  a https automaticamente (codice 301).
- **HSTS**: viene inviato l'header `Strict-Transport-Security`, che dice al
  browser di usare SEMPRE https per il tuo dominio per 1 anno.
- **Header di sicurezza** su ogni risposta:
  - `X-Content-Type-Options: nosniff` (no MIME sniffing)
  - `X-Frame-Options: SAMEORIGIN` (anti clickjacking)
  - `Referrer-Policy` e `Permissions-Policy` restrittive
- **Cookie**: `Secure` (solo https), `HttpOnly` (non leggibili da JS),
  `SameSite=Lax` (anti CSRF). Si attivano con `PRODUCTION=1`.

### Cosa devi fare TU per la sicurezza

1. Imposta `PRODUCTION=1` e `SECRET_KEY` sull'hosting (vedi sopra).
2. Verifica che il tuo hosting abbia l'HTTPS attivo (di solito è di default).
3. (Consigliato) usa un dominio tuo e attiva HTTPS anche su quello dal pannello
   dell'hosting — un clic.

### Health check

L'endpoint `/healthz` risponde `{"status":"ok"}`: impostalo come "health check
path" sul tuo hosting, così il provider sa se l'app è viva e la riavvia se cade.

## 9. Limiti noti (onestà tecnica)

- **SQLite + più worker**: il database SQLite va bene per un toto tra amici/lega
  (decine/poche centinaia di utenti). Il `Procfile` usa 2 worker con WAL attivo,
  che regge senza problemi questi numeri. Se un giorno avrai *migliaia* di utenti
  simultanei, si migra a PostgreSQL (cambio contenuto, non di logica).
- **Backup**: fai una copia periodica del file `toto_calcio.db`. Molti hosting
  con disco persistente offrono snapshot automatici.
- **Risultati live**: senza `FOOTBALL_DATA_KEY` i risultati si inseriscono dal
  pannello admin; con la chiave arrivano in automatico (vedi LIVE_RESULTS_README).
