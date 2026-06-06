# Risultati LIVE automatici — come attivarli

L'app aggiorna i risultati delle partite **in automatico**, interrogando il
servizio gratuito **football-data.org** a intervalli regolari (ogni 60 secondi).

## Come funziona

- L'app NON riceve i risultati "da sola": ogni minuto **chiede** al servizio
  football-data.org lo stato delle partite del Mondiale (questo si chiama *polling*).
- Quando una partita risulta **FINISHED** (finita), il risultato viene scritto
  automaticamente e la classifica si aggiorna senza alcun intervento manuale.
- Durante la partita vedi lo stato **LIVE** con il minuto e il punteggio corrente
  (i punti però vengono assegnati solo a partita finita, com'è giusto).

## Modalità SIMULAZIONE (senza chiave)

Se NON imposti una chiave API, l'app parte in **modalità simulazione**:
fa "giocare" una partita demo (la prima amichevole) che passa da 0-0 a 2-1 in
circa 80 secondi, così puoi vedere il meccanismo live funzionare senza registrarti.
Lo vedi nella pagina "Amichevoli": il banner indica "Modalità SIMULAZIONE".

## Come attivare i dati VERI (gratis)

1. Vai su https://www.football-data.org/client/register e registrati (gratis).
2. Riceverai via email una **API key** (una stringa di lettere e numeri).
3. Aprila `app.py` e incolla la chiave qui:

       FOOTBALL_DATA_KEY = 'LA_TUA_CHIAVE_QUI'

   (riga ~17, dove c'è scritto "INCOLLA QUI LA TUA CHIAVE")

   In alternativa, senza toccare il codice, impostala come variabile d'ambiente
   prima di avviare il server:

       export FOOTBALL_DATA_KEY='la_tua_chiave'      # Mac/Linux
       set FOOTBALL_DATA_KEY=la_tua_chiave           # Windows

4. Riavvia il server. Il banner diventerà "Dati reali (football-data.org)".

## Limiti del piano gratuito football-data.org

- Copre il **Mondiale FIFA** (e le 5 grandi leghe europee).
- 10 richieste al minuto: più che sufficienti (l'app ne fa 1 al minuto).
- I punteggi sul piano gratuito possono avere **qualche minuto di ritardo**
  rispetto al tempo reale. Per un toto tra amici va benissimo.
- Le **amichevoli** spesso NON sono incluse nel piano gratuito: la simulazione
  serve proprio a testare il meccanismo prima del Mondiale vero.

## Nota tecnica

L'abbinamento tra le partite vere e quelle dell'app avviene per nome squadra
(es. "Spagna" ↔ "Spain"), gestito dalla tabella `LIVE_TEAM_ALIASES` in app.py.
Se una nazionale non viene riconosciuta, aggiungi la corrispondenza lì.


## Comportamento "da app di risultati live"

- Ogni partita ha un **orario di inizio** (kickoff). Prima di quell'ora l'utente
  può inserire/modificare il pronostico.
- Al **fischio d'inizio** il pronostico si **blocca automaticamente** (non più
  modificabile) e al suo posto compare il **punteggio reale in diretta** con il
  minuto di gioco e un pallino rosso "LIVE".
- Il punteggio scorre da solo a ogni aggiornamento; a fine partita (FINISHED)
  il risultato si congela e i punti entrano in classifica automaticamente.
- Il blocco è applicato sia lato interfaccia sia lato server (un pronostico
  inviato a partita iniziata viene rifiutato), così non è aggirabile.

## Provare subito il live (modalità simulazione)

Da admin, nella pagina Amichevoli c'è il pulsante **"Avvia demo"**: fa giocare
Ungheria–Finlandia in 90 secondi reali (0-0 → 1-0 → 1-1 → 2-1), così vedi il
blocco al via, il punteggio che avanza in diretta e la classifica aggiornarsi a
fine gara. Disponibile solo finché non colleghi la chiave dei dati reali.
