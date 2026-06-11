// ═══════════════════════════════════════════════════════
// STATE
// ═══════════════════════════════════════════════════════
let S = {
  view: 'login',  // login | leagues | dashboard | worldcup | profile | leagueDetail
  email:null, nickname:null, avatar:'⚽', isAdmin:false, createdAt:'—',
  predictions:{}, submitted:[], results:{}, leaderboard:[], liveState:{},
  deadlineSecs:null, deadlinePassed:false,
  wcTab:'groups', wcGroup:'A', wcKoRound:0,
  selAvatar:'⚽', authMode:'login', authSubMode:'login', // authSubMode: login|register|forgot|reset
  myLeagues:[], activeLeague:null, activeLeagueId:null,
  topcorer:'', finalPred:{}, koPred:{}, koSubmitted:false,
  live:{matches:{},simulation:true,enabled:false}, _liveTimer:null,
  profileData:null,
  joinLid: null,   // set when arriving via /join/<lid>
};
let _timer = null;
const AVATARS = ['⚽','🏆','🥅','🦁','🐯','🦊','🐺','🦅','🔥','⚡','🌟','👑'];

// ═══════════════════════════════════════════════════════
// API
// ═══════════════════════════════════════════════════════
async function api(path, opts={}) {
  const r = await fetch(path, {
    headers:{'Content-Type':'application/json'},
    ...opts,
    body: opts.body ? JSON.stringify(opts.body) : undefined,
  });
  return r.json();
}

// ═══════════════════════════════════════════════════════
// BOOT
// ═══════════════════════════════════════════════════════
async function boot() {
  // Check for join link
  const path = window.location.pathname;
  if (path.startsWith('/join/')) S.joinLid = path.split('/join/')[1];

  const [me, dl] = await Promise.all([api('/api/me'), api('/api/deadline')]);
  S.deadlineSecs = dl.seconds_remaining;
  S.deadlinePassed = dl.passed;

  if (me.logged) {
    S.email=me.email; S.nickname=me.nickname;
    S.avatar=me.avatar; S.isAdmin=me.is_admin; S.createdAt=me.created_at;
    await loadUserData();
    if (S.joinLid) {
      await handleJoinLink();
    } else if (!S.myLeagues.length) {
      nav('leagues');
    } else {
      nav('dashboard');
    }
  } else {
    nav('login');
  }
}

async function loadUserData() {
  const [res, myLg] = await Promise.all([
    api('/api/results'), api('/api/leagues/mine')
  ]);
  S.results   = res;
  S.myLeagues = Array.isArray(myLg) ? myLg : [];
  // Scegli la lega attiva (l'ultima usata se ancora valida, altrimenti la prima)
  if (!S.myLeagues.find(l => l.id === S.activeLeagueId)) S.activeLeagueId = null;
  if (!S.activeLeagueId) {
    let saved = null; try { saved = localStorage.getItem('tc_lg'); } catch(e){}
    if (saved && S.myLeagues.find(l => l.id === saved)) S.activeLeagueId = saved;
    else if (S.myLeagues.length) S.activeLeagueId = S.myLeagues[0].id;
  }
  await loadLeagueData();
}

// Carica pronostici + classifica della lega ATTIVA (ogni lega è indipendente)
async function loadLeagueData() {
  if (!S.activeLeagueId) {
    S.predictions={}; S.submitted=[]; S.topscorer=''; S.finalPred={};
    S.koPred={}; S.koSubmitted=false; S.leaderboard=[]; S.activeLeague=null;
    return;
  }
  try { localStorage.setItem('tc_lg', S.activeLeagueId); } catch(e){}
  const lidq = encodeURIComponent(S.activeLeagueId);
  const [pd, detail] = await Promise.all([
    api('/api/predictions?league=' + lidq),
    api('/api/leagues/' + lidq),
  ]);
  S.predictions  = pd.predictions || {};
  S.submitted    = pd.submitted   || [];
  S.topscorer    = pd.topscorer   || '';
  S.finalPred    = pd.final_pred  || {};
  S.koPred       = pd.ko_pred     || {};
  S.koSubmitted  = pd.ko_submitted|| false;
  S.activeLeague = detail || null;
  S.leaderboard  = (detail && detail.leaderboard) || [];
}

// Cambia lega attiva (ricarica pronostici e classifica di quella lega)
async function switchLeague(lid) {
  if (lid === S.activeLeagueId) return;
  S.activeLeagueId = lid;
  await loadLeagueData();
  render();
}

// Body con la lega attiva, per gli endpoint dei pronostici
function lgBody(b) { return Object.assign({ league: S.activeLeagueId }, b || {}); }

async function handleJoinLink() {
  const res = await api(`/api/leagues/join_by_link/${S.joinLid}`, {method:'POST'});
  history.replaceState(null,'','/');
  S.joinLid = null;
  await loadUserData();
  nav(S.myLeagues.length ? 'dashboard' : 'leagues');
}

function nav(view, extra={}) {
  Object.assign(S, extra);
  S.view = view;
  render();
  if (view !== 'login') startTimer();
}

// ═══════════════════════════════════════════════════════
// DEADLINE TIMER
// ═══════════════════════════════════════════════════════
function startTimer() {
  if (_timer) clearInterval(_timer);
  _timer = setInterval(() => {
    if (S.deadlineSecs > 0) S.deadlineSecs--;
    else { S.deadlinePassed=true; clearInterval(_timer); }
    renderDeadlineBar();
  }, 1000);
}

function fmtCountdown(s) {
  if (s<=0) return null;
  const d=Math.floor(s/86400),h=Math.floor((s%86400)/3600),
        m=Math.floor((s%3600)/60),sc=s%60;
  if (d>0) return `${d}g ${h}h ${String(m).padStart(2,'0')}m`;
  if (h>0) return `${h}h ${String(m).padStart(2,'0')}m ${String(sc).padStart(2,'0')}s`;
  return `${String(m).padStart(2,'0')}m ${String(sc).padStart(2,'0')}s`;
}

function renderDeadlineBar() {
  document.querySelectorAll('.deadline-bar').forEach(el => {
    if (S.deadlinePassed) {
      el.innerHTML=`<i class="fa-solid fa-lock text-red-400 text-sm"></i><span class="text-red-400 text-sm font-semibold">Termine scaduto — Pronostici chiusi</span>`;
      return;
    }
    const t=fmtCountdown(S.deadlineSecs);
    const cls=S.deadlineSecs>86400?'text-emerald-400':S.deadlineSecs>3600?'text-yellow-400':'timer-danger text-red-400';
    el.innerHTML=`<i class="fa-regular fa-clock text-xs" style="color:rgba(200,164,74,0.7)"></i>
    <span class="text-xs text-white/40 uppercase tracking-wider">Deadline</span>
    <span class="font-display text-lg tracking-wider ${cls}">${t}</span>
    <span class="text-white/30 text-xs hide-mobile">· 11 Giugno 2026 · 20:59</span>`;
  });
}

// ═══════════════════════════════════════════════════════
// RENDER DISPATCHER
// ═══════════════════════════════════════════════════════

// ── Uniform flag rendering: every flag same box size, cropped to fill ────────
function flagImg(name, h=20) {
  const f = (typeof flagUrl==='function') ? flagUrl(name) : null;
  const w = Math.round(h * 4 / 3); // 4:3 uniform box
  if (!f) return `<span style="display:inline-block;width:${w}px;height:${h}px;border-radius:3px;background:rgba(255,255,255,0.08);vertical-align:middle"></span>`;
  return `<img src="${f}" alt="${name||''}" style="width:${w}px;height:${h}px;object-fit:cover;border-radius:3px;vertical-align:middle;box-shadow:0 1px 2px rgba(0,0,0,0.3);flex-shrink:0">`;
}

function render() {
  const root = document.getElementById('app');
  switch(S.view) {
    case 'login':        root.innerHTML=html_login();       bind_login();        break;
    case 'leagues':      root.innerHTML=html_leagues();     bind_leagues();      break;
    case 'dashboard':    root.innerHTML=html_dash();        bind_dash();         break;
    case 'worldcup':     root.innerHTML=html_wc();          bind_wc();           break;
    case 'profile':      root.innerHTML=html_profile();     bind_profile();      break;
    case 'leagueDetail': root.innerHTML=html_leagueDetail();bind_leagueDetail(); break;
    case 'admin':        root.innerHTML=html_admin();       bind_admin();        break;
    case 'teams':        root.innerHTML=html_teams();       bind_teams();        break;
  }
}

