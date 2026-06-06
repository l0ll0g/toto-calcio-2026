#!/usr/bin/env python3
"""
TEST PIPELINE RISULTATI → PUNTEGGI → CLASSIFICA
================================================
Simula un mini-torneo con 3 utenti che fanno pronostici diversi,
poi l'admin inserisce i risultati reali e verifichiamo che:
  1. I punti si calcolino correttamente (3pt esatto, 1pt esito)
  2. La classifica si aggiorni e sia ordinata
  3. Inserire/modificare un risultato aggiorni i punteggi al volo

Avvio:  python3 test_scoring.py
(Non serve avviare il server: usa il test client di Flask in memoria.)
"""
import app as a

def reset():
    a.USERS.clear(); a.PROFILES.clear(); a.PREDICTIONS.clear()
    a.SUBMITTED.clear(); a.RESULTS.clear(); a.KO_PRED.clear()
    a.KO_SUBMITTED.clear(); a.TOPSCORER_PRED.clear(); a.FINAL_PRED.clear()

def mk_user(client, email, nick):
    client.post('/api/register', json={'email':email,'password':'pass1234','nickname':nick,'avatar':'⚽'})

def login(client, email):
    with client.session_transaction() as s: s['email'] = email

def C(label, got, exp):
    ok = got == exp
    print(f"  {'✅' if ok else '❌'} {label}: ottenuto={got} atteso={exp}")
    return ok

def main():
    reset()
    client = a.app.test_client()
    allok = True

    # ── 3 utenti ────────────────────────────────────────────────────────────
    mk_user(client, 'alice@x.com', 'Alice')
    mk_user(client, 'bob@x.com',   'Bob')
    mk_user(client, 'cleo@x.com',  'Cleo')

    # ── Pronostici su 2 partite del Girone A (wc-A-m1, wc-A-m2) ──────────────
    # Risultato REALE che imposteremo poi:
    #   wc-A-m1 → 2-0  (esito 1)
    #   wc-A-m2 → 1-1  (esito X)
    #
    # Alice: m1 2-0 (esatto), m2 1-1 (esatto)            → 3+3 = 6 pt, 2 exact
    # Bob:   m1 3-1 (solo esito 1), m2 0-2 (esito sbagliato) → 1+0 = 1 pt
    # Cleo:  m1 0-1 (sbagliato),    m2 2-2 (solo esito X)    → 0+1 = 1 pt
    plans = {
        'alice@x.com': {'wc-A-m1':('1','2-0'), 'wc-A-m2':('X','1-1')},
        'bob@x.com':   {'wc-A-m1':('1','3-1'), 'wc-A-m2':('2','0-2')},
        'cleo@x.com':  {'wc-A-m1':('2','0-1'), 'wc-A-m2':('X','2-2')},
    }
    for email, preds in plans.items():
        login(client, email)
        for mid,(pick,score) in preds.items():
            client.post('/api/predictions', json={'matchId':mid,'pick':pick,'score':score})

    # ── Prima dei risultati: tutti a 0 punti ─────────────────────────────────
    print("\n[1] Prima di inserire risultati — tutti a 0 punti")
    for email in plans:
        pts,corr,exact = a._calc_points(email)
        allok &= C(f"{email} punti", pts, 0)

    # ── L'admin inserisce i risultati reali ──────────────────────────────────
    a.USERS[a.ADMIN_EMAIL] = {'pw': a.hash_pw('x')}
    a.PROFILES[a.ADMIN_EMAIL] = {'nickname':'Admin','avatar':'👑'}
    login(client, a.ADMIN_EMAIL)
    r1 = client.post('/api/results', json={'matchId':'wc-A-m1','pick':'1','score':'2-0'})
    r2 = client.post('/api/results', json={'matchId':'wc-A-m2','pick':'X','score':'1-1'})
    print("\n[2] Admin inserisce i 2 risultati reali")
    allok &= C("salvataggio risultato m1", r1.get_json().get('ok'), True)
    allok &= C("salvataggio risultato m2", r2.get_json().get('ok'), True)

    # ── Verifica punteggi ────────────────────────────────────────────────────
    print("\n[3] Punteggi calcolati dopo i risultati")
    exp = {'alice@x.com':(6,2,2), 'bob@x.com':(1,1,0), 'cleo@x.com':(1,1,0)}
    for email,(ep,ec,ex) in exp.items():
        pts,corr,exact = a._calc_points(email)
        allok &= C(f"{email} (punti,corretti,esatti)", (pts,corr,exact), (ep,ec,ex))

    # ── Classifica ordinata ──────────────────────────────────────────────────
    print("\n[4] Classifica globale ordinata per punti")
    lb = client.get('/api/leaderboard').get_json()
    order = [(x['nickname'], x['points']) for x in lb if x['nickname'] in ('Alice','Bob','Cleo')]
    allok &= C("primo in classifica", order[0][0], 'Alice')
    allok &= C("punti del primo", order[0][1], 6)

    # ── Modifica di un risultato → punteggi si aggiornano ────────────────────
    print("\n[5] Admin CORREGGE il risultato m1: ora 3-1 (esito 1 invariato)")
    # Ora il punteggio esatto di Alice su m1 (2-0) non è più esatto → solo esito (1pt)
    # Bob aveva pronosticato 3-1 → diventa ESATTO (3pt)!
    client.post('/api/results', json={'matchId':'wc-A-m1','pick':'1','score':'3-1'})
    print("    Atteso: Alice 1(m1)+3(m2)=4 ; Bob 3(m1)+0=3 ; Cleo 0+1=1")
    exp2 = {'alice@x.com':4, 'bob@x.com':3, 'cleo@x.com':1}
    for email,ep in exp2.items():
        pts,_,_ = a._calc_points(email)
        allok &= C(f"{email} punti dopo correzione", pts, ep)

    # ── DIAGNOSI: cosa NON viene ancora conteggiato ──────────────────────────
    print("\n[6] DIAGNOSI copertura scoring (cosa manca per il punteggio completo)")
    login(client, 'alice@x.com')
    # Pronostico KO + capocannoniere + finale
    client.post('/api/ko_prediction', json={'matchId':'wc-r64-73','score':'2-1'})
    client.post('/api/topscorer', json={'player':'Mbappe'})
    client.post('/api/final_pred', json={'home':'Francia','away':'Brasile','winner':'Francia','score':'2-1'})
    # Admin "risolve" un KO e il capocannoniere (se esistono gli endpoint)
    pts_before,_,_ = a._calc_points('alice@x.com')
    # simulate that wc-r64-73 really ended 2-1
    a.RESULTS['wc-r64-73'] = {'pick':'1','score':'2-1'}
    pts_after,_,_ = a._calc_points('alice@x.com')
    ko_counted = pts_after > pts_before
    print(f"  {'✅' if ko_counted else '⚠️ '} Punti per fase a ELIMINAZIONE conteggiati: {ko_counted}")
    print(f"  ⚠️  Punti per CAPOCANNONIERE (+5) conteggiati: {'TOPSCORER_RESULT' in dir(a)}")
    print(f"  ⚠️  Punti per PRONOSTICO FINALE (+3/+5) conteggiati: {'FINAL_RESULT' in dir(a)}")
    print("     (Se ⚠️ , questi pronostici si salvano e si esportano in Excel,")
    print("      ma NON entrano ancora nel punteggio della classifica.)")

    print("\n" + ("="*50))
    print("RISULTATO GIRONI/CLASSIFICA:", "✅ TUTTO OK" if allok else "❌ QUALCOSA NON VA")
    print("="*50)

if __name__ == '__main__':
    main()
