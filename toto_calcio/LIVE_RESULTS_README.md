# Risultati live automatici (football-data.org)

L'app aggiorna da sola i risultati del Mondiale, senza inserirli a mano.
Usa football-data.org, il cui piano GRATUITO include la FIFA World Cup.

## 1. Ottieni la chiave gratuita

1. Vai su https://www.football-data.org/client/register
2. Registrati (gratis): ricevi una API key via email / nella dashboard.
3. Il piano gratuito include la Coppa del Mondo FIFA, con 10 richieste al minuto.
   I risultati possono avere un piccolo ritardo (delayed) sul piano free: per un
   toto tra amici, dove conta il risultato finale, è più che sufficiente.

## 2. Imposta la chiave su Render

1. Render → tuo servizio → Environment.
2. Aggiungi:  FOOTBALL_DATA_KEY = (la tua chiave)
3. Salva. Al riavvio l'app passa automaticamente ai risultati reali.

Senza questa variabile, l'app NON inventa risultati: le partite restano senza
punteggio finché non imposti la chiave o finché l'admin non inserisce un
risultato a mano (Pannello Admin → "Inserisci Risultati").

## 3. Come funziona

- L'app interroga la competizione "WC" (FIFA World Cup) su football-data.org.
- Aggiorna i risultati solo a partita FINITA (i punti contano a fine gara).
- I nomi delle nazionali vengono tradotti automaticamente (italiano <-> inglese).
- Endpoint interno: /api/live (lo usa il frontend per lo stato live).

## 4. Verifica

Dopo aver impostato la chiave, apri:
   https://<tuo-sito>.onrender.com/api/live
Controlla:
   "enabled": true       -> la chiave è stata letta
   "simulation": false   -> non è più in simulazione
   "error": null         -> nessun errore di collegamento

## 5. Amichevoli (nota)

Il piano gratuito copre il Mondiale ma NON le amichevoli internazionali.
Per le amichevoli, l'admin può inserire i risultati a mano dal pannello.