// ═══════════════════════════════════════════════════════
// TOPBAR (shared)
// ═══════════════════════════════════════════════════════
function html_topbar(opts={}) {
  const {back, title, subtitle, rightSlot=''} = opts;
  const onDashboard = S.view === 'dashboard';
  return `
  <header class="topbar">
    ${back ? `<button id="btn-back" class="mr-2 w-9 h-9 rounded-lg flex items-center justify-center text-white/60 hover:text-white transition-colors flex-shrink-0" style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1)"><i class="fa-solid fa-arrow-left text-sm"></i></button>` : ''}
    ${!onDashboard ? `<button id="btn-home" class="mr-3 w-9 h-9 rounded-lg flex items-center justify-center text-gold hover:text-white transition-colors flex-shrink-0" style="background:rgba(200,164,74,0.1);border:1px solid rgba(200,164,74,0.2)" title="Home"><i class="fa-solid fa-house text-sm"></i></button>` : ''}
    <button id="btn-logo-home" class="flex items-center gap-3 ${onDashboard?'cursor-default':'cursor-pointer'}">
      <div class="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style="background:linear-gradient(135deg,#C8A44A,#9A7A30)">
        <i class="fa-solid fa-trophy text-navy text-sm"></i>
      </div>
      <div class="text-left">
        <div class="font-display text-base text-gold tracking-wider leading-none">${title||'TOTÒ CALCIO 2026'}</div>
        ${subtitle ? `<div class="text-white/30 text-xs">${subtitle}</div>` : ''}
      </div>
    </button>
    <div class="ml-auto flex items-center gap-2">
      ${rightSlot}
      ${S.email ? `
      <button id="btn-profile" class="flex items-center gap-2 px-2.5 py-1.5 rounded-full text-sm text-white/70 transition-colors hover:text-white" style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.09)">
        <span class="text-base">${S.avatar}</span>
        <span class="hide-mobile text-xs font-medium">${S.nickname}</span>
        <i class="fa-solid fa-chevron-down text-xs text-white/30"></i>
      </button>
      <button id="btn-logout" class="px-2.5 py-1.5 rounded-lg text-xs font-semibold text-red-300" style="background:rgba(232,25,44,0.1);border:1px solid rgba(232,25,44,0.2)">
        <i class="fa-solid fa-right-from-bracket"></i>
      </button>` : ''}
    </div>
  </header>`;
}

function bind_topbar_events() {
  document.getElementById('btn-back')?.addEventListener('click', () => {
    // Teams detail → teams list; teams list → dashboard
    if (S.view === 'teams' && S.teamsTeam) { S.teamsTeam = null; render(); return; }
    if (S.view==='worldcup'||S.view==='leagueDetail'||S.view==='teams'||S.view==='admin') nav('dashboard');
    else if (S.view==='profile') nav(S._prevView||'dashboard');
    else nav('dashboard');
  });
  const goHome = () => { if (S.view !== 'dashboard') nav('dashboard'); };
  document.getElementById('btn-home')?.addEventListener('click', goHome);
  document.getElementById('btn-logo-home')?.addEventListener('click', goHome);
  document.getElementById('btn-profile')?.addEventListener('click', () => {
    S._prevView = S.view;
    nav('profile');
  });
  document.getElementById('btn-logout')?.addEventListener('click', async () => {
    await api('/api/logout',{method:'POST'});
    if (_timer) clearInterval(_timer);
    Object.assign(S,{email:null,nickname:null,avatar:'⚽',isAdmin:false,
      predictions:{},submitted:[],leaderboard:[],myLeagues:[],authMode:'login',authSubMode:'login'});
    nav('login');
  });
}

// ═══════════════════════════════════════════════════════
// LOGIN / REGISTER / FORGOT
// ═══════════════════════════════════════════════════════
function html_login() {
  const mode = S.authSubMode;
  let formHtml = '';

  if (mode === 'login') {
    formHtml = `
    <h2 class="text-white font-semibold text-lg text-center mb-5">Accedi al tuo account</h2>
    <div class="space-y-4">
      <div><label class="tc-label"><i class="fa-regular fa-envelope mr-1.5"></i>Email</label>
        <input class="tc-input" type="email" id="inp-email" placeholder="mario@esempio.it" autocomplete="email"></div>
      <div><label class="tc-label"><i class="fa-solid fa-lock mr-1.5"></i>Password</label>
        <input class="tc-input" type="password" id="inp-pw" placeholder="••••••••"></div>
    </div>
    <div id="auth-err" class="hidden mt-3 p-3 rounded-lg text-sm text-red-300" style="background:rgba(239,68,68,0.1);border:1px solid rgba(239,68,68,0.25)">
      <i class="fa-solid fa-circle-exclamation mr-2"></i><span id="auth-err-msg"></span></div>
    <button id="btn-auth" class="btn-gold mt-5"><i class="fa-solid fa-arrow-right-to-bracket mr-2"></i>Accedi</button>
    <div class="flex items-center justify-between mt-4">
      <button onclick="S.authSubMode='forgot';render()" class="text-xs text-white/30 hover:text-gold transition-colors">
        <i class="fa-solid fa-key mr-1"></i>Password dimenticata?
      </button>
      <button onclick="S.authSubMode='register';render()" class="text-xs text-gold hover:underline">
        Registrati <i class="fa-solid fa-arrow-right ml-1"></i>
      </button>
    </div>`;

  } else if (mode === 'register') {
    formHtml = `
    <h2 class="text-white font-semibold text-lg text-center mb-5">Crea il tuo account</h2>
    <div class="space-y-3">
      <div><label class="tc-label"><i class="fa-regular fa-envelope mr-1.5"></i>Email</label>
        <input class="tc-input" type="email" id="inp-email" placeholder="mario@esempio.it"></div>
      <div><label class="tc-label"><i class="fa-solid fa-lock mr-1.5"></i>Password</label>
        <input class="tc-input" type="password" id="inp-pw" placeholder="••••••••"></div>
      <div><label class="tc-label"><i class="fa-solid fa-lock mr-1.5"></i>Conferma Password</label>
        <input class="tc-input" type="password" id="inp-pw2" placeholder="••••••••"></div>
      <div><label class="tc-label"><i class="fa-solid fa-at mr-1.5"></i>Nickname</label>
        <input class="tc-input" type="text" id="inp-nick" placeholder="Es. Predator2026" maxlength="20"></div>
      <div><label class="tc-label"><i class="fa-regular fa-face-smile mr-1.5"></i>Avatar</label>
        <div class="grid grid-cols-6 gap-2 mt-1" id="avatar-grid">
          ${AVATARS.map(a=>`<button type="button" class="avatar-opt${a===S.selAvatar?' selected':''}" data-av="${a}">${a}</button>`).join('')}
        </div>
      </div>
    </div>
    <div id="auth-err" class="hidden mt-3 p-3 rounded-lg text-sm text-red-300" style="background:rgba(239,68,68,0.1);border:1px solid rgba(239,68,68,0.25)">
      <i class="fa-solid fa-circle-exclamation mr-2"></i><span id="auth-err-msg"></span></div>
    <button id="btn-auth" class="btn-gold mt-5"><i class="fa-regular fa-id-card mr-2"></i>Crea Account</button>
    <p class="text-center text-white/30 text-xs mt-4">
      Hai già un account? <button onclick="S.authSubMode='login';render()" class="text-gold hover:underline ml-1">Accedi qui</button>
    </p>`;

  } else if (mode === 'forgot') {
    formHtml = `
    <h2 class="text-white font-semibold text-lg text-center mb-2">Recupero Password</h2>
    <div class="mb-5 p-3 rounded-lg text-xs" style="background:rgba(200,164,74,0.08);border:1px solid rgba(200,164,74,0.15)">
      <div class="text-gold font-bold mb-1"><i class="fa-solid fa-circle-info mr-1"></i>Come funziona</div>
      <ol class="text-white/45 space-y-1 list-decimal list-inside">
        <li>Inserisci la tua email e clicca <em>Invia Richiesta</em></li>
        <li>L'admin (<strong class="text-white/60">lorenzogucci05@gmail.com</strong>) vedrà il token nel pannello admin</li>
        <li>Ti contatta e ti comunica il token (es. <code class="text-gold">ABC12345</code>)</li>
        <li>Torna qui → <em>Reimposta password</em>, inserisci token + nuova password</li>
      </ol>
    </div>
    <div><label class="tc-label"><i class="fa-regular fa-envelope mr-1.5"></i>Email</label>
      <input class="tc-input" type="email" id="inp-email" placeholder="mario@esempio.it"></div>
    <div id="auth-err" class="hidden mt-3 p-3 rounded-lg text-sm text-red-300" style="background:rgba(239,68,68,0.1);border:1px solid rgba(239,68,68,0.25)">
      <i class="fa-solid fa-circle-exclamation mr-2"></i><span id="auth-err-msg"></span></div>
    <div id="auth-ok" class="hidden mt-3 p-3 rounded-lg text-sm text-emerald-300" style="background:rgba(34,197,94,0.1);border:1px solid rgba(34,197,94,0.25)">
      <i class="fa-solid fa-circle-check mr-2"></i><span id="auth-ok-msg"></span></div>
    <button id="btn-auth" class="btn-gold mt-5"><i class="fa-solid fa-paper-plane mr-2"></i>Invia Richiesta</button>
    <p class="text-center text-white/30 text-xs mt-4">
      Hai il token? <button onclick="S.authSubMode='reset';render()" class="text-gold hover:underline ml-1">Reimposta password</button>
    </p>
    <button onclick="S.authSubMode='login';render()" class="w-full text-center text-white/25 text-xs mt-2 hover:text-white/50">
      <i class="fa-solid fa-arrow-left mr-1"></i>Torna al login
    </button>`;

  } else if (mode === 'reset') {
    formHtml = `
    <h2 class="text-white font-semibold text-lg text-center mb-2">Reimposta Password</h2>
    <p class="text-white/40 text-sm text-center mb-5">Inserisci il token ricevuto dall'amministratore e la nuova password.</p>
    <div class="space-y-3">
      <div><label class="tc-label"><i class="fa-solid fa-key mr-1.5"></i>Token</label>
        <input class="tc-input" type="text" id="inp-token" placeholder="Es. ABC12345" style="text-transform:uppercase"></div>
      <div><label class="tc-label"><i class="fa-solid fa-lock mr-1.5"></i>Nuova Password</label>
        <input class="tc-input" type="password" id="inp-pw" placeholder="••••••••"></div>
    </div>
    <div id="auth-err" class="hidden mt-3 p-3 rounded-lg text-sm text-red-300" style="background:rgba(239,68,68,0.1);border:1px solid rgba(239,68,68,0.25)">
      <i class="fa-solid fa-circle-exclamation mr-2"></i><span id="auth-err-msg"></span></div>
    <div id="auth-ok" class="hidden mt-3 p-3 rounded-lg text-sm text-emerald-300" style="background:rgba(34,197,94,0.1);border:1px solid rgba(34,197,94,0.25)">
      <i class="fa-solid fa-circle-check mr-2"></i><span id="auth-ok-msg"></span></div>
    <button id="btn-auth" class="btn-gold mt-5"><i class="fa-solid fa-rotate-right mr-2"></i>Reimposta Password</button>
    <button onclick="S.authSubMode='login';render()" class="w-full text-center text-white/25 text-xs mt-3 hover:text-white/50">
      <i class="fa-solid fa-arrow-left mr-1"></i>Torna al login
    </button>`;
  }

  return `
  <div class="bg-mesh min-h-screen flex items-center justify-center p-5">
    <div class="w-full max-w-md anim-fade">
      <!-- Logo -->
      <div class="text-center mb-7">
        <div class="inline-flex items-center gap-3 mb-4">
          <img src="https://flagcdn.com/w40/us.png" class="h-5 rounded shadow-lg" alt="USA">
          <img src="https://flagcdn.com/w40/ca.png" class="h-5 rounded shadow-lg" alt="CAN">
          <img src="https://flagcdn.com/w40/mx.png" class="h-5 rounded shadow-lg" alt="MEX">
        </div>
        <div class="font-display text-5xl tracking-[0.15em] text-white mb-1">TOTÒ CALCIO</div>
        <div class="font-display text-xl tracking-[0.18em] text-gold">FIFA WORLD CUP 2026</div>
        <div class="text-white/25 text-xs tracking-widest mt-1 uppercase">Pronostica · Competi · Vinci</div>
      </div>
      <!-- Tabs (only for login/register) -->
      ${mode==='login'||mode==='register' ? `
      <div class="flex mb-5 p-1 rounded-xl" style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08)">
        <button onclick="S.authSubMode='login';render()" class="flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${mode==='login'?'bg-gradient-to-r from-[#E0C06E] to-[#C8A44A] text-[#001533]':'text-white/40 hover:text-white/70'}">
          <i class="fa-regular fa-user mr-2"></i>Accedi
        </button>
        <button onclick="S.authSubMode='register';render()" class="flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${mode==='register'?'bg-gradient-to-r from-[#E0C06E] to-[#C8A44A] text-[#001533]':'text-white/40 hover:text-white/70'}">
          <i class="fa-regular fa-id-card mr-2"></i>Registrati
        </button>
      </div>` : ''}
      <!-- Card -->
      <div class="glass rounded-2xl p-7">${formHtml}</div>
      <p class="text-center text-white/20 text-xs mt-5">© 2026 Totò Calcio · Tutti i diritti riservati</p>
    </div>
  </div>`;
}

function bind_login() {
  document.querySelectorAll('.avatar-opt').forEach(b => {
    b.addEventListener('click', () => {
      S.selAvatar=b.dataset.av;
      document.querySelectorAll('.avatar-opt').forEach(x=>x.classList.remove('selected'));
      b.classList.add('selected');
    });
  });

  const showErr = msg => { const e=document.getElementById('auth-err'); if(e){e.classList.remove('hidden');document.getElementById('auth-err-msg').textContent=msg;} };
  const showOk  = msg => { const e=document.getElementById('auth-ok');  if(e){e.classList.remove('hidden');document.getElementById('auth-ok-msg').textContent=msg;} };

  const doLogin = async () => {
    const email=document.getElementById('inp-email')?.value.trim();
    const pw=document.getElementById('inp-pw')?.value;
    if (!email||pw.length<4){showErr('Email e password obbligatori (min 4 caratteri).');return;}
    const btn=document.getElementById('btn-auth'); btn.innerHTML='<i class="fa-solid fa-spinner spinner mr-2"></i>Accesso…'; btn.disabled=true;
    const res=await api('/api/login',{method:'POST',body:{email,password:pw}});
    if (res.error){btn.innerHTML='<i class="fa-solid fa-arrow-right-to-bracket mr-2"></i>Accedi';btn.disabled=false;showErr(res.error);return;}
    await afterLogin(res);
  };

  const doRegister = async () => {
    const email=document.getElementById('inp-email')?.value.trim();
    const pw=document.getElementById('inp-pw')?.value;
    const pw2=document.getElementById('inp-pw2')?.value;
    const nick=document.getElementById('inp-nick')?.value.trim();
    if (!email){showErr('Inserisci email.');return;}
    if (pw.length<4){showErr('Password min 4 caratteri.');return;}
    if (pw!==pw2){showErr('Le password non coincidono.');return;}
    if (nick.length<2){showErr('Nickname min 2 caratteri.');return;}
    const btn=document.getElementById('btn-auth'); btn.innerHTML='<i class="fa-solid fa-spinner spinner mr-2"></i>Registrazione…'; btn.disabled=true;
    const res=await api('/api/register',{method:'POST',body:{email,password:pw,nickname:nick,avatar:S.selAvatar}});
    if (res.error){btn.innerHTML='<i class="fa-regular fa-id-card mr-2"></i>Crea Account';btn.disabled=false;showErr(res.error);return;}
    await afterLogin(res);
  };

  const doForgot = async () => {
    const email=document.getElementById('inp-email')?.value.trim();
    if (!email){showErr('Inserisci la tua email.');return;}
    const btn=document.getElementById('btn-auth'); btn.innerHTML='<i class="fa-solid fa-spinner spinner mr-2"></i>Invio…'; btn.disabled=true;
    const res=await api('/api/request_reset',{method:'POST',body:{email}});
    btn.innerHTML='<i class="fa-solid fa-paper-plane mr-2"></i>Invia Richiesta'; btn.disabled=false;
    if (res.error){showErr(res.error);return;}
    showOk(res.message||'Richiesta inviata. Attendi il token dall\'amministratore.');
  };

  const doReset = async () => {
    const token=document.getElementById('inp-token')?.value.trim().toUpperCase();
    const pw=document.getElementById('inp-pw')?.value;
    if (!token){showErr('Inserisci il token.');return;}
    if (pw.length<4){showErr('Password min 4 caratteri.');return;}
    const btn=document.getElementById('btn-auth'); btn.innerHTML='<i class="fa-solid fa-spinner spinner mr-2"></i>Reimpostazione…'; btn.disabled=true;
    const res=await api('/api/reset_password',{method:'POST',body:{token,password:pw}});
    btn.innerHTML='<i class="fa-solid fa-rotate-right mr-2"></i>Reimposta Password'; btn.disabled=false;
    if (res.error){showErr(res.error);return;}
    showOk('Password reimpostata! Ora puoi accedere.');
    setTimeout(()=>{S.authSubMode='login';render();},2000);
  };

  const authActions = {login:doLogin,register:doRegister,forgot:doForgot,reset:doReset};
  document.getElementById('btn-auth')?.addEventListener('click', () => authActions[S.authSubMode]?.());
  document.getElementById('inp-pw')?.addEventListener('keydown', e=>e.key==='Enter'&&authActions[S.authSubMode]?.());
}

async function afterLogin(res) {
  S.email=res.email; S.nickname=res.nickname; S.avatar=res.avatar;
  S.isAdmin=res.is_admin; S.createdAt=res.created_at||'—';
  const dl=await api('/api/deadline');
  S.deadlineSecs=dl.seconds_remaining; S.deadlinePassed=dl.passed;
  await loadUserData();
  if (S.joinLid) { await handleJoinLink(); return; }
  nav(S.myLeagues.length ? 'dashboard' : 'leagues');
}

// ═══════════════════════════════════════════════════════
// LEAGUES PAGE
// ═══════════════════════════════════════════════════════
function html_leagues() {
  return `
  <div class="bg-mesh min-h-screen">
    ${html_topbar({title:'LEGHE', subtitle:'Crea o unisciti a una lega'})}
    <div class="deadline-bar" id="deadline-bar-1" style="display:none"></div>
    <main class="max-w-2xl mx-auto px-4 py-10 anim-fade">
      <div class="text-center mb-8">
        <div class="text-xs uppercase tracking-[0.2em] text-gold mb-2 font-medium"><i class="fa-solid fa-users mr-2"></i>Le tue leghe</div>
        <h1 class="font-display text-4xl text-white tracking-wide mb-2">ENTRA IN GARA</h1>
        <p class="text-white/40 text-sm">Crea una nuova lega o unisciti a una già esistente per competere con i tuoi amici.</p>
      </div>

      ${S.myLeagues.length ? `
      <div class="mb-6">
        <div class="text-xs uppercase tracking-wider text-white/30 mb-3 font-semibold"><i class="fa-solid fa-list mr-2"></i>Le mie leghe (${S.myLeagues.length})</div>
        <div class="space-y-2">
          ${S.myLeagues.map(lg=>`
          <button class="league-entry w-full text-left glass rounded-xl p-4 hover:border-gold/40 transition-all" data-lid="${lg.id}">
            <div class="flex items-center justify-between">
              <div><div class="text-white font-semibold">${lg.name}</div>
                <div class="text-white/30 text-xs mt-0.5"><i class="fa-solid fa-users mr-1"></i>${lg.member_count} membri · Creata ${lg.created_at}</div></div>
              <i class="fa-solid fa-chevron-right text-gold/50"></i>
            </div>
          </button>`).join('')}
        </div>
        <button id="btn-continue" class="btn-gold mt-4"><i class="fa-solid fa-arrow-right mr-2"></i>Vai ai Pronostici</button>
      </div>` : ''}

      <div class="grid sm:grid-cols-2 gap-4">
        <!-- Create -->
        <div class="glass rounded-2xl p-5">
          <div class="flex items-center gap-2 mb-4">
            <div class="w-9 h-9 rounded-lg flex items-center justify-center" style="background:rgba(200,164,74,0.15);border:1px solid rgba(200,164,74,0.2)">
              <i class="fa-solid fa-plus text-gold text-sm"></i>
            </div>
            <div class="font-display text-lg text-white tracking-wide">CREA LEGA</div>
          </div>
          <div class="space-y-3">
            <div><label class="tc-label">Nome lega</label>
              <input class="tc-input" id="create-name" placeholder="Es. Amici del Bar Sport"></div>
            <div><label class="tc-label">Password</label>
              <div style="position:relative">
                <input class="tc-input" type="password" id="create-pw" name="league-password" autocomplete="new-password" placeholder="Parola d'ordine" style="padding-right:42px">
                <button type="button" class="pw-toggle" data-target="create-pw" style="position:absolute;right:12px;top:50%;transform:translateY(-50%);background:none;border:none;color:rgba(255,255,255,0.45);cursor:pointer;padding:4px"><i class="fa-solid fa-eye"></i></button>
              </div></div>
          </div>
          <div id="create-err" class="hidden mt-2 text-red-300 text-xs"></div>
          <button id="btn-create" class="btn-gold mt-4 text-sm"><i class="fa-solid fa-flag mr-2"></i>Crea</button>
        </div>
        <!-- Join -->
        <div class="glass rounded-2xl p-5">
          <div class="flex items-center gap-2 mb-4">
            <div class="w-9 h-9 rounded-lg flex items-center justify-center" style="background:rgba(59,130,246,0.15);border:1px solid rgba(59,130,246,0.2)">
              <i class="fa-solid fa-link text-blue-400 text-sm"></i>
            </div>
            <div class="font-display text-lg text-white tracking-wide">UNISCITI</div>
          </div>
          <div class="space-y-3">
            <div><label class="tc-label">Nome lega</label>
              <input class="tc-input" id="join-name" placeholder="Nome esatto della lega"></div>
            <div><label class="tc-label">Password</label>
              <div style="position:relative">
                <input class="tc-input" type="password" id="join-pw" name="league-password" autocomplete="current-password" placeholder="Parola d'ordine" style="padding-right:42px">
                <button type="button" class="pw-toggle" data-target="join-pw" style="position:absolute;right:12px;top:50%;transform:translateY(-50%);background:none;border:none;color:rgba(255,255,255,0.45);cursor:pointer;padding:4px"><i class="fa-solid fa-eye"></i></button>
              </div></div>
          </div>
          <div id="join-err" class="hidden mt-2 text-red-300 text-xs"></div>
          <button id="btn-join" class="btn-gold mt-4 text-sm" style="background:linear-gradient(135deg,#3b82f6,#1d4ed8);color:#fff"><i class="fa-solid fa-right-to-bracket mr-2"></i>Unisciti</button>
        </div>
      </div>
    </main>
  </div>`;
}

function bind_leagues() {
  bind_topbar_events();
  document.getElementById('btn-continue')?.addEventListener('click', () => nav('dashboard'));
  document.querySelectorAll('.league-entry').forEach(btn => {
    btn.addEventListener('click', async () => {
      const lid = btn.dataset.lid;
      S.activeLeagueId = lid;
      await loadLeagueData();
      nav('leagueDetail');
    });
  });
  // Mostra/nascondi password lega (utile per leggere/copiare la password generata)
  document.querySelectorAll('.pw-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const inp = document.getElementById(btn.dataset.target);
      if (!inp) return;
      const icon = btn.querySelector('i');
      if (inp.type === 'password') { inp.type = 'text';  icon.className = 'fa-solid fa-eye-slash'; }
      else                         { inp.type = 'password'; icon.className = 'fa-solid fa-eye'; }
    });
  });
  document.getElementById('btn-create')?.addEventListener('click', async () => {
    const name=document.getElementById('create-name').value.trim();
    const pw=document.getElementById('create-pw').value;
    if (!name||!pw){document.getElementById('create-err').textContent='Nome e password obbligatori';document.getElementById('create-err').classList.remove('hidden');return;}
    const res=await api('/api/leagues',{method:'POST',body:{name,password:pw}});
    if (res.error){document.getElementById('create-err').textContent=res.error;document.getElementById('create-err').classList.remove('hidden');return;}
    if (res.league && res.league.id) S.activeLeagueId = res.league.id;
    await loadUserData();
    S._flash = `Lega "${name}" creata con successo!`;
    nav('dashboard');
  });
  document.getElementById('btn-join')?.addEventListener('click', async () => {
    const name=document.getElementById('join-name').value.trim();
    const pw=document.getElementById('join-pw').value;
    if (!name||!pw){document.getElementById('join-err').textContent='Nome e password obbligatori';document.getElementById('join-err').classList.remove('hidden');return;}
    const res=await api('/api/leagues/join',{method:'POST',body:{name,password:pw}});
    if (res.error){document.getElementById('join-err').textContent=res.error;document.getElementById('join-err').classList.remove('hidden');return;}
    if (res.league && res.league.id) S.activeLeagueId = res.league.id;
    await loadUserData();
    S._flash = `Sei entrato nella lega "${name}"!`;
    nav('dashboard');
  });
}

// ═══════════════════════════════════════════════════════
// LEAGUE DETAIL
// ═══════════════════════════════════════════════════════
function html_leagueDetail() {
  const lg = S.activeLeague;
  if (!lg) return '<div class="p-8 text-center text-white/40">Caricamento…</div>';
  const lb = lg.leaderboard || [];
  const inviteUrl = window.location.origin + lg.invite_link;
  const medal = i => i===0?'<i class="fa-solid fa-medal text-yellow-400"></i>':i===1?'<i class="fa-solid fa-medal text-slate-300"></i>':i===2?`<i class="fa-solid fa-medal" style="color:#cd7f32"></i>`:`<span class="text-white/25 text-sm font-bold w-5 text-center inline-block">${i+1}</span>`;
  return `
  <div class="bg-mesh min-h-screen">
    ${html_topbar({back:true,title:lg.name.toUpperCase(),subtitle:`${lg.member_count} membri · Creata ${lg.created_at}`})}
    <main class="max-w-2xl mx-auto px-4 py-6 anim-fade">
      <!-- Invite box -->
      <div class="glass rounded-xl p-4 mb-5 flex items-center gap-3 flex-wrap">
        <div class="flex-1">
          <div class="text-xs text-white/30 uppercase tracking-wider mb-1"><i class="fa-solid fa-link mr-1"></i>Link invito</div>
          <div class="text-gold text-sm font-mono truncate">${inviteUrl}</div>
        </div>
        <button id="btn-copy-link" class="px-3 py-2 rounded-lg text-xs font-bold text-gold flex-shrink-0" style="background:rgba(200,164,74,0.1);border:1px solid rgba(200,164,74,0.2)">
          <i class="fa-regular fa-copy mr-1"></i>Copia
        </button>
      </div>
      <!-- Leaderboard -->
      <div class="glass rounded-2xl p-5">
        <div class="font-display text-xl text-white tracking-wider mb-4"><i class="fa-solid fa-ranking-star text-gold mr-2"></i>CLASSIFICA</div>
        ${lb.length ? lb.map((u,i)=>`
        <div class="flex items-center gap-3 px-3 py-2.5 rounded-lg ${u.email===S.email?'lb-me':'lb-row'}">
          <div class="w-7 flex justify-center">${medal(i)}</div>
          <div class="text-xl w-8 text-center">${u.avatar}</div>
          <div class="flex-1">
            <div class="text-white text-sm font-semibold">${u.nickname}${u.email===S.email?'<span class="ml-2 text-xs text-gold">(tu)</span>':''}</div>
            <div class="text-white/30 text-xs"><i class="fa-solid fa-check text-emerald-400/70 mr-1"></i>${u.correct} · <i class="fa-solid fa-star text-gold/70 mr-1"></i>${u.exact}</div>
          </div>
          <div class="text-right"><div class="font-display text-2xl text-gold">${u.points}</div><div class="text-white/25 text-xs">pt</div></div>
        </div>`).join('') : '<div class="text-center text-white/30 py-8 text-sm">Nessun pronostico ancora inviato.</div>'}
      </div>
    </main>
  </div>`;
}

function bind_leagueDetail() {
  bind_topbar_events();
  document.getElementById('btn-copy-link')?.addEventListener('click', () => {
    const inviteUrl = window.location.origin + S.activeLeague.invite_link;
    navigator.clipboard.writeText(inviteUrl).then(()=>{
      const btn=document.getElementById('btn-copy-link');
      btn.innerHTML='<i class="fa-solid fa-check mr-1"></i>Copiato!';
      setTimeout(()=>btn.innerHTML='<i class="fa-regular fa-copy mr-1"></i>Copia',2000);
    });
  });
}

// ═══════════════════════════════════════════════════════
// DASHBOARD
// ═══════════════════════════════════════════════════════
function html_dash() {
  const wcTotal=WC_ALL_MATCHES.length;
  const wcPred=Object.keys(S.predictions).filter(k=>k.startsWith('wc-')&&!k.match(/r32|qf|sf|final/)).length;
  const pct=Math.min(100,(wcPred/wcTotal)*100).toFixed(0);
  const myEntry=S.leaderboard.find(u=>u.email===S.email);
  const myPts=myEntry?.points||0;
  const myRank=S.leaderboard.findIndex(u=>u.email===S.email)+1;
  const hasTopscorer=!!S.topscorer;
  const hasFinal=!!(S.finalPred?.home&&S.finalPred?.winner);

  const medal=i=>i===0?'<i class="fa-solid fa-medal text-yellow-400"></i>':i===1?'<i class="fa-solid fa-medal text-slate-300"></i>':i===2?`<i class="fa-solid fa-medal" style="color:#cd7f32"></i>`:`<span class="text-white/25 text-sm w-5 inline-block text-center">${i+1}</span>`;

  return `
  <div class="bg-mesh min-h-screen">
    ${html_topbar({
      subtitle:'FIFA World Cup 2026',
      rightSlot: S.isAdmin ? `
        <button id="btn-admin-panel" class="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-red-300" style="background:rgba(232,25,44,0.1);border:1px solid rgba(232,25,44,0.2)"><i class="fa-solid fa-shield-halved"></i> Admin</button>
        <a href="/api/export_excel" download class="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-gold" style="background:rgba(200,164,74,0.1);border:1px solid rgba(200,164,74,0.2)"><i class="fa-solid fa-file-excel"></i> Excel</a>` : ''
    })}
    ${S.isAdmin?`<div class="px-5 py-1.5 text-xs text-red-300/70 flex items-center gap-2" style="background:rgba(232,25,44,0.07);border-bottom:1px solid rgba(232,25,44,0.12)"><i class="fa-solid fa-shield-halved"></i> Admin: lorenzogucci05@gmail.com</div>`:''}
    <div class="deadline-bar" id="deadline-bar"></div>
    <main class="max-w-5xl mx-auto px-4 sm:px-6 py-8 anim-fade">
      <!-- Hero -->
      <div class="mb-8">
        <div class="text-xs uppercase tracking-[0.18em] text-gold mb-1 font-medium"><i class="fa-solid fa-circle-user mr-2"></i>Benvenuto, ${S.nickname}</div>
        <h1 class="font-display text-4xl sm:text-5xl text-white tracking-wide mb-1">SCEGLI LA COMPETIZIONE</h1>
        <p class="text-white/35 text-sm">Pronostica i risultati ed entra in classifica</p>
      </div>

      <!-- Stats strip -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
        ${[
          {icon:'fa-futbol',       label:'Pronostici', val:wcPred, color:'text-gold'},
          {icon:'fa-trophy',       label:'Punti',       val:myPts,  color:'text-emerald-400'},
          {icon:'fa-ranking-star', label:'Posizione',   val:myRank>0?`#${myRank}`:'—', color:'text-blue-400'},
          {icon:'fa-percent',      label:'Completato',  val:`${pct}%`, color:'text-purple-400'},
        ].map(s=>`<div class="glass rounded-xl p-4"><div class="text-white/30 text-xs mb-1"><i class="fa-solid ${s.icon} mr-1.5"></i>${s.label}</div><div class="font-display text-3xl ${s.color}">${s.val}</div></div>`).join('')}
      </div>

      <!-- Competition cards -->
      <div class="mb-6">
        <!-- World Cup — horizontal layout -->
        <button id="btn-wc" class="comp-card-wc text-left w-full">
          <div class="flex items-center gap-5 flex-wrap lg:flex-nowrap">
            <!-- Left: icon + title -->
            <div class="flex items-center gap-4 flex-shrink-0">
              <div class="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0" style="background:rgba(200,164,74,0.15);border:1px solid rgba(200,164,74,0.2)">
                <i class="fa-solid fa-trophy text-gold text-3xl"></i>
              </div>
              <div>
                <div class="font-display text-2xl text-white tracking-wide leading-none mb-1">FIFA WORLD CUP</div>
                <div class="text-gold text-sm font-medium">USA · Canada · México 2026</div>
              </div>
            </div>

            <!-- Center: info chips -->
            <div class="flex gap-2 flex-1 min-w-[240px]">
              ${[{icon:'fa-layer-group',v:'12 Gironi',s:'A → L'},{icon:'fa-futbol',v:'104 Partite',s:'Gironi + KO'},{icon:'fa-calendar',v:'12 Giu',s:'19 Lug 2026'}].map(s=>`
              <div class="flex-1 rounded-lg px-2 py-2.5 text-center" style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.06)">
                <i class="fa-solid ${s.icon} text-gold/40 text-sm mb-1 block"></i>
                <div class="text-white text-xs font-semibold whitespace-nowrap">${s.v}</div>
                <div class="text-white/25 text-xs whitespace-nowrap">${s.s}</div>
              </div>`).join('')}
            </div>

            <!-- Right: progress + CTA -->
            <div class="flex items-center gap-4 flex-shrink-0">
              <div class="text-right">
                <div class="font-display text-3xl text-gold leading-none">${wcPred}<span class="text-white/25 text-lg">/${wcTotal}</span></div>
                <div class="text-white/30 text-xs mt-0.5">pronostici</div>
                <div class="h-1.5 rounded-full mt-1.5" style="width:90px;background:rgba(255,255,255,0.07)">
                  <div class="h-full rounded-full transition-all duration-700" style="width:${pct}%;background:linear-gradient(90deg,#E0C06E,#9A7A30)"></div>
                </div>
              </div>
              <div class="flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-bold uppercase tracking-wider text-navy flex-shrink-0" style="background:linear-gradient(135deg,#E0C06E,#C8A44A)">
                <i class="fa-solid ${S.deadlinePassed?'fa-lock':'fa-arrow-right'}"></i>
                <span class="hide-mobile">${S.deadlinePassed?'Chiusi':'Pronostica'}</span>
              </div>
            </div>
          </div>
        </button>
      </div>

      <!-- Info Squadre button -->
      <button id="btn-teams" class="w-full glass rounded-2xl p-4 mb-5 flex items-center gap-4 hover:border-gold/30 transition-all text-left">
        <div class="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style="background:rgba(200,164,74,0.1);border:1px solid rgba(200,164,74,0.2)">
          <i class="fa-solid fa-shirt text-gold text-xl"></i>
        </div>
        <div class="flex-1">
          <div class="font-display text-lg text-white tracking-wide">INFO SQUADRE</div>
          <div class="text-white/35 text-xs">Rose complete, formazioni e statistiche delle 48 nazionali</div>
        </div>
        <i class="fa-solid fa-arrow-right text-gold/50 text-sm flex-shrink-0"></i>
      </button>

      <!-- Special predictions strip -->
      <div class="mb-8">
        <!-- Topscorer -->
        <div class="glass rounded-xl p-4">
          <div class="flex items-center gap-2 mb-3">
            <i class="fa-solid fa-boot text-gold text-sm"></i>
            <span class="font-display text-base text-white tracking-wide">CAPOCANNONIERE</span>
            ${hasTopscorer?`<span class="ml-auto text-xs text-emerald-400 font-semibold"><i class="fa-solid fa-check mr-1"></i>Scelto</span>`:''}
          </div>
          ${hasTopscorer ? `
          <div class="flex items-center gap-2 p-2 rounded-lg mb-3" style="background:rgba(200,164,74,0.08);border:1px solid rgba(200,164,74,0.15)">
            <i class="fa-solid fa-user-check text-gold"></i>
            <span class="text-white font-semibold text-sm">${S.topscorer}</span>
            <span class="ml-auto text-gold text-xs font-bold">+5pt</span>
          </div>` : `<p class="text-white/35 text-xs mb-3">Chi segnerà di più? Indovina e ottieni <strong class="text-gold">5 punti</strong>.</p>`}
          <button id="btn-topscorer" class="w-full py-2 rounded-lg text-xs font-bold text-gold transition-colors" style="background:rgba(200,164,74,0.1);border:1px solid rgba(200,164,74,0.2)">
            <i class="fa-solid fa-magnifying-glass mr-1"></i>${hasTopscorer?'Cambia giocatore':'Scegli giocatore'}
          </button>
        </div>
      </div>

      <!-- Leghe -->
      ${S.myLeagues.length ? `
      <div class="glass rounded-2xl p-5 mb-8">
        <div class="flex items-center justify-between mb-1">
          <div class="font-display text-lg text-white tracking-wide"><i class="fa-solid fa-users text-gold mr-2"></i>LE MIE LEGHE</div>
          <button id="btn-manage-leagues" class="text-xs text-gold hover:underline"><i class="fa-solid fa-plus mr-1"></i>Gestisci</button>
        </div>
        <div class="text-white/35 text-xs mb-4">I pronostici sono indipendenti per ogni lega. Tocca una lega per renderla attiva.</div>
        <div class="grid sm:grid-cols-2 gap-2">
          ${S.myLeagues.map(lg=>{const act=lg.id===S.activeLeagueId;return `
          <button class="league-entry-dash text-left p-3 rounded-lg transition-all hover:border-gold/30" data-lid="${lg.id}" style="background:${act?'rgba(200,164,74,0.1)':'rgba(255,255,255,0.03)'};border:1px solid ${act?'rgba(200,164,74,0.4)':'rgba(255,255,255,0.07)'}">
            <div class="text-white text-sm font-semibold">${lg.name}${act?' <span class="text-gold text-xs font-bold ml-1"><i class="fa-solid fa-circle-check mr-0.5"></i>attiva</span>':''}</div>
            <div class="text-white/30 text-xs mt-0.5"><i class="fa-solid fa-users mr-1"></i>${lg.member_count} membri</div>
          </button>`}).join('')}
        </div>
      </div>` : ''}

      <!-- Leaderboard -->
      ${html_leaderboard_section()}
    </main>

    <!-- Topscorer modal -->
    <div id="modal-topscorer" class="hidden fixed inset-0 z-50 flex items-center justify-center p-4" style="background:rgba(0,0,0,0.8);backdrop-filter:blur(8px)">
      <div class="glass rounded-2xl p-6 w-full max-w-md anim-fade">
        <div class="flex items-center justify-between mb-4">
          <div class="font-display text-xl text-white tracking-wide"><i class="fa-solid fa-boot text-gold mr-2"></i>CAPOCANNONIERE</div>
          <button id="modal-ts-close" class="text-white/40 hover:text-white text-xl"><i class="fa-solid fa-xmark"></i></button>
        </div>
        <p class="text-white/40 text-sm mb-4">Cerca il giocatore che pensi segnerà di più nel torneo.</p>
        <input class="tc-input" id="ts-search" placeholder="Cerca per nome, nazionalità o club…" autocomplete="off">
        <div id="ts-results" class="mt-3 space-y-2 max-h-72 overflow-y-auto"></div>
        ${S.topscorer?`<div class="mt-3 p-3 rounded-lg flex items-center gap-2" style="background:rgba(200,164,74,0.08);border:1px solid rgba(200,164,74,0.15)"><i class="fa-solid fa-check text-gold"></i><span class="text-white text-sm">Selezionato: <strong>${S.topscorer}</strong></span></div>`:''}
      </div>
    </div>
  </div>`;
}

function html_leaderboard_section() {
  if (!S.activeLeagueId || !S.leaderboard.length) return '';
  const lgName = (S.myLeagues.find(l=>l.id===S.activeLeagueId)||{}).name || (S.activeLeague&&S.activeLeague.name) || 'Lega';
  const medal=i=>i===0?'<i class="fa-solid fa-medal text-yellow-400"></i>':i===1?'<i class="fa-solid fa-medal text-slate-300"></i>':i===2?`<i class="fa-solid fa-medal" style="color:#cd7f32"></i>`:`<span class="text-white/25 text-sm w-5 inline-block text-center">${i+1}</span>`;
  return `
  <div class="glass rounded-2xl p-5">
    <div class="font-display text-lg text-white tracking-wide mb-1"><i class="fa-solid fa-ranking-star text-gold mr-2"></i>CLASSIFICA</div>
    <div class="text-white/35 text-xs mb-4"><i class="fa-solid fa-users mr-1"></i>${lgName}</div>
    <div class="space-y-1">
      ${S.leaderboard.map((u,i)=>`
      <div class="flex items-center gap-3 px-3 py-2.5 rounded-lg ${u.email===S.email?'lb-me':'lb-row'} cursor-pointer lb-click" data-nick="${u.nickname}">
        <div class="w-7 flex justify-center">${medal(i)}</div>
        <div class="text-xl w-8 text-center">${u.avatar}</div>
        <div class="flex-1">
          <div class="text-white text-sm font-semibold">${u.nickname}${u.email===S.email?' <span class="text-gold text-xs">(tu)</span>':''}</div>
          <div class="text-white/30 text-xs"><i class="fa-solid fa-check text-emerald-400/70 mr-1"></i>${u.correct} · <i class="fa-solid fa-star text-gold/70 mr-1"></i>${u.exact}</div>
        </div>
        <div class="text-right"><div class="font-display text-2xl text-gold">${u.points}</div><div class="text-white/25 text-xs">pt</div></div>
      </div>`).join('')}
    </div>
  </div>`;
}

function bind_dash() {
  bind_topbar_events();
  if (S._flash) { const msg = S._flash; S._flash = null; showToast(msg); }
  document.getElementById('btn-wc')?.addEventListener('click', () => nav('worldcup'));
  document.getElementById('btn-teams')?.addEventListener('click', () => { S.teamsGroup='A'; S.teamsTeam=null; nav('teams'); });
  document.getElementById('btn-admin-panel')?.addEventListener('click', () => { S._prevView='dashboard'; nav('admin'); });
  document.getElementById('btn-manage-leagues')?.addEventListener('click', () => nav('leagues'));
  document.querySelectorAll('.lb-click').forEach(el => {
    el.addEventListener('click', async () => {
      const data = await api(`/api/profile/${el.dataset.nick}`);
      S.profileData = data; S._prevView='dashboard'; nav('profile');
    });
  });
  document.querySelectorAll('.league-entry-dash').forEach(btn => {
    btn.addEventListener('click', async () => {
      S.activeLeagueId = btn.dataset.lid;
      await loadLeagueData();
      nav('leagueDetail');
    });
  });

  // Topscorer modal
  document.getElementById('btn-topscorer')?.addEventListener('click', () => {
    document.getElementById('modal-topscorer').classList.remove('hidden');
  });
  document.getElementById('modal-ts-close')?.addEventListener('click', () => {
    document.getElementById('modal-topscorer').classList.add('hidden');
  });
  const tsSearch = document.getElementById('ts-search');
  if (tsSearch) {
    tsSearch.addEventListener('input', () => {
      const results = searchPlayers(tsSearch.value);
      const container = document.getElementById('ts-results');
      if (!results.length) {
        container.innerHTML = tsSearch.value.length>=2
          ? '<div class="text-white/30 text-sm text-center py-3">Nessun giocatore trovato</div>'
          : '';
        return;
      }
      container.innerHTML = results.map(p => `
      <button class="ts-player-btn w-full text-left p-3 rounded-lg transition-all hover:border-gold/40" data-name="${p.name}"
        style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08)">
        <div class="flex items-start gap-3">
          <img src="https://flagcdn.com/w40/${p.natCode}.png" class="h-6 rounded mt-0.5 flex-shrink-0" alt="${p.nat}" onerror="this.style.display='none'">
          <div class="flex-1">
            <div class="flex items-center gap-2 flex-wrap">
              <span class="text-white font-semibold text-sm">${p.name}</span>
              <span class="text-white/40 text-xs">${p.nat} · ${p.pos} · ${p.club}</span>
            </div>
            <div class="flex items-center gap-4 mt-1.5 text-xs">
              <span class="text-white/40"><i class="fa-solid fa-cake-candles mr-1"></i>${p.age} anni</span>
              <span class="text-emerald-400"><i class="fa-solid fa-futbol mr-1"></i>${p.goals} gol</span>
              <span class="text-blue-400"><i class="fa-solid fa-hands-helping mr-1"></i>${p.assists} assist</span>
              <span class="text-gold">${'<i class="fa-solid fa-star text-xs"></i>'.repeat(p.rating)}${'<i class="fa-regular fa-star text-xs text-white/20"></i>'.repeat(5-p.rating)}</span>
            </div>
            <div class="flex gap-2 mt-1 flex-wrap text-xs text-white/25">
              ${p.wc_wins>0?`<span><i class="fa-solid fa-trophy text-gold mr-0.5"></i>${p.wc_wins} Mondiale/i</span>`:''}
              <span><i class="fa-solid fa-gamepad mr-0.5"></i>${p.games} presenze</span>
            </div>
          </div>
        </div>
      </button>`).join('');
      document.querySelectorAll('.ts-player-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
          const name = btn.dataset.name;
          const res = await api('/api/topscorer',{method:'POST',body:lgBody({player:name})});
          if (res.ok) {
            S.topscorer = name;
            document.getElementById('modal-topscorer').classList.add('hidden');
            render();
          }
        });
      });
    });
  }

  renderDeadlineBar();
}

// ═══════════════════════════════════════════════════════
// PROFILE PAGE
// ═══════════════════════════════════════════════════════
function html_profile() {
  const p = S.profileData || {
    email:S.email, nickname:S.nickname, avatar:S.avatar,
    created_at:S.createdAt, points:0, correct:0, exact:0,
    submitted:0, topscorer:S.topscorer, final_pred:S.finalPred, leagues:S.myLeagues
  };
  const isMe = p.email === S.email;
  return `
  <div class="bg-mesh min-h-screen">
    ${html_topbar({back:true, title:'PROFILO', subtitle:p.nickname})}
    <main class="max-w-2xl mx-auto px-4 py-8 anim-fade">
      <!-- Avatar & name -->
      <div class="glass rounded-2xl p-6 mb-4 text-center">
        <div class="text-7xl mb-3">${p.avatar}</div>
        <div class="font-display text-3xl text-white tracking-wide">${p.nickname}</div>
        <div class="text-white/35 text-sm mt-1">${isMe?p.email:'—'}</div>
        <div class="text-white/25 text-xs mt-1"><i class="fa-regular fa-calendar mr-1"></i>Iscritto il ${p.created_at||'—'}</div>
      </div>
      <!-- Stats -->
      <div class="grid grid-cols-3 gap-3 mb-4">
        ${[
          {icon:'fa-trophy',      label:'Punti Totali', val:p.points, color:'text-gold'},
          {icon:'fa-check-circle',label:'1/X/2 Corretti', val:p.correct, color:'text-emerald-400'},
          {icon:'fa-star',        label:'Risultati Esatti', val:p.exact, color:'text-blue-400'},
        ].map(s=>`<div class="glass rounded-xl p-4 text-center">
          <i class="fa-solid ${s.icon} ${s.color} text-lg mb-2 block"></i>
          <div class="font-display text-2xl ${s.color}">${s.val}</div>
          <div class="text-white/30 text-xs">${s.label}</div>
        </div>`).join('')}
      </div>
      <div class="grid grid-cols-2 gap-3 mb-4">
        ${[
          {icon:'fa-paper-plane', label:'Gironi Inviati', val:`${p.submitted}/12`},
          {icon:'fa-users',       label:'Leghe', val:p.leagues?.length||0},
        ].map(s=>`<div class="glass rounded-xl p-4 text-center">
          <i class="fa-solid ${s.icon} text-gold text-lg mb-2 block"></i>
          <div class="font-display text-2xl text-white">${s.val}</div>
          <div class="text-white/30 text-xs">${s.label}</div>
        </div>`).join('')}
      </div>
      <!-- Special preds -->
      <div class="glass rounded-xl p-4 mb-4">
        <div class="font-display text-base text-white tracking-wide mb-3"><i class="fa-solid fa-star text-gold mr-2"></i>PRONOSTICI SPECIALI</div>
        <div class="space-y-2">
          <div class="flex items-center gap-3 p-3 rounded-lg" style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.07)">
            <i class="fa-solid fa-boot text-gold"></i>
            <div><div class="text-white/50 text-xs">Capocannoniere</div>
              <div class="text-white font-semibold text-sm">${p.topscorer||'Non selezionato'}</div></div>
            <span class="ml-auto text-gold text-xs font-bold">+5pt</span>
          </div>
          ${p.final_pred?.home ? `
          <div class="p-3 rounded-lg" style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.07)">
            <div class="text-white/50 text-xs mb-1"><i class="fa-solid fa-crown text-gold mr-1"></i>Pronostico Finale</div>
            <div class="text-white font-semibold text-sm">${p.final_pred.home} <span class="text-white/30 font-normal">vs</span> ${p.final_pred.away}</div>
            ${p.final_pred.score?`<div class="text-gold mt-1"><span class="font-display text-base tracking-wider">${p.final_pred.score.replace('-',' – ')}</span> <span class="text-gold/60 text-xs ml-1"><i class="fa-solid fa-trophy mr-1"></i>${p.final_pred.winner}</span></div>`:`<div class="text-gold text-xs mt-1"><i class="fa-solid fa-trophy mr-1"></i>${p.final_pred.winner}</div>`}
          </div>` : '<div class="p-3 rounded-lg text-white/30 text-sm" style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06)"><i class="fa-solid fa-crown text-white/20 mr-2"></i>Finale non pronosticata</div>'}
        </div>
      </div>
      <!-- Leagues -->
      ${p.leagues?.length ? `
      <div class="glass rounded-xl p-4">
        <div class="font-display text-base text-white tracking-wide mb-3"><i class="fa-solid fa-users text-gold mr-2"></i>LEGHE</div>
        <div class="space-y-2">
          ${p.leagues.map(lg=>`<div class="flex items-center gap-2 p-2 rounded-lg text-sm" style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.07)">
            <i class="fa-solid fa-shield-halved text-gold/50"></i>
            <span class="text-white">${lg.name}</span>
            <span class="ml-auto text-white/30 text-xs">${lg.member_count} membri</span>
          </div>`).join('')}
        </div>
      </div>` : ''}
    </main>
  </div>`;
}

function bind_profile() {
  bind_topbar_events();
}

// ═══════════════════════════════════════════════════════
// WORLD CUP VIEW
// ═══════════════════════════════════════════════════════
function html_wc() {
  const wcPred=Object.keys(S.predictions).filter(k=>k.startsWith('wc-')&&!k.match(/r32|qf|sf|final/)).length;
  let content='';
  if (S.wcTab==='groups') {
    const teams=WC_GROUPS[S.wcGroup], matches=WC_ALL_MATCHES.filter(m=>m.group===S.wcGroup);
    const locked=S.submitted.includes(S.wcGroup), predCnt=matches.filter(m=>{const p=S.predictions[m.id];return p&&p.score&&p.score.includes('-');}).length;
    content=`
    <div class="flex flex-wrap gap-2 mb-4">
      ${Object.keys(WC_GROUPS).map(g=>`
      <button class="grp-btn${g===S.wcGroup?' active':''}" data-grp="${g}">
        ${g}${S.submitted.includes(g)?'<span class="submitted-dot"></span>':''}
      </button>`).join('')}
    </div>
    <div class="glass rounded-xl p-4 mb-4">
      <div class="flex items-center justify-between flex-wrap gap-3">
        <div>
          <div class="font-display text-xl text-gold tracking-wider mb-2">GIRONE ${S.wcGroup}</div>
          <div class="flex flex-wrap gap-2">
            ${teams.map(t=>`<span class="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs text-white/65" style="background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.08)">${flagImg(t.name,15)}${t.name}</span>`).join('')}
          </div>
        </div>
        <div class="text-right">
          <div class="font-display text-2xl ${predCnt===matches.length?'text-emerald-400':'text-gold'}">
            <span class="pred-grp-counter">${predCnt}/${matches.length}</span>
          </div>
          <div class="text-white/30 text-xs">pronostici</div>
          ${locked?`<div class="text-emerald-400 text-xs mt-1"><i class="fa-solid fa-lock mr-1"></i>Inviato</div>`:''}
        </div>
      </div>
    </div>
    <div class="space-y-3">${matches.map(m=>html_matchCard(m,locked)).join('')}</div>
    ${html_group_standing(S.wcGroup)}
    ${html_submitBox(S.wcGroup,locked,predCnt,matches.length)}`;
  } else {
    content = html_knockout_bracket();
  }

  return `
  <div class="bg-mesh min-h-screen">
    ${html_topbar({back:true, title:'FIFA WORLD CUP 2026', subtitle:'USA · Canada · México',
      rightSlot:`<div class="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-gold" style="background:rgba(200,164,74,0.1);border:1px solid rgba(200,164,74,0.2)"><i class="fa-solid fa-check-double"></i><span>${wcPred}/${WC_ALL_MATCHES.length}</span></div>`})}
    <div class="deadline-bar" id="deadline-bar"></div>
    <div class="flex gap-1 px-4 sm:px-6 py-2.5 sticky top-[60px] z-40" style="background:rgba(0,13,31,0.85);backdrop-filter:blur(10px);border-bottom:1px solid rgba(200,164,74,0.08)">
      <button class="view-tab px-4 py-2 rounded-lg text-sm font-semibold transition-all ${S.wcTab==='groups'?'text-gold':'text-white/40 hover:text-white/60'}" data-tab="groups"
        style="${S.wcTab==='groups'?'background:rgba(200,164,74,0.1);border:1px solid rgba(200,164,74,0.2)':'border:1px solid transparent'}">
        <i class="fa-solid fa-layer-group mr-2"></i>Gironi
      </button>
      <button class="view-tab px-4 py-2 rounded-lg text-sm font-semibold transition-all ${S.wcTab==='knockout'?'text-gold':'text-white/40 hover:text-white/60'}" data-tab="knockout"
        style="${S.wcTab==='knockout'?'background:rgba(200,164,74,0.1);border:1px solid rgba(200,164,74,0.2)':'border:1px solid transparent'}">
        <i class="fa-solid fa-bolt mr-2"></i>KO Phase
      </button>

    </div>
    <main class="max-w-3xl mx-auto px-4 sm:px-6 py-5 anim-fade">${content}</main>
  </div>`;
}


// ── Computed group standing table (from user's predictions) ──────────────────
function html_group_standing(grp) {
  const st = computeGroupStanding(grp, S.predictions);
  const complete = st._complete;
  // wrapper id allows live in-place refresh while typing (see refreshStanding)
  const flag = n => flagImg(n,16) + '<span style="display:inline-block;width:6px"></span>';
  const qualColor = rank => rank<=2 ? '#22c55e' : rank===3 ? '#C8A44A' : 'rgba(255,255,255,0.15)';
  return `
  <div class="glass rounded-xl p-4 mt-5" id="group-standing-box">
    <div class="flex items-center justify-between mb-3">
      <div class="font-display text-lg text-gold tracking-wider">
        <i class="fa-solid fa-ranking-star mr-2"></i>CLASSIFICA GIRONE ${grp}
      </div>
      ${complete
        ? `<span class="text-emerald-400 text-xs"><i class="fa-solid fa-circle-check mr-1"></i>Completa</span>`
        : `<span class="text-white/30 text-xs"><i class="fa-solid fa-clock mr-1"></i>In aggiornamento</span>`}
    </div>
    <div class="text-white/30 text-xs mb-3">Calcolata in base ai tuoi pronostici · <span style="color:#22c55e">verde</span> = qualificate · <span style="color:#C8A44A">oro</span> = 3ª (ripescaggio)</div>
    <div class="overflow-x-auto">
      <table style="width:100%;border-collapse:collapse;font-size:13px">
        <thead>
          <tr style="color:rgba(255,255,255,0.35);text-align:center">
            <th style="text-align:left;padding:6px 4px;font-weight:600">#</th>
            <th style="text-align:left;padding:6px 4px;font-weight:600">Squadra</th>
            <th style="padding:6px 4px;font-weight:600">PG</th>
            <th style="padding:6px 4px;font-weight:600">V</th>
            <th style="padding:6px 4px;font-weight:600">N</th>
            <th style="padding:6px 4px;font-weight:600">P</th>
            <th style="padding:6px 4px;font-weight:600">DR</th>
            <th style="padding:6px 4px;font-weight:700;color:#C8A44A">Pt</th>
          </tr>
        </thead>
        <tbody>
          ${st.map(r=>`
          <tr style="border-top:1px solid rgba(255,255,255,0.06)">
            <td style="padding:8px 4px"><span style="display:inline-block;width:6px;height:6px;border-radius:50%;background:${qualColor(r.rank)};margin-right:6px"></span>${r.rank}</td>
            <td style="padding:8px 4px;color:#fff">${flag(r.team)}${r.team}</td>
            <td style="padding:8px 4px;text-align:center;color:rgba(255,255,255,0.6)">${r.P}</td>
            <td style="padding:8px 4px;text-align:center;color:rgba(255,255,255,0.6)">${r.W}</td>
            <td style="padding:8px 4px;text-align:center;color:rgba(255,255,255,0.6)">${r.D}</td>
            <td style="padding:8px 4px;text-align:center;color:rgba(255,255,255,0.6)">${r.L}</td>
            <td style="padding:8px 4px;text-align:center;color:rgba(255,255,255,0.6)">${r.GD>0?'+':''}${r.GD}</td>
            <td style="padding:8px 4px;text-align:center;font-weight:700;color:#C8A44A">${r.pts}</td>
          </tr>`).join('')}
        </tbody>
      </table>
    </div>
  </div>`;
}

// ── Knockout bracket (computed from predictions) ─────────────────────────────
function refreshStanding() {
  const box = document.getElementById('group-standing-box');
  if (!box) return;
  // Replace the standings box with a freshly computed one
  const tmp = document.createElement('div');
  tmp.innerHTML = html_group_standing(S.wcGroup);
  const fresh = tmp.firstElementChild;
  if (fresh) box.replaceWith(fresh);
}

function html_knockout_bracket() {
  const groupsDone = computeAllStandings(S.predictions)._allComplete;
  const { rounds } = computeBracket(S.predictions, S.koPred);
  const round = rounds[S.wcKoRound] || rounds[0];

  // Round selector tabs
  const tabs = `
    <div class="flex flex-wrap gap-2 mb-4">
      ${rounds.map((r,i)=>`
      <button class="ko-tab-btn px-3 py-2 rounded-lg text-sm font-semibold transition-all" data-ko="${i}"
        style="${i===S.wcKoRound?'background:rgba(200,164,74,0.12);border:1px solid rgba(200,164,74,0.25);color:#C8A44A':'background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);color:rgba(255,255,255,0.4)'}">
        <i class="fa-solid ${r.icon} mr-1.5"></i>${r.label}
      </button>`).join('')}
    </div>`;

  // Info banner
  const banner = groupsDone
    ? `<div class="glass rounded-xl p-3 mb-4 flex items-start gap-3">
         <i class="fa-solid fa-wand-magic-sparkles text-gold/60 mt-0.5 flex-shrink-0"></i>
         <p class="text-white/45 text-sm">Le squadre sono determinate dai <strong class="text-gold">tuoi pronostici dei gironi</strong>. Inserisci il risultato esatto di ogni sfida: i vincenti avanzano automaticamente. Una partita non può finire in parità.</p>
       </div>`
    : `<div class="glass rounded-xl p-3 mb-4 flex items-start gap-3" style="border-color:rgba(232,25,44,0.2)">
         <i class="fa-solid fa-triangle-exclamation text-red-400 mt-0.5 flex-shrink-0"></i>
         <p class="text-white/45 text-sm">Completa <strong class="text-yellow-300">tutti i 12 gironi</strong> per generare il tabellone. Le squadre compariranno qui automaticamente.</p>
       </div>`;

  const cards = round.matches.map(m=>html_koMatchCard(m)).join('');

  // Submit / lock box (shown only when groups done and not yet locked)
  let submitBox = '';
  if (groupsDone) {
    const prog = countKoProgress(S.predictions, S.koPred);
    if (S.koSubmitted) {
      submitBox = `<div class="mt-5 p-5 rounded-xl text-center" style="background:rgba(34,197,94,0.07);border:1px solid rgba(34,197,94,0.2)">
        <i class="fa-solid fa-circle-check text-emerald-400 text-2xl mb-2 block"></i>
        <div class="text-emerald-400 font-bold">Tabellone ad eliminazione inviato e bloccato</div>
        <div class="text-white/35 text-xs mt-1">I pronostici della fase finale non sono più modificabili</div></div>`;
    } else if (S.deadlinePassed) {
      submitBox = `<div class="mt-5 p-5 rounded-xl text-center" style="background:rgba(232,25,44,0.07);border:1px solid rgba(232,25,44,0.2)"><i class="fa-solid fa-lock text-red-400 text-2xl mb-2 block"></i><div class="text-red-400 font-bold">Termine scaduto</div></div>`;
    } else {
      const can = prog.filled === prog.available && prog.available > 0;
      submitBox = `<div class="mt-5 p-5 rounded-xl" style="background:rgba(13,33,71,0.6);border:1px solid rgba(200,164,74,0.12)">
        ${!can?`<div class="flex items-start gap-2 mb-3 p-3 rounded-lg" style="background:rgba(232,25,44,0.08);border:1px solid rgba(232,25,44,0.15)"><i class="fa-solid fa-triangle-exclamation text-red-400 mt-0.5 flex-shrink-0"></i><span class="text-red-300 text-xs">Completa tutti gli scontri del tabellone (${prog.filled}/${prog.available}) per inviare.</span></div>`:''}
        <div class="flex items-start gap-2 p-3 rounded-lg mb-4" style="background:rgba(200,164,74,0.06);border:1px solid rgba(200,164,74,0.12)">
          <i class="fa-solid fa-circle-exclamation text-gold/60 mt-0.5 flex-shrink-0"></i>
          <span class="text-white/45 text-xs"><strong class="text-yellow-300">Attenzione:</strong> una volta inviato il tabellone, nessun pronostico della fase ad eliminazione sarà più modificabile.</span>
        </div>
        <div class="flex justify-center">
          <button id="btn-submit-ko" class="btn-submit-group flex items-center gap-2" ${!can?'disabled':''} style="${!can?'opacity:0.45;cursor:not-allowed':''}">
            <i class="fa-solid fa-paper-plane"></i> Invia Tabellone Finale
          </button>
        </div>
      </div>`;
    }
  }

  return tabs + banner + `<div class="space-y-3">${cards}</div>` + submitBox;
}

// ── Single knockout match card with exact-score input + draw advancement ─────
function html_koMatchCard(m) {
  const koLocked = S.deadlinePassed || S.koSubmitted;
  const ready = m.home && m.away;
  const pred = S.koPred[m.id] || {};
  let predH='', predA='';
  if (pred.score && pred.score.includes('-')) { const p=pred.score.split('-'); predH=p[0]||''; predA=p[1]||''; }
  const isDraw = predH!=='' && predA!=='' && parseInt(predH)===parseInt(predA);

  const teamBox = (name, placeholder, align) => `
    <div class="flex items-center gap-2 flex-1 min-w-0 ${align==='right'?'flex-row-reverse text-right':''}">
      ${name ? flagImg(name,18) : `<span style="display:inline-block;width:24px;height:18px;border-radius:3px;background:rgba(255,255,255,0.06);text-align:center;line-height:18px"><i class="fa-solid fa-question text-white/20" style="font-size:9px"></i></span>`}
      <span class="truncate text-sm ${name?'text-white':'text-white/30 italic'}">${name||placeholder}</span>
    </div>`;

  // Advancement selector (only when draw + teams known + not locked)
  let advBlock = '';
  if (ready && isDraw && !koLocked) {
    const sel = pred.adv || '';
    advBlock = `
    <div class="ko-adv-block mt-3 p-3 rounded-lg" style="background:rgba(200,164,74,0.06);border:1px dashed rgba(200,164,74,0.3)">
      <div class="text-center text-xs mb-2" style="color:rgba(200,164,74,0.8)"><i class="fa-solid fa-clock-rotate-left mr-1"></i>Pareggio nei 90' — chi passa dopo supplementari/rigori?</div>
      <div class="flex gap-2">
        <button class="ko-adv-btn flex-1 py-2 rounded-lg text-xs font-semibold transition-all" data-koid="${m.id}" data-adv="${m.home}"
          style="${sel===m.home?'background:rgba(34,197,94,0.18);border:1px solid rgba(34,197,94,0.5);color:#86efac':'background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);color:rgba(255,255,255,0.6)'}">
          ${m.home}
        </button>
        <button class="ko-adv-btn flex-1 py-2 rounded-lg text-xs font-semibold transition-all" data-koid="${m.id}" data-adv="${m.away}"
          style="${sel===m.away?'background:rgba(34,197,94,0.18);border:1px solid rgba(34,197,94,0.5);color:#86efac':'background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);color:rgba(255,255,255,0.6)'}">
          ${m.away}
        </button>
      </div>
    </div>`;
  }

  // Winner / status line
  let statusLine = '';
  if (m.winner) {
    const viaText = isDraw ? ' (dopo suppl./rigori)' : '';
    statusLine = `<div class="ko-winner-line mt-2 text-center text-xs"><i class="fa-solid fa-circle-check mr-1" style="color:#22c55e"></i><span style="color:rgba(255,255,255,0.4)">Passa il turno: </span><strong style="color:#C8A44A">${m.winner}</strong><span style="color:rgba(255,255,255,0.3)">${viaText}</span></div>`;
  } else if (ready && isDraw) {
    statusLine = `<div class="ko-winner-line mt-2 text-center text-xs" style="color:rgba(200,164,74,0.7)">Seleziona chi avanza ai supplementari</div>`;
  } else if (ready) {
    statusLine = `<div class="ko-winner-line mt-2 text-center text-xs text-white/20">Inserisci il risultato</div>`;
  }

  // Score display (locked or not)
  const scoreCell = (ready && !koLocked) ? `
        <div class="flex items-center gap-1.5 flex-shrink-0">
          <input class="ko-score-inp" type="text" inputmode="numeric" pattern="[0-9]" maxlength="1" placeholder="0"
            data-koid="${m.id}" data-side="home" value="${predH}"
            style="width:42px;height:42px;font-size:1.3rem;font-family:'Bebas Neue',cursive;text-align:center;padding:0;border-radius:10px;background:rgba(255,255,255,0.06);border:2px solid ${predH!==''?'rgba(200,164,74,0.5)':'rgba(255,255,255,0.1)'};color:${predH!==''?'#C8A44A':'rgba(255,255,255,0.4)'};outline:none">
          <span class="text-white/20 font-display">–</span>
          <input class="ko-score-inp" type="text" inputmode="numeric" pattern="[0-9]" maxlength="1" placeholder="0"
            data-koid="${m.id}" data-side="away" value="${predA}"
            style="width:42px;height:42px;font-size:1.3rem;font-family:'Bebas Neue',cursive;text-align:center;padding:0;border-radius:10px;background:rgba(255,255,255,0.06);border:2px solid ${predA!==''?'rgba(200,164,74,0.5)':'rgba(255,255,255,0.1)'};color:${predA!==''?'#C8A44A':'rgba(255,255,255,0.4)'};outline:none">
        </div>`
    : `<div class="flex-shrink-0 font-display text-xl ${pred.score?'text-gold':'text-white/20'}" style="min-width:60px;text-align:center">${pred.score?pred.score.replace('-',' – '):'–'}</div>`;

  return `
  <div class="match-card glass rounded-xl p-4 ${m.winner?'predicted':''}" data-koid="${m.id}">
    <div class="flex items-center justify-between mb-2">
      <span class="text-white/30 text-xs uppercase tracking-wider">${m.round||''}</span>
      <span class="text-white/25 text-xs">${m.date} · ${m.time}</span>
    </div>
    <div class="flex items-center gap-3">
      ${teamBox(m.home, m.homePlaceholder, 'left')}
      ${scoreCell}
      ${teamBox(m.away, m.awayPlaceholder, 'right')}
    </div>
    ${advBlock}
    ${statusLine}
  </div>`;
}

function html_submitBox(group,submitted,predCnt,total) {
  if (submitted) return `<div class="mt-5 p-5 rounded-xl text-center" style="background:rgba(34,197,94,0.07);border:1px solid rgba(34,197,94,0.2)"><i class="fa-solid fa-circle-check text-emerald-400 text-2xl mb-2 block"></i><div class="text-emerald-400 font-bold">Pronostico Girone ${group} inviato e bloccato</div><div class="text-white/35 text-xs mt-1">Non è più possibile modificare questi pronostici</div></div>`;
  if (S.deadlinePassed) return `<div class="mt-5 p-5 rounded-xl text-center" style="background:rgba(232,25,44,0.07);border:1px solid rgba(232,25,44,0.2)"><i class="fa-solid fa-lock text-red-400 text-2xl mb-2 block"></i><div class="text-red-400 font-bold">Termine scaduto</div></div>`;
  const can=predCnt===total;
  return `
  <div class="mt-5 p-5 rounded-xl" style="background:rgba(13,33,71,0.6);border:1px solid rgba(200,164,74,0.12)">
    ${!can?`<div class="pred-count-warn flex items-start gap-2 mb-3 p-3 rounded-lg" style="background:rgba(232,25,44,0.08);border:1px solid rgba(232,25,44,0.15)"><i class="fa-solid fa-triangle-exclamation text-red-400 mt-0.5 flex-shrink-0"></i><span class="text-red-300 text-xs">Completa tutti i ${total} pronostici per inviare.</span></div>`:''}
    <div class="flex items-start gap-2 p-3 rounded-lg mb-4" style="background:rgba(200,164,74,0.06);border:1px solid rgba(200,164,74,0.12)">
      <i class="fa-solid fa-circle-exclamation text-gold/60 mt-0.5 flex-shrink-0"></i>
      <span class="text-white/45 text-xs"><strong class="text-yellow-300">Attenzione:</strong> Una volta inviato il Girone <strong class="text-white/70">${group}</strong>, non sarà più modificabile.</span>
    </div>
    <div class="flex justify-center">
      <button id="btn-submit-grp" class="btn-submit-group flex items-center gap-2" ${!can?'disabled':''}>
        <i class="fa-solid fa-paper-plane"></i> Invia Pronostico Girone ${group}
      </button>
    </div>
  </div>`;
}

function bind_wc() {
  bind_topbar_events();
  document.querySelectorAll('.view-tab').forEach(b=>b.addEventListener('click',()=>{S.wcTab=b.dataset.tab;render();}));
  document.querySelectorAll('.grp-btn').forEach(b=>b.addEventListener('click',()=>{S.wcGroup=b.dataset.grp;render();}));
  document.querySelectorAll('.ko-tab-btn').forEach(b=>b.addEventListener('click',()=>{S.wcKoRound=+b.dataset.ko;render();}));
  const sub=document.getElementById('btn-submit-grp');
  if (sub) {
    sub.addEventListener('click', async () => {
      if (!confirm(`⚠️ ATTENZIONE\n\nInvio definitivo pronostici Girone ${S.wcGroup}.\n\nNon potrai più modificarli. Confermi?`)) return;
      sub.innerHTML='<i class="fa-solid fa-spinner spinner mr-2"></i>Invio…'; sub.disabled=true;
      const res=await api('/api/submit_group',{method:'POST',body:lgBody({group:S.wcGroup})});
      if (res.error){alert(res.error);sub.innerHTML=`<i class="fa-solid fa-paper-plane mr-2"></i>Invia Pronostico Girone ${S.wcGroup}`;sub.disabled=false;return;}
      S.submitted=res.submitted; await loadLeagueData(); render();
    });
  }
  bindPredEvents();
  bindKoPredEvents();
  renderDeadlineBar();
}

// ── Knockout score input handlers ────────────────────────────────────────────

// ── Final ↔ bracket consistency ──────────────────────────────────────────────
// Reads the bracket's computed final (wc-final) and returns {home, away, winner, score}
function bracketFinal() {
  if (typeof computeBracket !== 'function') return null;
  const { rounds } = computeBracket(S.predictions, S.koPred);
  const last = rounds[rounds.length-1];
  if (!last) return null;
  const fm = last.matches.find(m => m.id === 'wc-final');
  if (!fm || !fm.home || !fm.away) return null;
  return { home: fm.home, away: fm.away, winner: fm.winner || '', score: fm.score || '' };
}

// If the bracket final is determined, push it into PRONOSTICO FINALE (FINAL_PRED).
// force=true also overwrites an existing different final.
async function syncFinalFromBracket(force=false) {
  const bf = bracketFinal();
  if (!bf || !bf.winner) return;
  const cur = S.finalPred || {};
  const sameTeams = cur.home && cur.away &&
    ((cur.home===bf.home && cur.away===bf.away) || (cur.home===bf.away && cur.away===bf.home));
  // If nothing set yet, or forcing, or teams differ → adopt bracket final
  if (force || !cur.home || !cur.away || !sameTeams || cur.winner!==bf.winner || cur.score!==bf.score) {
    const body = lgBody({ home: bf.home, away: bf.away, winner: bf.winner, score: bf.score });
    try {
      const res = await api('/api/final_pred', {method:'POST', body});
      if (res.ok || res.error===undefined) S.finalPred = body;
    } catch(e) {}
  }
}

// Check that a manually-entered PRONOSTICO FINALE matches the bracket final.
// Returns {ok, msg}. Used both in the popup and before KO submit.
function finalConsistencyCheck(candidate) {
  const bf = bracketFinal();
  // No bracket final yet → nothing to enforce
  if (!bf || !bf.winner) return { ok:true };
  const c = candidate || S.finalPred || {};
  if (!c.home || !c.away) return { ok:true };
  const sameTeams = (c.home===bf.home && c.away===bf.away) || (c.home===bf.away && c.away===bf.home);
  if (!sameTeams) {
    return { ok:false, msg:`Il pronostico finale deve coincidere con il tabellone:\n\nDal tuo tabellone la finale è ${bf.home} vs ${bf.away} (vince ${bf.winner}${bf.score?', '+bf.score:''}).\n\nModifica il tabellone o allinea il pronostico finale.` };
  }
  if (bf.score && c.score && c.score!==bf.score) {
    return { ok:false, msg:`Il risultato della finale non coincide con il tabellone (${bf.score}). Allinea i due pronostici.` };
  }
  if (c.winner && c.winner!==bf.winner) {
    return { ok:false, msg:`Il vincitore della finale non coincide con il tabellone (${bf.winner}). Allinea i due pronostici.` };
  }
  return { ok:true };
}

function bindKoPredEvents() {
  const timers = {};
  const inFlight = {};

  async function saveKo(koid) {
    const hI = document.querySelector(`.ko-score-inp[data-koid="${koid}"][data-side="home"]`);
    const aI = document.querySelector(`.ko-score-inp[data-koid="${koid}"][data-side="away"]`);
    if (!hI || !aI) return;
    if (hI.value === '' || aI.value === '') return;
    const h = parseInt(hI.value), a = parseInt(aI.value);
    if (isNaN(h) || isNaN(a)) return;

    const score = `${h}-${a}`;
    // Keep any previously chosen advancement (only relevant on a draw)
    const prevAdv = (S.koPred[koid] || {}).adv || '';
    if (inFlight[koid]) return;
    inFlight[koid] = true;
    try {
      const res = await api('/api/ko_prediction', {method:'POST', body:lgBody({matchId:koid, score, adv: prevAdv})});
      if (res.ok) {
        S.koPred = res.ko_pred || {};
        await syncFinalFromBracket();
        render();
      }
    } catch(e) { /* keep silent, will retry on blur */ }
    finally { inFlight[koid] = false; }
  }

  // Save advancement choice on a drawn KO match
  async function saveAdv(koid, advTeam) {
    const cur = S.koPred[koid] || {};
    if (!cur.score) return;
    try {
      const res = await api('/api/ko_prediction', {method:'POST', body:lgBody({matchId:koid, score:cur.score, adv:advTeam})});
      if (res.ok) {
        S.koPred = res.ko_pred || {};
        await syncFinalFromBracket();
        render();
      }
    } catch(e) {}
  }

  document.querySelectorAll('.ko-score-inp').forEach(inp => {
    inp.addEventListener('input', (e) => {
      let v = e.target.value.replace(/[^0-9]/g,'');
      if (v.length>1) v = v.slice(-1);
      e.target.value = v;
      const koid = inp.dataset.koid;
      const hI = document.querySelector(`.ko-score-inp[data-koid="${koid}"][data-side="home"]`);
      const aI = document.querySelector(`.ko-score-inp[data-koid="${koid}"][data-side="away"]`);
      if (v!=='' && inp.dataset.side==='home' && aI && aI.value==='') aI.focus();
      clearTimeout(timers[koid]);
      if (hI && aI && hI.value!=='' && aI.value!=='') saveKo(koid);
      else timers[koid] = setTimeout(()=>saveKo(koid), 600);
    });
    inp.addEventListener('keydown', (e) => {
      const allowed=['Backspace','Delete','ArrowLeft','ArrowRight','Tab'];
      if (allowed.includes(e.key)) return;
      if (e.key==='Enter'){ e.preventDefault(); clearTimeout(timers[inp.dataset.koid]); saveKo(inp.dataset.koid); inp.blur(); return; }
      if (!/^[0-9]$/.test(e.key)) e.preventDefault();
    });
    inp.addEventListener('blur', ()=>{ clearTimeout(timers[inp.dataset.koid]); saveKo(inp.dataset.koid); });
  });

  // Advancement buttons (supplementari/rigori)
  document.querySelectorAll('.ko-adv-btn').forEach(btn => {
    btn.addEventListener('click', () => saveAdv(btn.dataset.koid, btn.dataset.adv));
  });

  // Submit-KO button (locks the whole knockout phase)
  const subKo = document.getElementById('btn-submit-ko');
  if (subKo) {
    subKo.addEventListener('click', async () => {
      const prog = countKoProgress(S.predictions, S.koPred);
      if (prog.filled < prog.available) {
        alert('Completa tutti gli scontri del tabellone prima di inviare.');
        return;
      }
      // Final consistency: bracket final must match "PRONOSTICO FINALE" if set
      const chk = finalConsistencyCheck();
      if (!chk.ok) { alert(chk.msg); return; }
      if (!confirm('⚠️ ATTENZIONE\n\nInvio definitivo del tabellone ad eliminazione.\n\nNon potrai più modificare nessun pronostico della fase finale. Confermi?')) return;
      subKo.disabled = true; subKo.innerHTML = '<i class="fa-solid fa-spinner spinner mr-2"></i>Invio…';
      // Push bracket final into PRONOSTICO FINALE before locking
      await syncFinalFromBracket(true);
      const res = await api('/api/submit_ko', {method:'POST', body:lgBody({})});
      if (res.error) { alert(res.error); subKo.disabled=false; return; }
      S.koSubmitted = true;
      render();
    });
  }
}

// ═══════════════════════════════════════════════════════
// MATCH CARD
// ═══════════════════════════════════════════════════════
function html_matchCard(match, locked=false) {
  const {id,homeTeam,awayTeam,date,time,venue,stats,round}=match;
  const pred=S.predictions[id]||{}, result=S.results[id];
  const hf=flagUrl(homeTeam.name), af=flagUrl(awayTeam.name);
  // Parse stored score "2-1" -> home=2, away=1
  let predH='', predA='';
  if (pred.score) { const p=pred.score.split('-'); predH=p[0]||''; predA=p[1]||''; }

  let badge='';
  if (result && (pred.score||pred.pick)) {
    const scoreOk = pred.score && pred.score===result.score;
    const pickOk  = pred.pick && pred.pick===result.pick;
    if (scoreOk)     badge=`<div class="badge-exact rounded-lg px-3 py-2 mt-3 flex items-center justify-center gap-2 text-xs font-bold"><i class="fa-solid fa-star"></i> Risultato esatto! +3 punti</div>`;
    else if (pickOk) badge=`<div class="badge-correct rounded-lg px-3 py-2 mt-3 flex items-center justify-center gap-2 text-xs font-bold"><i class="fa-solid fa-check"></i> Esito corretto! +1 punto</div>`;
    else             badge=`<div class="badge-wrong rounded-lg px-3 py-2 mt-3 flex items-center justify-center gap-2 text-xs font-bold"><i class="fa-solid fa-xmark"></i> Pronostico errato — 0 punti</div>`;
  }

  const hasPred = pred.score || pred.pick;
  const scoreDisplay = pred.score ? pred.score.replace('-',' – ') : '';

  return `
  <div class="match-card${hasPred?' predicted':''}${locked?' locked':''}">
    <!-- Header -->
    <div class="flex items-center justify-between mb-3">
      <span class="text-gold text-xs font-bold uppercase tracking-wider">${round}</span>
      <div class="text-right">
        <div class="text-white/35 text-xs"><i class="fa-regular fa-calendar mr-1"></i>${date} · ${time}</div>
        <div class="text-white/18 text-xs hide-mobile mt-0.5"><i class="fa-solid fa-location-dot mr-1"></i>${venue.length>32?venue.slice(0,32)+'…':venue}</div>
      </div>
    </div>

    <!-- Teams -->
    <div class="grid items-center gap-3 mb-4" style="grid-template-columns:1fr auto 1fr">
      <div class="flex flex-col items-end gap-1.5">
        <div class="flex items-center gap-2 flex-row-reverse">
          ${flagImg(homeTeam.name,22)}
          <span class="text-white font-bold text-sm text-right leading-tight">${homeTeam.name}</span>
        </div>
      </div>
      <div class="flex flex-col items-center gap-1 px-2">
        ${result
          ? `<span class="font-display text-2xl text-gold tracking-wider">${result.score||'?–?'}</span><span class="text-white/25 text-xs">Finale</span>`
          : `<span class="text-white/20 text-sm font-bold tracking-widest">VS</span>`}
      </div>
      <div class="flex flex-col items-start gap-1.5">
        <div class="flex items-center gap-2">
          ${flagImg(awayTeam.name,22)}
          <span class="text-white font-bold text-sm leading-tight">${awayTeam.name}</span>
        </div>
      </div>
    </div>

    <!-- Score input (hidden if locked) -->
    ${!locked ? `
    <div class="mb-4">
      <div class="text-center text-white/25 text-xs uppercase tracking-widest mb-3" style="letter-spacing:0.12em">
        <i class="fa-solid fa-bullseye mr-1.5" style="color:rgba(200,164,74,0.6)"></i>Risultato Esatto
      </div>
      <!-- Score input widget -->
      <div class="flex items-center justify-center gap-2 mx-auto" style="max-width:260px">
        <!-- Home team -->
        <div class="flex flex-col items-center gap-1.5 flex-1">
          ${flagImg(homeTeam.name,22)}
          <div class="relative">
            <input class="score-inp" type="text" inputmode="numeric" pattern="[0-9]" maxlength="1" placeholder="0"
              data-mid="${id}" data-side="home" value="${predH}"
              style="width:64px;height:56px;font-size:1.8rem;font-family:'Bebas Neue',cursive;
                     text-align:center;padding:0;border-radius:12px;
                     background:rgba(255,255,255,0.06);
                     border:2px solid ${predH!==''?'rgba(200,164,74,0.5)':'rgba(255,255,255,0.1)'};
                     color:${predH!==''?'#C8A44A':'rgba(255,255,255,0.4)'};
                     outline:none">
          </div>
        </div>
        <!-- Separator -->
        <div class="flex flex-col items-end gap-1.5">
          <span style="height:24px;display:block"></span>
          <div class="flex flex-col items-center justify-center" style="height:56px">
            <span class="font-display text-3xl" style="color:rgba(255,255,255,0.2);line-height:1">–</span>
          </div>
        </div>
        <!-- Away team -->
        <div class="flex flex-col items-center gap-1.5 flex-1">
          ${flagImg(awayTeam.name,22)}
          <div class="relative">
            <input class="score-inp" type="text" inputmode="numeric" pattern="[0-9]" maxlength="1" placeholder="0"
              data-mid="${id}" data-side="away" value="${predA}"
              style="width:64px;height:56px;font-size:1.8rem;font-family:'Bebas Neue',cursive;
                     text-align:center;padding:0;border-radius:12px;
                     background:rgba(255,255,255,0.06);
                     border:2px solid ${predA!==''?'rgba(200,164,74,0.5)':'rgba(255,255,255,0.1)'};
                     color:${predA!==''?'#C8A44A':'rgba(255,255,255,0.4)'};
                     outline:none">
          </div>
        </div>
      </div>
      <!-- Points hint -->
      <div class="flex items-center justify-center gap-3 mt-2.5">
        <span class="text-xs" style="color:rgba(52,211,153,0.7)"><i class="fa-solid fa-star mr-1"></i>Esatto: <strong>+3pt</strong></span>
        <span style="color:rgba(255,255,255,0.15)">·</span>
        <span class="text-xs" style="color:rgba(255,255,255,0.35)">Solo esito: <strong>+1pt</strong></span>
      </div>
    </div>` : `
    ${hasPred ? `
    <div class="flex items-center justify-center gap-3 mb-3 py-2 rounded-lg" style="background:rgba(200,164,74,0.07);border:1px solid rgba(200,164,74,0.15)">
      <span class="text-white/40 text-xs uppercase tracking-wider">Il tuo pronostico:</span>
      <span class="font-display text-xl text-gold">${scoreDisplay||pred.pick||'—'}</span>
    </div>` : ''}` }

    ${badge}
  </div>`;
}

function bindPredEvents() {
  // Pick is derived from score: home>away→1, home<away→2, equal→X
  // Debounced 800ms after last keystroke, immediate on blur/Enter

  const saveTimers = {};
  const inFlight = {};   // prevent duplicate concurrent saves per match
  const lastSaved = {};  // skip save if score unchanged

  // After a successful save, update the submit-button counter live
  function refreshSubmitBtn() {
    const grp = S.wcGroup;
    const btn = document.getElementById('btn-submit-grp');

    // Count predictions for this group that have a valid score
    const grpMatches = WC_ALL_MATCHES.filter(m => m.group === grp);
    const total = grpMatches.length;
    const cnt = grpMatches.filter(m => {
      const p = S.predictions[m.id];
      return p && p.score && p.score.includes('-');
    }).length;
    const can = cnt === total;

    // Update counter display
    const counterEl = document.querySelector('.pred-grp-counter');
    if (counterEl) {
      counterEl.textContent = `${cnt}/${total}`;
      counterEl.style.color = can ? '#22c55e' : '#f59e0b';
    }

    // Update warning visibility
    const warn = document.querySelector('.pred-count-warn');
    if (warn) {
      warn.style.display = can ? 'none' : '';
      const span = warn.querySelector('span');
      if (span) span.textContent = `Completa tutti i ${total} pronostici per inviare (${cnt}/${total}).`;
    }

    // Update button state
    if (btn) {
      btn.disabled = !can;
      btn.style.opacity = can ? '1' : '0.45';
      btn.style.cursor = can ? 'pointer' : 'not-allowed';
    }
  }

  function makeSaver(inp) {
    return async function doSave() {
      const mid = inp.dataset.mid;
      const hI  = document.querySelector(`.score-inp[data-mid="${mid}"][data-side="home"]`);
      const aI  = document.querySelector(`.score-inp[data-mid="${mid}"][data-side="away"]`);
      if (!hI || !aI) return;
      if (hI.value === '' || aI.value === '') return;

      const h = parseInt(hI.value);
      const a = parseInt(aI.value);
      if (isNaN(h) || isNaN(a) || h < 0 || a < 0) return;

      const score = `${h}-${a}`;
      const pick  = h > a ? '1' : h < a ? '2' : 'X';

      // Skip if identical to last successful save
      if (lastSaved[mid] === score) { refreshSubmitBtn(); return; }
      // Skip if a save for this match is already running
      if (inFlight[mid]) return;
      inFlight[mid] = true;

      // Spinner feedback
      const card = hI.closest('.match-card');
      let infoEl = card?.querySelector('.pred-info-line');
      if (card && !infoEl) {
        infoEl = document.createElement('div');
        infoEl.className = 'pred-info-line mt-2 text-center text-xs';
        card.appendChild(infoEl);
      }
      if (infoEl) infoEl.innerHTML =
        `<i class="fa-solid fa-spinner spinner mr-1" style="color:rgba(255,255,255,0.25)"></i>`
        + `<span style="color:rgba(255,255,255,0.25)">Salvataggio…</span>`;

      try {
        const res = await api('/api/predictions', {method:'POST', body:lgBody({matchId:mid, pick, score})});
        if (res.ok) {
          S.predictions = res.predictions;
          lastSaved[mid] = score;

          // Style the inputs as confirmed
          [hI, aI].forEach(el => {
            el.style.borderColor = 'rgba(200,164,74,0.6)';
            el.style.color = '#C8A44A';
            el.style.background = 'rgba(200,164,74,0.06)';
          });
          if (card) card.classList.add('predicted');

          // Success message
          if (infoEl) {
            const pickColor = pick==='1'?'#93c5fd' : pick==='X'?'#C8A44A' : '#fca5a5';
            const pickLabel = pick==='1'?'Casa' : pick==='2'?'Ospite' : 'Pareggio';
            infoEl.innerHTML =
              `<i class="fa-solid fa-check-circle mr-1" style="color:#22c55e"></i>`
              + `<span style="color:rgba(255,255,255,0.4)">Salvato </span>`
              + `<strong style="color:${pickColor}">${pick} (${pickLabel})</strong>`
              + `<span style="color:rgba(255,255,255,0.25)"> · </span>`
              + `<strong style="color:#C8A44A">${h}–${a}</strong>`;
          }

          // Re-enable submit button if all 6 preds are now filled
          refreshSubmitBtn();
          // Live-update the group standings table (even before submit)
          refreshStanding();

        } else {
          [hI, aI].forEach(el => { el.style.borderColor = 'rgba(239,68,68,0.5)'; });
          if (infoEl) infoEl.innerHTML =
            `<i class="fa-solid fa-triangle-exclamation mr-1" style="color:#ef4444"></i>`
            + `<span style="color:#fca5a5">${res.error || 'Errore salvataggio'}</span>`;
        }
      } catch(err) {
        if (infoEl) infoEl.innerHTML =
          `<i class="fa-solid fa-wifi mr-1" style="color:#ef4444"></i>`
          + `<span style="color:#fca5a5">Errore di rete — riprova</span>`;
      } finally {
        inFlight[mid] = false;
      }
    };
  }

  document.querySelectorAll('.score-inp').forEach(inp => {
    const save = makeSaver(inp);

    // Allow only single digit 0-9
    inp.addEventListener('input', (e) => {
      let v = e.target.value.replace(/[^0-9]/g, '');
      if (v.length > 1) v = v.slice(-1);
      e.target.value = v;

      const mid  = inp.dataset.mid;
      const hI   = document.querySelector(`.score-inp[data-mid="${mid}"][data-side="home"]`);
      const aI   = document.querySelector(`.score-inp[data-mid="${mid}"][data-side="away"]`);

      // Auto-advance: home filled → focus away (only if away empty)
      if (v !== '' && inp.dataset.side === 'home' && aI && aI.value === '') {
        aI.focus();
      }

      // If BOTH fields are now filled → save immediately (no wait)
      const timerKey = mid;
      clearTimeout(saveTimers[timerKey]);
      if (hI && aI && hI.value !== '' && aI.value !== '') {
        save();  // both present → save now
      } else {
        // otherwise debounce in case user is still typing
        saveTimers[timerKey] = setTimeout(save, 600);
      }
    });

    inp.addEventListener('keydown', (e) => {
      const allowed = ['Backspace','Delete','ArrowLeft','ArrowRight','Tab'];
      if (allowed.includes(e.key)) return;
      if (e.key === 'Enter') {
        e.preventDefault();
        clearTimeout(saveTimers[inp.dataset.mid]);
        save();
        inp.blur();
        return;
      }
      if (!/^[0-9]$/.test(e.key)) e.preventDefault();
    });

    inp.addEventListener('blur', () => {
      clearTimeout(saveTimers[inp.dataset.mid]);
      save();
    });
  });

  // Initial sync of submit button on page load
  refreshSubmitBtn();
}

// ── Toast notification ────────────────────────────────────

// ═══════════════════════════════════════════════════════
// AMICHEVOLI PRE-MONDIALE (test live)
// ═══════════════════════════════════════════════════════
function friendlyFlagImg(name, h=22){ return flagImg(name, h); }

function html_friendlies() {
  const matches = (typeof FRIENDLY_MATCHES!=='undefined') ? FRIENDLY_MATCHES : [];
  const live = S.liveState || {};
  const liveMatches = live.matches || {};
  const locked = live.locked || {};

  const rows = matches.map(m => {
    const p = S.predictions[m.id] || {};
    const info = liveMatches[m.id] || {};
    const isLocked = locked[m.id];
    const result = S.results[m.id];
    const statusBadge = info.status==='IN_PLAY'
      ? `<span class="text-xs font-bold" style="color:#22c55e">● LIVE ${info.minute?info.minute+"'":''}</span>`
      : info.status==='FINISHED'
      ? `<span class="text-xs font-bold text-white/40">FINITA</span>`
      : `<span class="text-xs text-white/30">${m.date} · ${m.time}</span>`;
    const liveScore = (info.score) ? info.score.replace('-',' – ') : null;
    // Badge esito pronostico (come nel Mondiale): confronta pronostico e risultato reale
    let frBadge = '';
    if (result && (p.score || p.pick)) {
      const scoreOk = p.score && p.score === result.score;
      const pickOk  = p.pick && p.pick === result.pick;
      if (scoreOk)     frBadge = `<div class="badge-exact rounded-lg px-3 py-2 mt-3 flex items-center justify-center gap-2 text-xs font-bold"><i class="fa-solid fa-star"></i> Risultato esatto! +3 punti</div>`;
      else if (pickOk) frBadge = `<div class="badge-correct rounded-lg px-3 py-2 mt-3 flex items-center justify-center gap-2 text-xs font-bold"><i class="fa-solid fa-check"></i> Esito corretto! +1 punto</div>`;
      else             frBadge = `<div class="badge-wrong rounded-lg px-3 py-2 mt-3 flex items-center justify-center gap-2 text-xs font-bold"><i class="fa-solid fa-xmark"></i> Pronostico errato — 0 punti</div>`;
    }

    return `
    <div class="match-card glass rounded-xl p-4 mb-3" data-mid="${m.id}">
      <div class="flex items-center justify-between mb-3">
        ${statusBadge}
        ${isLocked?'<span class="text-xs text-white/30"><i class="fa-solid fa-lock mr-1"></i>Pronostico chiuso</span>':'<span class="text-xs" style="color:rgba(34,197,94,0.7)">Pronostica</span>'}
      </div>
      <div class="flex items-center justify-center gap-3">
        <div class="flex items-center gap-2 flex-1 justify-end">
          <span class="text-white text-sm font-semibold text-right">${m.home}</span>
          ${friendlyFlagImg(m.home,22)}
        </div>
        ${isLocked ? `
          <div class="flex items-center gap-2 px-2">
            <span class="font-display text-2xl text-gold">${(p.score||'–-–').split('-')[0]||'–'}</span>
            <span class="text-white/20">:</span>
            <span class="font-display text-2xl text-gold">${(p.score||'–-–').split('-')[1]||'–'}</span>
          </div>` : `
          <div class="flex items-center gap-2 px-2">
            <input class="fr-score-h" data-mid="${m.id}" type="text" inputmode="numeric" maxlength="1" value="${(p.score||'').split('-')[0]||''}" placeholder="0"
              style="width:46px;height:46px;font-size:1.4rem;font-family:'Bebas Neue',cursive;text-align:center;border-radius:10px;background:rgba(255,255,255,0.06);border:2px solid rgba(255,255,255,0.1);color:#C8A44A;outline:none">
            <span class="text-white/20">:</span>
            <input class="fr-score-a" data-mid="${m.id}" type="text" inputmode="numeric" maxlength="1" value="${(p.score||'').split('-')[1]||''}" placeholder="0"
              style="width:46px;height:46px;font-size:1.4rem;font-family:'Bebas Neue',cursive;text-align:center;border-radius:10px;background:rgba(255,255,255,0.06);border:2px solid rgba(255,255,255,0.1);color:#C8A44A;outline:none">
          </div>`}
        <div class="flex items-center gap-2 flex-1">
          ${friendlyFlagImg(m.away,22)}
          <span class="text-white text-sm font-semibold">${m.away}</span>
        </div>
      </div>
      ${liveScore?`<div class="fr-live-line text-center mt-3 pt-3" style="border-top:1px solid rgba(255,255,255,0.06)"><span class="text-white/40 text-xs">Risultato ${info.status==='FINISHED'?'finale':'live'}: </span><span class="font-display text-lg" style="color:#22c55e">${liveScore}</span></div>`:''}
      ${frBadge}
      <div class="fr-info-line mt-2 text-center text-xs"></div>
    </div>`;
  }).join('');

  return `
  ${html_topbar({back:true, title:'Amichevoli', subtitle:'Test live · pronostici e classifica'})}
  <main class="px-4 py-6 max-w-2xl mx-auto">
    <div class="glass rounded-2xl p-4 mb-5" style="border-color:rgba(34,197,94,0.18)">
      <div class="flex items-center gap-2 text-sm text-white/60">
        <i class="fa-solid fa-circle-info" style="color:#22c55e"></i>
        <span>Pronostica il risultato esatto: <strong class="text-gold">+3pt</strong> se indovini il punteggio, <strong class="text-gold">+1pt</strong> solo l'esito. I risultati arrivano in automatico.</span>
      </div>
    </div>
    ${rows || '<p class="text-white/40 text-center py-8">Nessuna amichevole disponibile.</p>'}

    <!-- Classifica amichevoli -->
    <div class="glass rounded-2xl p-5 mt-6">
      <div class="font-display text-lg text-white tracking-wide mb-4"><i class="fa-solid fa-ranking-star text-gold mr-2"></i>CLASSIFICA AMICHEVOLI</div>
      <div id="fr-leaderboard"><p class="text-white/30 text-sm">Caricamento…</p></div>
    </div>
  </main>`;
}

function bind_friendlies() {
  bind_topbar_events();

  // Salvataggio pronostico (su input dei due score)
  const saveFr = async (mid) => {
    const card = document.querySelector(`.match-card[data-mid="${mid}"]`);
    if (!card) return;
    const hI = card.querySelector('.fr-score-h');
    const aI = card.querySelector('.fr-score-a');
    if (!hI || !aI) return;
    const h = hI.value.trim(), a = aI.value.trim();
    if (h==='' || a==='') return;
    const score = `${h}-${a}`;
    const pick = (+h > +a) ? '1' : (+a > +h) ? '2' : 'X';
    const info = card.querySelector('.fr-info-line');
    if (info) info.innerHTML = `<i class="fa-solid fa-spinner spinner mr-1" style="color:rgba(255,255,255,0.25)"></i><span style="color:rgba(255,255,255,0.25)">Salvataggio…</span>`;
    try {
      const res = await api('/api/predictions', {method:'POST', body:lgBody({matchId:mid, pick, score})});
      if (res.ok) {
        S.predictions = res.predictions;
        [hI,aI].forEach(el=>{ el.style.borderColor='rgba(200,164,74,0.6)'; el.style.color='#C8A44A'; el.style.background='rgba(200,164,74,0.06)'; });
        if (info) info.innerHTML = `<i class="fa-solid fa-check mr-1" style="color:#22c55e"></i><span style="color:#22c55e">Salvato</span>`;
      } else if (info) {
        info.innerHTML = `<span style="color:#fca5a5">${res.error||'Errore'}</span>`;
      }
    } catch(e) {
      if (info) info.innerHTML = `<span style="color:#fca5a5">Errore di rete</span>`;
    }
  };

  let frTimer = null;
  document.querySelectorAll('.fr-score-h, .fr-score-a').forEach(inp => {
    inp.addEventListener('input', (e) => {
      e.target.value = e.target.value.replace(/[^0-9]/g,'').slice(0,1);
      const mid = e.target.dataset.mid;
      clearTimeout(frTimer);
      frTimer = setTimeout(()=>saveFr(mid), 600);
    });
  });

  // Carica la classifica amichevoli
  refreshFriendlyBoard();

  // Avvia il polling live per vedere i risultati aggiornarsi
  startFriendlyLivePolling();
}

async function refreshFriendlyBoard() {
  const el = document.getElementById('fr-leaderboard');
  if (!el) return;
  try {
    const board = await api('/api/friendly_leaderboard');
    if (!board || !board.length) {
      el.innerHTML = '<p class="text-white/30 text-sm">Ancora nessun punteggio. I punti compaiono quando le partite finiscono.</p>';
      return;
    }
    el.innerHTML = board.map((r,i)=>`
      <div class="flex items-center gap-3 py-2 ${i<board.length-1?'border-b border-white/5':''}">
        <span class="font-display text-lg ${i===0?'text-gold':'text-white/40'}" style="width:24px">${i+1}</span>
        <span class="text-xl">${r.avatar||'⚽'}</span>
        <span class="text-white text-sm flex-1">${r.nickname}</span>
        <span class="text-white/40 text-xs mr-3">✓${r.correct} ★${r.exact}</span>
        <span class="font-display text-lg text-gold">${r.points}<span class="text-xs text-white/40 ml-1">pt</span></span>
      </div>`).join('');
  } catch(e) {
    el.innerHTML = '<p class="text-white/30 text-sm">Impossibile caricare la classifica.</p>';
  }
}

async function pollFriendlyLive() {
  try {
    const live = await api('/api/live');
    S.liveState = live;
    // se ci sono risultati nuovi, ricarica i dati utente (RESULTS) e ridisegna
    const r = await api('/api/results');
    S.results = r || {};
    if (S.view === 'friendlies') {
      // ridisegna solo se siamo ancora nella pagina
      const root = document.getElementById('app');
      root.innerHTML = html_friendlies();
      bind_friendlies();
    }
  } catch(e) { /* silenzioso */ }
}

function startFriendlyLivePolling() {
  if (S._frLiveTimer) clearInterval(S._frLiveTimer);
  // primo fetch immediato (per stato + eventuali risultati), poi ogni 30s
  pollFriendlyLiveLight();
  S._frLiveTimer = setInterval(()=>{
    if (S.view!=='friendlies'){ clearInterval(S._frLiveTimer); S._frLiveTimer=null; return; }
    pollFriendlyLiveLight();
  }, 30000);
}

// Versione "leggera": aggiorna stato e classifica senza ridisegnare tutto
// (per non cancellare ciò che l'utente sta digitando).
async function pollFriendlyLiveLight() {
  try {
    const live = await api('/api/live');
    S.liveState = live;
    const r = await api('/api/results');
    S.results = r || {};
    // aggiorna i badge live/risultati di ogni card senza toccare gli input
    (FRIENDLY_MATCHES||[]).forEach(m=>{
      const info = (live.matches||{})[m.id] || {};
      const card = document.querySelector(`.match-card[data-mid="${m.id}"]`);
      if (!card) return;
      // aggiorna riga risultato live
      let line = card.querySelector('.fr-live-line');
      if (info.score) {
        const txt = `<span class="text-white/40 text-xs">Risultato ${info.status==='FINISHED'?'finale':'live'}: </span><span class="font-display text-lg" style="color:#22c55e">${info.score.replace('-',' – ')}</span>`;
        if (!line) {
          line = document.createElement('div');
          line.className = 'fr-live-line text-center mt-3 pt-3';
          line.style.borderTop = '1px solid rgba(255,255,255,0.06)';
          card.appendChild(line);
        }
        line.innerHTML = txt;
      }
    });
    refreshFriendlyBoard();
  } catch(e) { /* silenzioso */ }
}

function showToast(msg, type='success') {
  const existing = document.getElementById('app-toast');
  if (existing) existing.remove();
  const colors = type==='success'
    ? {bg:'rgba(34,197,94,0.95)', icon:'fa-circle-check'}
    : {bg:'rgba(232,25,44,0.95)', icon:'fa-circle-exclamation'};
  const t = document.createElement('div');
  t.id = 'app-toast';
  t.style.cssText = `position:fixed;top:80px;left:50%;transform:translateX(-50%) translateY(-20px);
    z-index:9999;padding:12px 22px;border-radius:12px;background:${colors.bg};
    color:#fff;font-weight:600;font-size:14px;box-shadow:0 8px 32px rgba(0,0,0,0.4);
    opacity:0;transition:all 0.35s cubic-bezier(0.2,0.8,0.2,1);display:flex;align-items:center;gap:10px;
    max-width:90vw;backdrop-filter:blur(8px)`;
  t.innerHTML = `<i class="fa-solid ${colors.icon}"></i><span>${msg}</span>`;
  document.body.appendChild(t);
  requestAnimationFrame(() => { t.style.opacity='1'; t.style.transform='translateX(-50%) translateY(0)'; });
  setTimeout(() => {
    t.style.opacity='0'; t.style.transform='translateX(-50%) translateY(-20px)';
    setTimeout(() => t.remove(), 400);
  }, 3200);
}

boot();

// ═══════════════════════════════════════════════════════
// ── ADMIN PANEL ──────────────────────────────────────
// ═══════════════════════════════════════════════════════
function html_admin() {
  return `
  <div class="bg-mesh min-h-screen">
    ${html_topbar({back:true, title:'PANNELLO ADMIN', subtitle:'lorenzogucci05@gmail.com'})}
    <main class="max-w-3xl mx-auto px-4 py-6 anim-fade">

      <!-- Quick actions -->
      <div class="grid sm:grid-cols-3 gap-3 mb-6">
        <a href="/api/export_excel" download class="glass rounded-xl p-4 flex flex-col items-center gap-2 hover:border-gold/40 transition-all text-center">
          <i class="fa-solid fa-file-excel text-emerald-400 text-2xl"></i>
          <div class="text-white font-semibold text-sm">Scarica Excel</div>
          <div class="text-white/30 text-xs">Tutti i pronostici</div>
        </a>
        <button id="btn-load-tokens" class="glass rounded-xl p-4 flex flex-col items-center gap-2 hover:border-gold/40 transition-all text-center">
          <i class="fa-solid fa-key text-gold text-2xl"></i>
          <div class="text-white font-semibold text-sm">Token Reset</div>
          <div class="text-white/30 text-xs">Recupero password utenti</div>
        </button>
        <button id="btn-load-results" class="glass rounded-xl p-4 flex flex-col items-center gap-2 hover:border-gold/40 transition-all text-center">
          <i class="fa-solid fa-futbol text-gold text-2xl"></i>
          <div class="text-white font-semibold text-sm">Inserisci Risultati</div>
          <div class="text-white/30 text-xs">Aggiorna risultati reali</div>
        </button>
      </div>

      <!-- Reset tokens section -->
      <div id="section-tokens" class="hidden glass rounded-2xl p-5 mb-5">
        <div class="font-display text-lg text-white tracking-wide mb-4">
          <i class="fa-solid fa-key text-gold mr-2"></i>TOKEN DI RECUPERO PASSWORD
        </div>
        <p class="text-white/40 text-sm mb-4">Questi sono i token generati dagli utenti che hanno richiesto il recupero password. Comunicali direttamente agli utenti.</p>
        <div id="tokens-list">
          <div class="text-white/30 text-sm text-center py-4"><i class="fa-solid fa-spinner spinner mr-2"></i>Caricamento…</div>
        </div>
      </div>

      <!-- Results section -->
      <div id="section-results" class="hidden glass rounded-2xl p-5 mb-5">
        <div class="font-display text-lg text-white tracking-wide mb-4">
          <i class="fa-solid fa-futbol text-gold mr-2"></i>INSERISCI RISULTATI REALI
        </div>
        <p class="text-white/40 text-sm mb-4">Seleziona una partita e inserisci il punteggio reale. Il sistema calcolerà automaticamente i punti.</p>

        <!-- Group selector -->
        <div class="flex flex-wrap gap-2 mb-4" id="admin-grp-sel">
          ${Object.keys(WC_GROUPS).map(g=>`<button class="admin-grp-btn grp-btn" data-grp="${g}">${g}</button>`).join('')}
        </div>

        <div id="admin-matches-list" class="space-y-2"></div>
      </div>

      <!-- Utenti registrati -->
      <div class="glass rounded-2xl p-5 mb-5">
        <div class="flex items-center justify-between mb-4">
          <div class="font-display text-lg text-white tracking-wide">
            <i class="fa-solid fa-users text-gold mr-2"></i>UTENTI REGISTRATI
            <span id="admin-users-count" class="text-white/30 text-sm ml-2"></span>
          </div>
          <button id="admin-users-refresh" class="px-2.5 py-1.5 rounded-lg text-xs text-white/60" style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1)"><i class="fa-solid fa-rotate"></i></button>
        </div>
        <p class="text-white/40 text-sm mb-4">Tutti gli iscritti al sito, anche chi non ha ancora pronosticato o non è in nessuna lega.</p>
        <div id="admin-users-list" class="space-y-2">
          <div class="text-white/30 text-sm text-center py-4"><i class="fa-solid fa-spinner spinner mr-2"></i>Caricamento…</div>
        </div>
      </div>

      <!-- Special results (capocannoniere + finale) -->
      <div class="glass rounded-2xl p-5 mb-5">
        <div class="font-display text-lg text-white tracking-wide mb-4">
          <i class="fa-solid fa-trophy text-gold mr-2"></i>RISULTATI SPECIALI
        </div>
        <p class="text-white/40 text-sm mb-4">Inserisci il capocannoniere reale e le due finaliste: assegnano i punti bonus (capocannoniere +5, entrambe le finaliste +5, una sola finalista +3).</p>
        <div class="space-y-4">
          <div>
            <label class="text-white/50 text-xs uppercase tracking-wider">Capocannoniere del torneo</label>
            <div class="flex gap-2 mt-1">
              <input id="adm-topscorer" type="text" placeholder="Es. Mbappe" class="flex-1 input-dark"
                style="padding:10px 12px;border-radius:10px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);color:#fff">
              <button id="adm-save-topscorer" class="px-4 py-2 rounded-lg text-sm font-bold" style="background:rgba(200,164,74,0.15);border:1px solid rgba(200,164,74,0.3);color:#C8A44A">Salva</button>
            </div>
          </div>
          <div>
            <label class="text-white/50 text-xs uppercase tracking-wider">Finale (1°/2° posto)</label>
            <div class="flex flex-wrap items-center gap-2 mt-1">
              <input id="adm-final-home" type="text" placeholder="Finalista 1" class="input-dark" style="flex:1;min-width:120px;padding:10px 12px;border-radius:10px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);color:#fff">
              <input id="adm-final-sh" type="text" inputmode="numeric" maxlength="1" placeholder="0" style="width:42px;text-align:center;padding:10px 0;border-radius:10px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);color:#fff;font-family:'Bebas Neue',cursive;font-size:1.2rem">
              <span class="text-white/30">–</span>
              <input id="adm-final-sa" type="text" inputmode="numeric" maxlength="1" placeholder="0" style="width:42px;text-align:center;padding:10px 0;border-radius:10px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);color:#fff;font-family:'Bebas Neue',cursive;font-size:1.2rem">
              <input id="adm-final-away" type="text" placeholder="Finalista 2" class="input-dark" style="flex:1;min-width:120px;padding:10px 12px;border-radius:10px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);color:#fff">
              <button id="adm-save-final" class="px-4 py-2 rounded-lg text-sm font-bold" style="background:rgba(200,164,74,0.15);border:1px solid rgba(200,164,74,0.3);color:#C8A44A">Salva</button>
            </div>
            <div class="text-white/25 text-xs mt-1">Il vincitore è dedotto dal risultato (in parità vince Finalista 1).</div>
          </div>
          <div id="adm-special-status" class="text-xs"></div>
        </div>
      </div>

      <!-- Correzione manuale risultati -->
      <div class="glass rounded-2xl p-5 mb-5">
        <div class="font-display text-lg text-white tracking-wide mb-2">
          <i class="fa-solid fa-pen-to-square text-gold mr-2"></i>CORREGGI RISULTATI
        </div>
        <p class="text-white/40 text-sm mb-4">Se la fonte automatica fornisce un risultato sbagliato, correggilo qui. Una volta corretto a mano, l'aggiornamento automatico <strong class="text-gold">non lo tocca più</strong> finché non premi "Sblocca".</p>
        <div class="space-y-2" id="adm-manual-list">
          ${(typeof FRIENDLY_MATCHES!=='undefined'?FRIENDLY_MATCHES:[]).map(m=>`
            <div class="flex items-center gap-2 p-2 rounded-lg" style="background:rgba(255,255,255,0.03)">
              <span class="text-white/70 text-xs flex-1 truncate">${m.home} - ${m.away}</span>
              <input class="adm-mr-score" data-mid="${m.id}" type="text" placeholder="es. 3-0" maxlength="5"
                style="width:64px;height:34px;text-align:center;border-radius:8px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.12);color:#C8A44A;outline:none;font-size:0.85rem">
              <button class="adm-mr-save px-3 py-1.5 rounded-lg text-xs font-bold" data-mid="${m.id}" style="background:rgba(200,164,74,0.15);border:1px solid rgba(200,164,74,0.3);color:#C8A44A">Salva</button>
              <button class="adm-mr-release px-3 py-1.5 rounded-lg text-xs font-bold" data-mid="${m.id}" style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.12);color:rgba(255,255,255,0.5)">Sblocca</button>
            </div>`).join('')}
        </div>
        <div id="adm-manual-status" class="text-xs mt-2"></div>
      </div>

      <!-- Leaderboard overview -->
      <div class="glass rounded-2xl p-5">
        <div class="font-display text-lg text-white tracking-wide mb-4">
          <i class="fa-solid fa-ranking-star text-gold mr-2"></i>CLASSIFICA (lega attiva)
        </div>
        ${S.leaderboard.length ? `
        <div class="space-y-1">
          ${S.leaderboard.map((u,i)=>`
          <div class="flex items-center gap-3 px-3 py-2 rounded-lg" style="background:rgba(255,255,255,0.03)">
            <span class="text-white/30 text-sm w-6 text-center">${i+1}</span>
            <span class="text-lg">${u.avatar}</span>
            <div class="flex-1">
              <div class="text-white text-sm">${u.nickname}</div>
              <div class="text-white/25 text-xs">${u.email}</div>
            </div>
            <div class="text-right">
              <div class="font-display text-xl text-gold">${u.points}</div>
              <div class="text-white/25 text-xs">${u.correct}✓ ${u.exact}⭐ ${u.submitted}/12 gironi</div>
            </div>
          </div>`).join('')}
        </div>` : '<div class="text-white/30 text-sm text-center py-6">Nessun dato ancora.</div>'}
      </div>
    </main>
  </div>`;
}

let adminGroup = 'A';

function renderAdminUsers(data) {
  const box = document.getElementById('admin-users-list');
  const cnt = document.getElementById('admin-users-count');
  if (!box) return;
  const users = (data && data.users) || [];
  if (cnt) cnt.textContent = `(${data.count || users.length})`;
  if (!users.length) { box.innerHTML = '<div class="text-white/30 text-sm text-center py-4">Nessun utente registrato.</div>'; return; }
  box.innerHTML = users.map(u => `
    <div class="flex items-center gap-3 px-3 py-2.5 rounded-lg" style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06)">
      <span class="text-xl flex-shrink-0">${u.avatar}</span>
      <div class="flex-1 min-w-0">
        <div class="text-white text-sm font-semibold truncate">
          ${u.nickname}${u.is_admin?' <span class="text-xs" style="color:#C8A44A">(admin)</span>':''}
        </div>
        <div class="text-white/35 text-xs truncate">${u.email}</div>
      </div>
      <div class="flex flex-col items-end gap-0.5 flex-shrink-0 text-right">
        <div class="text-white/40 text-xs">
          <i class="fa-regular fa-calendar mr-1"></i>${u.created_at}
        </div>
        <div class="flex gap-2 text-xs">
          <span class="text-white/50">${u.group_preds}+${u.ko_preds} pron.</span>
          ${u.leagues.length?`<span style="color:rgba(200,164,74,0.7)"><i class="fa-solid fa-shield-halved mr-0.5"></i>${u.leagues.length}</span>`:''}
        </div>
      </div>
    </div>`).join('');
}

async function loadAdminUsers() {
  try {
    const data = await api('/api/admin/users');
    renderAdminUsers(data);
  } catch(e) {
    const box = document.getElementById('admin-users-list');
    if (box) box.innerHTML = '<div class="text-red-300 text-sm text-center py-4">Errore nel caricamento utenti.</div>';
  }
}

function bind_admin() {
  bind_topbar_events();
  loadAdminUsers();
  document.getElementById('admin-users-refresh')?.addEventListener('click', loadAdminUsers);

  // ── Risultati speciali (capocannoniere + finale) ──
  (async () => {
    try {
      const sr = await api('/api/special_results');
      if (sr.topscorer) document.getElementById('adm-topscorer').value = sr.topscorer;
      if (sr.final) {
        document.getElementById('adm-final-home').value = sr.final.home || '';
        document.getElementById('adm-final-away').value = sr.final.away || '';
        if (sr.final.score && sr.final.score.includes('-')) {
          const p = sr.final.score.split('-');
          document.getElementById('adm-final-sh').value = p[0]||'';
          document.getElementById('adm-final-sa').value = p[1]||'';
        }
      }
    } catch(e){}
  })();
  const advStatus = (msg, ok=true) => {
    const el=document.getElementById('adm-special-status');
    if(el){ el.textContent=msg; el.style.color = ok?'#22c55e':'#fca5a5'; }
  };
  document.getElementById('adm-save-topscorer')?.addEventListener('click', async () => {
    const v=document.getElementById('adm-topscorer').value.trim();
    const r=await api('/api/special_results',{method:'POST',body:{topscorer:v}});
    advStatus(r.ok?`Capocannoniere salvato: ${v||'—'}`:'Errore', !!r.ok);
    await loadUserData();
  });
  // Correzione manuale risultati
  const manualStatus = (msg, ok=true) => {
    const el = document.getElementById('adm-manual-status');
    if (el) { el.textContent = msg; el.style.color = ok ? '#22c55e' : '#fca5a5'; }
  };
  document.querySelectorAll('.adm-mr-save').forEach(btn => {
    btn.addEventListener('click', async () => {
      const mid = btn.dataset.mid;
      const inp = document.querySelector(`.adm-mr-score[data-mid="${mid}"]`);
      const score = (inp?.value || '').trim();
      if (!/^\d{1,2}-\d{1,2}$/.test(score)) { manualStatus('Formato punteggio non valido (es. 3-0)', false); return; }
      try {
        const r = await api('/api/results', {method:'POST', body:{matchId:mid, score}});
        if (r.ok) {
          manualStatus(`Risultato di ${mid} corretto a ${score} e bloccato.`);
          S.results = await api('/api/results');
        } else manualStatus(r.error||'Errore', false);
      } catch(e) { manualStatus('Errore di rete', false); }
    });
  });
  document.querySelectorAll('.adm-mr-release').forEach(btn => {
    btn.addEventListener('click', async () => {
      const mid = btn.dataset.mid;
      try {
        const r = await api('/api/results/release', {method:'POST', body:{matchId:mid}});
        if (r.ok) manualStatus(`${mid} sbloccato: torna all'aggiornamento automatico.`);
        else manualStatus(r.error||'Errore', false);
      } catch(e) { manualStatus('Errore di rete', false); }
    });
  });

  document.getElementById('adm-save-final')?.addEventListener('click', async () => {
    const home=document.getElementById('adm-final-home').value.trim();
    const away=document.getElementById('adm-final-away').value.trim();
    const sh=document.getElementById('adm-final-sh').value.trim();
    const sa=document.getElementById('adm-final-sa').value.trim();
    if(!home||!away){ advStatus('Inserisci entrambe le finaliste',false); return; }
    const score=(sh!==''&&sa!=='')?`${sh}-${sa}`:'';
    const r=await api('/api/special_results',{method:'POST',body:{final:{home,away,score}}});
    advStatus(r.ok?`Finale salvata: ${home} ${score||''} ${away}`:'Errore', !!r.ok);
    await loadUserData();
  });
  ['adm-final-sh','adm-final-sa'].forEach(id=>{
    const el=document.getElementById(id);
    if(el) el.addEventListener('input',e=>{ e.target.value=e.target.value.replace(/[^0-9]/g,'').slice(0,1); });
  });

  // Reset tokens
  document.getElementById('btn-load-tokens')?.addEventListener('click', async () => {
    const sec = document.getElementById('section-tokens');
    sec.classList.toggle('hidden');
    if (!sec.classList.contains('hidden')) {
      const tokens = await api('/api/admin/reset_tokens');
      const list = document.getElementById('tokens-list');
      const entries = Object.entries(tokens);
      if (!entries.length) {
        list.innerHTML = '<div class="text-white/30 text-sm text-center py-4">Nessun token attivo.</div>';
      } else {
        list.innerHTML = entries.map(([tok, email]) => `
        <div class="flex items-center justify-between p-3 rounded-lg mb-2" style="background:rgba(200,164,74,0.07);border:1px solid rgba(200,164,74,0.15)">
          <div>
            <div class="text-white/50 text-xs mb-0.5"><i class="fa-regular fa-envelope mr-1"></i>${email}</div>
            <div class="font-display text-2xl text-gold tracking-widest">${tok}</div>
          </div>
          <button class="btn-revoke-token px-3 py-1.5 rounded-lg text-xs text-red-300" data-tok="${tok}"
            style="background:rgba(232,25,44,0.1);border:1px solid rgba(232,25,44,0.2)">
            <i class="fa-solid fa-trash mr-1"></i>Elimina
          </button>
        </div>`).join('');
        // Copy token on click
        document.querySelectorAll('.btn-revoke-token').forEach(btn => {
          btn.addEventListener('click', async () => {
            if (!confirm('Eliminare questo token?')) return;
            // Just reload – backend removes on use; for now just refresh
            btn.closest('div[class*="flex"]').remove();
          });
        });
      }
    }
  });

  // Results section
  document.getElementById('btn-load-results')?.addEventListener('click', () => {
    document.getElementById('section-results').classList.toggle('hidden');
    renderAdminMatches();
  });

  document.querySelectorAll('.admin-grp-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      adminGroup = btn.dataset.grp;
      document.querySelectorAll('.admin-grp-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderAdminMatches();
    });
  });
}

