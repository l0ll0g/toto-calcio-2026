// ════════════════════════════════════════════════════════════════════════════
//  BRACKET ENGINE — computes group standings & knockout bracket from the
//  user's own predictions (group scores + KO exact scores).
//  Depends on: data_worldcup.js (WC_GROUPS, WC_ALL_MATCHES, WC_KNOCKOUT, FLAG)
// ════════════════════════════════════════════════════════════════════════════

// FIFA Men's World Ranking (approx, used only as the final tie-break).
// Lower number = better rank.
const FIFA_RANK = {
  'Argentina':1,'Francia':2,'Spagna':3,'Inghilterra':4,'Brasile':5,'Portogallo':6,
  'Olanda':7,'Belgio':8,'Germania':9,'Croazia':10,'Italia':11,'Marocco':12,
  'Colombia':13,'Uruguay':14,'USA':15,'Messico':16,'Svizzera':17,'Senegal':18,
  'Giappone':19,'Danimarca':20,'Iran':21,'Corea del Sud':22,'Australia':23,
  'Ecuador':24,'Austria':25,'Ucraina':26,'Svezia':27,'Turchia':28,'Galles':29,
  'Polonia':30,'Egitto':31,'Serbia':32,'Norvegia':33,'Costa d\'Avorio':34,
  'Nigeria':35,'Russia':36,'Scozia':37,'Algeria':38,'Ungheria':39,'Repubblica Ceca':40,
  'Camerun':41,'Tunisia':42,'Mali':43,'Romania':44,'Slovacchia':45,'Paraguay':46,
  'Costa Rica':47,'Arabia Saudita':48,'Qatar':49,'Sudafrica':50,'Grecia':51,
  'Bosnia':52,'Irlanda':53,'RD Congo':54,'Ghana':55,'Capo Verde':56,'Panama':57,
  'Uzbekistan':58,'Giordania':59,'Iraq':60,'Nuova Zelanda':61,'Curacao':62,
  'Haiti':63,'Canada':18,
};
function fifaRank(team){ return FIFA_RANK[team] != null ? FIFA_RANK[team] : 99; }

// ── Compute one group's standing table from the user's predicted scores ──────
// predictions: { 'wc-A-m1': {pick, score}, ... }
// Returns array of {team, P, W, D, L, GF, GA, GD, pts, rank} sorted 1→4.
function computeGroupStanding(groupLetter, predictions) {
  const teams = WC_GROUPS[groupLetter].map(t => t.name);
  const row = {};
  teams.forEach(t => { row[t] = {team:t, P:0,W:0,D:0,L:0,GF:0,GA:0,GD:0,pts:0}; });

  const matches = WC_ALL_MATCHES.filter(m => m.group === groupLetter);
  let complete = true;

  for (const m of matches) {
    const pred = predictions[m.id];
    if (!pred || !pred.score || !pred.score.includes('-')) { complete = false; continue; }
    const [h, a] = pred.score.split('-').map(n => parseInt(n));
    if (isNaN(h) || isNaN(a)) { complete = false; continue; }
    const hT = m.homeTeam.name, aT = m.awayTeam.name;
    if (!row[hT] || !row[aT]) continue;
    row[hT].P++; row[aT].P++;
    row[hT].GF += h; row[hT].GA += a;
    row[aT].GF += a; row[aT].GA += h;
    if (h > a)      { row[hT].W++; row[aT].L++; row[hT].pts += 3; }
    else if (a > h) { row[aT].W++; row[hT].L++; row[aT].pts += 3; }
    else            { row[hT].D++; row[aT].D++; row[hT].pts += 1; row[aT].pts += 1; }
  }

  teams.forEach(t => { row[t].GD = row[t].GF - row[t].GA; });

  // Sort: pts → GD → GF → FIFA rank (final tie-break, lower = better)
  const standing = teams.map(t => row[t]).sort((x, y) => {
    if (y.pts !== x.pts) return y.pts - x.pts;
    if (y.GD  !== x.GD)  return y.GD  - x.GD;
    if (y.GF  !== x.GF)  return y.GF  - x.GF;
    return fifaRank(x.team) - fifaRank(y.team);
  });
  standing.forEach((r, i) => { r.rank = i + 1; });
  standing._complete = complete;
  return standing;
}

