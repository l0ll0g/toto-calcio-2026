// ════════════════════════════════════════════════════════════════════════════
//  AMICHEVOLI PRE-MONDIALE 2026  (test live della pipeline risultati→classifica)
//  Calendario reale 5–10 giugno 2026. matchId con prefisso "fr-" così passano
//  per lo stesso sistema di pronostici/risultati/punteggio dei gironi.
//  Le bandiere usano flagUrl() di data_worldcup.js (codici nazione lì presenti);
//  per le squadre non-Mondiale aggiungiamo i codici qui sotto.
// ════════════════════════════════════════════════════════════════════════════

// Flag codes for non-World-Cup teams appearing only in friendlies
const FRIENDLY_FLAGS = {
  'Ungheria':'hu','Finlandia':'fi','Cile':'cl','Slovenia':'si','Ucraina':'ua',
  'Italia':'it','Grecia':'gr','Irlanda del Nord':'gb-nir','Kazakistan':'kz',
  'Costa Rica':'cr','Nigeria':'ng','Macedonia del Nord':'mk','Slovacchia':'sk',
};

// Helper: flag URL that also knows friendly-only nations
function friendlyFlag(name) {
  if (typeof FLAG !== 'undefined' && FLAG[name]) return `https://flagcdn.com/w80/${FLAG[name]}.png`;
  if (FRIENDLY_FLAGS[name]) return `https://flagcdn.com/w80/${FRIENDLY_FLAGS[name]}.png`;
  if (typeof flagUrl === 'function') { const f = flagUrl(name); if (f) return f; }
  return null;
}

const FRIENDLY_MATCHES = [
  { id:'fr-01', kickoff:'2026-06-05T17:45:00Z', home:'Ungheria',      away:'Finlandia',        date:'Ven 5 Giu',  time:'19:45', venue:'Puskás Aréna, Budapest' },
  { id:'fr-02', kickoff:'2026-06-06T13:00:00Z', home:'Belgio',        away:'Tunisia',          date:'Sab 6 Giu',  time:'15:00', venue:'Re Baldovino, Bruxelles' },
  { id:'fr-03', kickoff:'2026-06-06T17:45:00Z', home:'Portogallo',    away:'Cile',             date:'Sab 6 Giu',  time:'19:45', venue:'Estádio do Dragão, Porto' },
  { id:'fr-04', kickoff:'2026-06-06T19:00:00Z', home:'Inghilterra',   away:'Nuova Zelanda',    date:'Sab 6 Giu',  time:'21:00', venue:'Wembley, Londra' },
  { id:'fr-05', kickoff:'2026-06-07T16:30:00Z', home:'Danimarca',     away:'Ucraina',          date:'Dom 7 Giu',  time:'18:30', venue:'Parken, Copenaghen' },
  { id:'fr-06', kickoff:'2026-06-07T18:45:00Z', home:'Croazia',       away:'Slovenia',         date:'Dom 7 Giu',  time:'20:45', venue:'Stadion Poljud, Spalato' },
  { id:'fr-07', kickoff:'2026-06-07T18:45:00Z', home:'Grecia',        away:'Italia',           date:'Dom 7 Giu',  time:'20:45', venue:'OAKA, Atene' },
  { id:'fr-08', kickoff:'2026-06-08T19:10:00Z', home:'Francia',       away:'Irlanda del Nord', date:'Lun 8 Giu',  time:'21:10', venue:'Stade de France, Parigi' },
  { id:'fr-09', kickoff:'2026-06-09T17:00:00Z', home:'Ungheria',      away:'Kazakistan',       date:'Mar 9 Giu',  time:'19:00', venue:'Puskás Aréna, Budapest' },
  { id:'fr-10', kickoff:'2026-06-10T19:00:00Z', home:'Inghilterra',   away:'Costa Rica',       date:'Mer 10 Giu', time:'21:00', venue:'Wembley, Londra' },
  { id:'fr-11', kickoff:'2026-06-10T19:45:00Z', home:'Portogallo',    away:'Nigeria',          date:'Mer 10 Giu', time:'21:45', venue:'Estádio José Alvalade, Lisbona' },
];
