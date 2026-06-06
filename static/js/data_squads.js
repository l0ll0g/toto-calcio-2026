// ═══════════════════════════════════════════════════════════════════════════════
// FIFA WORLD CUP 2026 — ROSE COMPLETE + FORMAZIONI + STATS
// Fonte: dati ufficiali; formazioni: Goal.com (02/06/2026)
// Stats qualificazioni/nazionali aggiornate a giugno 2026
// ═══════════════════════════════════════════════════════════════════════════════

const WC_SQUADS = {
  // KEY STATS: age, caps (presenze totali naz.), goals (gol naz.), assists (assist naz.)
  // rating 1-5, starter: titolare probabile

  'Messico':{group:'A',coach:'Javier Aguirre',formation:'4-3-3',natCode:'mx',
    starting11:['Rangel','Sanchez','Montes','Vasquez','Gallardo','Pineda','Alvarez','Fidalgo','Vega','Jimenez','Quiñones'],
    players:[
      {name:'Rangel',pos:'GK',age:26,caps:18,goals:0,assists:0,rating:3,starter:true,club:'Chivas'},
      {name:'Acevedo',pos:'GK',age:28,caps:12,goals:0,assists:0,rating:3,starter:false,club:'Santos Laguna'},
      {name:'Ochoa',pos:'GK',age:40,caps:141,goals:0,assists:0,rating:4,starter:false,club:'AEL Limassol'},
      {name:'Gallardo',pos:'DF',age:30,caps:64,goals:2,assists:4,rating:3,starter:true,club:'Toluca'},
      {name:'Sanchez',pos:'DF',age:28,caps:55,goals:1,assists:1,rating:3,starter:true,club:'PAOK'},
      {name:'Montes',pos:'DF',age:27,caps:48,goals:2,assists:1,rating:4,starter:true,club:'Lokomotiv'},
      {name:'Vasquez',pos:'DF',age:27,caps:51,goals:1,assists:1,rating:3,starter:true,club:'Genoa'},
      {name:'Chavez',pos:'DF',age:25,caps:28,goals:0,assists:3,rating:3,starter:false,club:'AZ Alkmaar'},
      {name:'Pineda',pos:'CC',age:29,caps:60,goals:3,assists:5,rating:4,starter:true,club:'AEK Atene'},
      {name:'Alvarez',pos:'CC',age:29,caps:72,goals:4,assists:3,rating:4,starter:true,club:'Fenerbahce'},
      {name:'Fidalgo',pos:'CC',age:29,caps:19,goals:2,assists:4,rating:4,starter:true,club:'Real Betis'},
      {name:'Vega',pos:'AT',age:23,caps:31,goals:7,assists:3,rating:4,starter:true,club:'Toluca'},
      {name:'Jimenez',pos:'AT',age:33,caps:109,goals:36,assists:12,rating:4,starter:true,club:'Fulham'},
      {name:'Quiñones',pos:'AT',age:26,caps:29,goals:5,assists:4,rating:4,starter:true,club:'Al-Qadsiah'},
      {name:'Gimenez',pos:'AT',age:23,caps:24,goals:10,assists:2,rating:5,starter:false,club:'Milan'},
    ]},
  'Sudafrica':{group:'A',coach:'Hugo Broos',formation:'4-4-2',natCode:'za',
    starting11:['Williams','Mudau','Sibisi','Mbokazi','Modiba','Adams','Mokoena','Sithole','Zwane','Mofokeng','Makgopa'],
    players:[
      {name:'Williams',pos:'GK',age:32,caps:54,goals:0,assists:0,rating:3,starter:true,club:'Sundowns'},
      {name:'Chaine',pos:'GK',age:30,caps:18,goals:0,assists:0,rating:3,starter:false,club:'Orlando Pirates'},
      {name:'Modiba',pos:'DF',age:27,caps:35,goals:1,assists:3,rating:3,starter:true,club:'Sundowns'},
      {name:'Mudau',pos:'DF',age:24,caps:28,goals:0,assists:2,rating:3,starter:true,club:'Sundowns'},
      {name:'Sibisi',pos:'DF',age:26,caps:22,goals:1,assists:0,rating:3,starter:true,club:'Orlando Pirates'},
      {name:'Mbokazi',pos:'DF',age:25,caps:20,goals:0,assists:1,rating:3,starter:true,club:'Chicago Fire'},
      {name:'Ndamane',pos:'DF',age:29,caps:31,goals:2,assists:4,rating:3,starter:false,club:'Sundowns'},
      {name:'Mokoena',pos:'CC',age:30,caps:58,goals:2,assists:5,rating:4,starter:true,club:'Sundowns'},
      {name:'Sithole',pos:'CC',age:25,caps:19,goals:1,assists:2,rating:3,starter:true,club:'Tondela'},
      {name:'Adams',pos:'CC',age:28,caps:34,goals:3,assists:3,rating:3,starter:true,club:'Sundowns'},
      {name:'Zwane',pos:'AT',age:29,caps:45,goals:12,assists:7,rating:4,starter:true,club:'Sundowns'},
      {name:'Makgopa',pos:'AT',age:24,caps:22,goals:7,assists:2,rating:4,starter:true,club:'Orlando Pirates'},
      {name:'Appollis',pos:'AT',age:23,caps:17,goals:5,assists:4,rating:3,starter:false,club:'Orlando Pirates'},
      {name:'Mofokeng',pos:'AT',age:20,caps:14,goals:3,assists:3,rating:4,starter:true,club:'Orlando Pirates'},
      {name:'Foster',pos:'AT',age:26,caps:18,goals:4,assists:2,rating:3,starter:false,club:'Burnley'},
    ]},
  'Corea del Sud':{group:'A',coach:'Hong Myung-bo',formation:'4-2-3-1',natCode:'kr',
    starting11:['Kim Seung-gyu','Seol Young-woo','Kim Min-jae','Lee Han-beom','Lee Tae-seok','Jens Castrop','Bae Jun-ho','Lee Kang-in','Lee Jae-sung','Hwang Hee-chan','Son Heung-min'],
    players:[
      {name:'Kim Seung-gyu',pos:'GK',age:37,caps:82,goals:0,assists:0,rating:3,starter:true,club:'FC Tokyo'},
      {name:'Jo Hyeon-woo',pos:'GK',age:32,caps:38,goals:0,assists:0,rating:3,starter:false,club:'Ulsan HD'},
      {name:'Kim Min-jae',pos:'DF',age:28,caps:67,goals:3,assists:1,rating:5,starter:true,club:'Bayern Monaco'},
      {name:'Seol Young-woo',pos:'DF',age:25,caps:22,goals:0,assists:1,rating:3,starter:true,club:'Stella Rossa'},
      {name:'Jens Castrop',pos:'DF',age:24,caps:18,goals:0,assists:2,rating:3,starter:true,club:'B.Monchengladbach'},
      {name:'Lee Han-beom',pos:'DF',age:26,caps:20,goals:1,assists:0,rating:3,starter:true,club:'Midtjylland'},
      {name:'Lee Tae-seok',pos:'DF',age:26,caps:19,goals:0,assists:1,rating:3,starter:true,club:'Austria Vienna'},
      {name:'Bae Jun-ho',pos:'CC',age:22,caps:24,goals:4,assists:3,rating:4,starter:true,club:'Stoke City'},
      {name:'Lee Kang-in',pos:'CC',age:23,caps:54,goals:9,assists:11,rating:5,starter:true,club:'PSG'},
      {name:'Lee Jae-sung',pos:'CC',age:31,caps:68,goals:6,assists:8,rating:4,starter:true,club:'Mainz'},
      {name:'Hwang In-beom',pos:'CC',age:27,caps:49,goals:5,assists:6,rating:4,starter:false,club:'Feyenoord'},
      {name:'Hwang Hee-chan',pos:'AT',age:28,caps:62,goals:18,assists:9,rating:4,starter:true,club:'Wolves'},
      {name:'Son Heung-min',pos:'AT',age:34,caps:126,goals:38,assists:27,rating:5,starter:true,club:'Los Angeles FC'},
      {name:'Oh Hyeon-gyu',pos:'AT',age:23,caps:22,goals:5,assists:2,rating:3,starter:false,club:'Besiktas'},
      {name:'Cho Gue-sung',pos:'AT',age:25,caps:18,goals:4,assists:1,rating:3,starter:false,club:'Midtjylland'},
    ]},
  'Repubblica Ceca':{group:'A',coach:'Miroslav Koubek',formation:'4-2-3-1',natCode:'cz',
    starting11:['Stanek','Coufal','Hranac','Zima','Jurasek','Soucek','Provod','Sulc','Sadilek','Hlozek','Schick'],
    players:[
      {name:'Stanek',pos:'GK',age:27,caps:29,goals:0,assists:0,rating:4,starter:true,club:'Slavia Praga'},
      {name:'Hornicek',pos:'GK',age:28,caps:8,goals:0,assists:0,rating:3,starter:false,club:'Braga'},
      {name:'Coufal',pos:'DF',age:32,caps:51,goals:1,assists:4,rating:4,starter:true,club:'Hoffenheim'},
      {name:'Hranac',pos:'DF',age:26,caps:28,goals:1,assists:0,rating:4,starter:true,club:'Hoffenheim'},
      {name:'Zima',pos:'DF',age:24,caps:22,goals:1,assists:0,rating:3,starter:true,club:'Slavia Praga'},
      {name:'Jurasek',pos:'DF',age:24,caps:18,goals:0,assists:3,rating:3,starter:true,club:'Slavia Praga'},
      {name:'Holes',pos:'DF',age:27,caps:30,goals:2,assists:1,rating:3,starter:false,club:'Slavia Praga'},
      {name:'Soucek',pos:'CC',age:30,caps:78,goals:14,assists:6,rating:4,starter:true,club:'West Ham'},
      {name:'Provod',pos:'CC',age:27,caps:32,goals:5,assists:4,rating:4,starter:true,club:'Slavia Praga'},
      {name:'Sulc',pos:'CC',age:24,caps:19,goals:3,assists:5,rating:4,starter:true,club:'Lyon'},
      {name:'Sadilek',pos:'CC',age:26,caps:25,goals:2,assists:3,rating:3,starter:true,club:'Slavia Praga'},
      {name:'Darida',pos:'CC',age:35,caps:88,goals:7,assists:9,rating:3,starter:false,club:'Hradec Kralove'},
      {name:'Schick',pos:'AT',age:29,caps:62,goals:28,assists:7,rating:5,starter:true,club:'Bayer Leverkusen'},
      {name:'Hlozek',pos:'AT',age:22,caps:24,goals:8,assists:4,rating:4,starter:true,club:'Hoffenheim'},
      {name:'Chytil',pos:'AT',age:24,caps:21,goals:6,assists:2,rating:3,starter:false,club:'Slavia Praga'},
    ]},
  'Canada':{group:'B',coach:'Jesse Marsch',formation:'4-4-2',natCode:'ca',
    starting11:['Crepeau','Laryea','Bombito','Jones','Davies','Buchanan','Kone','Eustaquio','Sigur','David','Oluwaseyi'],
    players:[
      {name:'Crepeau',pos:'GK',age:33,caps:35,goals:0,assists:0,rating:3,starter:true,club:'Orlando'},
      {name:'St. Clair',pos:'GK',age:24,caps:12,goals:0,assists:0,rating:3,starter:false,club:'Inter Miami'},
      {name:'Davies',pos:'DF',age:25,caps:54,goals:4,assists:12,rating:5,starter:true,club:'Bayern Monaco'},
      {name:'Johnston',pos:'DF',age:25,caps:30,goals:1,assists:4,rating:4,starter:false,club:'Celtic'},
      {name:'Bombito',pos:'DF',age:24,caps:18,goals:0,assists:0,rating:3,starter:true,club:'Nizza'},
      {name:'Jones',pos:'DF',age:25,caps:22,goals:0,assists:1,rating:3,starter:true,club:'Middlesbrough'},
      {name:'Laryea',pos:'DF',age:28,caps:38,goals:2,assists:5,rating:3,starter:true,club:'Toronto'},
      {name:'Sigur',pos:'DF',age:26,caps:20,goals:0,assists:2,rating:3,starter:true,club:'Hadjuk Spalato'},
      {name:'Eustaquio',pos:'CC',age:27,caps:48,goals:6,assists:8,rating:4,starter:true,club:'Porto'},
      {name:'Kone',pos:'CC',age:23,caps:19,goals:2,assists:3,rating:4,starter:true,club:'Sassuolo'},
      {name:'Buchanan',pos:'CC',age:26,caps:38,goals:5,assists:6,rating:4,starter:true,club:'Villarreal'},
      {name:'Osorio',pos:'CC',age:26,caps:30,goals:3,assists:4,rating:3,starter:false,club:'Toronto'},
      {name:'David',pos:'AT',age:25,caps:50,goals:22,assists:8,rating:5,starter:true,club:'Juventus'},
      {name:'Oluwaseyi',pos:'AT',age:22,caps:14,goals:5,assists:2,rating:4,starter:true,club:'Villarreal'},
      {name:'Larin',pos:'AT',age:29,caps:55,goals:16,assists:5,rating:3,starter:false,club:'Southampton'},
    ]},
  'Qatar':{group:'B',coach:'Julen Lopetegui',formation:'4-3-3',natCode:'qa',
    starting11:['Barsham','Pedro Miguel','Khoukhi','Elamin','Al-Alawi','Boudiaf','Madibo','Hatem','Afif','Muntari','Edmilson Junior'],
    players:[
      {name:'Barsham',pos:'GK',age:29,caps:38,goals:0,assists:0,rating:3,starter:true,club:'Al-Sadd'},
      {name:'Pedro Miguel',pos:'DF',age:32,caps:55,goals:2,assists:4,rating:3,starter:true,club:'Al-Sadd'},
      {name:'Khoukhi',pos:'DF',age:34,caps:80,goals:2,assists:3,rating:3,starter:true,club:'Al-Sadd'},
      {name:'Elamin',pos:'DF',age:26,caps:24,goals:1,assists:0,rating:3,starter:true,club:'Al-Duhail'},
      {name:'Al-Alawi',pos:'DF',age:28,caps:30,goals:0,assists:2,rating:3,starter:true,club:'Al-Gharafa'},
      {name:'Boudiaf',pos:'CC',age:30,caps:60,goals:3,assists:5,rating:3,starter:true,club:'Al-Duhail'},
      {name:'Madibo',pos:'CC',age:25,caps:28,goals:1,assists:2,rating:3,starter:true,club:'Al-Duhail'},
      {name:'Hatem',pos:'CC',age:27,caps:35,goals:4,assists:6,rating:3,starter:true,club:'Al-Rayyan'},
      {name:'Afif',pos:'AT',age:28,caps:70,goals:22,assists:14,rating:4,starter:true,club:'Al-Sadd'},
      {name:'Muntari',pos:'AT',age:29,caps:52,goals:14,assists:6,rating:4,starter:true,club:'Al-Gharafa'},
      {name:'Edmilson Junior',pos:'AT',age:30,caps:48,goals:12,assists:9,rating:3,starter:true,club:'Al-Duhail'},
      {name:'Al-Haydos',pos:'AT',age:34,caps:95,goals:29,assists:18,rating:4,starter:false,club:'Al-Sadd'},
    ]},
  'Svizzera':{group:'B',coach:'Murat Yakin',formation:'4-2-3-1',natCode:'ch',
    starting11:['Kobel','Widmer','Akanji','Elvedi','Ricardo Rodriguez','Xhaka','Freuler','Fassnacht','Jashari','Ndoye','Embolo'],
    players:[
      {name:'Kobel',pos:'GK',age:27,caps:22,goals:0,assists:0,rating:4,starter:true,club:'B.Dortmund'},
      {name:'Mvogo',pos:'GK',age:30,caps:8,goals:0,assists:0,rating:3,starter:false,club:'Lorient'},
      {name:'Ricardo Rodriguez',pos:'DF',age:33,caps:95,goals:5,assists:10,rating:4,starter:true,club:'Real Betis'},
      {name:'Akanji',pos:'DF',age:30,caps:58,goals:2,assists:2,rating:5,starter:true,club:'Inter'},
      {name:'Widmer',pos:'DF',age:32,caps:44,goals:2,assists:5,rating:3,starter:true,club:'Mainz'},
      {name:'Elvedi',pos:'DF',age:28,caps:65,goals:3,assists:2,rating:4,starter:true,club:'B.Monchengladbach'},
      {name:'Xhaka',pos:'CC',age:33,caps:128,goals:14,assists:16,rating:5,starter:true,club:'Sunderland'},
      {name:'Freuler',pos:'CC',age:33,caps:70,goals:3,assists:8,rating:4,starter:true,club:'Bologna'},
      {name:'Jashari',pos:'CC',age:22,caps:18,goals:2,assists:3,rating:4,starter:true,club:'Milan'},
      {name:'Zakaria',pos:'CC',age:29,caps:38,goals:2,assists:2,rating:3,starter:false,club:'Monaco'},
      {name:'Fassnacht',pos:'AT',age:31,caps:46,goals:8,assists:9,rating:3,starter:true,club:'Young Boys'},
      {name:'Ndoye',pos:'AT',age:24,caps:20,goals:4,assists:5,rating:4,starter:true,club:'Nottm Forest'},
      {name:'Embolo',pos:'AT',age:28,caps:65,goals:14,assists:6,rating:4,starter:true,club:'Rennes'},
      {name:'Vargas',pos:'AT',age:32,caps:72,goals:18,assists:10,rating:4,starter:false,club:'Siviglia'},
      {name:'Okafor',pos:'AT',age:25,caps:22,goals:5,assists:3,rating:3,starter:false,club:'Leeds'},
    ]},
  'Bosnia':{group:'B',coach:'Sergej Barbarez',formation:'4-4-2',natCode:'ba',
    starting11:['Vasilj','Dedic','Katic','Muharemovic','Kolasinac','Bajraktarevic','Sunjic','Tahirovic','Memic','Demirovic','Dzeko'],
    players:[
      {name:'Vasilj',pos:'GK',age:29,caps:30,goals:0,assists:0,rating:4,starter:true,club:'St Pauli'},
      {name:'Dedic',pos:'DF',age:25,caps:28,goals:1,assists:4,rating:4,starter:true,club:'Benfica'},
      {name:'Katic',pos:'DF',age:27,caps:24,goals:1,assists:0,rating:3,starter:true,club:'Schalke 04'},
      {name:'Muharemovic',pos:'DF',age:23,caps:18,goals:0,assists:0,rating:3,starter:true,club:'Sassuolo'},
      {name:'Kolasinac',pos:'DF',age:31,caps:64,goals:4,assists:6,rating:4,starter:true,club:'Atalanta'},
      {name:'Sunjic',pos:'CC',age:31,caps:48,goals:2,assists:3,rating:3,starter:true,club:'Pafos'},
      {name:'Tahirovic',pos:'CC',age:22,caps:18,goals:2,assists:3,rating:4,starter:true,club:'Brondby'},
      {name:'Memic',pos:'CC',age:24,caps:14,goals:1,assists:2,rating:3,starter:true,club:'Plzen'},
      {name:'Bajraktarevic',pos:'CC',age:22,caps:16,goals:3,assists:4,rating:4,starter:true,club:'PSV'},
      {name:'Dzeko',pos:'AT',age:40,caps:126,goals:66,assists:22,rating:4,starter:true,club:'Schalke 04'},
      {name:'Demirovic',pos:'AT',age:26,caps:30,goals:11,assists:4,rating:4,starter:true,club:'Stoccarda'},
      {name:'Tabakovic',pos:'AT',age:28,caps:18,goals:5,assists:2,rating:3,starter:false,club:'B.Monchengladbach'},
    ]},
  'Brasile':{group:'C',coach:'Carlo Ancelotti',formation:'4-4-2',natCode:'br',
    starting11:['Alisson','Wesley','Marquinhos','Gabriel','Douglas Santos','Luis Henrique','Casemiro','Bruno Guimaraes','Raphinha','Vinicius Jr','Matheus Cunha'],
    players:[
      {name:'Alisson',pos:'GK',age:33,caps:78,goals:0,assists:1,rating:5,starter:true,club:'Liverpool'},
      {name:'Ederson',pos:'GK',age:31,caps:30,goals:0,assists:0,rating:4,starter:false,club:'Fenerbahce'},
      {name:'Marquinhos',pos:'DF',age:31,caps:90,goals:6,assists:3,rating:5,starter:true,club:'PSG'},
      {name:'Gabriel',pos:'DF',age:27,caps:32,goals:2,assists:1,rating:4,starter:true,club:'Arsenal'},
      {name:'Wesley',pos:'DF',age:23,caps:18,goals:1,assists:3,rating:3,starter:true,club:'Roma'},
      {name:'Douglas Santos',pos:'DF',age:31,caps:22,goals:0,assists:2,rating:3,starter:true,club:'Zenit'},
      {name:'Bremer',pos:'DF',age:28,caps:25,goals:1,assists:0,rating:4,starter:false,club:'Juventus'},
      {name:'Bruno Guimaraes',pos:'CC',age:27,caps:38,goals:5,assists:8,rating:5,starter:true,club:'Newcastle'},
      {name:'Casemiro',pos:'CC',age:34,caps:86,goals:8,assists:5,rating:4,starter:true,club:'Man Utd'},
      {name:'Lucas Paqueta',pos:'CC',age:27,caps:54,goals:9,assists:12,rating:5,starter:false,club:'Flamengo'},
      {name:'Vinicius Jr',pos:'AT',age:24,caps:58,goals:21,assists:14,rating:5,starter:true,club:'Real Madrid'},
      {name:'Raphinha',pos:'AT',age:28,caps:52,goals:18,assists:13,rating:5,starter:true,club:'Barcellona'},
      {name:'Matheus Cunha',pos:'AT',age:26,caps:24,goals:6,assists:4,rating:4,starter:true,club:'Man Utd'},
      {name:'Luis Henrique',pos:'AT',age:23,caps:14,goals:3,assists:2,rating:3,starter:true,club:'Zenit'},
      {name:'Neymar',pos:'AT',age:34,caps:128,goals:79,assists:57,rating:5,starter:false,club:'Santos'},
      {name:'Endrick',pos:'AT',age:18,caps:20,goals:5,assists:1,rating:4,starter:false,club:'Lione'},
    ]},
  'Marocco':{group:'C',coach:'Mohamed Ouahbi',formation:'4-2-3-1',natCode:'ma',
    starting11:['Bonou','Hakimi','Aguerd','Diop','Salah-Eddine','El Aynaoui','Ounahi','Brahim Diaz','Saibari','Talbi','El Kaabi'],
    players:[
      {name:'Bonou',pos:'GK',age:32,caps:30,goals:0,assists:0,rating:4,starter:true,club:'Al-Hilal'},
      {name:'Hakimi',pos:'DF',age:27,caps:72,goals:6,assists:14,rating:5,starter:true,club:'PSG'},
      {name:'Aguerd',pos:'DF',age:28,caps:48,goals:2,assists:1,rating:4,starter:true,club:'Marsiglia'},
      {name:'Diop',pos:'DF',age:27,caps:28,goals:1,assists:0,rating:4,starter:true,club:'Fulham'},
      {name:'Salah-Eddine',pos:'DF',age:23,caps:18,goals:0,assists:2,rating:3,starter:true,club:'PSV'},
      {name:'Mazraoui',pos:'DF',age:27,caps:38,goals:2,assists:4,rating:4,starter:false,club:'Man Utd'},
      {name:'El Aynaoui',pos:'CC',age:22,caps:14,goals:2,assists:3,rating:4,starter:true,club:'Roma'},
      {name:'Ounahi',pos:'CC',age:24,caps:38,goals:3,assists:5,rating:4,starter:true,club:'Girona'},
      {name:'Saibari',pos:'CC',age:23,caps:16,goals:2,assists:4,rating:4,starter:true,club:'PSV'},
      {name:'Amrabat',pos:'CC',age:29,caps:60,goals:2,assists:3,rating:4,starter:false,club:'Real Betis'},
      {name:'Brahim Diaz',pos:'AT',age:25,caps:38,goals:11,assists:9,rating:5,starter:true,club:'Real Madrid'},
      {name:'El Kaabi',pos:'AT',age:28,caps:30,goals:14,assists:4,rating:4,starter:true,club:'Olympiacos'},
      {name:'Talbi',pos:'AT',age:24,caps:18,goals:5,assists:3,rating:3,starter:true,club:'Sunderland'},
      {name:'Rahimi',pos:'AT',age:26,caps:22,goals:8,assists:3,rating:4,starter:false,club:'Al-Ain'},
    ]},
  'Haiti':{group:'C',coach:"Sebastien Migne",formation:'4-3-3',natCode:'ht',
    starting11:['Placide','Arcus','Ade','Duverne','Experience','Deedson','Bellegarde','L. Pierre','Isidor','Nazon','Providence'],
    players:[
      {name:'Placide',pos:'GK',age:36,caps:68,goals:0,assists:0,rating:3,starter:true,club:'Bastia'},
      {name:'Arcus',pos:'DF',age:26,caps:22,goals:0,assists:1,rating:2,starter:true,club:'Angers'},
      {name:'Ade',pos:'DF',age:27,caps:24,goals:1,assists:0,rating:3,starter:true,club:'LDU Quito'},
      {name:'Duverne',pos:'DF',age:25,caps:20,goals:0,assists:1,rating:3,starter:true,club:'Gent'},
      {name:'Experience',pos:'DF',age:28,caps:18,goals:0,assists:0,rating:2,starter:true,club:'Nancy'},
      {name:'Delcroix',pos:'DF',age:26,caps:16,goals:0,assists:0,rating:2,starter:false,club:'Lugano'},
      {name:'Bellegarde',pos:'CC',age:23,caps:18,goals:2,assists:4,rating:4,starter:true,club:'Wolves'},
      {name:'L. Pierre',pos:'CC',age:25,caps:14,goals:1,assists:2,rating:3,starter:true,club:'Vizela'},
      {name:'Deedson',pos:'CC',age:24,caps:16,goals:1,assists:1,rating:3,starter:true,club:'FC Dallas'},
      {name:'Isidor',pos:'AT',age:24,caps:18,goals:5,assists:2,rating:3,starter:true,club:'Sunderland'},
      {name:'Nazon',pos:'AT',age:30,caps:42,goals:8,assists:4,rating:3,starter:true,club:'Esteghlal'},
      {name:'Providence',pos:'AT',age:25,caps:16,goals:4,assists:2,rating:3,starter:true,club:'Almere'},
      {name:'Joseph',pos:'AT',age:27,caps:20,goals:3,assists:2,rating:3,starter:false,club:'Ferencvaros'},
    ]},
  'Scozia':{group:'C',coach:'Steve Clarke',formation:'3-5-2',natCode:'gb-sct',
    starting11:['Gordon','Hanley','McKenna','Souttar','Robertson','Tierney','McGinn','McTominay','Christie','Adams','Shankland'],
    players:[
      {name:'Gordon',pos:'GK',age:31,caps:42,goals:0,assists:0,rating:4,starter:true,club:'Hearts'},
      {name:'Gunn',pos:'GK',age:28,caps:18,goals:0,assists:0,rating:3,starter:false,club:'Nottm Forest'},
      {name:'Robertson',pos:'DF',age:32,caps:82,goals:3,assists:18,rating:5,starter:true,club:'Liverpool'},
      {name:'Tierney',pos:'DF',age:28,caps:62,goals:2,assists:8,rating:4,starter:true,club:'Celtic'},
      {name:'Hanley',pos:'DF',age:33,caps:60,goals:3,assists:1,rating:4,starter:true,club:'Hibernian'},
      {name:'McKenna',pos:'DF',age:28,caps:38,goals:2,assists:1,rating:4,starter:true,club:'Dinamo Zagabria'},
      {name:'Souttar',pos:'DF',age:26,caps:28,goals:2,assists:0,rating:4,starter:true,club:'Rangers'},
      {name:'McTominay',pos:'CC',age:27,caps:58,goals:14,assists:6,rating:5,starter:true,club:'Napoli'},
      {name:'McGinn',pos:'CC',age:30,caps:74,goals:12,assists:10,rating:5,starter:true,club:'Aston Villa'},
      {name:'Christie',pos:'CC',age:30,caps:52,goals:7,assists:8,rating:4,starter:true,club:'Bournemouth'},
      {name:'Ferguson',pos:'CC',age:21,caps:18,goals:3,assists:4,rating:4,starter:false,club:'Bologna'},
      {name:'Adams',pos:'AT',age:29,caps:40,goals:12,assists:5,rating:4,starter:true,club:'Torino'},
      {name:'Shankland',pos:'AT',age:29,caps:22,goals:6,assists:2,rating:3,starter:true,club:'Hearts'},
      {name:'Dykes',pos:'AT',age:29,caps:40,goals:8,assists:4,rating:3,starter:false,club:'Charlton'},
    ]},
  'USA':{group:'D',coach:'Mauricio Pochettino',formation:'4-3-3',natCode:'us',
    starting11:['Turner','Dest','McKenzie','Ream','Robinson','Adams','McKennie','Pulisic','Weah','Balogun','Pepi'],
    players:[
      {name:'Turner',pos:'GK',age:30,caps:38,goals:0,assists:0,rating:3,starter:true,club:'New England'},
      {name:'Dest',pos:'DF',age:24,caps:40,goals:2,assists:5,rating:4,starter:true,club:'PSV'},
      {name:'Robinson',pos:'DF',age:27,caps:48,goals:3,assists:6,rating:4,starter:true,club:'Fulham'},
      {name:'Ream',pos:'DF',age:37,caps:78,goals:1,assists:2,rating:3,starter:true,club:'Charlotte FC'},
      {name:'McKenzie',pos:'DF',age:24,caps:20,goals:1,assists:0,rating:3,starter:true,club:'Tolosa'},
      {name:'Scally',pos:'DF',age:24,caps:14,goals:0,assists:1,rating:3,starter:false,club:'B.Moenchengladbach'},
      {name:'Adams',pos:'CC',age:29,caps:60,goals:3,assists:5,rating:5,starter:true,club:'Bournemouth'},
      {name:'McKennie',pos:'CC',age:26,caps:58,goals:8,assists:7,rating:4,starter:true,club:'Juventus'},
      {name:'Reyna',pos:'CC',age:22,caps:28,goals:4,assists:6,rating:4,starter:false,club:'B.Moenchengladbach'},
      {name:'Tillman',pos:'CC',age:23,caps:18,goals:2,assists:3,rating:4,starter:false,club:'Bayer Leverkusen'},
      {name:'Weah',pos:'AT',age:25,caps:30,goals:4,assists:5,rating:4,starter:true,club:'Marsiglia'},
      {name:'Pulisic',pos:'AT',age:27,caps:74,goals:25,assists:19,rating:5,starter:true,club:'Milan'},
      {name:'Balogun',pos:'AT',age:24,caps:20,goals:8,assists:2,rating:4,starter:true,club:'Monaco'},
      {name:'Pepi',pos:'AT',age:22,caps:26,goals:10,assists:2,rating:4,starter:true,club:'PSV'},
    ]},
  'Paraguay':{group:'D',coach:'Gustavo Alfaro',formation:'4-4-2',natCode:'py',
    starting11:['Gill','Caceres','G. Gomez','Alderete','J. Alonso','D. Gomez','Ojeda','Bobadilla','Almiron','Enciso','Avalos'],
    players:[
      {name:'Gill',pos:'GK',age:26,caps:18,goals:0,assists:0,rating:3,starter:true,club:'San Lorenzo'},
      {name:'G. Gomez',pos:'DF',age:32,caps:78,goals:5,assists:2,rating:4,starter:true,club:'Palmeiras'},
      {name:'Caceres',pos:'DF',age:28,caps:38,goals:0,assists:1,rating:3,starter:true,club:'Dinamo Mosca'},
      {name:'Alderete',pos:'DF',age:27,caps:30,goals:2,assists:0,rating:3,starter:true,club:'Sunderland'},
      {name:'J. Alonso',pos:'DF',age:27,caps:24,goals:1,assists:2,rating:3,starter:true,club:'Atletico Mineiro'},
      {name:'D. Gomez',pos:'CC',age:23,caps:22,goals:3,assists:5,rating:4,starter:true,club:'Brighton'},
      {name:'Ojeda',pos:'CC',age:26,caps:24,goals:2,assists:3,rating:3,starter:true,club:'Orlando City'},
      {name:'Bobadilla',pos:'CC',age:30,caps:40,goals:4,assists:5,rating:3,starter:true,club:'Sao Paulo'},
      {name:'Almiron',pos:'CC',age:30,caps:54,goals:8,assists:12,rating:4,starter:true,club:'Atlanta United'},
      {name:'Enciso',pos:'AT',age:21,caps:24,goals:8,assists:4,rating:4,starter:true,club:'Strasburgo'},
      {name:'Avalos',pos:'AT',age:24,caps:16,goals:4,assists:2,rating:3,starter:true,club:'Independiente'},
      {name:'Sanabria',pos:'AT',age:29,caps:48,goals:12,assists:5,rating:3,starter:false,club:'Cremonese'},
    ]},
  'Australia':{group:'D',coach:'Tony Popovic',formation:'5-4-1',natCode:'au',
    starting11:['Ryan','Italiano','Degenek','Souttar','Circati','Bos','Metcalfe','Devlin',"O'Neill",'Irankunda','Toure'],
    players:[
      {name:'Ryan',pos:'GK',age:33,caps:78,goals:0,assists:1,rating:4,starter:true,club:'Levante'},
      {name:'Souttar',pos:'DF',age:26,caps:28,goals:2,assists:0,rating:4,starter:true,club:'Leicester'},
      {name:'Degenek',pos:'DF',age:30,caps:62,goals:1,assists:1,rating:3,starter:true,club:'Apoel'},
      {name:'Circati',pos:'DF',age:22,caps:14,goals:0,assists:0,rating:3,starter:true,club:'Parma'},
      {name:'Italiano',pos:'DF',age:23,caps:12,goals:0,assists:1,rating:3,starter:true,club:'Grazer'},
      {name:'Bos',pos:'DF',age:23,caps:10,goals:0,assists:0,rating:3,starter:true,club:'Feyenoord'},
      {name:'Metcalfe',pos:'CC',age:27,caps:30,goals:2,assists:3,rating:3,starter:true,club:'St Pauli'},
      {name:'Devlin',pos:'CC',age:26,caps:22,goals:1,assists:2,rating:3,starter:true,club:'Hearts'},
      {name:"O'Neill",pos:'CC',age:27,caps:28,goals:2,assists:3,rating:3,starter:true,club:'NYCFC'},
      {name:'Hrustic',pos:'CC',age:28,caps:38,goals:3,assists:5,rating:3,starter:false,club:'Heracles'},
      {name:'Irankunda',pos:'AT',age:19,caps:12,goals:3,assists:2,rating:4,starter:true,club:'Watford'},
      {name:'Toure',pos:'AT',age:23,caps:16,goals:5,assists:2,rating:3,starter:true,club:'Norwich'},
      {name:'Leckie',pos:'AT',age:34,caps:88,goals:14,assists:10,rating:3,starter:false,club:'Melbourne City'},
      {name:'Volpato',pos:'AT',age:22,caps:14,goals:4,assists:3,rating:3,starter:false,club:'Sassuolo'},
    ]},
  'Turchia':{group:'D',coach:'Vincenzo Montella',formation:'4-2-3-1',natCode:'tr',
    starting11:['Gunok','Muldur','Kabak','Bardakci','Kadioglu','Calhanoglu','Ozcan','Guler','Kokcu','Yildiz','Akturkoglu'],
    players:[
      {name:'Gunok',pos:'GK',age:35,caps:58,goals:0,assists:0,rating:4,starter:true,club:'Fenerbahce'},
      {name:'Bayindir',pos:'GK',age:27,caps:22,goals:0,assists:0,rating:3,starter:false,club:'Man Utd'},
      {name:'Bardakci',pos:'DF',age:28,caps:38,goals:2,assists:0,rating:4,starter:true,club:'Galatasaray'},
      {name:'Kabak',pos:'DF',age:25,caps:32,goals:1,assists:0,rating:4,starter:true,club:'Hoffenheim'},
      {name:'Kadioglu',pos:'DF',age:25,caps:30,goals:1,assists:5,rating:4,starter:true,club:'Brighton'},
      {name:'Muldur',pos:'DF',age:28,caps:38,goals:2,assists:4,rating:3,starter:true,club:'Fenerbahce'},
      {name:'Celik',pos:'DF',age:27,caps:40,goals:2,assists:3,rating:3,starter:false,club:'Roma'},
      {name:'Calhanoglu',pos:'CC',age:31,caps:80,goals:18,assists:22,rating:5,starter:true,club:'Inter'},
      {name:'Ozcan',pos:'CC',age:26,caps:24,goals:1,assists:2,rating:3,starter:true,club:'B.Dortmund'},
      {name:'Kokcu',pos:'CC',age:24,caps:26,goals:4,assists:6,rating:4,starter:true,club:'Besiktas'},
      {name:'Guler',pos:'AT',age:20,caps:22,goals:7,assists:5,rating:5,starter:true,club:'Real Madrid'},
      {name:'Yildiz',pos:'AT',age:20,caps:18,goals:6,assists:4,rating:4,starter:true,club:'Juventus'},
      {name:'Akturkoglu',pos:'AT',age:27,caps:38,goals:10,assists:7,rating:4,starter:true,club:'Fenerbahce'},
      {name:'Uzun',pos:'AT',age:20,caps:12,goals:4,assists:2,rating:3,starter:false,club:'Eintracht'},
    ]},
  'Germania':{group:'E',coach:'Julian Nagelsmann',formation:'4-2-3-1',natCode:'de',
    starting11:['Neuer','Kimmich','Tah','Schlotterbeck','Raum','Pavlovic','Goretzka','Sane','Musiala','Wirtz','Havertz'],
    players:[
      {name:'Neuer',pos:'GK',age:40,caps:124,goals:0,assists:0,rating:5,starter:true,club:'Bayern Monaco'},
      {name:'Nubel',pos:'GK',age:29,caps:4,goals:0,assists:0,rating:3,starter:false,club:'Stoccarda'},
      {name:'Kimmich',pos:'DF',age:30,caps:92,goals:8,assists:24,rating:5,starter:true,club:'Bayern Monaco'},
      {name:'Tah',pos:'DF',age:29,caps:42,goals:2,assists:1,rating:4,starter:true,club:'Bayern Monaco'},
      {name:'Schlotterbeck',pos:'DF',age:28,caps:30,goals:2,assists:1,rating:4,starter:true,club:'B.Dortmund'},
      {name:'Raum',pos:'DF',age:27,caps:34,goals:2,assists:8,rating:4,starter:true,club:'Lipsia'},
      {name:'Rudiger',pos:'DF',age:33,caps:72,goals:4,assists:2,rating:4,starter:false,club:'Real Madrid'},
      {name:'Pavlovic',pos:'CC',age:21,caps:18,goals:2,assists:2,rating:4,starter:true,club:'Bayern Monaco'},
      {name:'Goretzka',pos:'CC',age:30,caps:58,goals:8,assists:10,rating:4,starter:true,club:'Bayern Monaco'},
      {name:'Musiala',pos:'AT',age:22,caps:44,goals:12,assists:14,rating:5,starter:true,club:'Bayern Monaco'},
      {name:'Wirtz',pos:'AT',age:22,caps:38,goals:14,assists:16,rating:5,starter:true,club:'Liverpool'},
      {name:'Havertz',pos:'AT',age:26,caps:60,goals:20,assists:12,rating:5,starter:true,club:'Arsenal'},
      {name:'Sane',pos:'AT',age:30,caps:62,goals:14,assists:18,rating:4,starter:true,club:'Galatasaray'},
      {name:'Beier',pos:'AT',age:22,caps:12,goals:4,assists:2,rating:4,starter:false,club:'B.Dortmund'},
      {name:'Undav',pos:'AT',age:28,caps:14,goals:5,assists:3,rating:3,starter:false,club:'Stoccarda'},
    ]},
  'Curacao':{group:'E',coach:'Dick Advocaat',formation:'4-3-3',natCode:'cw',
    starting11:['Room','Sambo','Van Eijma','Obispo','Floranus','J. Bacuna','Comenencia','L. Bacuna','Chong','Locadia','Gorre'],
    players:[
      {name:'Room',pos:'GK',age:31,caps:38,goals:0,assists:0,rating:3,starter:true,club:'Miami FC'},
      {name:'Obispo',pos:'DF',age:26,caps:28,goals:1,assists:0,rating:3,starter:true,club:'PSV'},
      {name:'Van Eijma',pos:'DF',age:27,caps:24,goals:0,assists:1,rating:3,starter:true,club:'RKC Waalwijk'},
      {name:'Sambo',pos:'DF',age:26,caps:20,goals:0,assists:1,rating:3,starter:true,club:'Sparta Rotterdam'},
      {name:'Floranus',pos:'DF',age:28,caps:22,goals:0,assists:2,rating:2,starter:true,club:'PEC Zwolle'},
      {name:'J. Bacuna',pos:'CC',age:33,caps:60,goals:5,assists:8,rating:3,starter:true,club:'Volendam'},
      {name:'Comenencia',pos:'CC',age:27,caps:22,goals:1,assists:2,rating:3,starter:true,club:'Zurigo'},
      {name:'L. Bacuna',pos:'CC',age:31,caps:42,goals:4,assists:6,rating:3,starter:true,club:'Igdir'},
      {name:'Chong',pos:'AT',age:25,caps:18,goals:4,assists:3,rating:4,starter:true,club:'Sheffield Utd'},
      {name:'Locadia',pos:'AT',age:31,caps:40,goals:10,assists:4,rating:3,starter:true,club:'Miami FC'},
      {name:'Gorre',pos:'AT',age:30,caps:32,goals:7,assists:5,rating:3,starter:true,club:'Maccabi Haifa'},
      {name:'Hansen',pos:'AT',age:27,caps:14,goals:3,assists:2,rating:3,starter:false,club:'Middlesbrough'},
    ]},
  "Costa d'Avorio":{group:'E',coach:"Emerse Fae",formation:'4-3-3',natCode:'ci',
    starting11:['Fofana','Doue','Kossounou','Ndicka','Konan','Kessie','Sangare','Oulai','Pepe','Guessand','Y. Diomande'],
    players:[
      {name:'Y. Fofana',pos:'GK',age:29,caps:30,goals:0,assists:0,rating:3,starter:true,club:'Rizespor'},
      {name:'Ndicka',pos:'DF',age:25,caps:28,goals:1,assists:0,rating:4,starter:true,club:'Roma'},
      {name:'Kossounou',pos:'DF',age:23,caps:22,goals:0,assists:0,rating:4,starter:true,club:'Atalanta'},
      {name:'Konan',pos:'DF',age:27,caps:30,goals:1,assists:3,rating:3,starter:true,club:'Gil Vicente'},
      {name:'Doue',pos:'DF',age:24,caps:18,goals:0,assists:2,rating:3,starter:true,club:'Strasburgo'},
      {name:'Singo',pos:'DF',age:23,caps:24,goals:1,assists:4,rating:4,starter:false,club:'Galatasaray'},
      {name:'Kessie',pos:'CC',age:29,caps:72,goals:12,assists:8,rating:5,starter:true,club:'Al-Ahli'},
      {name:'Sangare',pos:'CC',age:26,caps:38,goals:3,assists:4,rating:4,starter:true,club:'Nottm Forest'},
      {name:'Oulai',pos:'CC',age:25,caps:18,goals:2,assists:3,rating:3,starter:true,club:'Trabzonspor'},
      {name:'Seko Fofana',pos:'CC',age:30,caps:48,goals:6,assists:7,rating:4,starter:false,club:'Porto'},
      {name:'Pepe',pos:'AT',age:29,caps:50,goals:12,assists:9,rating:4,starter:true,club:'Villarreal'},
      {name:'Y. Diomande',pos:'AT',age:22,caps:14,goals:5,assists:2,rating:4,starter:true,club:'Lipsia'},
      {name:'Guessand',pos:'AT',age:23,caps:12,goals:4,assists:2,rating:3,starter:true,club:'Crystal Palace'},
      {name:'Bonny',pos:'AT',age:20,caps:8,goals:2,assists:1,rating:3,starter:false,club:'Inter'},
    ]},
  'Ecuador':{group:'E',coach:"Sebastian Beccacece",formation:'4-3-3',natCode:'ec',
    starting11:['Galindez','Preciado','Ordonez','Pacho','Hincapie','M. Caicedo','Castillo','Paez','Yeboah','A. Valencia','Angulo'],
    players:[
      {name:'Galindez',pos:'GK',age:34,caps:48,goals:0,assists:0,rating:3,starter:true,club:'Huracan'},
      {name:'Pacho',pos:'DF',age:23,caps:22,goals:1,assists:0,rating:4,starter:true,club:'PSG'},
      {name:'Hincapie',pos:'DF',age:22,caps:28,goals:1,assists:2,rating:5,starter:true,club:'Arsenal'},
      {name:'Ordonez',pos:'DF',age:26,caps:24,goals:1,assists:0,rating:3,starter:true,club:'Brugge'},
      {name:'Preciado',pos:'DF',age:22,caps:18,goals:1,assists:2,rating:3,starter:true,club:'Atletico Mineiro'},
      {name:'M. Caicedo',pos:'CC',age:23,caps:38,goals:4,assists:5,rating:5,starter:true,club:'Chelsea'},
      {name:'Castillo',pos:'CC',age:23,caps:24,goals:2,assists:3,rating:3,starter:true,club:'Midtjylland'},
      {name:'Paez',pos:'CC',age:19,caps:14,goals:2,assists:4,rating:4,starter:true,club:'River Plate'},
      {name:'A. Valencia',pos:'AT',age:38,caps:101,goals:41,assists:10,rating:4,starter:true,club:'Anversa'},
      {name:'Yeboah',pos:'AT',age:21,caps:16,goals:5,assists:2,rating:3,starter:true,club:'Venezia'},
      {name:'Angulo',pos:'AT',age:22,caps:14,goals:4,assists:2,rating:3,starter:true,club:'Sunderland'},
      {name:'Plata',pos:'AT',age:25,caps:38,goals:8,assists:6,rating:4,starter:false,club:'Flamengo'},
    ]},
  'Olanda':{group:'F',coach:'Ronald Koeman',formation:'4-2-3-1',natCode:'nl',
    starting11:['Verbruggen','Dumfries','Van Dijk','Ake','Van de Ven','De Jong','Gravenberch','Malen','Reijnders','Gakpo','Depay'],
    players:[
      {name:'Verbruggen',pos:'GK',age:23,caps:14,goals:0,assists:0,rating:4,starter:true,club:'Brighton'},
      {name:'Van Dijk',pos:'DF',age:34,caps:82,goals:6,assists:2,rating:5,starter:true,club:'Liverpool'},
      {name:'Ake',pos:'DF',age:30,caps:48,goals:2,assists:2,rating:5,starter:true,club:'Man City'},
      {name:'Dumfries',pos:'DF',age:29,caps:54,goals:4,assists:8,rating:4,starter:true,club:'Inter'},
      {name:'Van de Ven',pos:'DF',age:24,caps:18,goals:0,assists:1,rating:4,starter:true,club:'Tottenham'},
      {name:'De Jong',pos:'CC',age:28,caps:58,goals:6,assists:10,rating:5,starter:true,club:'Barcellona'},
      {name:'Gravenberch',pos:'CC',age:23,caps:22,goals:2,assists:3,rating:4,starter:true,club:'Liverpool'},
      {name:'Reijnders',pos:'CC',age:26,caps:30,goals:5,assists:6,rating:5,starter:true,club:'Man City'},
      {name:'Koopmeiners',pos:'CC',age:27,caps:28,goals:4,assists:6,rating:4,starter:false,club:'Juventus'},
      {name:'Gakpo',pos:'AT',age:26,caps:38,goals:14,assists:8,rating:5,starter:true,club:'Liverpool'},
      {name:'Malen',pos:'AT',age:26,caps:28,goals:8,assists:5,rating:4,starter:true,club:'Roma'},
      {name:'Depay',pos:'AT',age:31,caps:88,goals:44,assists:26,rating:4,starter:true,club:'Corinthians'},
      {name:'Weghorst',pos:'AT',age:33,caps:42,goals:10,assists:4,rating:3,starter:false,club:'Ajax'},
    ]},
  'Giappone':{group:'F',coach:'Hajime Moriyasu',formation:'3-4-2-1',natCode:'jp',
    starting11:['Suzuki','Tomiyasu','Taniguchi','Itakura','Doan','Endo','Tanaka','Nakamura','Kubo','Ito','Ueda'],
    players:[
      {name:'Suzuki',pos:'GK',age:26,caps:18,goals:0,assists:0,rating:3,starter:true,club:'Parma'},
      {name:'Tomiyasu',pos:'DF',age:26,caps:42,goals:1,assists:3,rating:4,starter:true,club:'Ajax'},
      {name:'Taniguchi',pos:'DF',age:32,caps:30,goals:1,assists:0,rating:3,starter:true,club:'Sint-Truiden'},
      {name:'Itakura',pos:'DF',age:28,caps:38,goals:3,assists:1,rating:4,starter:true,club:'Ajax'},
      {name:'Sugawara',pos:'DF',age:24,caps:22,goals:1,assists:4,rating:3,starter:false,club:'Werder'},
      {name:'Endo',pos:'CC',age:32,caps:68,goals:4,assists:6,rating:4,starter:true,club:'Liverpool'},
      {name:'Tanaka',pos:'CC',age:26,caps:30,goals:2,assists:4,rating:4,starter:true,club:'Leeds'},
      {name:'Doan',pos:'CC',age:27,caps:38,goals:6,assists:8,rating:4,starter:true,club:'Eintracht'},
      {name:'Nakamura',pos:'CC',age:27,caps:22,goals:3,assists:4,rating:3,starter:true,club:'Reims'},
      {name:'Kamada',pos:'CC',age:28,caps:38,goals:8,assists:7,rating:4,starter:false,club:'Crystal Palace'},
      {name:'Kubo',pos:'AT',age:23,caps:30,goals:8,assists:10,rating:5,starter:true,club:'Real Sociedad'},
      {name:'Ito',pos:'AT',age:28,caps:28,goals:6,assists:5,rating:4,starter:true,club:'Genk'},
      {name:'Ueda',pos:'AT',age:26,caps:26,goals:10,assists:3,rating:4,starter:true,club:'Feyenoord'},
      {name:'Maeda',pos:'AT',age:27,caps:30,goals:7,assists:4,rating:3,starter:false,club:'Celtic'},
    ]},
  'Svezia':{group:'F',coach:'Graham Potter',formation:'4-3-3',natCode:'se',
    starting11:['Johansson','Gudmundsson','Hien','Lindelof','Svensson','Bergvall','Svanberg','Ayari','Elanga','Isak','Gyokeres'],
    players:[
      {name:'Johansson',pos:'GK',age:30,caps:28,goals:0,assists:0,rating:3,starter:true,club:'Stoke City'},
      {name:'Lindelof',pos:'DF',age:30,caps:72,goals:2,assists:2,rating:4,starter:true,club:'Aston Villa'},
      {name:'Hien',pos:'DF',age:26,caps:28,goals:1,assists:0,rating:4,starter:true,club:'Atalanta'},
      {name:'Svensson',pos:'DF',age:24,caps:18,goals:0,assists:1,rating:3,starter:true,club:'B.Dortmund'},
      {name:'Gudmundsson',pos:'DF',age:32,caps:58,goals:5,assists:12,rating:4,starter:true,club:'Leeds'},
      {name:'Bergvall',pos:'CC',age:19,caps:10,goals:2,assists:3,rating:4,starter:true,club:'Tottenham'},
      {name:'Svanberg',pos:'CC',age:27,caps:38,goals:4,assists:5,rating:3,starter:true,club:'Wolfsburg'},
      {name:'Ayari',pos:'CC',age:21,caps:12,goals:1,assists:2,rating:3,starter:true,club:'Brighton'},
      {name:'Isak',pos:'AT',age:26,caps:48,goals:23,assists:8,rating:5,starter:true,club:'Liverpool'},
      {name:'Gyokeres',pos:'AT',age:27,caps:38,goals:18,assists:6,rating:5,starter:true,club:'Arsenal'},
      {name:'Elanga',pos:'AT',age:23,caps:28,goals:6,assists:5,rating:4,starter:true,club:'Newcastle'},
    ]},
  'Tunisia':{group:'F',coach:'Sabri Lamouchi',formation:'4-4-2',natCode:'tn',
    starting11:['Dahmen','Bronn','Rekik','Talbi','Valery','Skhiri','Ben Slimane','Mejbri','Gharbi','Saad','Mastouri'],
    players:[
      {name:'Dahmen',pos:'GK',age:29,caps:38,goals:0,assists:0,rating:3,starter:true,club:'CS Sfaxien'},
      {name:'Bronn',pos:'DF',age:27,caps:28,goals:1,assists:0,rating:3,starter:true,club:'Servette'},
      {name:'Rekik',pos:'DF',age:29,caps:22,goals:0,assists:0,rating:3,starter:true,club:'Maribor'},
      {name:'Talbi',pos:'DF',age:26,caps:20,goals:0,assists:2,rating:3,starter:true,club:'Lorient'},
      {name:'Valery',pos:'DF',age:27,caps:18,goals:1,assists:2,rating:3,starter:true,club:'Young Boys'},
      {name:'Skhiri',pos:'CC',age:30,caps:68,goals:5,assists:8,rating:4,starter:true,club:'Eintracht'},
      {name:'Mejbri',pos:'CC',age:22,caps:18,goals:3,assists:4,rating:4,starter:true,club:'Burnley'},
      {name:'Ben Slimane',pos:'CC',age:27,caps:22,goals:2,assists:3,rating:3,starter:true,club:'Norwich'},
      {name:'Gharbi',pos:'CC',age:21,caps:14,goals:2,assists:3,rating:3,starter:true,club:'Augsburg'},
      {name:'Mastouri',pos:'AT',age:26,caps:20,goals:6,assists:3,rating:3,starter:true,club:'Dynamo Makhachkala'},
      {name:'Saad',pos:'AT',age:28,caps:18,goals:5,assists:2,rating:3,starter:true,club:'Hannover'},
      {name:'Tounekti',pos:'AT',age:27,caps:14,goals:3,assists:2,rating:3,starter:false,club:'Celtic'},
    ]},
  'Belgio':{group:'G',coach:'Rudi Garcia',formation:'4-2-3-1',natCode:'be',
    starting11:['Courtois','Castagne','Debast','Theate','De Cuyper','Tielemans','Onana','Doku','De Bruyne','Trossard','De Ketelaere'],
    players:[
      {name:'Courtois',pos:'GK',age:33,caps:108,goals:0,assists:0,rating:5,starter:true,club:'Real Madrid'},
      {name:'Lammens',pos:'GK',age:28,caps:12,goals:0,assists:0,rating:3,starter:false,club:'Man Utd'},
      {name:'Castagne',pos:'DF',age:29,caps:48,goals:2,assists:5,rating:4,starter:true,club:'Fulham'},
      {name:'Debast',pos:'DF',age:22,caps:20,goals:0,assists:1,rating:4,starter:true,club:'Sporting'},
      {name:'Theate',pos:'DF',age:24,caps:28,goals:2,assists:1,rating:4,starter:true,club:'Eintracht'},
      {name:'De Cuyper',pos:'DF',age:23,caps:18,goals:1,assists:3,rating:4,starter:true,club:'Brighton'},
      {name:'Mechele',pos:'DF',age:33,caps:30,goals:1,assists:0,rating:3,starter:false,club:'Bruges'},
      {name:'De Bruyne',pos:'CC',age:35,caps:108,goals:26,assists:51,rating:5,starter:true,club:'Napoli'},
      {name:'Tielemans',pos:'CC',age:28,caps:68,goals:12,assists:14,rating:4,starter:true,club:'Aston Villa'},
      {name:'Onana',pos:'CC',age:28,caps:38,goals:4,assists:6,rating:4,starter:true,club:'Aston Villa'},
      {name:'Vanaken',pos:'CC',age:32,caps:58,goals:8,assists:10,rating:4,starter:false,club:'Bruges'},
      {name:'Doku',pos:'AT',age:23,caps:28,goals:6,assists:8,rating:5,starter:true,club:'Man City'},
      {name:'De Ketelaere',pos:'AT',age:24,caps:28,goals:8,assists:7,rating:4,starter:true,club:'Atalanta'},
      {name:'Trossard',pos:'AT',age:30,caps:38,goals:8,assists:6,rating:4,starter:true,club:'Arsenal'},
      {name:'Lukaku',pos:'AT',age:32,caps:108,goals:78,assists:22,rating:5,starter:false,club:'Napoli'},
      {name:'Saelemaekers',pos:'AT',age:26,caps:22,goals:3,assists:4,rating:3,starter:false,club:'Milan'},
    ]},
  'Egitto':{group:'G',coach:'Hossam Hassan',formation:'3-4-1-2',natCode:'eg',
    starting11:['El Shennawy','Yasser Ibrahim','Abdelmonem','Rabia','Hany','Attia','Lasheen','Fattouh','Ashour','Salah','Marmoush'],
    players:[
      {name:'El Shennawy',pos:'GK',age:37,caps:88,goals:0,assists:0,rating:4,starter:true,club:'Al Ahly'},
      {name:'Shobeir',pos:'GK',age:30,caps:18,goals:0,assists:0,rating:3,starter:false,club:'Al Ahly'},
      {name:'Hany',pos:'DF',age:30,caps:38,goals:2,assists:1,rating:3,starter:true,club:'Al Ahly'},
      {name:'Yasser Ibrahim',pos:'DF',age:29,caps:34,goals:2,assists:0,rating:3,starter:true,club:'Al Ahly'},
      {name:'Abdelmonem',pos:'DF',age:24,caps:20,goals:1,assists:0,rating:4,starter:true,club:'Nizza'},
      {name:'Rabia',pos:'DF',age:28,caps:22,goals:1,assists:0,rating:3,starter:true,club:'Al-Ain'},
      {name:'Fattouh',pos:'DF',age:28,caps:22,goals:0,assists:2,rating:3,starter:true,club:'Zamalek'},
      {name:'Attia',pos:'CC',age:28,caps:42,goals:4,assists:6,rating:3,starter:true,club:'Al Ahly'},
      {name:'Lasheen',pos:'CC',age:27,caps:24,goals:2,assists:4,rating:3,starter:true,club:'Pyramids'},
      {name:'Ashour',pos:'CC',age:26,caps:20,goals:2,assists:3,rating:3,starter:true,club:'Al Ahly'},
      {name:'Salah',pos:'CC',age:34,caps:100,goals:52,assists:34,rating:5,starter:true,club:'Liverpool'},
      {name:'Trezeguet',pos:'AT',age:31,caps:58,goals:16,assists:8,rating:4,starter:false,club:'Al Ahly'},
      {name:'Marmoush',pos:'AT',age:26,caps:38,goals:18,assists:8,rating:5,starter:true,club:'Man City'},
      {name:'Abdelkarim',pos:'AT',age:24,caps:10,goals:3,assists:1,rating:3,starter:false,club:'Barcellona'},
    ]},
  'Iran':{group:'G',coach:'Amir Ghalenoei',formation:'4-2-3-1',natCode:'ir',
    starting11:['Beiranvand','Yousefi','Kanaani','Khalilzadeh','Mohammadi','Ezatolahi','Ghoddos','Jahanbakhsh','Ghaedi','Mohebi','Taremi'],
    players:[
      {name:'Beiranvand',pos:'GK',age:32,caps:68,goals:0,assists:0,rating:4,starter:true,club:'Tractor'},
      {name:'Hosseini',pos:'GK',age:30,caps:18,goals:0,assists:0,rating:3,starter:false,club:'Sepahan'},
      {name:'Yousefi',pos:'DF',age:29,caps:38,goals:1,assists:2,rating:3,starter:true,club:'Sepahan'},
      {name:'Kanaani',pos:'DF',age:31,caps:42,goals:2,assists:0,rating:3,starter:true,club:'Persepolis'},
      {name:'Khalilzadeh',pos:'DF',age:33,caps:60,goals:2,assists:2,rating:3,starter:true,club:'Tractor'},
      {name:'Mohammadi',pos:'DF',age:32,caps:52,goals:1,assists:3,rating:3,starter:true,club:'Persepolis'},
      {name:'Ezatolahi',pos:'CC',age:27,caps:48,goals:3,assists:4,rating:3,starter:true,club:'Shabab Al-Ahli'},
      {name:'Ghoddos',pos:'CC',age:31,caps:38,goals:5,assists:6,rating:3,starter:true,club:'Kalba'},
      {name:'Jahanbakhsh',pos:'CC',age:31,caps:82,goals:12,assists:14,rating:4,starter:true,club:'Dender'},
      {name:'Ghaedi',pos:'CC',age:27,caps:22,goals:4,assists:3,rating:3,starter:true,club:'Al-Nassr'},
      {name:'Mohebi',pos:'CC',age:26,caps:18,goals:2,assists:3,rating:3,starter:true,club:'Rostov'},
      {name:'Taremi',pos:'AT',age:32,caps:88,goals:46,assists:18,rating:5,starter:true,club:'Olympiacos'},
      {name:'Alipour',pos:'AT',age:29,caps:30,goals:8,assists:3,rating:3,starter:false,club:'Persepolis'},
    ]},
  'Nuova Zelanda':{group:'G',coach:'Darren Bazeley',formation:'4-2-3-1',natCode:'nz',
    starting11:['Crocombe','Payne','Bindon','Boxall','Cacace','Stamenic','Bell','McCowatt','Singh','Garbett','Wood'],
    players:[
      {name:'Crocombe',pos:'GK',age:30,caps:28,goals:0,assists:0,rating:3,starter:true,club:'Millwall'},
      {name:'Paulsen',pos:'GK',age:28,caps:10,goals:0,assists:0,rating:2,starter:false,club:'Lechia Gdansk'},
      {name:'Boxall',pos:'DF',age:32,caps:48,goals:2,assists:0,rating:3,starter:true,club:'Minnesota'},
      {name:'Bindon',pos:'DF',age:23,caps:14,goals:0,assists:0,rating:3,starter:true,club:'Nottm Forest'},
      {name:'Cacace',pos:'DF',age:24,caps:22,goals:1,assists:2,rating:3,starter:true,club:'Wrexham'},
      {name:'Payne',pos:'DF',age:29,caps:30,goals:0,assists:2,rating:3,starter:true,club:'Wellington Phoenix'},
      {name:'Stamenic',pos:'CC',age:26,caps:18,goals:1,assists:2,rating:3,starter:true,club:'Swansea'},
      {name:'Bell',pos:'CC',age:28,caps:24,goals:2,assists:3,rating:3,starter:true,club:'Viking'},
      {name:'Thomas',pos:'CC',age:27,caps:16,goals:1,assists:1,rating:2,starter:false,club:'PEC Zwolle'},
      {name:'McCowatt',pos:'AT',age:26,caps:20,goals:5,assists:3,rating:3,starter:true,club:'Silkeborg'},
      {name:'Singh',pos:'AT',age:27,caps:22,goals:4,assists:4,rating:3,starter:true,club:'Wellington Phoenix'},
      {name:'Garbett',pos:'AT',age:26,caps:18,goals:5,assists:2,rating:3,starter:true,club:'Peterborough'},
      {name:'Wood',pos:'AT',age:33,caps:62,goals:24,assists:6,rating:4,starter:true,club:'Nottm Forest'},
    ]},
  'Spagna':{group:'H',coach:'Luis de la Fuente',formation:'4-3-3',natCode:'es',
    starting11:['Unai Simon','Porro','Cubarsi','Laporte','Grimaldo','Pedri','Rodri','Fabian Ruiz','Yamal','Olmo','Nico Williams'],
    players:[
      {name:'Unai Simon',pos:'GK',age:28,caps:44,goals:0,assists:0,rating:4,starter:true,club:'Athletic'},
      {name:'Raya',pos:'GK',age:29,caps:14,goals:0,assists:0,rating:4,starter:false,club:'Arsenal'},
      {name:'Laporte',pos:'DF',age:32,caps:60,goals:4,assists:2,rating:4,starter:true,club:'Athletic'},
      {name:'Cubarsi',pos:'DF',age:18,caps:12,goals:0,assists:1,rating:4,starter:true,club:'Barcellona'},
      {name:'Grimaldo',pos:'DF',age:29,caps:22,goals:2,assists:5,rating:4,starter:true,club:'Bayer Leverkusen'},
      {name:'Porro',pos:'DF',age:25,caps:22,goals:1,assists:4,rating:4,starter:true,club:'Tottenham'},
      {name:'Eric Garcia',pos:'DF',age:24,caps:30,goals:1,assists:1,rating:3,starter:false,club:'Barcellona'},
      {name:'Rodri',pos:'CC',age:29,caps:52,goals:6,assists:14,rating:5,starter:true,club:'Man City'},
      {name:'Pedri',pos:'CC',age:23,caps:48,goals:8,assists:12,rating:5,starter:true,club:'Barcellona'},
      {name:'Fabian Ruiz',pos:'CC',age:29,caps:44,goals:6,assists:8,rating:4,starter:true,club:'PSG'},
      {name:'Gavi',pos:'CC',age:21,caps:42,goals:4,assists:8,rating:4,starter:false,club:'Barcellona'},
      {name:'Yamal',pos:'AT',age:18,caps:24,goals:8,assists:12,rating:5,starter:true,club:'Barcellona'},
      {name:'Nico Williams',pos:'AT',age:22,caps:24,goals:6,assists:8,rating:5,starter:true,club:'Athletic'},
      {name:'Olmo',pos:'AT',age:27,caps:42,goals:11,assists:10,rating:5,starter:true,club:'Barcellona'},
      {name:'Oyarzabal',pos:'AT',age:28,caps:48,goals:16,assists:12,rating:4,starter:false,club:'Real Sociedad'},
      {name:'Ferran',pos:'AT',age:25,caps:38,goals:12,assists:7,rating:4,starter:false,club:'Barcellona'},
    ]},
  'Capo Verde':{group:'H',coach:'Bubista',formation:'4-2-3-1',natCode:'cv',
    starting11:['Vozinha','Moreira','Logan Costa','Lopes Cabral','Pina','Laros Duarte','Duarte','Monteiro','Semedo','Livramento','Rodrigues'],
    players:[
      {name:'Vozinha',pos:'GK',age:30,caps:34,goals:0,assists:0,rating:3,starter:true,club:'Chaves'},
      {name:'Logan Costa',pos:'DF',age:25,caps:28,goals:1,assists:0,rating:4,starter:true,club:'Villarreal'},
      {name:'Lopes Cabral',pos:'DF',age:23,caps:14,goals:0,assists:1,rating:3,starter:true,club:'Benfica'},
      {name:'Moreira',pos:'DF',age:27,caps:20,goals:0,assists:1,rating:3,starter:true,club:'Columbus Crew'},
      {name:'Pina',pos:'DF',age:26,caps:18,goals:0,assists:2,rating:3,starter:true,club:'Trabzonspor'},
      {name:'Roberto Lopes',pos:'DF',age:31,caps:24,goals:1,assists:0,rating:3,starter:false,club:'Shamrock Rovers'},
      {name:'Laros Duarte',pos:'CC',age:24,caps:16,goals:2,assists:3,rating:3,starter:true,club:'Puskas Akademia'},
      {name:'Duarte',pos:'CC',age:27,caps:22,goals:2,assists:3,rating:3,starter:true,club:'Ludogorets'},
      {name:'Monteiro',pos:'CC',age:26,caps:18,goals:1,assists:2,rating:3,starter:true,club:'PEC Zwolle'},
      {name:'Semedo',pos:'CC',age:28,caps:20,goals:2,assists:3,rating:3,starter:true,club:'Farense'},
      {name:'Livramento',pos:'AT',age:25,caps:20,goals:5,assists:4,rating:3,starter:true,club:'Casa Pia'},
      {name:'Rodrigues',pos:'AT',age:28,caps:28,goals:8,assists:4,rating:3,starter:true,club:'Apollon Limassol'},
      {name:'Varela',pos:'AT',age:29,caps:24,goals:6,assists:3,rating:3,starter:false,club:'Maccabi Tel Aviv'},
    ]},
  'Arabia Saudita':{group:'H',coach:'Georgios Donis',formation:'4-3-3',natCode:'sa',
    starting11:['Al Aqidi','Boushal','Tambakti','Al-Amri','Al-Harbi','Kanno','Al-Khaibari','N. Al-Dawsari','Al-Buraikan','S. Al-Dawsari','Al-Shehri'],
    players:[
      {name:'Al Aqidi',pos:'GK',age:28,caps:30,goals:0,assists:0,rating:3,starter:true,club:'Al Nassr'},
      {name:'Al Owais',pos:'GK',age:33,caps:58,goals:0,assists:0,rating:3,starter:false,club:'Al Ula'},
      {name:'Tambakti',pos:'DF',age:24,caps:28,goals:1,assists:0,rating:3,starter:true,club:'Al Hilal'},
      {name:'Al-Amri',pos:'DF',age:26,caps:22,goals:0,assists:0,rating:3,starter:true,club:'Al Nassr'},
      {name:'Al-Harbi',pos:'DF',age:28,caps:30,goals:1,assists:2,rating:3,starter:true,club:'Al Hilal'},
      {name:'Boushal',pos:'DF',age:27,caps:28,goals:1,assists:3,rating:3,starter:true,club:'Al Nassr'},
      {name:'Abdulhamid',pos:'DF',age:25,caps:28,goals:1,assists:4,rating:4,starter:false,club:'Lens'},
      {name:'Kanno',pos:'CC',age:27,caps:38,goals:3,assists:5,rating:4,starter:true,club:'Al Hilal'},
      {name:'Al-Khaibari',pos:'CC',age:26,caps:32,goals:2,assists:4,rating:3,starter:true,club:'Al Nassr'},
      {name:'N. Al-Dawsari',pos:'CC',age:33,caps:78,goals:22,assists:16,rating:4,starter:true,club:'Al Hilal'},
      {name:'S. Al-Dawsari',pos:'AT',age:33,caps:82,goals:26,assists:14,rating:4,starter:true,club:'Al Hilal'},
      {name:'Al-Buraikan',pos:'AT',age:24,caps:38,goals:12,assists:5,rating:4,starter:true,club:'Al Ahli'},
      {name:'Al-Shehri',pos:'AT',age:30,caps:58,goals:18,assists:8,rating:4,starter:true,club:'Al Ittihad'},
      {name:'Al-Hamdan',pos:'AT',age:26,caps:24,goals:6,assists:3,rating:3,starter:false,club:'Al Nassr'},
    ]},
  'Uruguay':{group:'H',coach:'Marcelo Bielsa',formation:'4-4-2',natCode:'uy',
    starting11:['Rochet','Varela','R. Araujo','Jose Gimenez','Olivera','Valverde','Ugarte','Bentancur','De Arrascaeta','Nunez','J. Alvarez'],
    players:[
      {name:'Rochet',pos:'GK',age:30,caps:28,goals:0,assists:0,rating:3,starter:true,club:'Internacional'},
      {name:'Muslera',pos:'GK',age:38,caps:140,goals:0,assists:0,rating:4,starter:false,club:'Estudiantes'},
      {name:'R. Araujo',pos:'DF',age:26,caps:44,goals:3,assists:1,rating:5,starter:true,club:'Barcellona'},
      {name:'Jose Gimenez',pos:'DF',age:30,caps:78,goals:4,assists:2,rating:4,starter:true,club:'Atletico Madrid'},
      {name:'Varela',pos:'DF',age:25,caps:22,goals:0,assists:2,rating:3,starter:true,club:'Flamengo'},
      {name:'Olivera',pos:'DF',age:27,caps:38,goals:2,assists:4,rating:4,starter:true,club:'Napoli'},
      {name:'Caceres',pos:'DF',age:30,caps:68,goals:3,assists:2,rating:3,starter:false,club:'America'},
      {name:'Valverde',pos:'CC',age:26,caps:58,goals:10,assists:12,rating:5,starter:true,club:'Real Madrid'},
      {name:'Ugarte',pos:'CC',age:27,caps:32,goals:2,assists:3,rating:4,starter:true,club:'Man Utd'},
      {name:'Bentancur',pos:'CC',age:28,caps:62,goals:5,assists:8,rating:4,starter:true,club:'Tottenham'},
      {name:'De Arrascaeta',pos:'CC',age:31,caps:68,goals:14,assists:18,rating:4,starter:true,club:'Flamengo'},
      {name:'Nunez',pos:'AT',age:25,caps:44,goals:19,assists:6,rating:5,starter:true,club:'Al-Hilal'},
      {name:'J. Alvarez',pos:'AT',age:27,caps:42,goals:12,assists:8,rating:4,starter:true,club:'Atletico Madrid'},
      {name:'Aguirre',pos:'AT',age:24,caps:14,goals:4,assists:2,rating:3,starter:false,club:'Tigres'},
    ]},
  'Francia':{group:'I',coach:'Didier Deschamps',formation:'4-2-3-1',natCode:'fr',
    starting11:['Maignan','Kounde','Saliba','Upamecano','Theo Hernandez','Rabiot','Tchouameni','Dembele','Olise','Doue','Mbappe'],
    players:[
      {name:'Maignan',pos:'GK',age:29,caps:28,goals:0,assists:0,rating:5,starter:true,club:'Milan'},
      {name:'Samba',pos:'GK',age:30,caps:12,goals:0,assists:0,rating:3,starter:false,club:'Rennes'},
      {name:'Saliba',pos:'DF',age:25,caps:22,goals:1,assists:0,rating:5,starter:true,club:'Arsenal'},
      {name:'Upamecano',pos:'DF',age:26,caps:40,goals:1,assists:0,rating:4,starter:true,club:'Bayern'},
      {name:'Kounde',pos:'DF',age:27,caps:38,goals:2,assists:3,rating:5,starter:true,club:'Barcellona'},
      {name:'Theo Hernandez',pos:'DF',age:27,caps:30,goals:3,assists:6,rating:5,starter:true,club:'Al-Hilal'},
      {name:'Konate',pos:'DF',age:26,caps:18,goals:1,assists:0,rating:4,starter:false,club:'Liverpool'},
      {name:'Tchouameni',pos:'CC',age:26,caps:38,goals:3,assists:2,rating:4,starter:true,club:'Real Madrid'},
      {name:'Rabiot',pos:'CC',age:31,caps:52,goals:6,assists:8,rating:4,starter:true,club:'Milan'},
      {name:'Kante',pos:'CC',age:35,caps:82,goals:5,assists:8,rating:4,starter:false,club:'Fenerbahce'},
      {name:'Zaire-Emery',pos:'CC',age:20,caps:14,goals:2,assists:3,rating:4,starter:false,club:'PSG'},
      {name:'Mbappe',pos:'AT',age:27,caps:86,goals:52,assists:28,rating:5,starter:true,club:'Real Madrid'},
      {name:'Dembele',pos:'AT',age:28,caps:52,goals:10,assists:14,rating:5,starter:true,club:'PSG'},
      {name:'Olise',pos:'AT',age:24,caps:18,goals:5,assists:8,rating:5,starter:true,club:'Bayern'},
      {name:'Doue',pos:'AT',age:20,caps:10,goals:2,assists:3,rating:4,starter:true,club:'PSG'},
      {name:'Thuram',pos:'AT',age:27,caps:38,goals:14,assists:8,rating:4,starter:false,club:'Inter'},
    ]},
  'Senegal':{group:'I',coach:'Pape Thiaw',formation:'4-3-3',natCode:'sn',
    starting11:['Edouard Mendy','Jakobs','Koulibaly','Niakhate','Mbow','Lamine Camara','Pape Matar Sarr','Idrissa Gueye','Ismaila Sarr','Mane','Iliman Ndiaye'],
    players:[
      {name:'Edouard Mendy',pos:'GK',age:34,caps:50,goals:0,assists:0,rating:4,starter:true,club:'Al-Ahli'},
      {name:'Koulibaly',pos:'DF',age:35,caps:88,goals:3,assists:2,rating:5,starter:true,club:'Al-Hilal'},
      {name:'Niakhate',pos:'DF',age:29,caps:28,goals:1,assists:0,rating:4,starter:true,club:'Lione'},
      {name:'Jakobs',pos:'DF',age:25,caps:18,goals:0,assists:2,rating:3,starter:true,club:'Galatasaray'},
      {name:'Mbow',pos:'DF',age:26,caps:14,goals:0,assists:1,rating:3,starter:true,club:'Paris FC'},
      {name:'Antoine Mendy',pos:'DF',age:28,caps:18,goals:0,assists:2,rating:3,starter:false,club:'Nizza'},
      {name:'Idrissa Gueye',pos:'CC',age:36,caps:82,goals:4,assists:6,rating:4,starter:true,club:'Everton'},
      {name:'Pape Matar Sarr',pos:'CC',age:22,caps:22,goals:3,assists:4,rating:4,starter:true,club:'Tottenham'},
      {name:'Lamine Camara',pos:'CC',age:21,caps:18,goals:4,assists:3,rating:4,starter:true,club:'Monaco'},
      {name:'Pape Gueye',pos:'CC',age:26,caps:18,goals:1,assists:2,rating:3,starter:false,club:'Villarreal'},
      {name:'Mane',pos:'AT',age:34,caps:102,goals:40,assists:24,rating:5,starter:true,club:'Al-Nassr'},
      {name:'Ismaila Sarr',pos:'AT',age:27,caps:48,goals:16,assists:10,rating:4,starter:true,club:'Crystal Palace'},
      {name:'Iliman Ndiaye',pos:'AT',age:25,caps:24,goals:7,assists:4,rating:4,starter:true,club:'Everton'},
      {name:'Jackson',pos:'AT',age:24,caps:18,goals:6,assists:2,rating:4,starter:false,club:'Bayern'},
    ]},
  'Iraq':{group:'I',coach:'Graham Arnold',formation:'4-2-3-1',natCode:'iq',
    starting11:['Hassan','Hussein Ali','Sulaka','Tahseen','Doski','Al-Ammari','Bayesh','Ali Jasim','Iqbal','Amyn','Aymen Hussein'],
    players:[
      {name:'Hassan',pos:'GK',age:29,caps:38,goals:0,assists:0,rating:3,starter:true,club:'Al-Zawraa'},
      {name:'Talib',pos:'GK',age:27,caps:18,goals:0,assists:0,rating:3,starter:false,club:'Al-Talaba'},
      {name:'Hussein Ali',pos:'DF',age:27,caps:30,goals:1,assists:0,rating:3,starter:true,club:'Pogon Szczecin'},
      {name:'Sulaka',pos:'DF',age:28,caps:28,goals:0,assists:0,rating:3,starter:true,club:'Port'},
      {name:'Tahseen',pos:'DF',age:25,caps:22,goals:0,assists:0,rating:3,starter:true,club:'Pakhtakor'},
      {name:'Doski',pos:'DF',age:24,caps:18,goals:0,assists:1,rating:3,starter:true,club:'Plzen'},
      {name:'Al-Ammari',pos:'CC',age:26,caps:22,goals:2,assists:3,rating:3,starter:true,club:'Cracovia'},
      {name:'Bayesh',pos:'CC',age:27,caps:20,goals:1,assists:2,rating:3,starter:true,club:'Al-Dhafra'},
      {name:'Iqbal',pos:'CC',age:23,caps:18,goals:2,assists:4,rating:3,starter:true,club:'Utrecht'},
      {name:'Amyn',pos:'CC',age:26,caps:16,goals:1,assists:2,rating:3,starter:true,club:'AEK Larnaca'},
      {name:'Ali Jasim',pos:'AT',age:24,caps:22,goals:5,assists:2,rating:3,starter:true,club:'Al-Najma'},
      {name:'Aymen Hussein',pos:'AT',age:29,caps:48,goals:16,assists:6,rating:4,starter:true,club:'Al-Karma'},
      {name:'Al-Hamadi',pos:'AT',age:24,caps:18,goals:6,assists:2,rating:3,starter:false,club:'Ipswich'},
    ]},
  'Norvegia':{group:'I',coach:'Stale Solbakken',formation:'4-3-3',natCode:'no',
    starting11:['Nyland','Ryerson','Heggem','Ostigard','Bjorkan','Thorstvedt','Berg','Berge','Sorloth','Haaland','Nusa'],
    players:[
      {name:'Nyland',pos:'GK',age:34,caps:42,goals:0,assists:0,rating:3,starter:true,club:'Siviglia'},
      {name:'Selvik',pos:'GK',age:29,caps:8,goals:0,assists:0,rating:2,starter:false,club:'Watford'},
      {name:'Ostigard',pos:'DF',age:25,caps:28,goals:1,assists:0,rating:4,starter:true,club:'Genoa'},
      {name:'Heggem',pos:'DF',age:24,caps:18,goals:0,assists:2,rating:3,starter:true,club:'Bologna'},
      {name:'Ryerson',pos:'DF',age:27,caps:28,goals:2,assists:4,rating:3,starter:true,club:'B.Dortmund'},
      {name:'Bjorkan',pos:'DF',age:26,caps:22,goals:1,assists:3,rating:3,starter:true,club:'Bodo/Glimt'},
      {name:'Moller Wolfe',pos:'DF',age:23,caps:12,goals:0,assists:1,rating:3,starter:false,club:'Wolves'},
      {name:'Odegaard',pos:'CC',age:27,caps:68,goals:12,assists:18,rating:5,starter:false,club:'Arsenal'},
      {name:'Thorstvedt',pos:'CC',age:24,caps:22,goals:2,assists:3,rating:3,starter:true,club:'Sassuolo'},
      {name:'Berg',pos:'CC',age:24,caps:14,goals:1,assists:2,rating:3,starter:true,club:'Bodo/Glimt'},
      {name:'Berge',pos:'CC',age:27,caps:48,goals:5,assists:7,rating:4,starter:true,club:'Fulham'},
      {name:'Haaland',pos:'AT',age:25,caps:49,goals:55,assists:8,rating:5,starter:true,club:'Man City'},
      {name:'Sorloth',pos:'AT',age:29,caps:48,goals:18,assists:6,rating:4,starter:true,club:'Atletico Madrid'},
      {name:'Nusa',pos:'AT',age:21,caps:16,goals:4,assists:5,rating:4,starter:true,club:'Lipsia'},
      {name:'Strand Larsen',pos:'AT',age:25,caps:18,goals:6,assists:3,rating:3,starter:false,club:'Crystal Palace'},
    ]},
  'Argentina':{group:'J',coach:'Lionel Scaloni',formation:'4-3-3',natCode:'ar',
    starting11:['E. Martinez','Molina','Romero','Otamendi','Tagliafico','Mac Allister','Paredes','E. Fernandez','Messi','J. Alvarez','Almada'],
    players:[
      {name:'E. Martinez',pos:'GK',age:33,caps:52,goals:0,assists:0,rating:5,starter:true,club:'Aston Villa'},
      {name:'Rulli',pos:'GK',age:33,caps:18,goals:0,assists:0,rating:3,starter:false,club:'Marsiglia'},
      {name:'Romero',pos:'DF',age:27,caps:44,goals:3,assists:1,rating:5,starter:true,club:'Tottenham'},
      {name:'Otamendi',pos:'DF',age:38,caps:108,goals:5,assists:2,rating:4,starter:true,club:'Benfica'},
      {name:'Molina',pos:'DF',age:27,caps:38,goals:4,assists:6,rating:4,starter:true,club:'Atletico Madrid'},
      {name:'Tagliafico',pos:'DF',age:32,caps:78,goals:4,assists:8,rating:4,starter:true,club:'Lione'},
      {name:'L. Martinez',pos:'DF',age:27,caps:30,goals:1,assists:0,rating:4,starter:false,club:'Man Utd'},
      {name:'Mac Allister',pos:'CC',age:26,caps:42,goals:6,assists:8,rating:5,starter:true,club:'Liverpool'},
      {name:'Paredes',pos:'CC',age:31,caps:58,goals:2,assists:5,rating:3,starter:true,club:'Boca Juniors'},
      {name:'E. Fernandez',pos:'CC',age:24,caps:28,goals:4,assists:6,rating:4,starter:true,club:'Chelsea'},
      {name:'De Paul',pos:'CC',age:31,caps:60,goals:8,assists:12,rating:4,starter:false,club:'Inter Miami'},
      {name:'Messi',pos:'AT',age:38,caps:186,goals:109,assists:57,rating:5,starter:true,club:'Inter Miami'},
      {name:'J. Alvarez',pos:'AT',age:25,caps:40,goals:14,assists:5,rating:5,starter:true,club:'Atletico Madrid'},
      {name:'Almada',pos:'AT',age:25,caps:18,goals:4,assists:4,rating:4,starter:true,club:'Atletico Madrid'},
      {name:'Lautaro Martinez',pos:'AT',age:27,caps:44,goals:14,assists:8,rating:4,starter:false,club:'Inter'},
    ]},
  'Algeria':{group:'J',coach:'Vladimir Petkovic',formation:'4-2-3-1',natCode:'dz',
    starting11:['Zidane','Belghali','Bensebaini','Mandi','Ait-Nouri','Zerrouki','Boudaoui','Mahrez','Aouar','Chaibi','Gouiri'],
    players:[
      {name:'Zidane',pos:'GK',age:25,caps:18,goals:0,assists:0,rating:3,starter:true,club:'Granada'},
      {name:'Benbot',pos:'GK',age:30,caps:14,goals:0,assists:0,rating:3,starter:false,club:'USM Alger'},
      {name:'Bensebaini',pos:'DF',age:29,caps:50,goals:4,assists:3,rating:4,starter:true,club:'B.Dortmund'},
      {name:'Mandi',pos:'DF',age:33,caps:72,goals:3,assists:2,rating:4,starter:true,club:'Lille'},
      {name:'Ait-Nouri',pos:'DF',age:24,caps:22,goals:1,assists:4,rating:4,starter:true,club:'Man City'},
      {name:'Belghali',pos:'DF',age:26,caps:18,goals:0,assists:1,rating:3,starter:true,club:'Verona'},
      {name:'Hadjam',pos:'DF',age:24,caps:14,goals:0,assists:1,rating:3,starter:false,club:'Young Boys'},
      {name:'Zerrouki',pos:'CC',age:27,caps:28,goals:2,assists:4,rating:4,starter:true,club:'Twente'},
      {name:'Boudaoui',pos:'CC',age:25,caps:30,goals:3,assists:5,rating:4,starter:true,club:'Nizza'},
      {name:'Aouar',pos:'CC',age:27,caps:38,goals:6,assists:8,rating:4,starter:true,club:'Al-Ittihad'},
      {name:'Chaibi',pos:'CC',age:23,caps:18,goals:3,assists:4,rating:4,starter:true,club:'Eintracht'},
      {name:'Mahrez',pos:'AT',age:35,caps:92,goals:32,assists:28,rating:5,starter:true,club:'Al-Ahli'},
      {name:'Gouiri',pos:'AT',age:24,caps:22,goals:6,assists:4,rating:4,starter:true,club:'Marsiglia'},
      {name:'Amoura',pos:'AT',age:25,caps:18,goals:5,assists:3,rating:4,starter:false,club:'Wolfsburg'},
    ]},
  'Austria':{group:'J',coach:'Ralf Rangnick',formation:'4-2-3-1',natCode:'at',
    starting11:['A. Schlager','Laimer','Lienhart','Alaba','Mwene','X. Schlager','Seiwald','Wimmer','Baumgartner','Sabitzer','Arnautovic'],
    players:[
      {name:'A. Schlager',pos:'GK',age:32,caps:28,goals:0,assists:0,rating:3,starter:true,club:'Salisburgo'},
      {name:'Pentz',pos:'GK',age:26,caps:8,goals:0,assists:0,rating:3,starter:false,club:'Brondby'},
      {name:'Alaba',pos:'DF',age:33,caps:104,goals:14,assists:16,rating:4,starter:true,club:'Real Madrid'},
      {name:'Lienhart',pos:'DF',age:30,caps:32,goals:1,assists:0,rating:4,starter:true,club:'Friburgo'},
      {name:'Mwene',pos:'DF',age:30,caps:24,goals:0,assists:2,rating:3,starter:true,club:'Mainz'},
      {name:'Laimer',pos:'CC',age:27,caps:38,goals:3,assists:6,rating:4,starter:true,club:'Bayern'},
      {name:'X. Schlager',pos:'CC',age:27,caps:38,goals:2,assists:5,rating:4,starter:true,club:'Lipsia'},
      {name:'Seiwald',pos:'CC',age:24,caps:22,goals:1,assists:2,rating:4,starter:true,club:'Lipsia'},
      {name:'Sabitzer',pos:'CC',age:31,caps:68,goals:12,assists:14,rating:4,starter:true,club:'B.Dortmund'},
      {name:'Wimmer',pos:'CC',age:24,caps:14,goals:1,assists:2,rating:3,starter:true,club:'Wolfsburg'},
      {name:'Arnautovic',pos:'AT',age:37,caps:106,goals:36,assists:14,rating:4,starter:true,club:'Stella Rossa'},
      {name:'Gregoritsch',pos:'AT',age:30,caps:38,goals:14,assists:5,rating:3,starter:false,club:'Augsburg'},
    ]},
  'Giordania':{group:'J',coach:'Jamal Sellami',formation:'3-4-3',natCode:'jo',
    starting11:['Abulaila','Abu Dahba','Nasib','Al-Arab','Haddad','Al-Rawabdeh','Al-Rashdan','Abu Taha','Al-Tamari','Ali Olwan','Al-Mardi'],
    players:[
      {name:'Abulaila',pos:'GK',age:28,caps:34,goals:0,assists:0,rating:3,starter:true,club:'Al-Hussein'},
      {name:'Al-Fakhouri',pos:'GK',age:30,caps:18,goals:0,assists:0,rating:3,starter:false,club:'Al-Wehdat'},
      {name:'Al-Arab',pos:'DF',age:26,caps:22,goals:0,assists:1,rating:3,starter:true,club:'Seoul FC'},
      {name:'Nasib',pos:'DF',age:27,caps:20,goals:0,assists:0,rating:3,starter:true,club:'Al-Zawraa'},
      {name:'Abu Dahba',pos:'DF',age:25,caps:18,goals:0,assists:0,rating:3,starter:true,club:'Al-Faisaly'},
      {name:'Haddad',pos:'DF',age:28,caps:24,goals:0,assists:1,rating:3,starter:true,club:'Al-Hussein'},
      {name:'Al-Rawabdeh',pos:'CC',age:26,caps:20,goals:1,assists:2,rating:3,starter:true,club:'Selangor'},
      {name:'Al-Rashdan',pos:'CC',age:27,caps:22,goals:2,assists:3,rating:3,starter:true,club:'Qatar SC'},
      {name:'Abu Taha',pos:'CC',age:25,caps:16,goals:1,assists:1,rating:3,starter:true,club:'Al-Quwa'},
      {name:'Al-Tamari',pos:'AT',age:27,caps:48,goals:14,assists:8,rating:4,starter:true,club:'Rennes'},
      {name:'Ali Olwan',pos:'AT',age:26,caps:24,goals:7,assists:3,rating:3,starter:true,club:'Al-Sailiya'},
      {name:'Al-Mardi',pos:'AT',age:25,caps:20,goals:5,assists:2,rating:3,starter:true,club:'Al-Hussein'},
      {name:'Shararh',pos:'AT',age:28,caps:22,goals:6,assists:3,rating:3,starter:false,club:'Raja CA'},
    ]},
  'Portogallo':{group:'K',coach:'Roberto Martinez',formation:'4-3-3',natCode:'pt',
    starting11:['Diogo Costa','Cancelo','Ruben Dias','Inacio','Nuno Mendes','Joao Neves','Vitinha','Bruno Fernandes','Bernardo Silva','Cristiano Ronaldo','Joao Felix'],
    players:[
      {name:'Diogo Costa',pos:'GK',age:26,caps:28,goals:0,assists:0,rating:5,starter:true,club:'Porto'},
      {name:'Sa',pos:'GK',age:27,caps:8,goals:0,assists:0,rating:3,starter:false,club:'Wolves'},
      {name:'Cancelo',pos:'DF',age:32,caps:72,goals:4,assists:14,rating:5,starter:true,club:'Barcellona'},
      {name:'Ruben Dias',pos:'DF',age:28,caps:58,goals:2,assists:1,rating:5,starter:true,club:'Man City'},
      {name:'Inacio',pos:'DF',age:24,caps:22,goals:1,assists:2,rating:4,starter:true,club:'Sporting'},
      {name:'Nuno Mendes',pos:'DF',age:23,caps:28,goals:1,assists:4,rating:5,starter:true,club:'PSG'},
      {name:'Dalot',pos:'DF',age:26,caps:28,goals:1,assists:3,rating:3,starter:false,club:'Man Utd'},
      {name:'Joao Neves',pos:'CC',age:21,caps:18,goals:2,assists:3,rating:5,starter:true,club:'PSG'},
      {name:'Vitinha',pos:'CC',age:25,caps:28,goals:3,assists:6,rating:5,starter:true,club:'PSG'},
      {name:'Bruno Fernandes',pos:'CC',age:31,caps:70,goals:14,assists:20,rating:5,starter:true,club:'Man Utd'},
      {name:'Bernardo Silva',pos:'AT',age:31,caps:78,goals:18,assists:22,rating:5,starter:true,club:'Man City'},
      {name:'Cristiano Ronaldo',pos:'AT',age:41,caps:217,goals:136,assists:44,rating:5,starter:true,club:'Al-Nassr'},
      {name:'Joao Felix',pos:'AT',age:26,caps:42,goals:12,assists:9,rating:4,starter:true,club:'Al-Nassr'},
      {name:'Leao',pos:'AT',age:26,caps:38,goals:10,assists:8,rating:4,starter:false,club:'Milan'},
      {name:'Ramos',pos:'AT',age:24,caps:20,goals:8,assists:2,rating:4,starter:false,club:'PSG'},
    ]},
  'Colombia':{group:'K',coach:'Nestor Lorenzo',formation:'4-2-3-1',natCode:'co',
    starting11:['Montero','Munoz','Mina','Sanchez','Mojica','Lerma','Rios','Jhon Arias','James Rodriguez','Luis Diaz','Suarez'],
    players:[
      {name:'Montero',pos:'GK',age:27,caps:18,goals:0,assists:0,rating:3,starter:true,club:'Velez'},
      {name:'Vargas',pos:'GK',age:32,caps:28,goals:0,assists:0,rating:3,starter:false,club:'Atlas'},
      {name:'Munoz',pos:'DF',age:25,caps:34,goals:2,assists:4,rating:4,starter:true,club:'Crystal Palace'},
      {name:'Mina',pos:'DF',age:30,caps:48,goals:6,assists:2,rating:4,starter:true,club:'Cagliari'},
      {name:'Sanchez',pos:'DF',age:27,caps:38,goals:1,assists:2,rating:4,starter:true,club:'Galatasaray'},
      {name:'Mojica',pos:'DF',age:30,caps:42,goals:2,assists:5,rating:3,starter:true,club:'Maiorca'},
      {name:'Lucumi',pos:'DF',age:26,caps:18,goals:1,assists:0,rating:3,starter:false,club:'Bologna'},
      {name:'Lerma',pos:'CC',age:30,caps:58,goals:4,assists:5,rating:4,starter:true,club:'Crystal Palace'},
      {name:'Rios',pos:'CC',age:22,caps:18,goals:2,assists:3,rating:4,starter:true,club:'Benfica'},
      {name:'Jhon Arias',pos:'CC',age:27,caps:24,goals:5,assists:7,rating:4,starter:true,club:'Palmeiras'},
      {name:'James Rodriguez',pos:'CC',age:34,caps:102,goals:28,assists:40,rating:4,starter:true,club:'Minnesota'},
      {name:'Luis Diaz',pos:'AT',age:28,caps:52,goals:16,assists:12,rating:5,starter:true,club:'Bayern Monaco'},
      {name:'Suarez',pos:'AT',age:27,caps:18,goals:5,assists:3,rating:4,starter:true,club:'Sporting CP'},
      {name:'Hernandez',pos:'AT',age:28,caps:22,goals:6,assists:4,rating:3,starter:false,club:'Real Betis'},
    ]},
  'RD Congo':{group:'K',coach:'Sebastien Desabre',formation:'4-3-3',natCode:'cd',
    starting11:['Mpasi','Wan-Bissaka','Mbemba','Kapuadi','Masuaku','Moutoussamy','Mukau','Bongonda','Wissa','Bakambu','Banza'],
    players:[
      {name:'Mpasi',pos:'GK',age:22,caps:8,goals:0,assists:0,rating:3,starter:true,club:'Le Havre'},
      {name:'Fayulu',pos:'GK',age:34,caps:28,goals:0,assists:0,rating:3,starter:false,club:'Noah'},
      {name:'Wan-Bissaka',pos:'DF',age:27,caps:22,goals:0,assists:1,rating:3,starter:true,club:'West Ham'},
      {name:'Mbemba',pos:'DF',age:30,caps:48,goals:2,assists:0,rating:3,starter:true,club:'Lille'},
      {name:'Kapuadi',pos:'DF',age:25,caps:18,goals:0,assists:0,rating:3,starter:true,club:'Widzew Lodz'},
      {name:'Masuaku',pos:'DF',age:30,caps:38,goals:1,assists:3,rating:3,starter:true,club:'Lens'},
      {name:'Moutoussamy',pos:'CC',age:29,caps:28,goals:2,assists:3,rating:3,starter:true,club:'Atromitos'},
      {name:'Mukau',pos:'CC',age:21,caps:14,goals:2,assists:3,rating:3,starter:true,club:'Lille'},
      {name:'Bongonda',pos:'CC',age:30,caps:32,goals:5,assists:7,rating:3,starter:true,club:'Spartak'},
      {name:'Wissa',pos:'AT',age:26,caps:28,goals:10,assists:5,rating:4,starter:true,club:'Newcastle'},
      {name:'Bakambu',pos:'AT',age:33,caps:58,goals:18,assists:8,rating:4,starter:true,club:'Real Betis'},
      {name:'Banza',pos:'AT',age:27,caps:22,goals:8,assists:3,rating:4,starter:true,club:'Al-Jazira'},
      {name:'Mayele',pos:'AT',age:29,caps:20,goals:6,assists:2,rating:3,starter:false,club:'Pyramids'},
    ]},
  'Uzbekistan':{group:'K',coach:'Fabio Cannavaro',formation:'4-4-2',natCode:'uz',
    starting11:['Yusupov','Olmasaliyev','Khusanov','Eshmurodov','Sayfiyev','Esanov','Mozgovoy','Shukurov','Fayzullayev','Shomurodov','Hamdamov'],
    players:[
      {name:'Yusupov',pos:'GK',age:28,caps:24,goals:0,assists:0,rating:3,starter:true,club:'Navbahor'},
      {name:'Khusanov',pos:'DF',age:23,caps:18,goals:0,assists:0,rating:3,starter:true,club:'Man City'},
      {name:'Olmasaliyev',pos:'DF',age:27,caps:22,goals:0,assists:1,rating:3,starter:true,club:'OKMK'},
      {name:'Eshmurodov',pos:'DF',age:26,caps:18,goals:1,assists:0,rating:2,starter:true,club:'Nasaf'},
      {name:'Sayfiyev',pos:'DF',age:27,caps:16,goals:0,assists:1,rating:2,starter:true,club:'Neftchi'},
      {name:'Alijonov',pos:'DF',age:25,caps:14,goals:0,assists:1,rating:2,starter:false,club:'Pakhtakor'},
      {name:'Esanov',pos:'CC',age:26,caps:18,goals:1,assists:2,rating:3,starter:true,club:'Bukhara'},
      {name:'Mozgovoy',pos:'CC',age:27,caps:24,goals:2,assists:3,rating:3,starter:true,club:'Pakhtakor'},
      {name:'Shukurov',pos:'CC',age:26,caps:20,goals:1,assists:2,rating:3,starter:true,club:'Baniyas'},
      {name:'Fayzullayev',pos:'AT',age:22,caps:22,goals:5,assists:4,rating:4,starter:true,club:'Basaksehir'},
      {name:'Shomurodov',pos:'AT',age:28,caps:48,goals:16,assists:6,rating:4,starter:true,club:'Basaksehir'},
      {name:'Hamdamov',pos:'AT',age:24,caps:16,goals:4,assists:2,rating:3,starter:true,club:'Pakhtakor'},
      {name:'Masharipov',pos:'AT',age:30,caps:40,goals:10,assists:8,rating:3,starter:false,club:'Esteghlal'},
    ]},
  'Inghilterra':{group:'L',coach:'Thomas Tuchel',formation:'4-2-3-1',natCode:'gb-eng',
    starting11:['Pickford','James','Guehi','Konsa',"O'Reilly",'Anderson','Rice','Saka','Bellingham','Eze','Kane'],
    players:[
      {name:'Pickford',pos:'GK',age:32,caps:68,goals:0,assists:0,rating:4,starter:true,club:'Everton'},
      {name:'Dean Henderson',pos:'GK',age:32,caps:4,goals:0,assists:0,rating:3,starter:false,club:'Crystal Palace'},
      {name:'Guehi',pos:'DF',age:24,caps:22,goals:1,assists:0,rating:4,starter:true,club:'Man City'},
      {name:'Konsa',pos:'DF',age:28,caps:20,goals:1,assists:0,rating:4,starter:true,club:'Aston Villa'},
      {name:'James',pos:'DF',age:25,caps:28,goals:2,assists:5,rating:4,starter:true,club:'Chelsea'},
      {name:"O'Reilly",pos:'DF',age:22,caps:10,goals:0,assists:1,rating:4,starter:true,club:'Man City'},
      {name:'Burn',pos:'DF',age:32,caps:14,goals:0,assists:1,rating:3,starter:false,club:'Newcastle'},
      {name:'Rice',pos:'CC',age:27,caps:52,goals:4,assists:6,rating:5,starter:true,club:'Arsenal'},
      {name:'Anderson',pos:'CC',age:22,caps:14,goals:2,assists:3,rating:4,starter:true,club:'Nottm Forest'},
      {name:'Bellingham',pos:'CC',age:21,caps:38,goals:12,assists:10,rating:5,starter:true,club:'Real Madrid'},
      {name:'Eze',pos:'CC',age:26,caps:18,goals:4,assists:4,rating:4,starter:true,club:'Arsenal'},
      {name:'Mainoo',pos:'CC',age:20,caps:14,goals:2,assists:2,rating:4,starter:false,club:'Man Utd'},
      {name:'Kane',pos:'AT',age:32,caps:98,goals:69,assists:24,rating:5,starter:true,club:'Bayern Monaco'},
      {name:'Saka',pos:'AT',age:24,caps:52,goals:18,assists:20,rating:5,starter:true,club:'Arsenal'},
      {name:'Watkins',pos:'AT',age:29,caps:28,goals:8,assists:4,rating:4,starter:false,club:'Aston Villa'},
      {name:'Rashford',pos:'AT',age:28,caps:68,goals:20,assists:14,rating:4,starter:false,club:'Barcellona'},
    ]},
  'Croazia':{group:'L',coach:'Zlatko Dalic',formation:'4-2-3-1',natCode:'hr',
    starting11:['Livakovic','Stanisic','Sutalo','Caleta-Car','Gvardiol','L. Sucic','Modric','Pasalic','Kramaric','Perisic','Budimir'],
    players:[
      {name:'Livakovic',pos:'GK',age:30,caps:48,goals:0,assists:0,rating:4,starter:true,club:'Dinamo Zagreb'},
      {name:'Kotarski',pos:'GK',age:27,caps:8,goals:0,assists:0,rating:3,starter:false,club:'Copenaghen'},
      {name:'Gvardiol',pos:'DF',age:23,caps:42,goals:3,assists:3,rating:5,starter:true,club:'Man City'},
      {name:'Caleta-Car',pos:'DF',age:29,caps:48,goals:2,assists:1,rating:4,starter:true,club:'Real Sociedad'},
      {name:'Sutalo',pos:'DF',age:24,caps:18,goals:0,assists:0,rating:3,starter:true,club:'Ajax'},
      {name:'Stanisic',pos:'DF',age:25,caps:20,goals:0,assists:2,rating:3,starter:true,club:'Bayern'},
      {name:'Vuskovic',pos:'DF',age:22,caps:8,goals:0,assists:0,rating:3,starter:false,club:'Amburgo'},
      {name:'Modric',pos:'CC',age:40,caps:178,goals:24,assists:34,rating:5,starter:true,club:'Milan'},
      {name:'L. Sucic',pos:'CC',age:23,caps:22,goals:3,assists:6,rating:4,starter:true,club:'Real Sociedad'},
      {name:'Mat. Kovacic',pos:'CC',age:32,caps:82,goals:6,assists:12,rating:5,starter:false,club:'Man City'},
      {name:'Pasalic',pos:'CC',age:30,caps:62,goals:12,assists:10,rating:4,starter:true,club:'Atalanta'},
      {name:'Vlasic',pos:'CC',age:28,caps:50,goals:8,assists:9,rating:4,starter:false,club:'Torino'},
      {name:'Kramaric',pos:'AT',age:34,caps:78,goals:36,assists:16,rating:4,starter:true,club:'Hoffenheim'},
      {name:'Perisic',pos:'AT',age:36,caps:122,goals:34,assists:28,rating:4,starter:true,club:'PSV'},
      {name:'Budimir',pos:'AT',age:33,caps:38,goals:12,assists:4,rating:3,starter:true,club:'Osasuna'},
      {name:'Matanovic',pos:'AT',age:24,caps:14,goals:4,assists:2,rating:3,starter:false,club:'Friburgo'},
    ]},
  'Ghana':{group:'L',coach:'Carlos Queiroz',formation:'3-4-3',natCode:'gh',
    starting11:['Ati-Zigi','Adjetey','Seidu','Oppong','Yirenkyi','Sibo','Partey','Mensah','Sulemana','Semenyo','Inaki Williams'],
    players:[
      {name:'Ati-Zigi',pos:'GK',age:28,caps:28,goals:0,assists:0,rating:3,starter:true,club:'St. Gallen'},
      {name:'Asare',pos:'GK',age:24,caps:8,goals:0,assists:0,rating:2,starter:false,club:'Hearts of Oak'},
      {name:'Seidu',pos:'DF',age:23,caps:22,goals:0,assists:1,rating:3,starter:true,club:'Rennes'},
      {name:'Mensah',pos:'DF',age:24,caps:18,goals:1,assists:0,rating:3,starter:true,club:'Auxerre'},
      {name:'Oppong',pos:'DF',age:26,caps:20,goals:0,assists:0,rating:3,starter:true,club:'Nizza'},
      {name:'Adjetey',pos:'DF',age:26,caps:16,goals:0,assists:1,rating:3,starter:true,club:'Wolfsburg'},
      {name:'Mumin',pos:'DF',age:27,caps:18,goals:1,assists:0,rating:3,starter:false,club:'Rayo Vallecano'},
      {name:'Partey',pos:'CC',age:32,caps:52,goals:5,assists:6,rating:4,starter:true,club:'Villarreal'},
      {name:'Sibo',pos:'CC',age:27,caps:18,goals:2,assists:3,rating:3,starter:true,club:'Oviedo'},
      {name:'Yirenkyi',pos:'CC',age:22,caps:14,goals:1,assists:2,rating:3,starter:true,club:'Nordsjaelland'},
      {name:'Sulemana',pos:'CC',age:23,caps:18,goals:3,assists:4,rating:4,starter:true,club:'Atalanta'},
      {name:'Fatawu Issahaku',pos:'CC',age:21,caps:20,goals:4,assists:3,rating:4,starter:false,club:'Leicester'},
      {name:'Inaki Williams',pos:'AT',age:30,caps:12,goals:4,assists:2,rating:4,starter:true,club:'Athletic Club'},
      {name:'Semenyo',pos:'AT',age:25,caps:22,goals:6,assists:3,rating:4,starter:true,club:'Man City'},
      {name:'Ayew',pos:'AT',age:35,caps:108,goals:23,assists:16,rating:4,starter:true,club:'Leicester'},
      {name:'Nuamah',pos:'AT',age:22,caps:12,goals:3,assists:2,rating:3,starter:false,club:'Lione'},
    ]},
  'Panama':{group:'L',coach:'Thomas Christiansen',formation:'3-4-2-1',natCode:'pa',
    starting11:['Mosquera','Fariaa','Andrade','Cordoba','Murillo','Carrasquilla','Godoy','Davis','Barcenas','Diaz','Fajardo'],
    players:[
      {name:'Mosquera',pos:'GK',age:29,caps:38,goals:0,assists:0,rating:3,starter:true,club:'Al-Fayha'},
      {name:'Mejia',pos:'GK',age:26,caps:12,goals:0,assists:0,rating:2,starter:false,club:'Nacional'},
      {name:'Murillo',pos:'DF',age:23,caps:28,goals:1,assists:0,rating:4,starter:true,club:'Besiktas'},
      {name:'Andrade',pos:'DF',age:28,caps:22,goals:0,assists:1,rating:3,starter:true,club:'LASK'},
      {name:'Cordoba',pos:'DF',age:26,caps:18,goals:0,assists:1,rating:3,starter:true,club:'Norwich'},
      {name:'Fariaa',pos:'DF',age:27,caps:20,goals:0,assists:0,rating:3,starter:true,club:'Nizhny Novgorod'},
      {name:'Escobar',pos:'DF',age:30,caps:30,goals:1,assists:2,rating:3,starter:false,club:'Saprissa'},
      {name:'Carrasquilla',pos:'CC',age:28,caps:42,goals:4,assists:7,rating:4,starter:true,club:'Pumas'},
      {name:'Godoy',pos:'CC',age:24,caps:18,goals:2,assists:3,rating:3,starter:true,club:'San Diego FC'},
      {name:'Davis',pos:'CC',age:26,caps:24,goals:1,assists:2,rating:3,starter:true,club:'Plaza Amador'},
      {name:'Harvey',pos:'CC',age:26,caps:20,goals:2,assists:2,rating:3,starter:false,club:'Minnesota'},
      {name:'Barcenas',pos:'AT',age:26,caps:22,goals:5,assists:3,rating:3,starter:true,club:'Mazatlan'},
      {name:'Diaz',pos:'AT',age:28,caps:34,goals:10,assists:5,rating:3,starter:true,club:'Leon'},
      {name:'Fajardo',pos:'AT',age:26,caps:20,goals:6,assists:3,rating:3,starter:true,club:'U. Catolica'},
      {name:'Rodriguez',pos:'AT',age:29,caps:28,goals:8,assists:4,rating:3,starter:false,club:'Saprissa'},
    ]},
};