// ── Compute all 12 group standings ───────────────────────────────────────────
function computeAllStandings(predictions) {
  const out = {};
  let allComplete = true;
  for (const g of Object.keys(WC_GROUPS)) {
    out[g] = computeGroupStanding(g, predictions);
    if (!out[g]._complete) allComplete = false;
  }
  out._allComplete = allComplete;
  return out;
}

// ── Best 8 third-placed teams (official FIFA criteria) ───────────────────────
// pts → GD → GF → (fair-play not tracked → skipped) → FIFA rank
function bestThirds(standings) {
  const thirds = Object.keys(WC_GROUPS)
    .map(g => ({ ...standings[g][2], group: g }))
    .filter(t => t && t.team);
  thirds.sort((x, y) => {
    if (y.pts !== x.pts) return y.pts - x.pts;
    if (y.GD  !== x.GD)  return y.GD  - x.GD;
    if (y.GF  !== x.GF)  return y.GF  - x.GF;
    return fifaRank(x.team) - fifaRank(y.team);
  });
  return thirds.slice(0, 8); // top 8 qualify
}

// ── Official 2026 mapping: which groups' thirds feed which R32 slot ──────────
// The 8 qualifying third-place groups, sorted alphabetically, map to slots by
// this lookup (FIFA's official combination table for 12 groups / 8 thirds).
// Key = the 8 group letters that produced a third (sorted, joined), value =
// ordered assignment to the eight "3rd-place" slots in bracket order:
//   slots order = [1C,1D,1F,1E,1G,1A,1L,1B,1K,...]  (we use the bracket below)
// To keep it deterministic & robust for ANY 8-of-12 combination, we assign the
// 8 qualified thirds to the 8 third-slots by descending quality (best third
// faces, in bracket order, the slots as listed in THIRD_SLOTS).
const THIRD_SLOTS = [
  'wc-r64-74',  // 1E vs 3rd
  'wc-r64-77',  // 1I vs 3rd
  'wc-r64-79',  // 1A vs 3rd
  'wc-r64-80',  // 1L vs 3rd
  'wc-r64-81',  // 1D vs 3rd
  'wc-r64-82',  // 1G vs 3rd
  'wc-r64-85',  // 1B vs 3rd
  'wc-r64-87',  // 1K vs 3rd
];

// Which (place, group) feeds each R32 home/away slot.
// Format: [placement, group]  placement: 1|2|3  (3 = handled separately)
const R32_SLOTS = {
  'wc-r64-73': { home:[2,'A'], away:[2,'B'] },
  'wc-r64-74': { home:[1,'E'], away:[3,null] },
  'wc-r64-75': { home:[1,'F'], away:[2,'C'] },
  'wc-r64-76': { home:[1,'C'], away:[2,'F'] },
  'wc-r64-77': { home:[1,'I'], away:[3,null] },
  'wc-r64-78': { home:[2,'A'], away:[2,'I'] },  // note: dup 2A handled by clone
  'wc-r64-79': { home:[1,'A'], away:[3,null] },
  'wc-r64-80': { home:[1,'L'], away:[3,null] },
  'wc-r64-81': { home:[1,'D'], away:[3,null] },
  'wc-r64-82': { home:[1,'G'], away:[3,null] },
  'wc-r64-83': { home:[2,'K'], away:[2,'L'] },
  'wc-r64-84': { home:[1,'H'], away:[2,'J'] },
  'wc-r64-85': { home:[1,'B'], away:[3,null] },
  'wc-r64-86': { home:[1,'J'], away:[2,'H'] },
  'wc-r64-87': { home:[1,'K'], away:[3,null] },
  'wc-r64-88': { home:[2,'D'], away:[2,'G'] },
};
// Fix the duplicate 2A: slot 73 uses 2A, slot 78 should use 2E (correct bracket)
R32_SLOTS['wc-r64-78'].home = [2,'E'];

// ── Resolve a team reference from standings ──────────────────────────────────
function resolveSlot(ref, standings) {
  const [place, grp] = ref;
  if (place === 3) return null; // handled via thirds assignment
  const st = standings[grp];
  if (!st || !st._complete) return null;
  const r = st[place - 1];
  return r ? r.team : null;
}

