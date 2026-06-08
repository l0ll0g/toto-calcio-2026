// ── Serie A 2026/27 Data ───────────────────────────────────────────────────────
const SA_TEAMS = [
  {name:'Inter',         flag:'⭐', strength:9},
  {name:'Napoli',        flag:'🔵', strength:9},
  {name:'Juventus',      flag:'⚫', strength:8},
  {name:'AC Milan',      flag:'🔴', strength:8},
  {name:'Atalanta',      flag:'🏔️', strength:8},
  {name:'Roma',          flag:'🟡', strength:7},
  {name:'Lazio',         flag:'🦅', strength:7},
  {name:'Fiorentina',    flag:'🟣', strength:7},
  {name:'Bologna',       flag:'🔵', strength:6},
  {name:'Torino',        flag:'🐂', strength:6},
  {name:'Genoa',         flag:'⚓', strength:5},
  {name:'Udinese',       flag:'⚫', strength:5},
  {name:'Como',          flag:'🌊', strength:5},
  {name:'Cagliari',      flag:'🔴', strength:5},
  {name:'Hellas Verona', flag:'🟡', strength:4},
  {name:'Lecce',         flag:'🌻', strength:4},
  {name:'Parma',         flag:'🏆', strength:4},
  {name:'Venezia',       flag:'🦁', strength:4},
  {name:'Empoli',        flag:'🔵', strength:4},
  {name:'Monza',         flag:'⚪', strength:4},
];

const SA_VENUES = {
  'Inter':'Giuseppe Meazza, Milano','Napoli':'Diego Armando Maradona, Napoli',
  'Juventus':'Allianz Stadium, Torino','AC Milan':'Giuseppe Meazza, Milano',
  'Atalanta':'Gewiss Stadium, Bergamo','Roma':'Stadio Olimpico, Roma',
  'Lazio':'Stadio Olimpico, Roma','Fiorentina':'Artemio Franchi, Firenze',
  'Bologna':'Dall\'Ara, Bologna','Torino':'Olimpico Grande Torino',
  'Genoa':'Luigi Ferraris, Genova','Udinese':'Bluenergy Stadium, Udine',
  'Como':'Giuseppe Sinigaglia, Como','Cagliari':'Unipol Domus, Cagliari',
  'Hellas Verona':'Bentegodi, Verona','Lecce':'Via del Mare, Lecce',
  'Parma':'Ennio Tardini, Parma','Venezia':'Pier Luigi Penzo, Venezia',
  'Empoli':'Carlo Castellani, Empoli','Monza':'Brianteo, Monza',
};

// Dates for each matchday (38 giornate, agosto 2026 - maggio 2027)
function saMatchdayDate(md) {
  const starts = [
    '24 Ago','31 Ago','14 Set','21 Set','28 Set',
    '5 Ott','19 Ott','26 Ott','9 Nov','23 Nov',
    '30 Nov','7 Dic','14 Dic','21 Dic','28 Dic',
    '11 Gen','18 Gen','25 Gen','1 Feb','8 Feb',
    '15 Feb','22 Feb','1 Mar','8 Mar','15 Mar',
    '5 Apr','12 Apr','19 Apr','26 Apr','3 Mag',
    '10 Mag','17 Mag','24 Mag','31 Mag','7 Giu',  // placeholder last 4
    '7 Giu','7 Giu','7 Giu',
  ];
  return starts[md-1] || `Giornata ${md}`;
}

function seededRng(seed) {
  let h = 0;
  for (let i=0;i<seed.length;i++) h=Math.imul(31,h)+seed.charCodeAt(i)|0;
  return () => { h^=h<<13; h^=h>>17; h^=h<<5; return (h>>>0)/0xFFFFFFFF; };
}
function genForm(rnd) {
  return Array.from({length:5},()=>{const r=rnd();return r<0.45?'V':r<0.70?'P':'N';});
}
function genStats(home, away) {
  const rnd = seededRng(home.name+'|'+away.name);
  const t = home.strength+away.strength;
  const pH=Math.max(0.1,(home.strength/t)+0.10);
  const pA=Math.max(0.1,(away.strength/t)-0.05);
  const pD=Math.max(0.15,0.9-Math.abs(home.strength-away.strength)/14);
  const s=pH+pD+pA; const [nH,nD,nA]=[pH/s,pD/s,pA/s];
  return {
    homeForm:genForm(rnd), awayForm:genForm(rnd),
    homeOdds:+Math.max(1.1,Math.min(12,1/nH)).toFixed(2),
    drawOdds:+Math.max(2.5,Math.min(8,1/nD)).toFixed(2),
    awayOdds:+Math.max(1.1,Math.min(15,1/nA)).toFixed(2),
    expertPick:nH>0.45?'1':nD>nA?'X':'2'
  };
}

function buildRoundRobin() {
  const n = SA_TEAMS.length; // 20
  const rotating = [...SA_TEAMS.slice(0,n-1)];
  const fixed = SA_TEAMS[n-1];
  const firstHalf = [];
  for(let r=0;r<n-1;r++){
    const round=[];
    const teams=[fixed,...rotating];
    for(let i=0;i<n/2;i++) round.push([teams[i],teams[n-1-i]]);
    firstHalf.push(round);
    rotating.unshift(rotating.pop());
  }
  const secondHalf = firstHalf.map(round => round.map(([h,a])=>[a,h]));
  return [...firstHalf,...secondHalf];
}

const SA_ROUNDS = buildRoundRobin(); // 38 rounds of 10 matches

function buildSerieAMatchdays() {
  return SA_ROUNDS.map((round, ri) => {
    const md = ri+1;
    const dateStr = saMatchdayDate(md);
    return round.map(([home,away],mi) => ({
      id: `sa-md${md}-m${mi+1}`,
      homeTeam: home, awayTeam: away,
      date: dateStr,
      time: mi<5 ? '15:00' : '20:45',
      venue: SA_VENUES[home.name] || 'Stadio',
      round: `Giornata ${md}`,
      matchday: md,
      stats: genStats(home, away)
    }));
  });
}

const SA_MATCHDAYS = buildSerieAMatchdays(); // array[38][10]
const SA_ALL = SA_MATCHDAYS.flat();
