"""Entrypoint WSGI per il server di produzione (gunicorn)."""
from app import app

if __name__ == '__main__':
    app.run()