// ── Build the full bracket from predictions ──────────────────────────────────
// Returns a deep structure mirroring WC_KNOCKOUT but with resolved team names
// (or null where not yet determined), plus the user's KO score predictions.
// koPreds: { 'wc-r64-73': {score:'2-1'}, ... }
function computeBracket(predictions, koPreds) {
  koPreds = koPreds || {};
  const standings = computeAllStandings(predictions);

  // Assign best thirds to third-slots (best third → first slot, etc.)
  const thirds = standings._allComplete ? bestThirds(standings) : [];
  const thirdBySlot = {};
  THIRD_SLOTS.forEach((slotId, i) => {
    thirdBySlot[slotId] = thirds[i] ? thirds[i].team : null;
  });

  // Winner of a KO match given resolved home/away + user's score
  function koWinner(matchId, home, away) {
    if (!home || !away) return null;
    const p = koPreds[matchId];
    if (!p || !p.score || !p.score.includes('-')) return null;
    const [h, a] = p.score.split('-').map(n => parseInt(n));
    if (isNaN(h) || isNaN(a)) return null;
    if (h > a) return home;
    if (a > h) return away;
    // Draw in regular time → winner decided by supplementari/rigori (adv field)
    if (p.adv === home || p.adv === away) return p.adv;
    return null; // draw but no advancement chosen yet
  }
  function koLoser(matchId, home, away) {
    const w = koWinner(matchId, home, away);
    if (!w) return null;
    return w === home ? away : home;
  }

  // Resolve R32 (sedicesimi)
  const teamsAt = {}; // matchId → {home, away}
  for (const slotId of Object.keys(R32_SLOTS)) {
    const def = R32_SLOTS[slotId];
    let home = def.home[0] === 3 ? thirdBySlot[slotId] : resolveSlot(def.home, standings);
    let away = def.away[0] === 3 ? thirdBySlot[slotId] : resolveSlot(def.away, standings);
    teamsAt[slotId] = { home, away };
  }

  // Winners feed later rounds. Map by "pt." reference used in WC_KNOCKOUT.
  // R32 match pt numbers: wc-r64-73 → 73 ... wc-r64-88 → 88
  const winnerOf = {}; // pt number → team
  const loserOf  = {};
  for (const slotId of Object.keys(R32_SLOTS)) {
    const pt = parseInt(slotId.split('-').pop());
    const { home, away } = teamsAt[slotId];
    winnerOf[pt] = koWinner(slotId, home, away);
    loserOf[pt]  = koLoser(slotId, home, away);
  }

  // Helper: resolve a "V pt.NN" / "P SF-NNN" style reference
  function refTeam(name) {
    if (!name) return null;
    let m = name.match(/V pt\.(\d+)/);
    if (m) return winnerOf[parseInt(m[1])] || null;
    m = name.match(/V SF-(\d+)/);
    if (m) return winnerOf[parseInt(m[1])] || null;
    m = name.match(/P SF-(\d+)/);
    if (m) return loserOf[parseInt(m[1])] || null;
    return null;
  }

  // Now walk the remaining rounds in order, resolving each from prior winners.
  // We iterate the WC_KNOCKOUT definition to keep dates/venues.
  const rounds = [];
  for (const round of WC_KNOCKOUT) {
    const matches = round.matches.map(m => {
      let home, away;
      if (round.label === 'Sedicesimi') {
        home = teamsAt[m.id]?.home || null;
        away = teamsAt[m.id]?.away || null;
      } else {
        home = refTeam(m.homeTeam.name);
        away = refTeam(m.awayTeam.name);
      }
      const pred = koPreds[m.id] || {};
      const w = koWinner(m.id, home, away);
      // store winner for downstream rounds
      const pt = parseInt((m.id.match(/(\d+)$/) || [])[1]);
      if (pt) { winnerOf[pt] = w; loserOf[pt] = w ? (w===home?away:home) : null; }
      return {
        id: m.id, round: m.round, date: m.date, time: m.time, venue: m.venue,
        home, away,
        homePlaceholder: m.homeTeam.name,
        awayPlaceholder: m.awayTeam.name,
        score: pred.score || '',
        winner: w,
      };
    });
    rounds.push({ label: round.label, icon: round.icon, matches });
  }

  return { standings, thirds, rounds };
}

// ── Count how many KO predictions are filled / total available ───────────────
function countKoProgress(predictions, koPreds) {
  const { rounds } = computeBracket(predictions, koPreds);
  let total = 0, filled = 0, available = 0;
  for (const r of rounds) {
    for (const m of r.matches) {
      total++;
      const hasTeams = m.home && m.away;
      if (hasTeams) available++;
      // A match counts as filled only when it has a resolved winner
      if (hasTeams && m.winner) filled++;
    }
  }
  return { total, filled, available };
}
