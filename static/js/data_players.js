// ── TOP PLAYERS DATABASE (static fallback + search) ───────────────────────────
// Used when API key is not configured or as instant search
const WC_PLAYERS = [
  // ARGENTINA
  {name:'Lionel Messi',nat:'Argentina',natCode:'ar',pos:'Trequartista',age:38,goals:7,assists:5,wc_wins:1,rating:5,club:'Inter Miami'},
  {name:'Julián Álvarez',nat:'Argentina',natCode:'ar',pos:'Attaccante',age:24,goals:4,assists:2,wc_wins:1,rating:4,club:'Atlético Madrid'},
  {name:'Lautaro Martínez',nat:'Argentina',natCode:'ar',pos:'Attaccante',age:27,goals:4,assists:3,wc_wins:1,rating:4,club:'Inter'},
  // BRASILE
  {name:'Vinícius Jr.',nat:'Brasile',natCode:'br',pos:'Ala',age:24,goals:3,assists:4,wc_wins:0,rating:5,club:'Real Madrid'},
  {name:'Rodrygo',nat:'Brasile',natCode:'br',pos:'Ala',age:23,goals:2,assists:3,wc_wins:0,rating:4,club:'Real Madrid'},
  {name:'Raphinha',nat:'Brasile',natCode:'br',pos:'Ala',age:28,goals:3,assists:2,wc_wins:0,rating:4,club:'Barcellona'},
  {name:'Endrick',nat:'Brasile',natCode:'br',pos:'Attaccante',age:18,goals:1,assists:0,wc_wins:0,rating:3,club:'Real Madrid'},
  // FRANCIA
  {name:'Kylian Mbappé',nat:'Francia',natCode:'fr',pos:'Attaccante',age:27,goals:8,assists:3,wc_wins:1,rating:5,club:'Real Madrid'},
  {name:'Antoine Griezmann',nat:'Francia',natCode:'fr',pos:'Trequartista',age:35,goals:4,assists:5,wc_wins:1,rating:4,club:'Atlético Madrid'},
  {name:'Marcus Thuram',nat:'Francia',natCode:'fr',pos:'Attaccante',age:27,goals:3,assists:2,wc_wins:0,rating:4,club:'Inter'},
  // SPAGNA
  {name:'Pedri',nat:'Spagna',natCode:'es',pos:'Centrocampista',age:23,goals:1,assists:2,wc_wins:0,rating:4,club:'Barcellona'},
  {name:'Lamine Yamal',nat:'Spagna',natCode:'es',pos:'Ala',age:18,goals:2,assists:4,wc_wins:0,rating:5,club:'Barcellona'},
  {name:'Álvaro Morata',nat:'Spagna',natCode:'es',pos:'Attaccante',age:32,goals:3,assists:1,wc_wins:0,rating:4,club:'Milan'},
  {name:'Nico Williams',nat:'Spagna',natCode:'es',pos:'Ala',age:22,goals:2,assists:3,wc_wins:0,rating:4,club:'Athletic Bilbao'},
  // INGHILTERRA
  {name:'Harry Kane',nat:'Inghilterra',natCode:'gb-eng',pos:'Attaccante',age:31,goals:3,assists:2,wc_wins:0,rating:5,club:'Bayern Monaco'},
  {name:'Jude Bellingham',nat:'Inghilterra',natCode:'gb-eng',pos:'Centrocampista',age:21,goals:2,assists:3,wc_wins:0,rating:5,club:'Real Madrid'},
  {name:'Phil Foden',nat:'Inghilterra',natCode:'gb-eng',pos:'Trequartista',age:26,goals:1,assists:2,wc_wins:0,rating:4,club:'Manchester City'},
  {name:'Bukayo Saka',nat:'Inghilterra',natCode:'gb-eng',pos:'Ala',age:23,goals:2,assists:3,wc_wins:0,rating:4,club:'Arsenal'},
  // PORTOGALLO
  {name:'Cristiano Ronaldo',nat:'Portogallo',natCode:'pt',pos:'Attaccante',age:41,goals:1,assists:0,wc_wins:0,rating:4,club:'Al Nassr'},
  {name:'Rafael Leão',nat:'Portogallo',natCode:'pt',pos:'Ala',age:25,goals:2,assists:3,wc_wins:0,rating:4,club:'Milan'},
  {name:'Bernardo Silva',nat:'Portogallo',natCode:'pt',pos:'Centrocampista',age:31,goals:1,assists:4,wc_wins:0,rating:4,club:'Manchester City'},
  {name:'Gonçalo Ramos',nat:'Portogallo',natCode:'pt',pos:'Attaccante',age:23,goals:3,assists:1,wc_wins:0,rating:4,club:'PSG'},
  // GERMANIA
  {name:'Florian Wirtz',nat:'Germania',natCode:'de',pos:'Trequartista',age:21,goals:3,assists:4,wc_wins:0,rating:5,club:'Bayern Monaco'},
  {name:'Jamal Musiala',nat:'Germania',natCode:'de',pos:'Trequartista',age:21,goals:2,assists:3,wc_wins:0,rating:4,club:'Bayern Monaco'},
  {name:'Kai Havertz',nat:'Germania',natCode:'de',pos:'Attaccante',age:26,goals:2,assists:2,wc_wins:0,rating:4,club:'Arsenal'},
  // PAESI BASSI
  {name:'Virgil van Dijk',nat:'Paesi Bassi',natCode:'nl',pos:'Difensore',age:33,goals:0,assists:0,wc_wins:0,rating:4,club:'Liverpool'},
  {name:'Cody Gakpo',nat:'Paesi Bassi',natCode:'nl',pos:'Attaccante',age:25,goals:3,assists:2,wc_wins:0,rating:4,club:'Liverpool'},
  {name:'Xavi Simons',nat:'Paesi Bassi',natCode:'nl',pos:'Trequartista',age:22,goals:2,assists:3,wc_wins:0,rating:4,club:'PSG'},
  // BELGIO
  {name:'Kevin De Bruyne',nat:'Belgio',natCode:'be',pos:'Centrocampista',age:35,goals:2,assists:3,wc_wins:0,rating:5,club:'Manchester City'},
  {name:'Romelu Lukaku',nat:'Belgio',natCode:'be',pos:'Attaccante',age:32,goals:1,assists:1,wc_wins:0,rating:4,club:'Napoli'},
  // COLOMBIA
  {name:'Luis Díaz',nat:'Colombia',natCode:'co',pos:'Ala',age:27,goals:3,assists:2,wc_wins:0,rating:4,club:'Liverpool'},
  {name:'James Rodríguez',nat:'Colombia',natCode:'co',pos:'Trequartista',age:33,goals:2,assists:3,wc_wins:0,rating:4,club:'Rayo Vallecano'},
  // USA
  {name:'Christian Pulisic',nat:'USA',natCode:'us',pos:'Ala',age:26,goals:2,assists:2,wc_wins:0,rating:4,club:'Milan'},
  {name:'Gio Reyna',nat:'USA',natCode:'us',pos:'Trequartista',age:22,goals:1,assists:2,wc_wins:0,rating:3,club:'Borussia Dortmund'},
  // MESSICO
  {name:'Hirving Lozano',nat:'Messico',natCode:'mx',pos:'Ala',age:30,goals:2,assists:2,wc_wins:0,rating:4,club:'PSV'},
  // URUGUAY
  {name:'Darwin Núñez',nat:'Uruguay',natCode:'uy',pos:'Attaccante',age:25,goals:3,assists:1,wc_wins:0,rating:4,club:'Liverpool'},
  {name:'Federico Valverde',nat:'Uruguay',natCode:'uy',pos:'Centrocampista',age:26,goals:2,assists:3,wc_wins:0,rating:4,club:'Real Madrid'},
  // GIAPPONE
  {name:'Takefusa Kubo',nat:'Giappone',natCode:'jp',pos:'Ala',age:23,goals:2,assists:3,wc_wins:0,rating:4,club:'Real Sociedad'},
  // MAROCCO
  {name:'Hakim Ziyech',nat:'Marocco',natCode:'ma',pos:'Trequartista',age:32,goals:1,assists:2,wc_wins:0,rating:4,club:'Galatasaray'},
  {name:'Achraf Hakimi',nat:'Marocco',natCode:'ma',pos:'Terzino',age:26,goals:1,assists:3,wc_wins:0,rating:4,club:'PSG'},
  // SENEGAL
  {name:'Sadio Mané',nat:'Senegal',natCode:'sn',pos:'Ala',age:34,goals:1,assists:1,wc_wins:0,rating:4,club:'Al Nassr'},
  // NIGERIA
  {name:'Victor Osimhen',nat:'Nigeria',natCode:'ng',pos:'Attaccante',age:26,goals:0,assists:0,wc_wins:0,rating:4,club:'Galatasaray'},
  // NORVEGIA
  {name:'Erling Haaland',nat:'Norvegia',natCode:'no',pos:'Attaccante',age:25,goals:0,assists:0,wc_wins:0,rating:5,club:'Manchester City'},
  // SERBIA
  {name:'Dušan Vlahović',nat:'Serbia',natCode:'rs',pos:'Attaccante',age:25,goals:0,assists:0,wc_wins:0,rating:4,club:'Juventus'},
  // TURCHIA
  {name:'Arda Güler',nat:'Turchia',natCode:'tr',pos:'Trequartista',age:20,goals:0,assists:0,wc_wins:0,rating:4,club:'Real Madrid'},
  {name:'Hakan Çalhanoğlu',nat:'Turchia',natCode:'tr',pos:'Centrocampista',age:31,goals:0,assists:0,wc_wins:0,rating:4,club:'Inter'},
  // AUSTRIA
  {name:'Marcel Sabitzer',nat:'Austria',natCode:'at',pos:'Centrocampista',age:31,goals:0,assists:0,wc_wins:0,rating:3,club:'Borussia Dortmund'},
  // SVIZZERA
  {name:'Granit Xhaka',nat:'Svizzera',natCode:'ch',pos:'Centrocampista',age:33,goals:0,assists:0,wc_wins:0,rating:4,club:'Bayer Leverkusen'},
  {name:'Breel Embolo',nat:'Svizzera',natCode:'ch',pos:'Attaccante',age:27,goals:1,assists:0,wc_wins:0,rating:3,club:'Monaco'},
  // COREA DEL SUD
  {name:'Son Heung-min',nat:'Corea del S.',natCode:'kr',pos:'Ala',age:34,goals:1,assists:2,wc_wins:0,rating:4,club:'Tottenham'},
];

