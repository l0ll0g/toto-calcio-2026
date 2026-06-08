// ── FLAG CODES (flagcdn.com) ───────────────────────────────────────────────────
const FLAG = {
  'Messico':'mx','Sudafrica':'za','Corea del Sud':'kr','Repubblica Ceca':'cz',
  'Canada':'ca','Qatar':'qa','Svizzera':'ch','Bosnia':'ba',
  'Brasile':'br','Marocco':'ma','Haiti':'ht','Scozia':'gb-sct',
  'USA':'us','Paraguay':'py','Australia':'au','Turchia':'tr',
  'Germania':'de','Curacao':'cw','Costa d\'Avorio':'ci','Ecuador':'ec',
  'Olanda':'nl','Giappone':'jp','Svezia':'se','Tunisia':'tn',
  'Belgio':'be','Egitto':'eg','Iran':'ir','Nuova Zelanda':'nz',
  'Spagna':'es','Capo Verde':'cv','Arabia Saudita':'sa','Uruguay':'uy',
  'Francia':'fr','Senegal':'sn','Iraq':'iq','Norvegia':'no',
  'Argentina':'ar','Algeria':'dz','Austria':'at','Giordania':'jo',
  'Portogallo':'pt','RD Congo':'cd','Uzbekistan':'uz','Colombia':'co',
  'Inghilterra':'gb-eng','Croazia':'hr','Ghana':'gh','Panama':'pa',
};

function flagUrl(name) {
  const code = FLAG[name];
  return code ? `https://flagcdn.com/w40/${code}.png` : null;
}

function seededRng(seed){
  let h=0; for(const c of seed) h=Math.imul(31,h)+c.charCodeAt(0)|0;
  return ()=>{ h^=h<<13; h^=h>>17; h^=h<<5; return (h>>>0)/0xFFFFFFFF; };
}
function genForm(rnd){ return Array.from({length:5},()=>{const r=rnd();return r<0.45?'V':r<0.70?'P':'N';}); }
function genStats(home,away){
  const rnd=seededRng(home.name+'|'+away.name);
  const t=home.s+away.s;
  const pH=Math.max(0.1,(home.s/t)+0.09);
  const pA=Math.max(0.1,(away.s/t)-0.05);
  const pD=Math.max(0.15,1-Math.abs(home.s-away.s)/12);
  const sum=pH+pD+pA; const[nH,nD,nA]=[pH/sum,pD/sum,pA/sum];
  return{
    homeForm:genForm(rnd),awayForm:genForm(rnd),
    expertPick:nH>0.45?'1':nD>nA?'X':'2'
  };
}

// ── GROUPS (official FIFA WC 2026) ────────────────────────────────────────────
const WC_GROUPS = {
  A:[{name:'Messico',s:7},{name:'Sudafrica',s:5},{name:'Corea del Sud',s:7},{name:'Repubblica Ceca',s:6}],
  B:[{name:'Canada',s:7},{name:'Qatar',s:4},{name:'Svizzera',s:7},{name:'Bosnia',s:5}],
  C:[{name:'Brasile',s:9},{name:'Marocco',s:7},{name:'Haiti',s:3},{name:'Scozia',s:6}],
  D:[{name:'USA',s:8},{name:'Paraguay',s:6},{name:'Australia',s:6},{name:'Turchia',s:7}],
  E:[{name:'Germania',s:8},{name:'Curacao',s:3},{name:'Costa d\'Avorio',s:6},{name:'Ecuador',s:6}],
  F:[{name:'Olanda',s:8},{name:'Giappone',s:7},{name:'Svezia',s:7},{name:'Tunisia',s:5}],
  G:[{name:'Belgio',s:8},{name:'Egitto',s:5},{name:'Iran',s:6},{name:'Nuova Zelanda',s:5}],
  H:[{name:'Spagna',s:9},{name:'Capo Verde',s:4},{name:'Arabia Saudita',s:5},{name:'Uruguay',s:7}],
  I:[{name:'Francia',s:9},{name:'Senegal',s:7},{name:'Iraq',s:4},{name:'Norvegia',s:7}],
  J:[{name:'Argentina',s:9},{name:'Algeria',s:6},{name:'Austria',s:7},{name:'Giordania',s:4}],
  K:[{name:'Portogallo',s:9},{name:'RD Congo',s:5},{name:'Uzbekistan',s:5},{name:'Colombia',s:7}],
  L:[{name:'Inghilterra',s:8},{name:'Croazia',s:7},{name:'Ghana',s:6},{name:'Panama',s:5}],
};

const ALL_WC_TEAMS = Object.values(WC_GROUPS).flat().map(t=>t.name);

// ── EXACT MATCH SCHEDULE ──────────────────────────────────────────────────────
function t(a,b){ return WC_GROUPS[a].find(x=>x.name===b)||{name:b,s:5}; }