function renderAdminMatches() {
  const matches = WC_ALL_MATCHES.filter(m => m.group === adminGroup);
  const container = document.getElementById('admin-matches-list');
  if (!container) return;

  container.innerHTML = matches.map(m => {
    const res = S.results[m.id] || {};
    const hf = flagUrl(m.homeTeam.name), af = flagUrl(m.awayTeam.name);
    const [rH, rA] = res.score ? res.score.split('-') : ['',''];
    return `
    <div class="p-3 rounded-lg" style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08)">
      <div class="flex items-center gap-2 mb-2">
        <span class="text-white/30 text-xs">${m.date} · ${m.time}</span>
        ${res.score ? `<span class="text-emerald-400 text-xs font-bold"><i class="fa-solid fa-check mr-1"></i>${res.score}</span>` : ''}
      </div>
      <div class="flex items-center gap-3">
        <div class="flex items-center gap-1.5 flex-1 justify-end">
          <span class="text-white text-sm font-semibold">${m.homeTeam.name}</span>
          ${flagImg(m.homeTeam.name,18)}
        </div>
        <div class="flex items-center gap-1.5">
          <input type="text" inputmode="numeric" pattern="[0-9]" maxlength="1" placeholder="0" value="${rH}"
            class="score-inp admin-score-h text-center" data-mid="${m.id}" data-side="home"
            style="width:44px;font-size:1.1rem;font-family:'Bebas Neue',cursive">
          <span class="text-white/30 font-bold">–</span>
          <input type="text" inputmode="numeric" pattern="[0-9]" maxlength="1" placeholder="0" value="${rA}"
            class="score-inp admin-score-a text-center" data-mid="${m.id}" data-side="away"
            style="width:44px;font-size:1.1rem;font-family:'Bebas Neue',cursive">
        </div>
        <div class="flex items-center gap-1.5 flex-1">
          ${flagImg(m.awayTeam.name,18)}
          <span class="text-white text-sm font-semibold">${m.awayTeam.name}</span>
        </div>
        <button class="btn-save-result px-3 py-1.5 rounded-lg text-xs font-bold text-gold flex-shrink-0" data-mid="${m.id}"
          style="background:rgba(200,164,74,0.12);border:1px solid rgba(200,164,74,0.2)">
          <i class="fa-solid fa-floppy-disk mr-1"></i>Salva
        </button>
      </div>
    </div>`;
  }).join('');

  // Bind save buttons
  document.querySelectorAll('.btn-save-result').forEach(btn => {
    btn.addEventListener('click', async () => {
      const mid = btn.dataset.mid;
      const hI = document.querySelector(`.admin-score-h[data-mid="${mid}"]`);
      const aI = document.querySelector(`.admin-score-a[data-mid="${mid}"]`);
      if (!hI || !aI || hI.value === '' || aI.value === '') {
        alert('Inserisci entrambi i gol.'); return;
      }
      const h = parseInt(hI.value), a = parseInt(aI.value);
      const score = `${h}-${a}`;
      const pick  = h>a ? '1' : h<a ? '2' : 'X';
      const res = await api('/api/results', {method:'POST', body:{matchId:mid, pick, score}});
      if (res.ok) {
        S.results = await api('/api/results');
        await loadLeagueData();
        btn.innerHTML = '<i class="fa-solid fa-check mr-1"></i>Salvato!';
        btn.style.color = '#86efac';
        setTimeout(() => { btn.innerHTML='<i class="fa-solid fa-floppy-disk mr-1"></i>Salva'; btn.style.color=''; }, 2000);
      }
    });
  });
}