// ── Flat player list for search (capocannoniere) ──────────────────────────────

// National-team trophies won (major titles) by nation
const NATION_TROPHIES = {
  'Argentina':2,'Francia':1,'Spagna':1,'Uruguay':1,'Brasile':1,'Portogallo':1,
  'Algeria':1,'Senegal':1,"Costa d'Avorio":1,
};
// Assign trophies: senior players (caps high) of winning nations get the title count
function _assignTrophies(p, team) {
  const base = NATION_TROPHIES[team] || 0;
  if (base === 0) return 0;
  // Players with 40+ caps likely part of the winning squad
  if (p.caps >= 60) return base;
  if (p.caps >= 35) return Math.max(1, base - 0);
  if (p.caps >= 20) return base >= 2 ? 1 : base;
  return 0;
}

const WC_PLAYERS = [];
for (const [team, data] of Object.entries(WC_SQUADS)) {
  for (const p of data.players) {
    p.trophies = _assignTrophies(p, team);
    WC_PLAYERS.push({...p, nat: team, natCode: data.natCode});
  }
}

function searchPlayers(query) {
  if (!query || query.length < 2) return [];
  const q = query.toLowerCase();
  return WC_PLAYERS.filter(p =>
    p.name.toLowerCase().includes(q) ||
    p.nat.toLowerCase().includes(q)  ||
    p.club.toLowerCase().includes(q)
  ).sort((a,b) => {
    if (b.starter !== a.starter) return b.starter ? 1 : -1;
    return b.rating - a.rating;
  }).slice(0, 10);
}