const WC_ALL_MATCHES = [
  // ── GIRONE A ──
  {id:'wc-A-m1', group:'A', homeTeam:t('A','Messico'),         awayTeam:t('A','Sudafrica'),        date:'Gio 11 Giu', time:'21:00', venue:'Mexico City Stadium',          round:'Giornata 1', stats:genStats(t('A','Messico'),t('A','Sudafrica'))},
  {id:'wc-A-m2', group:'A', homeTeam:t('A','Corea del Sud'),   awayTeam:t('A','Repubblica Ceca'),  date:'Ven 12 Giu', time:'04:00', venue:'Estadio Akron, Guadalajara',   round:'Giornata 1', stats:genStats(t('A','Corea del Sud'),t('A','Repubblica Ceca'))},
  {id:'wc-A-m3', group:'A', homeTeam:t('A','Repubblica Ceca'), awayTeam:t('A','Sudafrica'),        date:'Gio 18 Giu', time:'18:00', venue:'Atlanta Stadium',               round:'Giornata 2', stats:genStats(t('A','Repubblica Ceca'),t('A','Sudafrica'))},
  {id:'wc-A-m4', group:'A', homeTeam:t('A','Messico'),         awayTeam:t('A','Corea del Sud'),    date:'Ven 19 Giu', time:'03:00', venue:'Estadio Akron, Guadalajara',   round:'Giornata 2', stats:genStats(t('A','Messico'),t('A','Corea del Sud'))},
  {id:'wc-A-m5', group:'A', homeTeam:t('A','Sudafrica'),       awayTeam:t('A','Corea del Sud'),    date:'Gio 25 Giu', time:'03:00', venue:'Estadio BBVA, Monterrey',       round:'Giornata 3', stats:genStats(t('A','Sudafrica'),t('A','Corea del Sud'))},
  {id:'wc-A-m6', group:'A', homeTeam:t('A','Repubblica Ceca'), awayTeam:t('A','Messico'),          date:'Gio 25 Giu', time:'03:00', venue:'Mexico City Stadium',          round:'Giornata 3', stats:genStats(t('A','Repubblica Ceca'),t('A','Messico'))},
  // ── GIRONE B ──
  {id:'wc-B-m1', group:'B', homeTeam:t('B','Canada'),   awayTeam:t('B','Bosnia'),   date:'Ven 12 Giu', time:'21:00', venue:'BMO Field, Toronto',              round:'Giornata 1', stats:genStats(t('B','Canada'),t('B','Bosnia'))},
  {id:'wc-B-m2', group:'B', homeTeam:t('B','Svizzera'), awayTeam:t('B','Qatar'),    date:'Sab 13 Giu', time:'21:00', venue:'Levi\'s Stadium, San Francisco',  round:'Giornata 1', stats:genStats(t('B','Svizzera'),t('B','Qatar'))},
  {id:'wc-B-m3', group:'B', homeTeam:t('B','Svizzera'), awayTeam:t('B','Bosnia'),   date:'Gio 18 Giu', time:'21:00', venue:'SoFi Stadium, Los Angeles',       round:'Giornata 2', stats:genStats(t('B','Svizzera'),t('B','Bosnia'))},
  {id:'wc-B-m4', group:'B', homeTeam:t('B','Canada'),   awayTeam:t('B','Qatar'),    date:'Ven 19 Giu', time:'24:00', venue:'BC Place, Vancouver',             round:'Giornata 2', stats:genStats(t('B','Canada'),t('B','Qatar'))},
  {id:'wc-B-m5', group:'B', homeTeam:t('B','Svizzera'), awayTeam:t('B','Canada'),   date:'Mer 24 Giu', time:'21:00', venue:'BC Place, Vancouver',             round:'Giornata 3', stats:genStats(t('B','Svizzera'),t('B','Canada'))},
  {id:'wc-B-m6', group:'B', homeTeam:t('B','Bosnia'),   awayTeam:t('B','Qatar'),    date:'Mer 24 Giu', time:'21:00', venue:'Lumen Field, Seattle',            round:'Giornata 3', stats:genStats(t('B','Bosnia'),t('B','Qatar'))},
  // ── GIRONE C ──
  {id:'wc-C-m1', group:'C', homeTeam:t('C','Brasile'), awayTeam:t('C','Marocco'), date:'Dom 14 Giu', time:'24:00', venue:'MetLife Stadium, New Jersey',      round:'Giornata 1', stats:genStats(t('C','Brasile'),t('C','Marocco'))},
  {id:'wc-C-m2', group:'C', homeTeam:t('C','Haiti'),   awayTeam:t('C','Scozia'),  date:'Dom 14 Giu', time:'03:00', venue:'Gillette Stadium, Boston',         round:'Giornata 1', stats:genStats(t('C','Haiti'),t('C','Scozia'))},
  {id:'wc-C-m3', group:'C', homeTeam:t('C','Scozia'),  awayTeam:t('C','Marocco'), date:'Sab 20 Giu', time:'24:00', venue:'Gillette Stadium, Boston',         round:'Giornata 2', stats:genStats(t('C','Scozia'),t('C','Marocco'))},
  {id:'wc-C-m4', group:'C', homeTeam:t('C','Brasile'), awayTeam:t('C','Haiti'),   date:'Sab 20 Giu', time:'03:00', venue:'Lincoln Financial Field, Phila.',  round:'Giornata 2', stats:genStats(t('C','Brasile'),t('C','Haiti'))},
  {id:'wc-C-m5', group:'C', homeTeam:t('C','Marocco'), awayTeam:t('C','Haiti'),   date:'Gio 25 Giu', time:'24:00', venue:'Atlanta Stadium',                  round:'Giornata 3', stats:genStats(t('C','Marocco'),t('C','Haiti'))},
  {id:'wc-C-m6', group:'C', homeTeam:t('C','Scozia'),  awayTeam:t('C','Brasile'), date:'Gio 25 Giu', time:'24:00', venue:'Hard Rock Stadium, Miami',         round:'Giornata 3', stats:genStats(t('C','Scozia'),t('C','Brasile'))},
  // ── GIRONE D ──
  {id:'wc-D-m1', group:'D', homeTeam:t('D','USA'),       awayTeam:t('D','Paraguay'),  date:'Sab 13 Giu', time:'03:00', venue:'SoFi Stadium, Los Angeles',       round:'Giornata 1', stats:genStats(t('D','USA'),t('D','Paraguay'))},
  {id:'wc-D-m2', group:'D', homeTeam:t('D','Australia'), awayTeam:t('D','Turchia'),   date:'Sab 13 Giu', time:'06:00', venue:'BC Place, Vancouver',             round:'Giornata 1', stats:genStats(t('D','Australia'),t('D','Turchia'))},
  {id:'wc-D-m3', group:'D', homeTeam:t('D','Turchia'),   awayTeam:t('D','Paraguay'),  date:'Ven 19 Giu', time:'06:00', venue:'Levi\'s Stadium, San Francisco',  round:'Giornata 2', stats:genStats(t('D','Turchia'),t('D','Paraguay'))},
  {id:'wc-D-m4', group:'D', homeTeam:t('D','USA'),       awayTeam:t('D','Australia'), date:'Ven 19 Giu', time:'21:00', venue:'Lumen Field, Seattle',            round:'Giornata 2', stats:genStats(t('D','USA'),t('D','Australia'))},
  {id:'wc-D-m5', group:'D', homeTeam:t('D','Turchia'),   awayTeam:t('D','USA'),       date:'Ven 26 Giu', time:'04:00', venue:'SoFi Stadium, Los Angeles',       round:'Giornata 3', stats:genStats(t('D','Turchia'),t('D','USA'))},
  {id:'wc-D-m6', group:'D', homeTeam:t('D','Paraguay'),  awayTeam:t('D','Australia'), date:'Ven 26 Giu', time:'04:00', venue:'Levi\'s Stadium, San Francisco',  round:'Giornata 3', stats:genStats(t('D','Paraguay'),t('D','Australia'))},
  // ── GIRONE E ──
  {id:'wc-E-m1', group:'E', homeTeam:t('E','Germania'),      awayTeam:t('E','Curacao'),         date:'Dom 14 Giu', time:'19:00', venue:'NRG Stadium, Houston',            round:'Giornata 1', stats:genStats(t('E','Germania'),t('E','Curacao'))},
  {id:'wc-E-m2', group:'E', homeTeam:t('E','Costa d\'Avorio'),awayTeam:t('E','Ecuador'),        date:'Dom 14 Giu', time:'22:00', venue:'Lincoln Financial Field, Phila.',  round:'Giornata 1', stats:genStats(t('E',"Costa d'Avorio"),t('E','Ecuador'))},
  {id:'wc-E-m3', group:'E', homeTeam:t('E','Germania'),      awayTeam:t('E','Costa d\'Avorio'), date:'Sab 20 Giu', time:'22:00', venue:'BMO Field, Toronto',              round:'Giornata 2', stats:genStats(t('E','Germania'),t('E',"Costa d'Avorio"))},
  {id:'wc-E-m4', group:'E', homeTeam:t('E','Ecuador'),       awayTeam:t('E','Curacao'),         date:'Dom 21 Giu', time:'02:00', venue:'Arrowhead Stadium, Kansas City',   round:'Giornata 2', stats:genStats(t('E','Ecuador'),t('E','Curacao'))},
  {id:'wc-E-m5', group:'E', homeTeam:t('E','Curacao'),       awayTeam:t('E','Costa d\'Avorio'), date:'Gio 25 Giu', time:'22:00', venue:'Lincoln Financial Field, Phila.',  round:'Giornata 3', stats:genStats(t('E','Curacao'),t('E',"Costa d'Avorio"))},
  {id:'wc-E-m6', group:'E', homeTeam:t('E','Ecuador'),       awayTeam:t('E','Germania'),        date:'Gio 25 Giu', time:'22:00', venue:'MetLife Stadium, New Jersey',      round:'Giornata 3', stats:genStats(t('E','Ecuador'),t('E','Germania'))},
  // ── GIRONE F ──
  {id:'wc-F-m1', group:'F', homeTeam:t('F','Olanda'),  awayTeam:t('F','Giappone'), date:'Dom 14 Giu', time:'22:00', venue:'AT&T Stadium, Dallas',             round:'Giornata 1', stats:genStats(t('F','Olanda'),t('F','Giappone'))},
  {id:'wc-F-m2', group:'F', homeTeam:t('F','Svezia'),  awayTeam:t('F','Tunisia'),  date:'Lun 15 Giu', time:'04:00', venue:'Estadio BBVA, Monterrey',          round:'Giornata 1', stats:genStats(t('F','Svezia'),t('F','Tunisia'))},
  {id:'wc-F-m3', group:'F', homeTeam:t('F','Tunisia'), awayTeam:t('F','Giappone'), date:'Sab 20 Giu', time:'06:00', venue:'Estadio BBVA, Monterrey',          round:'Giornata 2', stats:genStats(t('F','Tunisia'),t('F','Giappone'))},
  {id:'wc-F-m4', group:'F', homeTeam:t('F','Olanda'),  awayTeam:t('F','Svezia'),   date:'Sab 20 Giu', time:'19:00', venue:'NRG Stadium, Houston',             round:'Giornata 2', stats:genStats(t('F','Olanda'),t('F','Svezia'))},
  {id:'wc-F-m5', group:'F', homeTeam:t('F','Tunisia'), awayTeam:t('F','Olanda'),   date:'Ven 26 Giu', time:'01:00', venue:'Arrowhead Stadium, Kansas City',   round:'Giornata 3', stats:genStats(t('F','Tunisia'),t('F','Olanda'))},
  {id:'wc-F-m6', group:'F', homeTeam:t('F','Giappone'),awayTeam:t('F','Svezia'),   date:'Ven 26 Giu', time:'01:00', venue:'AT&T Stadium, Dallas',             round:'Giornata 3', stats:genStats(t('F','Giappone'),t('F','Svezia'))},
  // ── GIRONE G ──
  {id:'wc-G-m1', group:'G', homeTeam:t('G','Belgio'),       awayTeam:t('G','Egitto'),       date:'Lun 15 Giu', time:'21:00', venue:'Lumen Field, Seattle',      round:'Giornata 1', stats:genStats(t('G','Belgio'),t('G','Egitto'))},
  {id:'wc-G-m2', group:'G', homeTeam:t('G','Iran'),         awayTeam:t('G','Nuova Zelanda'),date:'Mar 16 Giu', time:'03:00', venue:'SoFi Stadium, Los Angeles', round:'Giornata 1', stats:genStats(t('G','Iran'),t('G','Nuova Zelanda'))},
  {id:'wc-G-m3', group:'G', homeTeam:t('G','Belgio'),       awayTeam:t('G','Iran'),         date:'Dom 21 Giu', time:'21:00', venue:'SoFi Stadium, Los Angeles', round:'Giornata 2', stats:genStats(t('G','Belgio'),t('G','Iran'))},
  {id:'wc-G-m4', group:'G', homeTeam:t('G','Nuova Zelanda'),awayTeam:t('G','Egitto'),       date:'Lun 22 Giu', time:'03:00', venue:'BC Place, Vancouver',        round:'Giornata 2', stats:genStats(t('G','Nuova Zelanda'),t('G','Egitto'))},
  {id:'wc-G-m5', group:'G', homeTeam:t('G','Nuova Zelanda'),awayTeam:t('G','Belgio'),       date:'Sab 27 Giu', time:'05:00', venue:'BC Place, Vancouver',        round:'Giornata 3', stats:genStats(t('G','Nuova Zelanda'),t('G','Belgio'))},
  {id:'wc-G-m6', group:'G', homeTeam:t('G','Egitto'),       awayTeam:t('G','Iran'),         date:'Sab 27 Giu', time:'05:00', venue:'Lumen Field, Seattle',      round:'Giornata 3', stats:genStats(t('G','Egitto'),t('G','Iran'))},
  // ── GIRONE H ──
  {id:'wc-H-m1', group:'H', homeTeam:t('H','Spagna'),       awayTeam:t('H','Capo Verde'),    date:'Lun 15 Giu', time:'18:00', venue:'Atlanta Stadium',              round:'Giornata 1', stats:genStats(t('H','Spagna'),t('H','Capo Verde'))},
  {id:'wc-H-m2', group:'H', homeTeam:t('H','Arabia Saudita'),awayTeam:t('H','Uruguay'),      date:'Mar 16 Giu', time:'24:00', venue:'Hard Rock Stadium, Miami',     round:'Giornata 1', stats:genStats(t('H','Arabia Saudita'),t('H','Uruguay'))},
  {id:'wc-H-m3', group:'H', homeTeam:t('H','Spagna'),       awayTeam:t('H','Arabia Saudita'),date:'Dom 21 Giu', time:'18:00', venue:'Atlanta Stadium',              round:'Giornata 2', stats:genStats(t('H','Spagna'),t('H','Arabia Saudita'))},
  {id:'wc-H-m4', group:'H', homeTeam:t('H','Uruguay'),      awayTeam:t('H','Capo Verde'),    date:'Lun 22 Giu', time:'24:00', venue:'Hard Rock Stadium, Miami',     round:'Giornata 2', stats:genStats(t('H','Uruguay'),t('H','Capo Verde'))},
  {id:'wc-H-m5', group:'H', homeTeam:t('H','Capo Verde'),   awayTeam:t('H','Arabia Saudita'),date:'Sab 27 Giu', time:'02:00', venue:'NRG Stadium, Houston',         round:'Giornata 3', stats:genStats(t('H','Capo Verde'),t('H','Arabia Saudita'))},
  {id:'wc-H-m6', group:'H', homeTeam:t('H','Uruguay'),      awayTeam:t('H','Spagna'),        date:'Sab 27 Giu', time:'02:00', venue:'Estadio Akron, Guadalajara',   round:'Giornata 3', stats:genStats(t('H','Uruguay'),t('H','Spagna'))},
  // ── GIRONE I ──
  {id:'wc-I-m1', group:'I', homeTeam:t('I','Francia'), awayTeam:t('I','Senegal'), date:'Mar 16 Giu', time:'21:00', venue:'MetLife Stadium, New Jersey',     round:'Giornata 1', stats:genStats(t('I','Francia'),t('I','Senegal'))},
  {id:'wc-I-m2', group:'I', homeTeam:t('I','Iraq'),    awayTeam:t('I','Norvegia'),date:'Mer 17 Giu', time:'24:00', venue:'Gillette Stadium, Boston',         round:'Giornata 1', stats:genStats(t('I','Iraq'),t('I','Norvegia'))},
  {id:'wc-I-m3', group:'I', homeTeam:t('I','Francia'), awayTeam:t('I','Iraq'),    date:'Lun 22 Giu', time:'23:00', venue:'Lincoln Financial Field, Phila.',  round:'Giornata 2', stats:genStats(t('I','Francia'),t('I','Iraq'))},
  {id:'wc-I-m4', group:'I', homeTeam:t('I','Norvegia'),awayTeam:t('I','Senegal'), date:'Mar 23 Giu', time:'02:00', venue:'MetLife Stadium, New Jersey',     round:'Giornata 2', stats:genStats(t('I','Norvegia'),t('I','Senegal'))},
  {id:'wc-I-m5', group:'I', homeTeam:t('I','Norvegia'),awayTeam:t('I','Francia'), date:'Ven 26 Giu', time:'21:00', venue:'Gillette Stadium, Boston',         round:'Giornata 3', stats:genStats(t('I','Norvegia'),t('I','Francia'))},
  {id:'wc-I-m6', group:'I', homeTeam:t('I','Senegal'), awayTeam:t('I','Iraq'),    date:'Ven 26 Giu', time:'21:00', venue:'BMO Field, Toronto',               round:'Giornata 3', stats:genStats(t('I','Senegal'),t('I','Iraq'))},
  // ── GIRONE J ──
  {id:'wc-J-m1', group:'J', homeTeam:t('J','Austria'),   awayTeam:t('J','Giordania'), date:'Mar 16 Giu', time:'06:00', venue:'Levi\'s Stadium, San Francisco', round:'Giornata 1', stats:genStats(t('J','Austria'),t('J','Giordania'))},
  {id:'wc-J-m2', group:'J', homeTeam:t('J','Argentina'), awayTeam:t('J','Algeria'),   date:'Mer 17 Giu', time:'03:00', venue:'Arrowhead Stadium, Kansas City', round:'Giornata 1', stats:genStats(t('J','Argentina'),t('J','Algeria'))},
  {id:'wc-J-m3', group:'J', homeTeam:t('J','Argentina'), awayTeam:t('J','Austria'),   date:'Lun 22 Giu', time:'19:00', venue:'AT&T Stadium, Dallas',           round:'Giornata 2', stats:genStats(t('J','Argentina'),t('J','Austria'))},
  {id:'wc-J-m4', group:'J', homeTeam:t('J','Giordania'), awayTeam:t('J','Algeria'),   date:'Mar 23 Giu', time:'05:00', venue:'Levi\'s Stadium, San Francisco', round:'Giornata 2', stats:genStats(t('J','Giordania'),t('J','Algeria'))},
  {id:'wc-J-m5', group:'J', homeTeam:t('J','Algeria'),   awayTeam:t('J','Austria'),   date:'Dom 28 Giu', time:'04:00', venue:'Arrowhead Stadium, Kansas City', round:'Giornata 3', stats:genStats(t('J','Algeria'),t('J','Austria'))},
  {id:'wc-J-m6', group:'J', homeTeam:t('J','Giordania'), awayTeam:t('J','Argentina'), date:'Dom 28 Giu', time:'04:00', venue:'AT&T Stadium, Dallas',           round:'Giornata 3', stats:genStats(t('J','Giordania'),t('J','Argentina'))},
  // ── GIRONE K ──
  {id:'wc-K-m1', group:'K', homeTeam:t('K','Portogallo'), awayTeam:t('K','RD Congo'),   date:'Mer 17 Giu', time:'19:00', venue:'NRG Stadium, Houston',          round:'Giornata 1', stats:genStats(t('K','Portogallo'),t('K','RD Congo'))},
  {id:'wc-K-m2', group:'K', homeTeam:t('K','Uzbekistan'), awayTeam:t('K','Colombia'),   date:'Gio 18 Giu', time:'04:00', venue:'Estadio Azteca, Mexico City',   round:'Giornata 1', stats:genStats(t('K','Uzbekistan'),t('K','Colombia'))},
  {id:'wc-K-m3', group:'K', homeTeam:t('K','Portogallo'), awayTeam:t('K','Uzbekistan'), date:'Mar 23 Giu', time:'19:00', venue:'NRG Stadium, Houston',          round:'Giornata 2', stats:genStats(t('K','Portogallo'),t('K','Uzbekistan'))},
  {id:'wc-K-m4', group:'K', homeTeam:t('K','Colombia'),   awayTeam:t('K','RD Congo'),   date:'Mer 24 Giu', time:'04:00', venue:'Estadio Akron, Guadalajara',    round:'Giornata 2', stats:genStats(t('K','Colombia'),t('K','RD Congo'))},
  {id:'wc-K-m5', group:'K', homeTeam:t('K','Colombia'),   awayTeam:t('K','Portogallo'), date:'Dom 28 Giu', time:'01:30', venue:'Hard Rock Stadium, Miami',      round:'Giornata 3', stats:genStats(t('K','Colombia'),t('K','Portogallo'))},
  {id:'wc-K-m6', group:'K', homeTeam:t('K','RD Congo'),   awayTeam:t('K','Uzbekistan'), date:'Dom 28 Giu', time:'01:30', venue:'Atlanta Stadium',               round:'Giornata 3', stats:genStats(t('K','RD Congo'),t('K','Uzbekistan'))},
  // ── GIRONE L ──
  {id:'wc-L-m1', group:'L', homeTeam:t('L','Inghilterra'),awayTeam:t('L','Croazia'), date:'Mer 17 Giu', time:'22:00', venue:'AT&T Stadium, Dallas',            round:'Giornata 1', stats:genStats(t('L','Inghilterra'),t('L','Croazia'))},
  {id:'wc-L-m2', group:'L', homeTeam:t('L','Ghana'),      awayTeam:t('L','Panama'),  date:'Gio 18 Giu', time:'01:00', venue:'BMO Field, Toronto',              round:'Giornata 1', stats:genStats(t('L','Ghana'),t('L','Panama'))},
  {id:'wc-L-m3', group:'L', homeTeam:t('L','Inghilterra'),awayTeam:t('L','Ghana'),   date:'Mar 23 Giu', time:'22:00', venue:'Gillette Stadium, Boston',        round:'Giornata 2', stats:genStats(t('L','Inghilterra'),t('L','Ghana'))},
  {id:'wc-L-m4', group:'L', homeTeam:t('L','Panama'),     awayTeam:t('L','Croazia'), date:'Mer 24 Giu', time:'01:00', venue:'BMO Field, Toronto',              round:'Giornata 2', stats:genStats(t('L','Panama'),t('L','Croazia'))},
  {id:'wc-L-m5', group:'L', homeTeam:t('L','Panama'),     awayTeam:t('L','Inghilterra'),date:'Sab 27 Giu',time:'23:00',venue:'MetLife Stadium, New Jersey',   round:'Giornata 3', stats:genStats(t('L','Panama'),t('L','Inghilterra'))},
  {id:'wc-L-m6', group:'L', homeTeam:t('L','Croazia'),    awayTeam:t('L','Ghana'),   date:'Sab 27 Giu', time:'23:00', venue:'Lincoln Financial Field, Phila.',round:'Giornata 3', stats:genStats(t('L','Croazia'),t('L','Ghana'))},
];