// Pool di ricerca capocannoniere: unisce il database curato (WC_PLAYERS, con
// dati ricchi tipo Mondiali vinti) a TUTTI i convocati delle 48 rose (WC_SQUADS),
// così qualunque giocatore in lista è cercabile. Costruito una sola volta.
let _TS_POOL = null;
function tsPool() {
  if (_TS_POOL) return _TS_POOL;
  const out = [], seen = new Set();
  if (typeof WC_PLAYERS !== 'undefined') {
    WC_PLAYERS.forEach(p => { out.push(p); seen.add(p.name.toLowerCase()); });
  }
  const POSMAP = { GK:'Portiere', DF:'Difensore', CC:'Centrocampista', AT:'Attaccante' };
  if (typeof WC_SQUADS !== 'undefined') {
    for (const [team, t] of Object.entries(WC_SQUADS)) {
      (t.players || []).forEach(p => {
        const key = p.name.toLowerCase();
        if (seen.has(key)) return;          // mantieni la versione curata se esiste
        seen.add(key);
        out.push({ name:p.name, nat:team, natCode:t.natCode||'',
                   pos:POSMAP[p.pos]||p.pos, age:p.age, goals:p.goals,
                   assists:p.assists||0, wc_wins:0, rating:p.rating||3,
                   club:p.club, games:p.caps||0 });
      });
    }
  }
  _TS_POOL = out;
  return out;
}

function searchPlayers(query) {
  if (!query || query.length < 2) return [];
  const q = query.toLowerCase();
  return tsPool().filter(p =>
    p.name.toLowerCase().includes(q) ||
    (p.nat||'').toLowerCase().includes(q) ||
    (p.club||'').toLowerCase().includes(q) ||
    (p.pos||'').toLowerCase().includes(q)
  ).slice(0, 12);
}