// ═══════════════════════════════════════════════════════
// ── TEAMS / SQUADS VIEW ───────────────────────────────
// ═══════════════════════════════════════════════════════

function html_wc_loading() {
  return `<div class="bg-mesh min-h-screen flex items-center justify-center">
    <div style="width:40px;height:40px;border:3px solid rgba(200,164,74,0.2);border-top-color:#C8A44A;border-radius:50%;animation:spin 0.9s linear infinite"></div>
  </div>`;
}

function html_teams() {
  const groups = Object.keys(WC_GROUPS);
  const activeGroup = S.teamsGroup || 'A';
  const activeTeam  = S.teamsTeam  || null;

  // Team detail view
  if (activeTeam && WC_SQUADS[activeTeam]) {
    return html_teamDetail(activeTeam);
  }

  // Group list view
  const groupTeams = WC_GROUPS[activeGroup] || [];
  return `
  <div class="bg-mesh min-h-screen">
    ${html_topbar({back:true, title:'INFO SQUADRE', subtitle:'Rose e Formazioni Ufficiali WC 2026'})}
    <div class="deadline-bar" id="deadline-bar"></div>

    <!-- Group tabs -->
    <div class="flex flex-wrap gap-1.5 px-4 sm:px-6 py-3 sticky top-[60px] z-40"
      style="background:rgba(0,13,31,0.9);backdrop-filter:blur(10px);border-bottom:1px solid rgba(200,164,74,0.08)">
      ${groups.map(g=>`
      <button class="team-grp-btn px-3 py-1.5 rounded-lg text-sm font-bold transition-all ${g===activeGroup?'text-navy':'text-white/40 hover:text-white/70'}" data-grp="${g}"
        style="${g===activeGroup?'background:#C8A44A':'background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.08)'}">
        Girone ${g}
      </button>`).join('')}
    </div>

    <main class="max-w-4xl mx-auto px-4 sm:px-6 py-6 anim-fade">
      <div class="mb-4">
        <div class="font-display text-2xl text-white tracking-wide">GIRONE ${activeGroup}</div>
        <div class="text-white/35 text-sm mt-1">Clicca su una squadra per vedere la rosa completa e la formazione</div>
      </div>

      <div class="grid sm:grid-cols-2 gap-4">
        ${groupTeams.map(team => {
          const sq = WC_SQUADS[team.name];
          if (!sq) return '';
          const f = flagUrl(team.name);
          const starters = sq.starting11 || [];
          return `
          <button class="team-card-btn text-left glass rounded-2xl p-5 hover:border-gold/40 transition-all" data-team="${team.name}">
            <div class="flex items-center gap-4 mb-4">
              ${f ? `<img src="${f}" class="h-10 rounded shadow-lg flex-shrink-0" alt="${team.name}">` : ''}
              <div>
                <div class="font-display text-xl text-white tracking-wide">${team.name.toUpperCase()}</div>
                <div class="text-gold text-xs mt-0.5"><i class="fa-solid fa-person-chalkboard mr-1"></i>${sq.coach}</div>
              </div>
              <div class="ml-auto">
                <div class="text-center px-3 py-1.5 rounded-lg" style="background:rgba(200,164,74,0.1);border:1px solid rgba(200,164,74,0.2)">
                  <div class="font-display text-lg text-gold">${sq.formation}</div>
                  <div class="text-white/30 text-xs">modulo</div>
                </div>
              </div>
            </div>
            <!-- Mini lineup preview -->
            <div class="text-white/30 text-xs uppercase tracking-wider mb-2"><i class="fa-solid fa-users mr-1"></i>Titolari Probabli</div>
            <div class="flex flex-wrap gap-1">
              ${starters.slice(0,11).map(p=>`
              <span class="text-xs px-2 py-0.5 rounded-full text-white/70"
                style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1)">${p}</span>`).join('')}
            </div>
            <div class="mt-3 flex items-center text-gold/60 text-xs font-semibold">
              <i class="fa-solid fa-arrow-right mr-1"></i>Vedi rosa completa
            </div>
          </button>`;
        }).join('')}
      </div>
    </main>
  </div>`;
}

