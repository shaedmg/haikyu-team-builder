// Extended player database with more Haikyu characters
// This can be imported into script.js to expand the player roster

const extendedPlayers = [
  // Aoba Johsai
  {
    id: 16,
    name: 'Toru Oikawa',
    position: 'S',
    height: '184.3 cm',
    power: 93,
    image: 'https://via.placeholder.com/150x150/00bcd4/ffffff?text=TO',
    team: 'Aoba Johsai',
    specialty: 'Jump Serve',
  },
  {
    id: 17,
    name: 'Hajime Iwaizumi',
    position: 'WS',
    height: '179.3 cm',
    power: 91,
    image: 'https://via.placeholder.com/150x150/4caf50/ffffff?text=HI',
    team: 'Aoba Johsai',
    specialty: 'Cross Shot',
  },
  {
    id: 18,
    name: 'Kentaro Kyotani',
    position: 'WS',
    height: '178.0 cm',
    power: 88,
    image: 'https://via.placeholder.com/150x150/ff5722/ffffff?text=KK2',
    team: 'Aoba Johsai',
    specialty: 'Mad Dog Attack',
  },

  // Date Tech
  {
    id: 19,
    name: 'Takanobu Aone',
    position: 'MB',
    height: '191.8 cm',
    power: 87,
    image: 'https://via.placeholder.com/150x150/607d8b/ffffff?text=TA',
    team: 'Date Tech',
    specialty: 'Iron Wall',
  },
  {
    id: 20,
    name: 'Kenji Futakuchi',
    position: 'WS',
    height: '180.0 cm',
    power: 83,
    image: 'https://via.placeholder.com/150x150/795548/ffffff?text=KF',
    team: 'Date Tech',
    specialty: 'Block Follow',
  },

  // Johzenji
  {
    id: 21,
    name: 'Yuji Terushima',
    position: 'WS',
    height: '176.5 cm',
    power: 80,
    image: 'https://via.placeholder.com/150x150/ff9800/ffffff?text=YT',
    team: 'Johzenji',
    specialty: 'Tongue Piercing Serve',
  },

  // Shiratorizawa additional
  {
    id: 22,
    name: 'Satori Tendo',
    position: 'MB',
    height: '187.7 cm',
    power: 85,
    image: 'https://via.placeholder.com/150x150/e91e63/ffffff?text=ST',
    team: 'Shiratorizawa',
    specialty: 'Guess Blocking',
  },
  {
    id: 23,
    name: 'Tsutomu Goshiki',
    position: 'OP',
    height: '180.0 cm',
    power: 82,
    image: 'https://via.placeholder.com/150x150/9c27b0/ffffff?text=TG',
    team: 'Shiratorizawa',
    specialty: 'Super Straight',
  },

  // Inarizaki
  {
    id: 24,
    name: 'Atsumu Miya',
    position: 'S',
    height: '183.6 cm',
    power: 94,
    image: 'https://via.placeholder.com/150x150/ffeb3b/ffffff?text=AM',
    team: 'Inarizaki',
    specialty: 'Dual Setter',
  },
  {
    id: 25,
    name: 'Osamu Miya',
    position: 'OP',
    height: '183.6 cm',
    power: 90,
    image: 'https://via.placeholder.com/150x150/ffc107/ffffff?text=OM',
    team: 'Inarizaki',
    specialty: 'Twin Attack',
  },
  {
    id: 26,
    name: 'Rintaro Suna',
    position: 'MB',
    height: '185.7 cm',
    power: 86,
    image: 'https://via.placeholder.com/150x150/8bc34a/ffffff?text=RS',
    team: 'Inarizaki',
    specialty: 'Delayed Attack',
  },
  {
    id: 27,
    name: 'Kita Shinsuke',
    position: 'WS',
    height: '175.2 cm',
    power: 79,
    image: 'https://via.placeholder.com/150x150/607d8b/ffffff?text=KS',
    team: 'Inarizaki',
    specialty: 'Consistent Play',
  },

  // Itachiyama
  {
    id: 28,
    name: 'Kiyoomi Sakusa',
    position: 'OP',
    height: '192.0 cm',
    power: 95,
    image: 'https://via.placeholder.com/150x150/2c2c2c/ffffff?text=KS2',
    team: 'Itachiyama',
    specialty: 'Flexible Wrist',
  },
  {
    id: 29,
    name: 'Motoya Komori',
    position: 'L',
    height: '165.2 cm',
    power: 87,
    image: 'https://via.placeholder.com/150x150/ff6b35/ffffff?text=MK',
    team: 'Itachiyama',
    specialty: 'Perfect Receive',
  },

  // Kamomedai
  {
    id: 30,
    name: 'Korai Hoshiumi',
    position: 'OP',
    height: '174.7 cm',
    power: 93,
    image: 'https://via.placeholder.com/150x150/03a9f4/ffffff?text=KH',
    team: 'Kamomedai',
    specialty: 'Little Giant',
  },
  {
    id: 31,
    name: 'Sachiro Hirugami',
    position: 'MB',
    height: '189.5 cm',
    power: 88,
    image: 'https://via.placeholder.com/150x150/4caf50/ffffff?text=SH2',
    team: 'Kamomedai',
    specialty: 'Read Blocking',
  },

  // Professional/Adults
  {
    id: 32,
    name: 'Koshi Sugawara',
    position: 'S',
    height: '174.6 cm',
    power: 76,
    image: 'https://via.placeholder.com/150x150/9e9e9e/ffffff?text=KS3',
    team: 'Karasuno',
    specialty: 'Support Setting',
  },
  {
    id: 33,
    name: 'Chikara Ennoshita',
    position: 'WS',
    height: '176.1 cm',
    power: 74,
    image: 'https://via.placeholder.com/150x150/795548/ffffff?text=CE',
    team: 'Karasuno',
    specialty: 'Steady Receive',
  },
  {
    id: 34,
    name: 'Hisashi Kinoshita',
    position: 'WS',
    height: '175.4 cm',
    power: 72,
    image: 'https://via.placeholder.com/150x150/607d8b/ffffff?text=HK',
    team: 'Karasuno',
    specialty: 'Pinch Server',
  },
  {
    id: 35,
    name: 'Kazuhito Narita',
    position: 'MB',
    height: '178.8 cm',
    power: 71,
    image: 'https://via.placeholder.com/150x150/9c27b0/ffffff?text=KN',
    team: 'Karasuno',
    specialty: 'Reliable Block',
  },
];