function getSquad(teamName) { return WC_SQUADS[teamName] || null; }

// ── Extra players to reach 22 per squad ──
WC_SQUADS['Messico'].players.push({name:'Lira',pos:'CC',age:26,caps:20,goals:0,assists:1,rating:2,starter:false,club:'Cruz Azul'});
WC_SQUADS['Messico'].players.push({name:'Romo',pos:'CC',age:24,caps:15,goals:1,assists:1,rating:3,starter:false,club:'Chivas'});
WC_SQUADS['Messico'].players.push({name:'Huerta',pos:'CC',age:24,caps:12,goals:2,assists:2,rating:3,starter:false,club:'Anderlecht'});
WC_SQUADS['Messico'].players.push({name:'Chavez D.',pos:'CC',age:25,caps:11,goals:1,assists:1,rating:3,starter:false,club:'Dinamo Kiev'});
WC_SQUADS['Messico'].players.push({name:'Alvarado',pos:'AT',age:22,caps:9,goals:2,assists:1,rating:3,starter:false,club:'Chivas'});
WC_SQUADS['Messico'].players.push({name:'Martinez A.',pos:'AT',age:23,caps:8,goals:1,assists:0,rating:2,starter:false,club:'Pumas'});
WC_SQUADS['Messico'].players.push({name:'Gonzalez',pos:'AT',age:21,caps:7,goals:1,assists:0,rating:2,starter:false,club:'Chivas'});
WC_SQUADS['Sudafrica'].players.push({name:'Goss',pos:'GK',age:28,caps:8,goals:0,assists:0,rating:2,starter:false,club:'Siwelele'});
WC_SQUADS['Sudafrica'].players.push({name:'Okon',pos:'DF',age:23,caps:12,goals:0,assists:0,rating:2,starter:false,club:'Hannover'});
WC_SQUADS['Sudafrica'].players.push({name:'Kabini',pos:'DF',age:26,caps:19,goals:1,assists:1,rating:3,starter:false,club:'Molde'});
WC_SQUADS['Sudafrica'].players.push({name:'Matuludi',pos:'DF',age:27,caps:10,goals:0,assists:0,rating:2,starter:false,club:'Polokwane'});
WC_SQUADS['Sudafrica'].players.push({name:'Mbatha',pos:'CC',age:27,caps:24,goals:0,assists:2,rating:3,starter:false,club:'Orlando Pirates'});
WC_SQUADS['Sudafrica'].players.push({name:'Rayners',pos:'AT',age:25,caps:12,goals:3,assists:2,rating:3,starter:false,club:'Sundowns'});
WC_SQUADS['Sudafrica'].players.push({name:'Moremi',pos:'AT',age:26,caps:10,goals:2,assists:1,rating:2,starter:false,club:'Orlando Pirates'});
WC_SQUADS['Corea del Sud'].players.push({name:'Song Bum-keun',pos:'GK',age:29,caps:12,goals:0,assists:0,rating:2,starter:false,club:'Jeonbuk'});
WC_SQUADS['Corea del Sud'].players.push({name:'Kim Moon-hwan',pos:'DF',age:28,caps:30,goals:1,assists:3,rating:3,starter:false,club:'Daejeon'});
WC_SQUADS['Corea del Sud'].players.push({name:'Kim Tae-hyeon',pos:'DF',age:27,caps:15,goals:0,assists:1,rating:2,starter:false,club:'Kashima'});
WC_SQUADS['Corea del Sud'].players.push({name:'Park Jin-seob',pos:'DF',age:25,caps:12,goals:0,assists:0,rating:2,starter:false,club:'Zhejiang'});
WC_SQUADS['Corea del Sud'].players.push({name:'Paik Seung-ho',pos:'CC',age:29,caps:28,goals:2,assists:3,rating:3,starter:false,club:'Birmingham'});
WC_SQUADS['Corea del Sud'].players.push({name:'Yang Hyun-jun',pos:'CC',age:23,caps:18,goals:3,assists:4,rating:3,starter:false,club:'Celtic'});
WC_SQUADS['Corea del Sud'].players.push({name:'Lee Dong-gyeong',pos:'CC',age:27,caps:20,goals:2,assists:2,rating:3,starter:false,club:'Ulsan'});
WC_SQUADS['Repubblica Ceca'].players.push({name:'Kovar',pos:'GK',age:26,caps:5,goals:0,assists:0,rating:3,starter:false,club:'PSV'});
WC_SQUADS['Repubblica Ceca'].players.push({name:'Krejci',pos:'DF',age:29,caps:35,goals:1,assists:2,rating:3,starter:false,club:'Wolves'});
WC_SQUADS['Repubblica Ceca'].players.push({name:'Doudera',pos:'DF',age:27,caps:20,goals:0,assists:1,rating:3,starter:false,club:'Slavia'});
WC_SQUADS['Repubblica Ceca'].players.push({name:'Cerv',pos:'CC',age:26,caps:14,goals:1,assists:1,rating:3,starter:false,club:'Plzen'});
WC_SQUADS['Repubblica Ceca'].players.push({name:'Sochurek',pos:'CC',age:24,caps:10,goals:0,assists:1,rating:2,starter:false,club:'Sparta'});
WC_SQUADS['Repubblica Ceca'].players.push({name:'Sojka',pos:'CC',age:27,caps:18,goals:2,assists:2,rating:3,starter:false,club:'Plzen'});
WC_SQUADS['Repubblica Ceca'].players.push({name:'Kuchta',pos:'AT',age:26,caps:18,goals:5,assists:1,rating:3,starter:false,club:'Sparta Praga'});
WC_SQUADS['Canada'].players.push({name:'Goodman',pos:'GK',age:23,caps:4,goals:0,assists:0,rating:2,starter:false,club:'Crystal Palace'});
WC_SQUADS['Canada'].players.push({name:'Cornelius',pos:'DF',age:28,caps:18,goals:0,assists:2,rating:3,starter:false,club:'Marsiglia'});
WC_SQUADS['Canada'].players.push({name:'Waterman',pos:'DF',age:26,caps:14,goals:0,assists:0,rating:2,starter:false,club:'Chicago'});
WC_SQUADS['Canada'].players.push({name:'Ahmed',pos:'CC',age:24,caps:10,goals:1,assists:1,rating:2,starter:false,club:'Norwich'});
WC_SQUADS['Canada'].players.push({name:'Millar',pos:'CC',age:24,caps:18,goals:2,assists:2,rating:3,starter:false,club:'Hull City'});
WC_SQUADS['Canada'].players.push({name:'Shaffelburg',pos:'CC',age:25,caps:14,goals:3,assists:2,rating:3,starter:false,club:'LAFC'});
WC_SQUADS['Canada'].players.push({name:'Choiniere',pos:'CC',age:24,caps:12,goals:2,assists:2,rating:3,starter:false,club:'LAFC'});
WC_SQUADS['Qatar'].players.push({name:'Abunada',pos:'GK',age:27,caps:14,goals:0,assists:0,rating:2,starter:false,club:'Al-Rayyan'});
WC_SQUADS['Qatar'].players.push({name:'Zakaria',pos:'GK',age:31,caps:10,goals:0,assists:0,rating:2,starter:false,club:'Al-Duhail'});
WC_SQUADS['Qatar'].players.push({name:'Mendes',pos:'DF',age:28,caps:24,goals:0,assists:1,rating:2,starter:false,club:'Al-Wakrah'});
WC_SQUADS['Qatar'].players.push({name:'Laye',pos:'DF',age:26,caps:18,goals:0,assists:0,rating:2,starter:false,club:'Al-Arabi'});
WC_SQUADS['Qatar'].players.push({name:'Al-Hussain',pos:'DF',age:25,caps:14,goals:0,assists:0,rating:2,starter:false,club:'Al-Arabi'});
WC_SQUADS['Qatar'].players.push({name:'Al-Brake',pos:'DF',age:27,caps:16,goals:0,assists:0,rating:2,starter:false,club:'Al-Duhail'});
WC_SQUADS['Qatar'].players.push({name:'Fatehi',pos:'CC',age:24,caps:18,goals:1,assists:2,rating:2,starter:false,club:'Al-Arabi'});
WC_SQUADS['Qatar'].players.push({name:'Gaber',pos:'CC',age:26,caps:20,goals:2,assists:3,rating:3,starter:false,club:'Al-Rayyan'});
WC_SQUADS['Qatar'].players.push({name:'Al-Ganehi',pos:'AT',age:26,caps:22,goals:6,assists:3,rating:3,starter:false,club:'Al-Gharafa'});
WC_SQUADS['Qatar'].players.push({name:'Alaaeldin',pos:'AT',age:28,caps:24,goals:5,assists:2,rating:3,starter:false,club:'Al-Gharafa'});
WC_SQUADS['Svizzera'].players.push({name:'Keller',pos:'GK',age:32,caps:14,goals:0,assists:0,rating:3,starter:false,club:'Young Boys'});
WC_SQUADS['Svizzera'].players.push({name:'Muheim',pos:'DF',age:24,caps:14,goals:0,assists:2,rating:3,starter:false,club:'Amburgo'});
WC_SQUADS['Svizzera'].players.push({name:'Amenda',pos:'DF',age:22,caps:8,goals:0,assists:0,rating:3,starter:false,club:'Eintracht'});
WC_SQUADS['Svizzera'].players.push({name:'Comert',pos:'DF',age:27,caps:20,goals:1,assists:1,rating:3,starter:false,club:'Valencia'});
WC_SQUADS['Svizzera'].players.push({name:'Sow',pos:'CC',age:27,caps:24,goals:3,assists:2,rating:3,starter:false,club:'Siviglia'});
WC_SQUADS['Svizzera'].players.push({name:'Rieder',pos:'CC',age:25,caps:14,goals:1,assists:2,rating:3,starter:false,club:'Augusta'});
WC_SQUADS['Svizzera'].players.push({name:'Aebischer',pos:'CC',age:28,caps:18,goals:1,assists:2,rating:3,starter:false,club:'Pisa'});
WC_SQUADS['Bosnia'].players.push({name:'Zlomislic',pos:'GK',age:27,caps:8,goals:0,assists:0,rating:2,starter:false,club:'Rijeka'});
WC_SQUADS['Bosnia'].players.push({name:'Radeljic',pos:'DF',age:28,caps:14,goals:0,assists:1,rating:2,starter:false,club:'Rijeka'});
WC_SQUADS['Bosnia'].players.push({name:'Celik',pos:'DF',age:26,caps:18,goals:0,assists:1,rating:3,starter:false,club:'Lens'});
WC_SQUADS['Bosnia'].players.push({name:'Mujakic',pos:'DF',age:24,caps:12,goals:0,assists:0,rating:2,starter:false,club:'Eyupspor'});
WC_SQUADS['Bosnia'].players.push({name:'Hadzikadunic',pos:'DF',age:27,caps:22,goals:1,assists:0,rating:3,starter:false,club:'Sampdoria'});
WC_SQUADS['Bosnia'].players.push({name:'Burnic',pos:'CC',age:26,caps:14,goals:1,assists:1,rating:2,starter:false,club:'Karlsruhe'});
WC_SQUADS['Bosnia'].players.push({name:'Basic',pos:'CC',age:29,caps:30,goals:2,assists:2,rating:3,starter:false,club:'Astana'});
WC_SQUADS['Bosnia'].players.push({name:'Gigovic',pos:'CC',age:23,caps:10,goals:1,assists:1,rating:3,starter:false,club:'Young Boys'});
WC_SQUADS['Bosnia'].players.push({name:'Alajbegovic',pos:'CC',age:22,caps:8,goals:0,assists:1,rating:3,starter:false,club:'Salisburgo'});
WC_SQUADS['Bosnia'].players.push({name:'Bazdar',pos:'AT',age:26,caps:12,goals:3,assists:1,rating:2,starter:false,club:'Jagiellonia'});
WC_SQUADS['Brasile'].players.push({name:'Weverton',pos:'GK',age:38,caps:24,goals:0,assists:0,rating:3,starter:false,club:'Gremio'});
WC_SQUADS['Brasile'].players.push({name:'Alex Sandro',pos:'DF',age:35,caps:52,goals:2,assists:6,rating:3,starter:false,club:'Flamengo'});
WC_SQUADS['Brasile'].players.push({name:'Ibanez',pos:'DF',age:26,caps:14,goals:0,assists:0,rating:3,starter:false,club:'Al-Ahli'});
WC_SQUADS['Brasile'].players.push({name:'Leo Pereira',pos:'DF',age:29,caps:18,goals:1,assists:0,rating:3,starter:false,club:'Flamengo'});
WC_SQUADS['Brasile'].players.push({name:'Fabinho',pos:'CC',age:33,caps:42,goals:2,assists:3,rating:3,starter:false,club:'Al-Ittihad'});
WC_SQUADS['Brasile'].players.push({name:'Martinelli',pos:'AT',age:23,caps:16,goals:4,assists:2,rating:4,starter:false,club:'Arsenal'});
WC_SQUADS['Marocco'].players.push({name:'El Kajoui',pos:'GK',age:29,caps:12,goals:0,assists:0,rating:3,starter:false,club:'RS Berkane'});
WC_SQUADS['Marocco'].players.push({name:'Tagnaouti',pos:'GK',age:30,caps:8,goals:0,assists:0,rating:2,starter:false,club:'Moghreb Tetouan'});
WC_SQUADS['Marocco'].players.push({name:'Halhal',pos:'DF',age:26,caps:14,goals:0,assists:2,rating:2,starter:false,club:'Malines'});
WC_SQUADS['Marocco'].players.push({name:'Riad',pos:'DF',age:22,caps:10,goals:0,assists:0,rating:3,starter:false,club:'Crystal Palace'});
WC_SQUADS['Marocco'].players.push({name:'El Ouahdi',pos:'DF',age:23,caps:8,goals:0,assists:1,rating:3,starter:false,club:'Genk'});
WC_SQUADS['Marocco'].players.push({name:'El Mourabet',pos:'CC',age:25,caps:12,goals:1,assists:2,rating:3,starter:false,club:'Strasburgo'});
WC_SQUADS['Marocco'].players.push({name:'El Khannouss',pos:'CC',age:21,caps:18,goals:3,assists:5,rating:4,starter:false,club:'Stoccarda'});
WC_SQUADS['Marocco'].players.push({name:'Elzazzouli',pos:'AT',age:25,caps:20,goals:6,assists:5,rating:4,starter:false,club:'Real Betis'});
WC_SQUADS['Haiti'].players.push({name:'A. Pierre',pos:'GK',age:28,caps:12,goals:0,assists:0,rating:2,starter:false,club:'Sochaux'});
WC_SQUADS['Haiti'].players.push({name:'Duverger',pos:'GK',age:26,caps:8,goals:0,assists:0,rating:2,starter:false,club:'Cosmos Koblenz'});
WC_SQUADS['Haiti'].players.push({name:'Paugain',pos:'DF',age:26,caps:14,goals:0,assists:0,rating:2,starter:false,club:'Zulte Waregem'});
WC_SQUADS['Haiti'].players.push({name:'Lacroix',pos:'DF',age:27,caps:10,goals:0,assists:0,rating:2,starter:false,club:'Colorado Springs'});
WC_SQUADS['Haiti'].players.push({name:'Thermoncy',pos:'DF',age:24,caps:10,goals:0,assists:0,rating:2,starter:false,club:'Young Boys'});
WC_SQUADS['Haiti'].players.push({name:'Danley',pos:'CC',age:25,caps:12,goals:1,assists:1,rating:2,starter:false,club:'Philadelphia'});
WC_SQUADS['Haiti'].players.push({name:'Sainté',pos:'CC',age:26,caps:10,goals:0,assists:1,rating:2,starter:false,club:'El Paso'});
WC_SQUADS['Haiti'].players.push({name:'Casimir',pos:'AT',age:25,caps:12,goals:2,assists:1,rating:2,starter:false,club:'Auxerre'});
WC_SQUADS['Haiti'].players.push({name:'Etienne',pos:'AT',age:27,caps:14,goals:3,assists:1,rating:2,starter:false,club:'Toronto FC'});
WC_SQUADS['Scozia'].players.push({name:'Kelly',pos:'GK',age:34,caps:10,goals:0,assists:0,rating:3,starter:false,club:'Rangers'});
WC_SQUADS['Scozia'].players.push({name:'Hendry',pos:'DF',age:30,caps:24,goals:1,assists:0,rating:3,starter:false,club:'Al Etiffaq'});
WC_SQUADS['Scozia'].players.push({name:'Hickey',pos:'DF',age:23,caps:18,goals:0,assists:2,rating:3,starter:false,club:'Brentford'});
WC_SQUADS['Scozia'].players.push({name:'Ralston',pos:'DF',age:25,caps:20,goals:1,assists:3,rating:3,starter:false,club:'Celtic'});
WC_SQUADS['Scozia'].players.push({name:'Patterson',pos:'DF',age:23,caps:16,goals:0,assists:1,rating:3,starter:false,club:'Everton'});
WC_SQUADS['Scozia'].players.push({name:'McLean',pos:'CC',age:30,caps:38,goals:2,assists:3,rating:3,starter:false,club:'Norwich'});
WC_SQUADS['Scozia'].players.push({name:'Fletcher',pos:'CC',age:28,caps:22,goals:2,assists:1,rating:3,starter:false,club:'Man Utd'});
WC_SQUADS['Scozia'].players.push({name:'Hirst',pos:'AT',age:22,caps:8,goals:2,assists:0,rating:3,starter:false,club:'Ipswich'});
WC_SQUADS['USA'].players.push({name:'Freese',pos:'GK',age:25,caps:8,goals:0,assists:0,rating:2,starter:false,club:'NYCFC'});
WC_SQUADS['USA'].players.push({name:'Brady',pos:'GK',age:26,caps:6,goals:0,assists:0,rating:2,starter:false,club:'Chicago Fire'});
WC_SQUADS['USA'].players.push({name:'Richards',pos:'DF',age:24,caps:22,goals:0,assists:1,rating:3,starter:false,club:'Crystal Palace'});
WC_SQUADS['USA'].players.push({name:'Trusty',pos:'DF',age:26,caps:16,goals:0,assists:0,rating:3,starter:false,club:'Celtic'});
WC_SQUADS['USA'].players.push({name:'Arfsten',pos:'DF',age:24,caps:8,goals:0,assists:0,rating:2,starter:false,club:'Columbus'});
WC_SQUADS['USA'].players.push({name:'Roldan',pos:'CC',age:30,caps:38,goals:2,assists:4,rating:3,starter:false,club:'Seattle'});
WC_SQUADS['USA'].players.push({name:'Aaronson',pos:'CC',age:24,caps:28,goals:4,assists:5,rating:4,starter:false,club:'Leeds'});
WC_SQUADS['USA'].players.push({name:'Wright',pos:'AT',age:23,caps:10,goals:3,assists:1,rating:3,starter:false,club:'Coventry'});
WC_SQUADS['Paraguay'].players.push({name:'R. Fernandez',pos:'GK',age:28,caps:14,goals:0,assists:0,rating:3,starter:false,club:'Cerro Porteno'});
WC_SQUADS['Paraguay'].players.push({name:'G. Olveira',pos:'GK',age:30,caps:10,goals:0,assists:0,rating:2,starter:false,club:'Olimpia'});
WC_SQUADS['Paraguay'].players.push({name:'G. Velazquez',pos:'DF',age:27,caps:18,goals:0,assists:1,rating:2,starter:false,club:'Cerro Porteno'});
WC_SQUADS['Paraguay'].players.push({name:'Balbuena',pos:'DF',age:34,caps:58,goals:3,assists:1,rating:3,starter:false,club:'Gremio'});
WC_SQUADS['Paraguay'].players.push({name:'Maidana',pos:'DF',age:27,caps:16,goals:0,assists:0,rating:2,starter:false,club:'Talleres'});
WC_SQUADS['Paraguay'].players.push({name:'Canale',pos:'DF',age:26,caps:14,goals:0,assists:1,rating:2,starter:false,club:'Lanus'});
WC_SQUADS['Paraguay'].players.push({name:'Cubas',pos:'CC',age:28,caps:22,goals:1,assists:2,rating:3,starter:false,club:'Vancouver'});
WC_SQUADS['Paraguay'].players.push({name:'Galarza',pos:'CC',age:25,caps:14,goals:1,assists:1,rating:3,starter:false,club:'Atlanta United'});
WC_SQUADS['Paraguay'].players.push({name:'Gamarra',pos:'CC',age:26,caps:20,goals:2,assists:3,rating:3,starter:false,club:'Al-Ain'});
WC_SQUADS['Paraguay'].players.push({name:'Caballero',pos:'AT',age:25,caps:14,goals:3,assists:1,rating:2,starter:false,club:'Portsmouth'});
WC_SQUADS['Australia'].players.push({name:'Beach',pos:'GK',age:28,caps:14,goals:0,assists:0,rating:3,starter:false,club:'Melbourne City'});
WC_SQUADS['Australia'].players.push({name:'Izzo',pos:'GK',age:31,caps:18,goals:0,assists:0,rating:3,starter:false,club:'Randers'});
WC_SQUADS['Australia'].players.push({name:'Behich',pos:'DF',age:33,caps:52,goals:1,assists:4,rating:3,starter:false,club:'Melbourne City'});
WC_SQUADS['Australia'].players.push({name:'Burgess',pos:'DF',age:28,caps:18,goals:0,assists:0,rating:3,starter:false,club:'Swansea'});
WC_SQUADS['Australia'].players.push({name:'Geria',pos:'DF',age:25,caps:14,goals:0,assists:1,rating:2,starter:false,club:'Albirex Niigata'});
WC_SQUADS['Australia'].players.push({name:'Okon-Engstler',pos:'CC',age:24,caps:10,goals:0,assists:1,rating:2,starter:false,club:'Sydney FC'});
WC_SQUADS['Australia'].players.push({name:'Mabil',pos:'AT',age:29,caps:44,goals:8,assists:5,rating:3,starter:false,club:'Castellon'});
WC_SQUADS['Australia'].players.push({name:'Velupillay',pos:'AT',age:22,caps:8,goals:1,assists:1,rating:2,starter:false,club:'Melbourne Victory'});
WC_SQUADS['Turchia'].players.push({name:'Cakir',pos:'GK',age:30,caps:12,goals:0,assists:0,rating:3,starter:false,club:'Galatasaray'});
WC_SQUADS['Turchia'].players.push({name:'Akaydin',pos:'DF',age:28,caps:22,goals:0,assists:0,rating:3,starter:false,club:'Rizespor'});
WC_SQUADS['Turchia'].players.push({name:'Demiral',pos:'DF',age:27,caps:38,goals:2,assists:0,rating:4,starter:false,club:'Al-Ahli'});
WC_SQUADS['Turchia'].players.push({name:'Soyuncu',pos:'DF',age:28,caps:42,goals:1,assists:1,rating:3,starter:false,club:'Fenerbahce'});
WC_SQUADS['Turchia'].players.push({name:'Ayhan',pos:'CC',age:32,caps:58,goals:3,assists:4,rating:3,starter:false,club:'Galatasaray'});
WC_SQUADS['Turchia'].players.push({name:'Yuksek',pos:'CC',age:25,caps:18,goals:1,assists:2,rating:3,starter:false,club:'Fenerbahce'});
WC_SQUADS['Turchia'].players.push({name:'Akgun',pos:'AT',age:24,caps:18,goals:5,assists:2,rating:3,starter:false,club:'Galatasaray'});
WC_SQUADS['Turchia'].players.push({name:'Yilmaz',pos:'AT',age:32,caps:68,goals:22,assists:8,rating:3,starter:false,club:'Galatasaray'});
WC_SQUADS['Germania'].players.push({name:'Baumann',pos:'GK',age:34,caps:8,goals:0,assists:0,rating:3,starter:false,club:'Hoffenheim'});
WC_SQUADS['Germania'].players.push({name:'Anton',pos:'DF',age:29,caps:18,goals:0,assists:0,rating:3,starter:false,club:'B.Dortmund'});
WC_SQUADS['Germania'].players.push({name:'Brown',pos:'DF',age:26,caps:10,goals:0,assists:1,rating:3,starter:false,club:'Eintracht'});
WC_SQUADS['Germania'].players.push({name:'Thiaw',pos:'DF',age:23,caps:10,goals:0,assists:0,rating:3,starter:false,club:'Newcastle'});
WC_SQUADS['Germania'].players.push({name:'Nmecha',pos:'CC',age:25,caps:18,goals:3,assists:2,rating:3,starter:false,club:'B.Dortmund'});
WC_SQUADS['Germania'].players.push({name:'Stiller',pos:'CC',age:24,caps:12,goals:1,assists:2,rating:3,starter:false,club:'Stoccarda'});
WC_SQUADS['Germania'].players.push({name:'Woltemade',pos:'AT',age:23,caps:8,goals:2,assists:1,rating:3,starter:false,club:'Newcastle'});
WC_SQUADS['Curacao'].players.push({name:'Bodak',pos:'GK',age:27,caps:10,goals:0,assists:0,rating:2,starter:false,club:'Telstar'});
WC_SQUADS['Curacao'].players.push({name:'Doornbusch',pos:'GK',age:28,caps:6,goals:0,assists:0,rating:2,starter:false,club:'Venlo'});
WC_SQUADS['Curacao'].players.push({name:'Bazoer',pos:'DF',age:28,caps:18,goals:0,assists:1,rating:2,starter:false,club:'Konyaspor'});
WC_SQUADS['Curacao'].players.push({name:'Brenet',pos:'DF',age:30,caps:16,goals:0,assists:1,rating:2,starter:false,club:'Kayserispor'});
WC_SQUADS['Curacao'].players.push({name:'Fonville',pos:'DF',age:26,caps:12,goals:0,assists:0,rating:2,starter:false,club:'NEC Nijmegen'});
WC_SQUADS['Curacao'].players.push({name:'Gaari',pos:'DF',age:27,caps:14,goals:0,assists:0,rating:2,starter:false,club:'Abha'});
WC_SQUADS['Curacao'].players.push({name:'Martha',pos:'CC',age:26,caps:18,goals:2,assists:2,rating:3,starter:false,club:'Rotherham'});
WC_SQUADS['Curacao'].players.push({name:'Noslin',pos:'CC',age:28,caps:16,goals:2,assists:2,rating:3,starter:false,club:'Telstar'});
WC_SQUADS['Curacao'].players.push({name:'Gorré',pos:'AT',age:30,caps:32,goals:7,assists:5,rating:3,starter:false,club:'Maccabi Haifa'});
WC_SQUADS['Curacao'].players.push({name:'Kuwas',pos:'AT',age:28,caps:14,goals:3,assists:2,rating:2,starter:false,club:'Volendam'});
WC_SQUADS['Costa d\'Avorio'].players.push({name:'Koné',pos:'GK',age:25,caps:8,goals:0,assists:0,rating:2,starter:false,club:'Charleroi'});
WC_SQUADS['Costa d\'Avorio'].players.push({name:'Agbadou',pos:'DF',age:25,caps:18,goals:0,assists:0,rating:3,starter:false,club:'Besiktas'});
WC_SQUADS['Costa d\'Avorio'].players.push({name:'Operi',pos:'DF',age:27,caps:14,goals:0,assists:0,rating:2,starter:false,club:'Basaksehir'});
WC_SQUADS['Costa d\'Avorio'].players.push({name:'O. Diomande',pos:'DF',age:24,caps:12,goals:0,assists:0,rating:3,starter:false,club:'Sporting'});
WC_SQUADS['Costa d\'Avorio'].players.push({name:'Seri',pos:'CC',age:32,caps:44,goals:2,assists:4,rating:3,starter:false,club:'Maribor'});
WC_SQUADS['Costa d\'Avorio'].players.push({name:'Guiagon',pos:'CC',age:24,caps:10,goals:1,assists:1,rating:2,starter:false,club:'Charleroi'});
WC_SQUADS['Costa d\'Avorio'].players.push({name:'A. Diallo',pos:'AT',age:22,caps:10,goals:3,assists:1,rating:3,starter:false,club:'Man Utd'});
WC_SQUADS['Costa d\'Avorio'].players.push({name:'Wahi',pos:'AT',age:21,caps:10,goals:3,assists:1,rating:3,starter:false,club:'Nizza'});
WC_SQUADS['Ecuador'].players.push({name:'Valle',pos:'GK',age:24,caps:8,goals:0,assists:0,rating:2,starter:false,club:'Quito'});
WC_SQUADS['Ecuador'].players.push({name:'Ramirez',pos:'GK',age:28,caps:10,goals:0,assists:0,rating:2,starter:false,club:'Kifisia'});
WC_SQUADS['Ecuador'].players.push({name:'Estupinan',pos:'DF',age:27,caps:38,goals:3,assists:6,rating:4,starter:false,club:'Milan'});
WC_SQUADS['Ecuador'].players.push({name:'Medina',pos:'DF',age:23,caps:16,goals:0,assists:1,rating:3,starter:false,club:'Genk'});
WC_SQUADS['Ecuador'].players.push({name:'Porozo',pos:'DF',age:22,caps:12,goals:0,assists:0,rating:2,starter:false,club:'Club Tijuana'});
WC_SQUADS['Ecuador'].players.push({name:'Torres',pos:'DF',age:26,caps:18,goals:1,assists:1,rating:3,starter:false,club:'Internacional'});
WC_SQUADS['Ecuador'].players.push({name:'Vite',pos:'CC',age:22,caps:14,goals:1,assists:2,rating:3,starter:false,club:'Pumas'});
WC_SQUADS['Ecuador'].players.push({name:'Franco',pos:'CC',age:23,caps:12,goals:1,assists:2,rating:3,starter:false,club:'Atletico Mineiro'});
WC_SQUADS['Ecuador'].players.push({name:'Rodriguez',pos:'AT',age:26,caps:24,goals:5,assists:3,rating:4,starter:false,club:'Union SG'});
WC_SQUADS['Ecuador'].players.push({name:'Arevalo',pos:'AT',age:22,caps:12,goals:3,assists:1,rating:3,starter:false,club:'Stoccarda'});
WC_SQUADS['Olanda'].players.push({name:'Flekken',pos:'GK',age:31,caps:8,goals:0,assists:0,rating:3,starter:false,club:'Bayer Leverkusen'});
WC_SQUADS['Olanda'].players.push({name:'Roefs',pos:'GK',age:26,caps:4,goals:0,assists:0,rating:2,starter:false,club:'Sunderland'});
WC_SQUADS['Olanda'].players.push({name:'Hato',pos:'DF',age:20,caps:8,goals:0,assists:1,rating:3,starter:false,club:'Chelsea'});
WC_SQUADS['Olanda'].players.push({name:'Van Hecke',pos:'DF',age:24,caps:12,goals:0,assists:0,rating:3,starter:false,club:'Brighton'});
WC_SQUADS['Olanda'].players.push({name:'J. Timber',pos:'DF',age:23,caps:10,goals:0,assists:1,rating:3,starter:false,club:'Arsenal'});
WC_SQUADS['Olanda'].players.push({name:'De Roon',pos:'CC',age:33,caps:48,goals:2,assists:4,rating:3,starter:false,club:'Atalanta'});
WC_SQUADS['Olanda'].players.push({name:'Q. Timber',pos:'CC',age:22,caps:8,goals:1,assists:1,rating:3,starter:false,club:'Marsiglia'});
WC_SQUADS['Olanda'].players.push({name:'Wieffer',pos:'CC',age:25,caps:10,goals:1,assists:2,rating:3,starter:false,club:'Brighton'});
WC_SQUADS['Olanda'].players.push({name:'Kluivert',pos:'AT',age:22,caps:12,goals:3,assists:2,rating:3,starter:false,club:'Bournemouth'});
WC_SQUADS['Giappone'].players.push({name:'Hayakawa',pos:'GK',age:30,caps:12,goals:0,assists:0,rating:3,starter:false,club:'Kashima'});
WC_SQUADS['Giappone'].players.push({name:'Osako',pos:'GK',age:31,caps:8,goals:0,assists:0,rating:2,starter:false,club:'Sanfrecce'});
WC_SQUADS['Giappone'].players.push({name:'Nagatomo',pos:'DF',age:38,caps:142,goals:4,assists:8,rating:3,starter:false,club:'FC Tokyo'});
WC_SQUADS['Giappone'].players.push({name:'Watanabe',pos:'DF',age:25,caps:14,goals:0,assists:1,rating:3,starter:false,club:'Feyenoord'});
WC_SQUADS['Giappone'].players.push({name:'Seko',pos:'DF',age:24,caps:10,goals:0,assists:1,rating:2,starter:false,club:'Le Havre'});
WC_SQUADS['Giappone'].players.push({name:'Ito Junya',pos:'CC',age:27,caps:38,goals:6,assists:8,rating:4,starter:false,club:'Genk'});
WC_SQUADS['Giappone'].players.push({name:'Sano',pos:'CC',age:22,caps:8,goals:1,assists:1,rating:3,starter:false,club:'Mainz'});
WC_SQUADS['Giappone'].players.push({name:'Goto',pos:'AT',age:25,caps:12,goals:2,assists:2,rating:2,starter:false,club:'Sint-Truiden'});
WC_SQUADS['Svezia'].players.push({name:'Nordfeldt',pos:'GK',age:36,caps:12,goals:0,assists:0,rating:2,starter:false,club:'AIK'});
WC_SQUADS['Svezia'].players.push({name:'Widell Zetterstrom',pos:'GK',age:27,caps:6,goals:0,assists:0,rating:2,starter:false,club:'Derby'});
WC_SQUADS['Svezia'].players.push({name:'Smith',pos:'DF',age:27,caps:12,goals:0,assists:1,rating:3,starter:false,club:'St. Pauli'});
WC_SQUADS['Svezia'].players.push({name:'Starfelt',pos:'DF',age:30,caps:38,goals:1,assists:0,rating:3,starter:false,club:'Celta Vigo'});
WC_SQUADS['Svezia'].players.push({name:'Lagerbielke',pos:'DF',age:26,caps:14,goals:0,assists:0,rating:3,starter:false,club:'Braga'});
WC_SQUADS['Svezia'].players.push({name:'Ekdal',pos:'DF',age:36,caps:92,goals:5,assists:6,rating:3,starter:false,club:'Burnley'});
WC_SQUADS['Svezia'].players.push({name:'Karlstrom',pos:'CC',age:30,caps:22,goals:1,assists:2,rating:3,starter:false,club:'Udinese'});
WC_SQUADS['Svezia'].players.push({name:'Sema',pos:'CC',age:29,caps:18,goals:2,assists:3,rating:3,starter:false,club:'Pafos'});
WC_SQUADS['Svezia'].players.push({name:'Bernhardsson',pos:'AT',age:28,caps:14,goals:3,assists:2,rating:3,starter:false,club:'Holstein Kiel'});
WC_SQUADS['Svezia'].players.push({name:'Nilsson',pos:'AT',age:24,caps:10,goals:2,assists:1,rating:3,starter:false,club:'Club Brugge'});
WC_SQUADS['Svezia'].players.push({name:'Nygren',pos:'AT',age:22,caps:8,goals:2,assists:1,rating:3,starter:false,club:'Celtic'});
WC_SQUADS['Tunisia'].players.push({name:'Ben Hassine',pos:'GK',age:30,caps:14,goals:0,assists:0,rating:2,starter:false,club:'Etoile du Sahel'});
WC_SQUADS['Tunisia'].players.push({name:'Chamakh',pos:'GK',age:28,caps:8,goals:0,assists:0,rating:2,starter:false,club:'Club Africain'});
WC_SQUADS['Tunisia'].players.push({name:'Abdi',pos:'DF',age:29,caps:24,goals:1,assists:1,rating:3,starter:false,club:'Nizza'});
WC_SQUADS['Tunisia'].players.push({name:'Ben Hamida',pos:'DF',age:30,caps:18,goals:0,assists:1,rating:2,starter:false,club:'Esperance'});
WC_SQUADS['Tunisia'].players.push({name:'Arous',pos:'DF',age:28,caps:14,goals:0,assists:1,rating:2,starter:false,club:'Kasimpasa'});
WC_SQUADS['Tunisia'].players.push({name:'Neffati',pos:'DF',age:24,caps:10,goals:0,assists:0,rating:2,starter:false,club:'Norrkoping'});
WC_SQUADS['Tunisia'].players.push({name:'Khedira',pos:'CC',age:25,caps:12,goals:1,assists:2,rating:3,starter:false,club:'Union Berlino'});
WC_SQUADS['Tunisia'].players.push({name:'Hadj Mahmoud',pos:'CC',age:27,caps:14,goals:1,assists:2,rating:3,starter:false,club:'Lugano'});
WC_SQUADS['Tunisia'].players.push({name:'Ben Ouanes',pos:'CC',age:26,caps:10,goals:1,assists:1,rating:2,starter:false,club:'Kasimpasa'});
WC_SQUADS['Tunisia'].players.push({name:'Achouri',pos:'AT',age:28,caps:16,goals:4,assists:2,rating:3,starter:false,club:'Copenaghen'});
WC_SQUADS['Belgio'].players.push({name:'Penders',pos:'GK',age:24,caps:4,goals:0,assists:0,rating:3,starter:false,club:'Strasburgo'});
WC_SQUADS['Belgio'].players.push({name:'Meunier',pos:'DF',age:33,caps:62,goals:3,assists:7,rating:3,starter:false,club:'Lille'});
WC_SQUADS['Belgio'].players.push({name:'De Winter',pos:'DF',age:22,caps:10,goals:0,assists:0,rating:3,starter:false,club:'Milan'});
WC_SQUADS['Belgio'].players.push({name:'Seys',pos:'DF',age:28,caps:12,goals:1,assists:1,rating:3,starter:false,club:'Bruges'});
WC_SQUADS['Belgio'].players.push({name:'Raskin',pos:'CC',age:23,caps:14,goals:1,assists:1,rating:3,starter:false,club:'Rangers'});
WC_SQUADS['Belgio'].players.push({name:'Witsel',pos:'CC',age:36,caps:134,goals:12,assists:16,rating:4,starter:false,club:'Girona'});
WC_SQUADS['Egitto'].players.push({name:'Shobeir',pos:'GK',age:30,caps:18,goals:0,assists:0,rating:3,starter:false,club:'Al Ahly'});
WC_SQUADS['Egitto'].players.push({name:'Soliman',pos:'GK',age:28,caps:10,goals:0,assists:0,rating:2,starter:false,club:'Zamalek'});
WC_SQUADS['Egitto'].players.push({name:'Zizo',pos:'CC',age:28,caps:38,goals:4,assists:5,rating:3,starter:false,club:'Al Ahly'});
WC_SQUADS['Egitto'].players.push({name:'Trezeguet',pos:'AT',age:31,caps:58,goals:16,assists:8,rating:4,starter:false,club:'Al Ahly'});
WC_SQUADS['Egitto'].players.push({name:'Dunga',pos:'CC',age:26,caps:14,goals:1,assists:2,rating:2,starter:false,club:'Al-Najma'});
WC_SQUADS['Egitto'].players.push({name:'Hafez',pos:'DF',age:24,caps:8,goals:0,assists:0,rating:2,starter:false,club:'Pyramids'});
WC_SQUADS['Egitto'].players.push({name:'Saber',pos:'CC',age:27,caps:10,goals:1,assists:1,rating:2,starter:false,club:'Zed'});
WC_SQUADS['Egitto'].players.push({name:'Abdelkarim',pos:'AT',age:24,caps:10,goals:3,assists:1,rating:3,starter:false,club:'Barcellona'});
WC_SQUADS['Iran'].players.push({name:'Niazmand',pos:'GK',age:28,caps:8,goals:0,assists:0,rating:2,starter:false,club:'Persepolis'});
WC_SQUADS['Iran'].players.push({name:'Eiri',pos:'DF',age:26,caps:14,goals:0,assists:0,rating:2,starter:false,club:'Malavan'});
WC_SQUADS['Iran'].players.push({name:'Hardani',pos:'DF',age:28,caps:18,goals:0,assists:1,rating:2,starter:false,club:'Esteghlal'});
WC_SQUADS['Iran'].players.push({name:'Noorafkan',pos:'DF',age:27,caps:14,goals:0,assists:0,rating:2,starter:false,club:'Foolad'});
WC_SQUADS['Iran'].players.push({name:'Rezaeian',pos:'DF',age:31,caps:38,goals:1,assists:2,rating:3,starter:false,club:'Foolad'});
WC_SQUADS['Iran'].players.push({name:'Cheshmi',pos:'CC',age:27,caps:28,goals:2,assists:2,rating:3,starter:false,club:'Esteghlal'});
WC_SQUADS['Iran'].players.push({name:'Razzaghinia',pos:'CC',age:28,caps:22,goals:1,assists:2,rating:2,starter:false,club:'Esteghlal'});
WC_SQUADS['Iran'].players.push({name:'Torabi',pos:'CC',age:29,caps:32,goals:2,assists:3,rating:3,starter:false,club:'Tractor'});
WC_SQUADS['Iran'].players.push({name:'Dargahi',pos:'AT',age:30,caps:24,goals:5,assists:2,rating:3,starter:false,club:'Standard Liege'});
WC_SQUADS['Nuova Zelanda'].players.push({name:'Woud',pos:'GK',age:26,caps:8,goals:0,assists:0,rating:2,starter:false,club:'Auckland FC'});
WC_SQUADS['Nuova Zelanda'].players.push({name:'De Vries',pos:'DF',age:25,caps:10,goals:0,assists:0,rating:2,starter:false,club:'Auckland FC'});
WC_SQUADS['Nuova Zelanda'].players.push({name:'Elliot',pos:'DF',age:24,caps:8,goals:0,assists:0,rating:2,starter:false,club:'Auckland FC'});
WC_SQUADS['Nuova Zelanda'].players.push({name:'Pijnaker',pos:'DF',age:26,caps:12,goals:0,assists:0,rating:2,starter:false,club:'Auckland FC'});
WC_SQUADS['Nuova Zelanda'].players.push({name:'Surman',pos:'DF',age:28,caps:14,goals:0,assists:1,rating:2,starter:false,club:'Portland Timbers'});
WC_SQUADS['Nuova Zelanda'].players.push({name:'Bayliss',pos:'CC',age:25,caps:8,goals:1,assists:1,rating:2,starter:false,club:'Newcastle Jets'});
WC_SQUADS['Nuova Zelanda'].players.push({name:'Rufer',pos:'CC',age:27,caps:18,goals:2,assists:2,rating:3,starter:false,club:'Wellington Phoenix'});
WC_SQUADS['Nuova Zelanda'].players.push({name:'Barbarouses',pos:'AT',age:34,caps:48,goals:10,assists:6,rating:3,starter:false,club:'Western Sydney'});
WC_SQUADS['Nuova Zelanda'].players.push({name:'Old',pos:'AT',age:25,caps:12,goals:3,assists:2,rating:3,starter:false,club:'St Etienne'});
WC_SQUADS['Spagna'].players.push({name:'Joan Garcia',pos:'GK',age:23,caps:4,goals:0,assists:0,rating:3,starter:false,club:'Barcellona'});
WC_SQUADS['Spagna'].players.push({name:'Pubill',pos:'DF',age:21,caps:8,goals:0,assists:1,rating:3,starter:false,club:'Atletico Madrid'});
WC_SQUADS['Spagna'].players.push({name:'Cucurella',pos:'DF',age:26,caps:22,goals:0,assists:3,rating:3,starter:false,club:'Chelsea'});
WC_SQUADS['Spagna'].players.push({name:'Llorente',pos:'DF',age:33,caps:42,goals:2,assists:4,rating:3,starter:false,club:'Atletico Madrid'});
WC_SQUADS['Spagna'].players.push({name:'Zubimendi',pos:'CC',age:26,caps:18,goals:1,assists:2,rating:4,starter:false,club:'Arsenal'});
WC_SQUADS['Spagna'].players.push({name:'Baena',pos:'CC',age:23,caps:14,goals:2,assists:3,rating:3,starter:false,club:'Atletico Madrid'});
WC_SQUADS['Capo Verde'].players.push({name:'Dos Santos',pos:'GK',age:27,caps:10,goals:0,assists:0,rating:2,starter:false,club:'San Diego'});
WC_SQUADS['Capo Verde'].players.push({name:'Rosa',pos:'GK',age:28,caps:6,goals:0,assists:0,rating:2,starter:false,club:'Montana'});
WC_SQUADS['Capo Verde'].players.push({name:'Diney Borges',pos:'DF',age:26,caps:14,goals:0,assists:0,rating:2,starter:false,club:'Al-Bataeh'});
WC_SQUADS['Capo Verde'].players.push({name:'Stopira',pos:'DF',age:35,caps:62,goals:1,assists:2,rating:3,starter:false,club:'Torreense'});
WC_SQUADS['Capo Verde'].players.push({name:'Pires',pos:'DF',age:28,caps:12,goals:0,assists:0,rating:2,starter:false,club:'Seinajoki'});
WC_SQUADS['Capo Verde'].players.push({name:'Arcanjo',pos:'CC',age:26,caps:14,goals:1,assists:2,rating:3,starter:false,club:'Vitoria'});
WC_SQUADS['Capo Verde'].players.push({name:'Joao Paulo',pos:'CC',age:27,caps:18,goals:2,assists:2,rating:3,starter:false,club:'FCSB'});
WC_SQUADS['Capo Verde'].players.push({name:'Benchimol',pos:'AT',age:25,caps:10,goals:2,assists:1,rating:2,starter:false,club:'Akron Togliatti'});
WC_SQUADS['Capo Verde'].players.push({name:'Cabral',pos:'AT',age:26,caps:14,goals:3,assists:2,rating:2,starter:false,club:'Estrela Amadora'});
WC_SQUADS['Arabia Saudita'].players.push({name:'Al Kassar',pos:'GK',age:26,caps:8,goals:0,assists:0,rating:2,starter:false,club:'Al Qadsiah'});
WC_SQUADS['Arabia Saudita'].players.push({name:'Lajami',pos:'DF',age:28,caps:22,goals:0,assists:1,rating:3,starter:false,club:'Al Hilal'});
WC_SQUADS['Arabia Saudita'].players.push({name:'Kadesh',pos:'DF',age:27,caps:18,goals:0,assists:0,rating:2,starter:false,club:'Al Ittihad'});
WC_SQUADS['Arabia Saudita'].players.push({name:'Al Shamat',pos:'DF',age:26,caps:14,goals:0,assists:1,rating:2,starter:false,club:'Al Qadsiah'});
WC_SQUADS['Arabia Saudita'].players.push({name:'Majrashi',pos:'DF',age:28,caps:18,goals:0,assists:2,rating:3,starter:false,club:'Al Ahli'});
WC_SQUADS['Arabia Saudita'].players.push({name:'Al Johani',pos:'CC',age:25,caps:18,goals:1,assists:2,rating:3,starter:false,club:'Al Ahli'});
WC_SQUADS['Arabia Saudita'].players.push({name:'Al Juwayr',pos:'CC',age:24,caps:14,goals:1,assists:1,rating:3,starter:false,club:'Al Qadsiah'});
WC_SQUADS['Arabia Saudita'].players.push({name:'Yahya',pos:'CC',age:26,caps:16,goals:1,assists:2,rating:2,starter:false,club:'Al Nassr'});
WC_SQUADS['Uruguay'].players.push({name:'Mele',pos:'GK',age:28,caps:8,goals:0,assists:0,rating:2,starter:false,club:'Monterrey'});
WC_SQUADS['Uruguay'].players.push({name:'Bueno',pos:'DF',age:26,caps:18,goals:0,assists:0,rating:3,starter:false,club:'Wolves'});
WC_SQUADS['Uruguay'].players.push({name:'Piquerez',pos:'DF',age:27,caps:24,goals:1,assists:3,rating:3,starter:false,club:'Palmeiras'});
WC_SQUADS['Uruguay'].players.push({name:'Vina',pos:'DF',age:28,caps:38,goals:2,assists:5,rating:3,starter:false,club:'River Plate'});
WC_SQUADS['Uruguay'].players.push({name:'Martinez M.',pos:'CC',age:26,caps:18,goals:2,assists:3,rating:3,starter:false,club:'Palmeiras'});
WC_SQUADS['Uruguay'].players.push({name:'Pellistri',pos:'CC',age:24,caps:20,goals:3,assists:3,rating:3,starter:false,club:'Panathinaikos'});
WC_SQUADS['Uruguay'].players.push({name:'Canobbio',pos:'CC',age:27,caps:22,goals:3,assists:4,rating:3,starter:false,club:'Fluminense'});
WC_SQUADS['Uruguay'].players.push({name:'Vinas',pos:'AT',age:26,caps:14,goals:4,assists:2,rating:3,starter:false,club:'Real Oviedo'});
WC_SQUADS['Francia'].players.push({name:'Risser',pos:'GK',age:28,caps:8,goals:0,assists:0,rating:3,starter:false,club:'Lens'});
WC_SQUADS['Francia'].players.push({name:'Digne',pos:'DF',age:33,caps:48,goals:2,assists:6,rating:3,starter:false,club:'Everton'});
WC_SQUADS['Francia'].players.push({name:'Gusto',pos:'DF',age:22,caps:10,goals:0,assists:1,rating:3,starter:false,club:'Chelsea'});
WC_SQUADS['Francia'].players.push({name:'Lucas Hernandez',pos:'DF',age:29,caps:42,goals:1,assists:2,rating:4,starter:false,club:'PSG'});
WC_SQUADS['Francia'].players.push({name:'Kante',pos:'CC',age:35,caps:82,goals:5,assists:8,rating:4,starter:false,club:'Fenerbahce'});
WC_SQUADS['Francia'].players.push({name:'Barcola',pos:'AT',age:22,caps:14,goals:4,assists:4,rating:4,starter:false,club:'PSG'});
WC_SQUADS['Senegal'].players.push({name:'Yehvann Diouf',pos:'GK',age:25,caps:8,goals:0,assists:0,rating:3,starter:false,club:'Nizza'});
WC_SQUADS['Senegal'].players.push({name:'Diaw',pos:'GK',age:28,caps:8,goals:0,assists:0,rating:2,starter:false,club:'Le Havre'});
WC_SQUADS['Senegal'].players.push({name:'El Hadji Diouf',pos:'DF',age:26,caps:14,goals:0,assists:1,rating:3,starter:false,club:'West Ham'});
WC_SQUADS['Senegal'].players.push({name:'Mamadou Sarr',pos:'DF',age:21,caps:8,goals:0,assists:0,rating:3,starter:false,club:'Chelsea'});
WC_SQUADS['Senegal'].players.push({name:'Seck',pos:'DF',age:27,caps:12,goals:0,assists:0,rating:2,starter:false,club:'Maccabi Haifa'});
WC_SQUADS['Senegal'].players.push({name:'Ilay Camara',pos:'DF',age:22,caps:8,goals:0,assists:1,rating:3,starter:false,club:'Anderlecht'});
WC_SQUADS['Senegal'].players.push({name:'Diarra',pos:'CC',age:26,caps:14,goals:1,assists:2,rating:3,starter:false,club:'Sunderland'});
WC_SQUADS['Senegal'].players.push({name:'Diao',pos:'AT',age:20,caps:8,goals:2,assists:1,rating:3,starter:false,club:'Como'});
WC_SQUADS['Iraq'].players.push({name:'Basil',pos:'GK',age:27,caps:10,goals:0,assists:0,rating:2,starter:false,club:'Al-Shorta'});
WC_SQUADS['Iraq'].players.push({name:'Younis',pos:'DF',age:26,caps:16,goals:0,assists:0,rating:2,starter:false,club:'Al Shorta'});
WC_SQUADS['Iraq'].players.push({name:'Hashim',pos:'DF',age:28,caps:20,goals:0,assists:0,rating:2,starter:false,club:'Al-Zawraa'});
WC_SQUADS['Iraq'].players.push({name:'Ismail',pos:'DF',age:25,caps:14,goals:0,assists:0,rating:2,starter:false,club:'Al-Talaba'});
WC_SQUADS['Iraq'].players.push({name:'Putros',pos:'DF',age:26,caps:12,goals:0,assists:1,rating:2,starter:false,club:'Persib'});
WC_SQUADS['Iraq'].players.push({name:'Yakob',pos:'CC',age:24,caps:12,goals:1,assists:1,rating:2,starter:false,club:'Aarhus GF'});
WC_SQUADS['Iraq'].players.push({name:'Qasem',pos:'CC',age:25,caps:10,goals:0,assists:1,rating:2,starter:false,club:'Nashville SC'});
WC_SQUADS['Iraq'].players.push({name:'Farji',pos:'CC',age:24,caps:10,goals:1,assists:1,rating:2,starter:false,club:'Venezia'});
WC_SQUADS['Iraq'].players.push({name:'Yousef',pos:'AT',age:26,caps:14,goals:4,assists:1,rating:2,starter:false,club:'Al-Talaba'});
WC_SQUADS['Norvegia'].players.push({name:'Tangvik',pos:'GK',age:25,caps:4,goals:0,assists:0,rating:2,starter:false,club:'Amburgo'});
WC_SQUADS['Norvegia'].players.push({name:'Vassbakk Ajer',pos:'DF',age:27,caps:42,goals:1,assists:1,rating:4,starter:false,club:'Brentford'});
WC_SQUADS['Norvegia'].players.push({name:'Pedersen',pos:'DF',age:28,caps:38,goals:2,assists:5,rating:3,starter:false,club:'Torino'});
WC_SQUADS['Norvegia'].players.push({name:'Falchener',pos:'DF',age:25,caps:10,goals:0,assists:0,rating:2,starter:false,club:'Viking FK'});
WC_SQUADS['Norvegia'].players.push({name:'Langas',pos:'DF',age:24,caps:8,goals:0,assists:1,rating:2,starter:false,club:'Derby County'});
WC_SQUADS['Norvegia'].players.push({name:'Aasgaard',pos:'CC',age:23,caps:8,goals:1,assists:1,rating:3,starter:false,club:'Rangers'});
WC_SQUADS['Norvegia'].players.push({name:'Aursnes',pos:'CC',age:28,caps:32,goals:2,assists:4,rating:3,starter:false,club:'Benfica'});
WC_SQUADS['Argentina'].players.push({name:'Musso',pos:'GK',age:32,caps:22,goals:0,assists:0,rating:3,starter:false,club:'Atletico Madrid'});
WC_SQUADS['Argentina'].players.push({name:'Balerdi',pos:'DF',age:26,caps:18,goals:0,assists:0,rating:3,starter:false,club:'Marsiglia'});
WC_SQUADS['Argentina'].players.push({name:'Montiel',pos:'DF',age:27,caps:34,goals:1,assists:2,rating:3,starter:false,club:'River Plate'});
WC_SQUADS['Argentina'].players.push({name:'Medina',pos:'DF',age:24,caps:12,goals:0,assists:0,rating:3,starter:false,club:'Marsiglia'});
WC_SQUADS['Argentina'].players.push({name:'Palacios',pos:'CC',age:26,caps:18,goals:2,assists:2,rating:4,starter:false,club:'Bayer Leverkusen'});
WC_SQUADS['Argentina'].players.push({name:'Barco',pos:'CC',age:22,caps:10,goals:1,assists:2,rating:3,starter:false,club:'Strasburgo'});
WC_SQUADS['Argentina'].players.push({name:'Simeone',pos:'AT',age:24,caps:12,goals:3,assists:2,rating:3,starter:false,club:'Atletico Madrid'});
WC_SQUADS['Algeria'].players.push({name:'Mastil',pos:'GK',age:26,caps:6,goals:0,assists:0,rating:2,starter:false,club:'Losanna'});
WC_SQUADS['Algeria'].players.push({name:'Ramdane',pos:'GK',age:28,caps:4,goals:0,assists:0,rating:2,starter:false,club:'MC Alger'});
WC_SQUADS['Algeria'].players.push({name:'Chergui',pos:'DF',age:25,caps:10,goals:0,assists:0,rating:2,starter:false,club:'Paris FC'});
WC_SQUADS['Algeria'].players.push({name:'Abada',pos:'DF',age:23,caps:10,goals:0,assists:1,rating:3,starter:false,club:'Celtic'});
WC_SQUADS['Algeria'].players.push({name:'Bentaleb',pos:'CC',age:30,caps:38,goals:2,assists:3,rating:3,starter:false,club:'Lille'});
WC_SQUADS['Algeria'].players.push({name:'Titraoui',pos:'CC',age:25,caps:12,goals:1,assists:1,rating:3,starter:false,club:'Charleroi'});
WC_SQUADS['Algeria'].players.push({name:'Ghedjemis',pos:'AT',age:24,caps:12,goals:3,assists:2,rating:3,starter:false,club:'Frosinone'});
WC_SQUADS['Algeria'].players.push({name:'Hadj-Moussa',pos:'AT',age:23,caps:12,goals:3,assists:2,rating:3,starter:false,club:'Feyenoord'});
WC_SQUADS['Austria'].players.push({name:'Wiegele',pos:'GK',age:26,caps:4,goals:0,assists:0,rating:2,starter:false,club:'Plzen'});
WC_SQUADS['Austria'].players.push({name:'Affengruber',pos:'DF',age:28,caps:14,goals:0,assists:0,rating:2,starter:false,club:'Elche'});
WC_SQUADS['Austria'].players.push({name:'Danso',pos:'DF',age:26,caps:20,goals:0,assists:0,rating:4,starter:false,club:'Tottenham'});
WC_SQUADS['Austria'].players.push({name:'Friedl',pos:'DF',age:26,caps:18,goals:0,assists:1,rating:3,starter:false,club:'Werder'});
WC_SQUADS['Austria'].players.push({name:'Posch',pos:'DF',age:28,caps:22,goals:1,assists:2,rating:3,starter:false,club:'Mainz'});
WC_SQUADS['Austria'].players.push({name:'Prass',pos:'DF',age:25,caps:12,goals:0,assists:1,rating:3,starter:false,club:'Hoffenheim'});
WC_SQUADS['Austria'].players.push({name:'Svoboda',pos:'DF',age:27,caps:14,goals:0,assists:0,rating:2,starter:false,club:'Venezia'});
WC_SQUADS['Austria'].players.push({name:'Grillitsch',pos:'CC',age:30,caps:38,goals:2,assists:4,rating:3,starter:false,club:'Braga'});
WC_SQUADS['Austria'].players.push({name:'Schmid',pos:'CC',age:24,caps:10,goals:1,assists:1,rating:3,starter:false,club:'Werder'});
WC_SQUADS['Austria'].players.push({name:'Kalajdzic',pos:'AT',age:28,caps:28,goals:8,assists:3,rating:3,starter:false,club:'LASK'});
WC_SQUADS['Giordania'].players.push({name:'Bani Attiah',pos:'GK',age:26,caps:8,goals:0,assists:0,rating:2,starter:false,club:'Al-Faisaly'});
WC_SQUADS['Giordania'].players.push({name:'Al-Rosan',pos:'DF',age:25,caps:14,goals:0,assists:0,rating:2,starter:false,club:'Al-Hussein'});
WC_SQUADS['Giordania'].players.push({name:'Abualnadi',pos:'DF',age:24,caps:10,goals:0,assists:0,rating:2,starter:false,club:'Selangor'});
WC_SQUADS['Giordania'].players.push({name:'Obaid',pos:'DF',age:26,caps:12,goals:0,assists:0,rating:2,starter:false,club:'Al-Hussein'});
WC_SQUADS['Giordania'].players.push({name:'Badawi',pos:'DF',age:25,caps:10,goals:0,assists:0,rating:2,starter:false,club:'Al-Faisaly'});
WC_SQUADS['Giordania'].players.push({name:'Jamous',pos:'CC',age:27,caps:16,goals:1,assists:1,rating:2,starter:false,club:'Al-Zawraa'});
WC_SQUADS['Giordania'].players.push({name:'Saadeh',pos:'CC',age:25,caps:10,goals:0,assists:1,rating:2,starter:false,club:'Al-Karma'});
WC_SQUADS['Giordania'].players.push({name:'Ayed',pos:'CC',age:26,caps:12,goals:1,assists:1,rating:2,starter:false,club:'Al-Hussein'});
WC_SQUADS['Giordania'].players.push({name:'Azaizeh',pos:'AT',age:24,caps:14,goals:4,assists:1,rating:3,starter:false,club:'Al-Shabab'});
WC_SQUADS['Portogallo'].players.push({name:'Rui Silva',pos:'GK',age:32,caps:8,goals:0,assists:0,rating:3,starter:false,club:'Sporting CP'});
WC_SQUADS['Portogallo'].players.push({name:'Velho',pos:'GK',age:26,caps:2,goals:0,assists:0,rating:2,starter:false,club:'Genclerbirligi'});
WC_SQUADS['Portogallo'].players.push({name:'Matheus Nunes',pos:'CC',age:26,caps:18,goals:1,assists:3,rating:4,starter:false,club:'Man City'});
WC_SQUADS['Portogallo'].players.push({name:'Semedo',pos:'DF',age:31,caps:42,goals:0,assists:4,rating:3,starter:false,club:'Fenerbahce'});
WC_SQUADS['Portogallo'].players.push({name:'Samu Costa',pos:'CC',age:26,caps:12,goals:1,assists:2,rating:3,starter:false,club:'Maiorca'});
WC_SQUADS['Portogallo'].players.push({name:'Ruben Neves',pos:'CC',age:29,caps:60,goals:8,assists:10,rating:4,starter:false,club:'Al-Hilal'});
WC_SQUADS['Portogallo'].players.push({name:'Pedro Neto',pos:'AT',age:25,caps:22,goals:4,assists:6,rating:4,starter:false,club:'Chelsea'});
WC_SQUADS['Colombia'].players.push({name:'Ospina',pos:'GK',age:40,caps:122,goals:0,assists:0,rating:3,starter:false,club:'Atletico Nacional'});
WC_SQUADS['Colombia'].players.push({name:'Ditta',pos:'DF',age:26,caps:12,goals:0,assists:0,rating:2,starter:false,club:'Cruz Azul'});
WC_SQUADS['Colombia'].players.push({name:'Santiago Arias',pos:'DF',age:34,caps:68,goals:2,assists:5,rating:3,starter:false,club:'Independiente'});
WC_SQUADS['Colombia'].players.push({name:'Machado',pos:'DF',age:28,caps:16,goals:0,assists:2,rating:3,starter:false,club:'Nantes'});
WC_SQUADS['Colombia'].players.push({name:'Carrascal',pos:'CC',age:26,caps:14,goals:2,assists:3,rating:3,starter:false,club:'Flamengo'});
WC_SQUADS['Colombia'].players.push({name:'Castano',pos:'CC',age:27,caps:16,goals:1,assists:1,rating:3,starter:false,club:'River Plate'});
WC_SQUADS['Colombia'].players.push({name:'Quintero',pos:'CC',age:32,caps:28,goals:4,assists:6,rating:3,starter:false,club:'River Plate'});
WC_SQUADS['Colombia'].players.push({name:'Cordoba',pos:'AT',age:26,caps:14,goals:4,assists:2,rating:3,starter:false,club:'Krasnodar'});
WC_SQUADS['RD Congo'].players.push({name:'Epolo',pos:'GK',age:24,caps:8,goals:0,assists:0,rating:3,starter:false,club:'Standard Liegi'});
WC_SQUADS['RD Congo'].players.push({name:'Kalulu',pos:'DF',age:24,caps:10,goals:0,assists:0,rating:3,starter:false,club:'Limassol'});
WC_SQUADS['RD Congo'].players.push({name:'Kayembe',pos:'DF',age:26,caps:14,goals:0,assists:1,rating:3,starter:false,club:'Genk'});
WC_SQUADS['RD Congo'].players.push({name:'Tshibola',pos:'DF',age:30,caps:12,goals:0,assists:0,rating:2,starter:false,club:'Kilmarnock'});
WC_SQUADS['RD Congo'].players.push({name:'Tuanzebe',pos:'DF',age:27,caps:8,goals:0,assists:0,rating:2,starter:false,club:'Burnley'});
WC_SQUADS['RD Congo'].players.push({name:'Batubinsika',pos:'DF',age:26,caps:8,goals:0,assists:0,rating:2,starter:false,club:'Larissa'});
WC_SQUADS['RD Congo'].players.push({name:'Pickel',pos:'CC',age:28,caps:14,goals:1,assists:2,rating:3,starter:false,club:'Espanyol'});
WC_SQUADS['RD Congo'].players.push({name:'Mbuku',pos:'CC',age:22,caps:10,goals:2,assists:2,rating:3,starter:false,club:'Montpellier'});
WC_SQUADS['RD Congo'].players.push({name:'Elia',pos:'CC',age:28,caps:16,goals:2,assists:3,rating:3,starter:false,club:'Alanyaspor'});
WC_SQUADS['Uzbekistan'].players.push({name:'Ergashev',pos:'GK',age:26,caps:8,goals:0,assists:0,rating:2,starter:false,club:'Neftchi'});
WC_SQUADS['Uzbekistan'].players.push({name:'Nematov',pos:'GK',age:28,caps:6,goals:0,assists:0,rating:2,starter:false,club:'Nasaf'});
WC_SQUADS['Uzbekistan'].players.push({name:'Ashurmatov',pos:'DF',age:27,caps:18,goals:0,assists:0,rating:2,starter:false,club:'Esteghlal'});
WC_SQUADS['Uzbekistan'].players.push({name:'Abdullayev',pos:'DF',age:25,caps:12,goals:0,assists:0,rating:2,starter:false,club:'Dibba'});
WC_SQUADS['Uzbekistan'].players.push({name:'Nasrullayev',pos:'DF',age:24,caps:10,goals:0,assists:0,rating:2,starter:false,club:'Pakhtakor'});
WC_SQUADS['Uzbekistan'].players.push({name:'Karimov',pos:'DF',age:26,caps:8,goals:0,assists:0,rating:2,starter:false,club:'Surkhon'});
WC_SQUADS['Uzbekistan'].players.push({name:'Hamrobekov',pos:'CC',age:24,caps:10,goals:0,assists:1,rating:2,starter:false,club:'Tractor'});
WC_SQUADS['Uzbekistan'].players.push({name:'Ganiev',pos:'CC',age:26,caps:8,goals:0,assists:1,rating:2,starter:false,club:'Al Bataeh'});
WC_SQUADS['Uzbekistan'].players.push({name:'Iskanderov',pos:'CC',age:25,caps:8,goals:0,assists:1,rating:2,starter:false,club:'Neftchi'});
WC_SQUADS['Inghilterra'].players.push({name:'Trafford',pos:'GK',age:23,caps:4,goals:0,assists:0,rating:3,starter:false,club:'Man City'});
WC_SQUADS['Inghilterra'].players.push({name:'Stones',pos:'DF',age:32,caps:78,goals:4,assists:2,rating:4,starter:false,club:'Man City'});
WC_SQUADS['Inghilterra'].players.push({name:'Quansah',pos:'DF',age:22,caps:8,goals:0,assists:0,rating:3,starter:false,club:'Bayer Leverkusen'});
WC_SQUADS['Inghilterra'].players.push({name:'Spence',pos:'DF',age:25,caps:8,goals:0,assists:1,rating:3,starter:false,club:'Tottenham'});
WC_SQUADS['Inghilterra'].players.push({name:'Livramento',pos:'DF',age:22,caps:8,goals:0,assists:1,rating:3,starter:false,club:'Newcastle'});
WC_SQUADS['Inghilterra'].players.push({name:'Gordon',pos:'AT',age:24,caps:14,goals:3,assists:4,rating:4,starter:false,club:'Newcastle'});
WC_SQUADS['Croazia'].players.push({name:'Pandur',pos:'GK',age:28,caps:6,goals:0,assists:0,rating:3,starter:false,club:'Hull City'});
WC_SQUADS['Croazia'].players.push({name:'Pongracic',pos:'DF',age:28,caps:22,goals:1,assists:0,rating:3,starter:false,club:'Fiorentina'});
WC_SQUADS['Croazia'].players.push({name:'Erlic',pos:'DF',age:28,caps:14,goals:0,assists:0,rating:3,starter:false,club:'Midtjylland'});
WC_SQUADS['Croazia'].players.push({name:'Baturina',pos:'CC',age:23,caps:10,goals:2,assists:2,rating:3,starter:false,club:'Como'});
WC_SQUADS['Croazia'].players.push({name:'Jakic',pos:'CC',age:27,caps:18,goals:1,assists:2,rating:3,starter:false,club:'Augsburg'});
WC_SQUADS['Croazia'].players.push({name:'Petar Sucic',pos:'CC',age:22,caps:8,goals:1,assists:2,rating:3,starter:false,club:'Inter'});
WC_SQUADS['Ghana'].players.push({name:'Anang',pos:'GK',age:26,caps:8,goals:0,assists:0,rating:2,starter:false,club:'St Patrick Athletic'});
WC_SQUADS['Ghana'].players.push({name:'Luckassen',pos:'DF',age:30,caps:10,goals:0,assists:0,rating:2,starter:false,club:'Pafos'});
WC_SQUADS['Ghana'].players.push({name:'Opoku',pos:'DF',age:25,caps:12,goals:0,assists:0,rating:2,starter:false,club:'Basaksehir'});
WC_SQUADS['Ghana'].players.push({name:'Rahman',pos:'DF',age:28,caps:22,goals:1,assists:0,rating:3,starter:false,club:'PAOK'});
WC_SQUADS['Ghana'].players.push({name:'Boakye',pos:'CC',age:24,caps:10,goals:1,assists:1,rating:2,starter:false,club:'St. Etienne'});
WC_SQUADS['Ghana'].players.push({name:'Owusu',pos:'CC',age:26,caps:12,goals:1,assists:2,rating:3,starter:false,club:'Auxerre'});
WC_SQUADS['Panama'].players.push({name:'Samudio',pos:'GK',age:28,caps:10,goals:0,assists:0,rating:2,starter:false,club:'Marathon'});
WC_SQUADS['Panama'].players.push({name:'Blackman',pos:'DF',age:27,caps:14,goals:0,assists:0,rating:2,starter:false,club:'Slovan Bratislava'});
WC_SQUADS['Panama'].players.push({name:'Gutierrez',pos:'DF',age:25,caps:10,goals:0,assists:0,rating:2,starter:false,club:'Dep. La Guaira'});
WC_SQUADS['Panama'].players.push({name:'Ramos',pos:'DF',age:26,caps:12,goals:0,assists:0,rating:2,starter:false,club:'Puerto Cabello'});
WC_SQUADS['Panama'].players.push({name:'Martinez C.',pos:'CC',age:26,caps:12,goals:1,assists:1,rating:2,starter:false,club:'Kiryat Shmona'});
WC_SQUADS['Panama'].players.push({name:'Yanis',pos:'CC',age:25,caps:8,goals:1,assists:0,rating:2,starter:false,club:'Cobresal'});
WC_SQUADS['Panama'].players.push({name:'Waterman',pos:'AT',age:27,caps:12,goals:3,assists:2,rating:2,starter:false,club:'U. de Concepcion'});

// Rebuild flat player list after additions
WC_PLAYERS.length = 0;
for (const [team, data] of Object.entries(WC_SQUADS)) {
  for (const p of data.players) {
    p.trophies = _assignTrophies(p, team);
    WC_PLAYERS.push({...p, nat: team, natCode: data.natCode});
  }
}