function html_teamDetail(teamName) {
  const sq = WC_SQUADS[teamName];
  if (!sq) return '<div class="p-8 text-center text-white/40">Dati non disponibili</div>';
  const f = flagUrl(teamName);
  const posOrder  = {GK:0,DF:1,CC:2,AT:3};
  const posColors = {GK:'#f59e0b',DF:'#3b82f6',CC:'#8b5cf6',AT:'#ef4444'};
  const posLabels = {GK:'POR',DF:'DIF',CC:'CEN',AT:'ATT'};

  // Sort players: GK → DF → CC → AT, starters first within role
  const sorted = [...sq.players].sort((a,b) => {
    if (posOrder[a.pos] !== posOrder[b.pos]) return posOrder[a.pos]-posOrder[b.pos];
    return (b.starter?1:0)-(a.starter?1:0);
  });

  return `
  <div class="bg-mesh min-h-screen">
    ${html_topbar({back:true, title:teamName.toUpperCase(), subtitle:`Girone ${sq.group} · CT: ${sq.coach}`})}
    <main class="max-w-6xl mx-auto px-3 sm:px-6 py-4">

      <!-- Header strip -->
      <div class="glass rounded-2xl p-4 mb-4 flex items-center gap-4 flex-wrap">
        ${f?`<img src="${f}" class="h-12 rounded-lg shadow-xl flex-shrink-0" alt="${teamName}">`:''}
        <div class="flex-1 min-w-0">
          <div class="font-display text-2xl text-white tracking-wide">${teamName.toUpperCase()}</div>
          <div class="flex flex-wrap gap-3 mt-1">
            <span class="text-gold text-xs"><i class="fa-solid fa-person-chalkboard mr-1"></i>${sq.coach}</span>
            <span class="text-white/40 text-xs"><i class="fa-solid fa-layer-group mr-1"></i>${sq.formation}</span>
            <span class="text-white/40 text-xs"><i class="fa-solid fa-users mr-1"></i>${sq.players.length} giocatori</span>
          </div>
        </div>
      </div>

      <!-- Two-column layout: player list LEFT + pitch RIGHT -->
      <div class="grid lg:grid-cols-2 gap-4">

        <!-- LEFT: player list (clickable) -->
        <div class="space-y-2 order-2 lg:order-1">
          <div class="text-white/30 text-xs uppercase tracking-wider font-semibold px-1 mb-1">
            <i class="fa-solid fa-list mr-1.5"></i>Rosa completa
            <span class="text-gold ml-2">★ titolare · clicca per dettagli</span>
          </div>
          ${sorted.map((p, idx) => {
            const col = posColors[p.pos]||'#fff';
            const lbl = posLabels[p.pos]||p.pos;
            return `
            <button class="player-row w-full text-left flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all hover:scale-[1.01] ${p.starter?'':'opacity-75'}"
              data-team="${teamName}" data-pname="${encodeURIComponent(p.name)}"
              style="background:${p.starter?'rgba(200,164,74,0.07)':'rgba(255,255,255,0.03)'};border:1px solid ${p.starter?'rgba(200,164,74,0.18)':'rgba(255,255,255,0.07)'}">
              <span class="text-xs font-bold px-1.5 py-0.5 rounded flex-shrink-0 w-9 text-center"
                style="background:${col}22;color:${col};border:1px solid ${col}44">${lbl}</span>
              <div class="flex-1 min-w-0">
                <div class="text-white text-sm font-${p.starter?'semibold':'normal'} truncate">
                  ${p.starter?'<span class="text-gold mr-1">★</span>':''}${p.name}
                </div>
                <div class="text-white/30 text-xs truncate">${p.club}</div>
              </div>
              <div class="flex flex-col items-end gap-0.5 flex-shrink-0 text-right">
                <div class="text-white/40 text-xs">${p.age}a · ${p.caps} pres</div>
                <div class="flex gap-2">
                  <span class="text-emerald-400/80 text-xs font-semibold">${p.goals}⚽</span>
                  <span class="text-blue-400/70 text-xs">${p.assists}🅰</span>
                </div>
              </div>
              <i class="fa-solid fa-chevron-right text-white/20 text-xs flex-shrink-0"></i>
            </button>`;
          }).join('')}
        </div>

        <!-- RIGHT: pitch formation -->
        <div class="order-1 lg:order-2">
          <div class="text-white/30 text-xs uppercase tracking-wider font-semibold px-1 mb-1">
            <i class="fa-solid fa-users-between-lines mr-1.5"></i>Formazione titolare (${sq.formation}) — clicca i giocatori
          </div>
          <div class="rounded-2xl overflow-hidden relative" style="background:linear-gradient(180deg,#1a5c1a 0%,#1a6e1a 30%,#1a5c1a 60%,#145014 100%);border:2px solid rgba(255,255,255,0.08);aspect-ratio:9/13">
            <svg class="absolute inset-0 w-full h-full" viewBox="0 0 100 144" preserveAspectRatio="none" style="opacity:0.18">
              <rect x="2" y="2" width="96" height="140" fill="none" stroke="white" stroke-width="0.8"/>
              <line x1="2" y1="72" x2="98" y2="72" stroke="white" stroke-width="0.6"/>
              <circle cx="50" cy="72" r="12" fill="none" stroke="white" stroke-width="0.6"/>
              <circle cx="50" cy="72" r="0.8" fill="white"/>
              <rect x="20" y="2" width="60" height="22" fill="none" stroke="white" stroke-width="0.6"/>
              <rect x="20" y="120" width="60" height="22" fill="none" stroke="white" stroke-width="0.6"/>
              <rect x="34" y="2" width="32" height="8" fill="none" stroke="white" stroke-width="0.5"/>
              <rect x="34" y="134" width="32" height="8" fill="none" stroke="white" stroke-width="0.5"/>
              <circle cx="50" cy="18" r="0.8" fill="white"/>
              <circle cx="50" cy="126" r="0.8" fill="white"/>
            </svg>
            <div class="absolute inset-0 flex flex-col justify-around py-4 px-2">
              ${renderFormationVisual({...sq, _teamName:teamName}, sq.formation)}
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Player popup modal mount -->
    <div id="player-modal-mount"></div>
  </div>`;
}

