# ⚽ Totò Calcio 2026

Web app per pronostici calcistici su **FIFA World Cup 2026** e **Serie A 2026/27**.

## Stack
- **Backend:** Python 3 + Flask
- **Frontend:** HTML5 + CSS3 + Vanilla JavaScript (nessun framework necessario)

## Struttura
```
toto_calcio/
├── app.py                    # Backend Flask (API REST + sessioni)
├── requirements.txt
├── templates/
│   └── index.html            # SPA entry point
└── static/
    ├── css/
    │   └── style.css         # Tutti gli stili
    └── js/
        ├── data_worldcup.js  # Dati e statistiche Mondiale 2026
        ├── data_seriea.js    # Dati e statistiche Serie A 2026/27
        └── app.js            # Logica SPA (login, dashboard, viste, pronostici)
```

## Avvio rapido

```bash
# 1. Installa le dipendenze
pip install -r requirements.txt

# 2. Avvia il server
python app.py
```

Apri **http://localhost:5000** nel browser.

## Login
Modalità demo: inserisci qualsiasi email + password (minimo 4 caratteri). Se l'account non esiste viene creato automaticamente.

## Funzionalità
- ✅ **Login** con email e password (sessione server-side)
- ✅ **Dashboard** con progresso pronostici per entrambe le competizioni
- ✅ **Mondiale 2026** – tutti i 12 gironi (A→L) + eliminazione diretta
- ✅ **Serie A 2026/27** – 38 giornate, 380 partite
- ✅ **Pronostici 1 / X / 2** per ogni partita (click per selezionare, click di nuovo per deselezionare)
- ✅ **Statistiche** per ogni partita: forma recente, quote, pronostico esperto
- ✅ **Navigazione giornate** Serie A con selettore rapido
- ✅ **Vista squadre** Serie A con forza e stadio

## API Endpoints
| Metodo | URL | Descrizione |
|--------|-----|-------------|
| POST | `/api/login` | Login (crea account se necessario) |
| POST | `/api/logout` | Logout |
| GET | `/api/me` | Stato sessione corrente |
| GET | `/api/predictions` | Recupera pronostici utente |
| POST | `/api/predictions` | Salva/aggiorna pronostico |
| GET | `/api/leaderboard` | Top 10 utenti per pronostici inseriti |

## Produzione
Per un deploy in produzione usare un server WSGI come **gunicorn**:
```bash
pip install gunicorn
gunicorn -w 4 app:app
```
E sostituire lo storage in-memory con un database (SQLite/PostgreSQL).