// ── KNOCKOUT (16, QF, SF, FINAL, BRONZE) ─────────────────────────────────────
const WC_KNOCKOUT = [
  {label:'Sedicesimi',icon:'fa-shield-halved',matches:[
    {id:'wc-r64-73', homeTeam:{name:'2ª A',s:7},  awayTeam:{name:'2ª B',s:7},         date:'Dom 28 Giu',time:'21:00',venue:'SoFi Stadium, Los Angeles',       round:'Sed. (pt.73)',stats:genStats({name:'2A',s:7},{name:'2B',s:7})},
    {id:'wc-r64-74', homeTeam:{name:'1ª E',s:8},  awayTeam:{name:'3ª A/B/C/D/F',s:6}, date:'Lun 29 Giu',time:'22:30',venue:'Gillette Stadium, Boston',         round:'Sed. (pt.74)',stats:genStats({name:'1E',s:8},{name:'3g',s:6})},
    {id:'wc-r64-75', homeTeam:{name:'1ª F',s:8},  awayTeam:{name:'2ª C',s:7},         date:'Lun 29 Giu',time:'19:00',venue:'NRG Stadium, Houston',             round:'Sed. (pt.76)',stats:genStats({name:'1F',s:8},{name:'2C',s:7})},
    {id:'wc-r64-76', homeTeam:{name:'1ª C',s:8},  awayTeam:{name:'2ª F',s:7},         date:'Mar 30 Giu',time:'03:00',venue:'Estadio BBVA, Monterrey',          round:'Sed. (pt.75)',stats:genStats({name:'1C',s:8},{name:'2F',s:7})},
    {id:'wc-r64-77', homeTeam:{name:'1ª I',s:9},  awayTeam:{name:'3ª C/D/F/G/H',s:6}, date:'Mar 30 Giu',time:'23:00',venue:'MetLife Stadium, New Jersey',      round:'Sed. (pt.77)',stats:genStats({name:'1I',s:9},{name:'3g',s:6})},
    {id:'wc-r64-78', homeTeam:{name:'2ª A',s:7},  awayTeam:{name:'2ª I',s:7},         date:'Mar 30 Giu',time:'19:00',venue:'AT&T Stadium, Dallas',             round:'Sed. (pt.78)',stats:genStats({name:'2A',s:7},{name:'2I',s:7})},
    {id:'wc-r64-79', homeTeam:{name:'1ª A',s:7},  awayTeam:{name:'3ª C/E/F/H/I',s:6}, date:'Mer 1 Lug', time:'03:00',venue:'Estadio Azteca, Mexico City',      round:'Sed. (pt.79)',stats:genStats({name:'1A',s:7},{name:'3g',s:6})},
    {id:'wc-r64-80', homeTeam:{name:'1ª L',s:8},  awayTeam:{name:'3ª E/H/I/J/K',s:6}, date:'Mer 1 Lug', time:'18:00',venue:'Atlanta Stadium',                  round:'Sed. (pt.80)',stats:genStats({name:'1L',s:8},{name:'3g',s:6})},
    {id:'wc-r64-81', homeTeam:{name:'1ª D',s:8},  awayTeam:{name:'3ª B/E/F/I/J',s:6}, date:'Gio 2 Lug', time:'02:00',venue:'Levi\'s Stadium, San Francisco',   round:'Sed. (pt.81)',stats:genStats({name:'1D',s:8},{name:'3g',s:6})},
    {id:'wc-r64-82', homeTeam:{name:'1ª G',s:8},  awayTeam:{name:'3ª A/E/H/I/J',s:6}, date:'Mer 1 Lug', time:'22:00',venue:'Lumen Field, Seattle',             round:'Sed. (pt.82)',stats:genStats({name:'1G',s:8},{name:'3g',s:6})},
    {id:'wc-r64-83', homeTeam:{name:'2ª K',s:7},  awayTeam:{name:'2ª L',s:7},         date:'Ven 3 Lug', time:'01:00',venue:'BMO Field, Toronto',               round:'Sed. (pt.83)',stats:genStats({name:'2K',s:7},{name:'2L',s:7})},
    {id:'wc-r64-84', homeTeam:{name:'1ª H',s:8},  awayTeam:{name:'2ª J',s:7},         date:'Gio 2 Lug', time:'21:00',venue:'SoFi Stadium, Los Angeles',        round:'Sed. (pt.84)',stats:genStats({name:'1H',s:8},{name:'2J',s:7})},
    {id:'wc-r64-85', homeTeam:{name:'1ª B',s:7},  awayTeam:{name:'3ª E/F/G/I/J',s:6}, date:'Ven 3 Lug', time:'05:00',venue:'BC Place, Vancouver',              round:'Sed. (pt.85)',stats:genStats({name:'1B',s:7},{name:'3g',s:6})},
    {id:'wc-r64-86', homeTeam:{name:'1ª J',s:9},  awayTeam:{name:'2ª H',s:6},         date:'Sab 4 Lug', time:'24:00',venue:'Hard Rock Stadium, Miami',          round:'Sed. (pt.86)',stats:genStats({name:'1J',s:9},{name:'2H',s:6})},
    {id:'wc-r64-87', homeTeam:{name:'1ª K',s:9},  awayTeam:{name:'3ª D/E/I/J/L',s:6}, date:'Sab 4 Lug', time:'03:30',venue:'Arrowhead Stadium, Kansas City',   round:'Sed. (pt.87)',stats:genStats({name:'1K',s:9},{name:'3g',s:6})},
    {id:'wc-r64-88', homeTeam:{name:'2ª D',s:7},  awayTeam:{name:'2ª G',s:6},         date:'Ven 3 Lug', time:'20:00',venue:'AT&T Stadium, Dallas',             round:'Sed. (pt.88)',stats:genStats({name:'2D',s:7},{name:'2G',s:6})},
  ]},
  {label:'Ottavi di Finale',icon:'fa-bolt',matches:[
    {id:'wc-r32-89',homeTeam:{name:'V pt.74',s:8},awayTeam:{name:'V pt.77',s:8},date:'Sab 4 Lug', time:'23:00',venue:'Lincoln Financial, Philadelphia',round:'Ottavi (pt.89)',stats:genStats({name:'89a',s:8},{name:'89b',s:8})},
    {id:'wc-r32-90',homeTeam:{name:'V pt.73',s:8},awayTeam:{name:'V pt.75',s:8},date:'Sab 4 Lug', time:'19:00',venue:'NRG Stadium, Houston',           round:'Ottavi (pt.90)',stats:genStats({name:'90a',s:8},{name:'90b',s:8})},
    {id:'wc-r32-91',homeTeam:{name:'V pt.76',s:8},awayTeam:{name:'V pt.78',s:8},date:'Dom 5 Lug', time:'22:00',venue:'MetLife Stadium, New Jersey',     round:'Ottavi (pt.91)',stats:genStats({name:'91a',s:8},{name:'91b',s:8})},
    {id:'wc-r32-92',homeTeam:{name:'V pt.79',s:8},awayTeam:{name:'V pt.80',s:8},date:'Lun 6 Lug', time:'02:00',venue:'Estadio Azteca, Mexico City',     round:'Ottavi (pt.92)',stats:genStats({name:'92a',s:8},{name:'92b',s:8})},
    {id:'wc-r32-93',homeTeam:{name:'V pt.83',s:8},awayTeam:{name:'V pt.84',s:8},date:'Lun 6 Lug', time:'21:00',venue:'AT&T Stadium, Dallas',            round:'Ottavi (pt.93)',stats:genStats({name:'93a',s:8},{name:'93b',s:8})},
    {id:'wc-r32-94',homeTeam:{name:'V pt.81',s:8},awayTeam:{name:'V pt.82',s:8},date:'Mar 7 Lug', time:'02:00',venue:'Lumen Field, Seattle',            round:'Ottavi (pt.94)',stats:genStats({name:'94a',s:8},{name:'94b',s:8})},
    {id:'wc-r32-95',homeTeam:{name:'V pt.86',s:9},awayTeam:{name:'V pt.88',s:7},date:'Mar 7 Lug', time:'18:00',venue:'Atlanta Stadium',                 round:'Ottavi (pt.95)',stats:genStats({name:'95a',s:9},{name:'95b',s:7})},
    {id:'wc-r32-96',homeTeam:{name:'V pt.85',s:8},awayTeam:{name:'V pt.87',s:8},date:'Mar 7 Lug', time:'22:00',venue:'BC Place, Vancouver',             round:'Ottavi (pt.96)',stats:genStats({name:'96a',s:8},{name:'96b',s:8})},
  ]},
  {label:'Quarti di Finale',icon:'fa-star',matches:[
    {id:'wc-qf-97',homeTeam:{name:'V pt.89',s:9},awayTeam:{name:'V pt.90',s:9},date:'Gio 9 Lug', time:'22:00',venue:'Gillette Stadium, Boston',      round:'Quarti (pt.97)',stats:genStats({name:'97a',s:9},{name:'97b',s:9})},
    {id:'wc-qf-98',homeTeam:{name:'V pt.93',s:9},awayTeam:{name:'V pt.94',s:9},date:'Ven 10 Lug',time:'21:00',venue:'SoFi Stadium, Los Angeles',     round:'Quarti (pt.98)',stats:genStats({name:'98a',s:9},{name:'98b',s:9})},
    {id:'wc-qf-99',homeTeam:{name:'V pt.91',s:9},awayTeam:{name:'V pt.92',s:9},date:'Sab 11 Lug',time:'23:00',venue:'Hard Rock Stadium, Miami',      round:'Quarti (pt.99)',stats:genStats({name:'99a',s:9},{name:'99b',s:9})},
    {id:'wc-qf-100',homeTeam:{name:'V pt.95',s:9},awayTeam:{name:'V pt.96',s:9},date:'Dom 12 Lug',time:'03:00',venue:'Arrowhead Stadium, Kansas City',round:'Quarti (pt.100)',stats:genStats({name:'100a',s:9},{name:'100b',s:9})},
  ]},
  {label:'Semifinali',icon:'fa-crown',matches:[
    {id:'wc-sf-101',homeTeam:{name:'V pt.97',s:9},awayTeam:{name:'V pt.98',s:9},date:'Mar 14 Lug',time:'21:00',venue:'AT&T Stadium, Dallas',  round:'Semifinale (pt.101)',stats:genStats({name:'101a',s:9},{name:'101b',s:9})},
    {id:'wc-sf-102',homeTeam:{name:'V pt.99',s:9},awayTeam:{name:'V pt.100',s:9},date:'Mer 14 Lug',time:'21:00',venue:'Atlanta Stadium',        round:'Semifinale (pt.102)',stats:genStats({name:'102a',s:9},{name:'102b',s:9})},
  ]},
  {label:'Finale & Bronzo',icon:'fa-trophy',matches:[
    {id:'wc-bronze',homeTeam:{name:'P SF-101',s:9},awayTeam:{name:'P SF-102',s:9},date:'Sab 18 Lug',time:'23:00',venue:'Hard Rock Stadium, Miami',     round:'Finale 3° posto',stats:genStats({name:'Br1',s:9},{name:'Br2',s:9})},
    {id:'wc-final', homeTeam:{name:'V SF-101',s:9},awayTeam:{name:'V SF-102',s:9},date:'Dom 19 Lug',time:'21:00',venue:'MetLife Stadium, New Jersey',   round:'FINALE',          stats:genStats({name:'Fa',s:9},{name:'Fb',s:9})},
  ]},
];