// Generate a jersey-style avatar (initials on team-colored shirt) — used on pitch & popup
function playerAvatar(player, teamName, size=40) {
  const posColors = {GK:'#f59e0b',DF:'#3b82f6',CC:'#8b5cf6',AT:'#ef4444'};
  const col = posColors[player.pos] || '#C8A44A';
  // Initials from surname
  const surname = player.name.split(' ').pop();
  const initials = surname.slice(0,2).toUpperCase();
  return `
    <div style="width:${size}px;height:${size}px;border-radius:50%;
      background:linear-gradient(145deg,${col},${col}99);
      display:flex;align-items:center;justify-content:center;
      border:2px solid rgba(255,255,255,0.5);box-shadow:0 2px 8px rgba(0,0,0,0.4);
      font-family:'Bebas Neue',cursive;font-size:${size*0.42}px;color:#fff;letter-spacing:0.5px">
      ${initials}
    </div>`;
}

function renderFormationVisual(sq, formation) {
  const players = sq.starting11;
  const lines = formation.replace(/[^0-9-]/g,'').split('-').map(Number);
  const rows = [1, ...lines];
  let idx = 0;
  const allNames = players.slice(0,11);

  return rows.map((count, rowIdx) => {
    const rowNames = allNames.slice(idx, idx + count);
    idx += count;
    return `
    <div class="flex justify-around items-center py-1">
      ${rowNames.map(name => {
        // Find full player object by matching surname
        const surname = name.split(' ').pop().toLowerCase();
        const pl = sq.players.find(p => p.name.toLowerCase().includes(surname)) || {name, pos:'CC', age:0, caps:0, goals:0, assists:0, rating:3, trophies:0, club:'—'};
        return `
        <button class="pitch-player flex flex-col items-center gap-0.5 transition-transform hover:scale-110"
          data-team="${sq._teamName||''}" data-pname="${encodeURIComponent(pl.name)}"
          style="min-width:48px;max-width:78px;cursor:pointer">
          ${playerAvatar(pl, '', 38)}
          <span class="text-white text-center leading-tight px-1 rounded" style="font-size:0.58rem;word-break:break-word;background:rgba(0,0,0,0.35);margin-top:2px">${name.split(' ').pop()}</span>
        </button>`;
      }).join('')}
    </div>`;
  }).join('');
}

