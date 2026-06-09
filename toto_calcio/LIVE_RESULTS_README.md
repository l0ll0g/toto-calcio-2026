# Risultati live automatici (Highlightly)

L'app aggiorna da sola i risultati delle partite, senza inserirli a mano.
Fonte: Highlightly (https://highlightly.net) — piano gratuito, 100 richieste/giorno.

## 1. Ottieni la chiave gratuita
1. Vai su https://highlightly.net/login e registrati (niente carta di credito).
2. Nella dashboard trovi la tua API key.

## 2. Imposta la chiave su Render
Render -> tuo servizio -> Environment -> aggiungi:
   HIGHLIGHTLY_KEY = (la tua chiave)
Senza questa variabile, l'app NON inventa risultati: le partite restano senza
punteggio finché non imposti la chiave (o finché l'admin non li inserisce a mano).

## 3. Quale competizione interrogare
La variabile LIVE_LEAGUE_ID decide quale lega seguire:
   - 9294  = Amichevoli internazionali (default ora, per i test)
   - <id FIFA World Cup> = per il Mondiale (da impostare quando inizia)
Per il Mondiale, una volta noto l'id lega su Highlightly, basta cambiare
LIVE_LEAGUE_ID su Render (e LIVE_SEASON se serve), senza toccare il codice.

## 4. Come funziona
- L'app interroga /matches?leagueId=...&season=... su Highlightly.
- Aggiorna i risultati a partita finita (i punti contano a fine gara).
- I nomi delle nazionali sono tradotti automaticamente (italiano <-> inglese).
- Endpoint diagnostico admin: /api/live_raw (mostra le partite grezze ricevute).

## 5. Verifica
Apri /api/live: deve mostrare "enabled": true, "simulation": false, "error": null.