// Function to merge with existing players
function addExtendedPlayers() {
  return [...players, ...extendedPlayers];
}

// Position-specific player filters
const positionFilters = {
  L: (players) => players.filter((p) => p.position === 'L'),
  S: (players) => players.filter((p) => p.position === 'S'),
  MB: (players) => players.filter((p) => p.position === 'MB'),
  WS: (players) => players.filter((p) => p.position === 'WS'),
  OP: (players) => players.filter((p) => p.position === 'OP'),
};

// Team-specific filters
const teamFilters = {
  Karasuno: (players) => players.filter((p) => p.team === 'Karasuno'),
  Nekoma: (players) => players.filter((p) => p.team === 'Nekoma'),
  Fukurodani: (players) => players.filter((p) => p.team === 'Fukurodani'),
  'Aoba Johsai': (players) => players.filter((p) => p.team === 'Aoba Johsai'),
  Shiratorizawa: (players) => players.filter((p) => p.team === 'Shiratorizawa'),
  Inarizaki: (players) => players.filter((p) => p.team === 'Inarizaki'),
};

// Power ranking functions
const powerRankings = {
  'Top Tier': (players) => players.filter((p) => p.power >= 90),
  'High Tier': (players) =>
    players.filter((p) => p.power >= 80 && p.power < 90),
  'Mid Tier': (players) => players.filter((p) => p.power >= 70 && p.power < 80),
  Developing: (players) => players.filter((p) => p.power < 70),
};

// Formation presets
const formationPresets = {
  'Karasuno Main': {
    WS1: 1, // Hinata
    WS2: 5, // Asahi
    MB1: 3, // Tsukishima
    MB2: 7, // Yamaguchi
    OP: 14, // Ushijima (guest)
    S: 2, // Kageyama
    L: 4, // Nishinoya
  },
  Shiratorizawa: {
    WS1: 17, // Iwaizumi (guest)
    WS2: 23, // Goshiki
    MB1: 22, // Tendo
    MB2: 11, // Kuroo (guest)
    OP: 14, // Ushijima
    S: 15, // Semi
    L: 13, // Yaku (guest)
  },
  'Dream Team': {
    WS1: 9, // Bokuto
    WS2: 17, // Iwaizumi
    MB1: 11, // Kuroo
    MB2: 26, // Suna
    OP: 28, // Sakusa
    S: 24, // Atsumu
    L: 29, // Komori
  },
};

export {
  extendedPlayers,
  addExtendedPlayers,
  positionFilters,
  teamFilters,
  powerRankings,
  formationPresets,
};