// Player detail popup
function showPlayerModal(teamName, playerName) {
  const sq = WC_SQUADS[teamName];
  if (!sq) return;
  const p = sq.players.find(x => x.name === playerName);
  if (!p) return;

  const posColors = {GK:'#f59e0b',DF:'#3b82f6',CC:'#8b5cf6',AT:'#ef4444'};
  const posNames  = {GK:'Portiere',DF:'Difensore',CC:'Centrocampista',AT:'Attaccante'};
  const col = posColors[p.pos] || '#C8A44A';
  const f = flagUrl(teamName);
  const stars = '★'.repeat(p.rating) + '☆'.repeat(5-p.rating);
  // Split name into nome / cognome (best effort)
  const parts = p.name.trim().split(' ');
  const cognome = parts.length > 1 ? parts.slice(1).join(' ') : parts[0];
  const nome    = parts.length > 1 ? parts[0] : '';

  const mount = document.getElementById('player-modal-mount');
  if (!mount) return;
  mount.innerHTML = `
    <div id="player-modal-overlay" style="position:fixed;inset:0;z-index:10000;
      background:rgba(0,8,20,0.8);backdrop-filter:blur(6px);
      display:flex;align-items:center;justify-content:center;padding:16px;opacity:0;transition:opacity 0.25s">
      <div id="player-modal-card" style="max-width:380px;width:100%;border-radius:20px;overflow:hidden;
        background:linear-gradient(165deg,#0d2147,#081428);border:1px solid rgba(200,164,74,0.25);
        box-shadow:0 24px 64px rgba(0,0,0,0.6);transform:scale(0.92);transition:transform 0.25s cubic-bezier(0.2,0.8,0.2,1)">

        <!-- Header banner -->
        <div style="position:relative;padding:24px 20px 16px;text-align:center;
          background:linear-gradient(145deg,${col}33,${col}11);border-bottom:1px solid rgba(255,255,255,0.08)">
          <button id="player-modal-close" style="position:absolute;top:12px;right:12px;width:32px;height:32px;
            border-radius:50%;background:rgba(0,0,0,0.3);border:1px solid rgba(255,255,255,0.15);
            color:rgba(255,255,255,0.7);cursor:pointer;font-size:14px">
            <i class="fa-solid fa-xmark"></i>
          </button>
          <!-- Avatar -->
          <div style="margin:0 auto 12px">${playerAvatar(p, teamName, 88)}</div>
          <div style="display:flex;align-items:center;justify-content:center;gap:8px;margin-bottom:4px">
            ${f?`<img src="${f}" style="height:18px;border-radius:3px" alt="${teamName}">`:''}
            <span style="color:${col};font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em">
              ${posNames[p.pos]||p.pos}
            </span>
          </div>
          ${nome?`<div style="color:rgba(255,255,255,0.5);font-size:14px">${nome}</div>`:''}
          <div style="font-family:'Bebas Neue',cursive;font-size:28px;color:#fff;letter-spacing:1px;line-height:1">${cognome}</div>
          <div style="color:#C8A44A;font-size:18px;margin-top:6px;letter-spacing:2px">${stars}</div>
          <div style="color:rgba(255,255,255,0.35);font-size:12px;margin-top:4px">
            <i class="fa-solid fa-shield-halved mr-1"></i>${p.club}
          </div>
        </div>

        <!-- Stats grid -->
        <div style="padding:18px 20px 22px">
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
            ${[
              {ic:'fa-cake-candles', lbl:'Età',          val:p.age+' anni'},
              {ic:'fa-shirt',        lbl:'Presenze naz.',val:p.caps},
              {ic:'fa-futbol',       lbl:'Gol',          val:p.goals},
              {ic:'fa-hands-clapping',lbl:'Assist',      val:p.assists},
              {ic:'fa-trophy',       lbl:'Trofei naz.',  val:p.trophies||0},
              {ic:'fa-location-crosshairs',lbl:'Ruolo',  val:posNames[p.pos]||p.pos},
            ].map(s=>`
              <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.07);
                border-radius:12px;padding:12px 10px">
                <div style="color:rgba(255,255,255,0.35);font-size:10px;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:3px">
                  <i class="fa-solid ${s.ic} mr-1" style="color:rgba(200,164,74,0.6)"></i>${s.lbl}
                </div>
                <div style="color:#fff;font-family:'Bebas Neue',cursive;font-size:22px;line-height:1">${s.val}</div>
              </div>`).join('')}
          </div>
        </div>
      </div>
    </div>`;

  // Animate in
  requestAnimationFrame(() => {
    const ov = document.getElementById('player-modal-overlay');
    const cd = document.getElementById('player-modal-card');
    if (ov) ov.style.opacity = '1';
    if (cd) cd.style.transform = 'scale(1)';
  });

  const close = () => {
    const ov = document.getElementById('player-modal-overlay');
    if (ov) { ov.style.opacity='0'; setTimeout(()=>{ mount.innerHTML=''; }, 250); }
  };
  document.getElementById('player-modal-close')?.addEventListener('click', close);
  document.getElementById('player-modal-overlay')?.addEventListener('click', (e) => {
    if (e.target.id === 'player-modal-overlay') close();
  });
}

function bind_teams() {
  bind_topbar_events();
  document.querySelectorAll('.team-grp-btn').forEach(btn => {
    btn.addEventListener('click', () => { S.teamsGroup=btn.dataset.grp; S.teamsTeam=null; render(); });
  });
  document.querySelectorAll('.team-card-btn').forEach(btn => {
    btn.addEventListener('click', () => { S.teamsTeam=btn.dataset.team; render(); });
  });
  // Clickable player rows (left list) + pitch players → open modal
  document.querySelectorAll('.player-row, .pitch-player').forEach(el => {
    el.addEventListener('click', () => {
      const team = el.dataset.team || S.teamsTeam;
      const pname = decodeURIComponent(el.dataset.pname || '');
      if (team && pname) showPlayerModal(team, pname);
    });
  });
  renderDeadlineBar();
}