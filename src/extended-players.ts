// Extended player database with more Haikyu characters
// This can be imported into the main team builder to expand the player roster

import { Player, PlayerPosition } from './types.js';

export const extendedPlayers: Player[] = [
    // Aoba Johsai
    {
        id: 16,
        name: 'Toru Oikawa',
        position: 'S' as PlayerPosition,
        height: '184.3 cm',
        power: 93,
        profile_image_url: 'https://via.placeholder.com/150x150/00bcd4/ffffff?text=TO',
        school: 'Aoba Johsai',
        specialty: 'Jump Serve',
    },
    {
        id: 17,
        name: 'Hajime Iwaizumi',
        position: 'WS' as PlayerPosition,
        height: '179.3 cm',
        power: 91,
        profile_image_url: 'https://via.placeholder.com/150x150/4caf50/ffffff?text=HI',
        school: 'Aoba Johsai',
        specialty: 'Cross Shot',
    },
    {
        id: 18,
        name: 'Kentaro Kyotani',
        position: 'WS' as PlayerPosition,
        height: '178.0 cm',
        power: 88,
        profile_image_url: 'https://via.placeholder.com/150x150/ff5722/ffffff?text=KK2',
        school: 'Aoba Johsai',
        specialty: 'Mad Dog Attack',
    },

    // Date Tech
    {
        id: 19,
        name: 'Takanobu Aone',
        position: 'MB' as PlayerPosition,
        height: '191.8 cm',
        power: 87,
        profile_image_url: 'https://via.placeholder.com/150x150/607d8b/ffffff?text=TA',
        school: 'Date Tech',
        specialty: 'Iron Wall',
    },
    {
        id: 20,
        name: 'Kenji Futakuchi',
        position: 'WS' as PlayerPosition,
        height: '180.0 cm',
        power: 83,
        profile_image_url: 'https://via.placeholder.com/150x150/795548/ffffff?text=KF',
        school: 'Date Tech',
        specialty: 'Block Follow',
    },

    // Johzenji
    {
        id: 21,
        name: 'Yuji Terushima',
        position: 'WS' as PlayerPosition,
        height: '176.5 cm',
        power: 80,
        profile_image_url: 'https://via.placeholder.com/150x150/ff9800/ffffff?text=YT',
        school: 'Johzenji',
        specialty: 'Tongue Piercing Serve',
    },

    // Shiratorizawa additional
    {
        id: 22,
        name: 'Satori Tendo',
        position: 'MB' as PlayerPosition,
        height: '187.7 cm',
        power: 85,
        profile_image_url: 'https://via.placeholder.com/150x150/e91e63/ffffff?text=ST',
        school: 'Shiratorizawa',
        specialty: 'Guess Blocking',
    },
    {
        id: 23,
        name: 'Tsutomu Goshiki',
        position: 'OP' as PlayerPosition,
        height: '180.0 cm',
        power: 82,
        profile_image_url: 'https://via.placeholder.com/150x150/9c27b0/ffffff?text=TG',
        school: 'Shiratorizawa',
        specialty: 'Super Straight',
    },

    // Inarizaki
    {
        id: 24,
        name: 'Atsumu Miya',
        position: 'S' as PlayerPosition,
        height: '183.6 cm',
        power: 94,
        profile_image_url: 'https://via.placeholder.com/150x150/ffeb3b/ffffff?text=AM',
        school: 'Inarizaki',
        specialty: 'Twin Quick',
    },
    {
        id: 25,
        name: 'Osamu Miya',
        position: 'WS' as PlayerPosition,
        height: '183.6 cm',
        power: 92,
        profile_image_url: 'https://via.placeholder.com/150x150/2196f3/ffffff?text=OM',
        school: 'Inarizaki',
        specialty: 'Twin Quick',
    },
    {
        id: 26,
        name: 'Rintaro Suna',
        position: 'MB' as PlayerPosition,
        height: '185.7 cm',
        power: 89,
        profile_image_url: 'https://via.placeholder.com/150x150/607d8b/ffffff?text=RS',
        school: 'Inarizaki',
        specialty: 'Block Kill',
    },

    // Itachiyama
    {
        id: 27,
        name: 'Kiyoomi Sakusa',
        position: 'OP' as PlayerPosition,
        height: '192.0 cm',
        power: 96,
        profile_image_url: 'https://via.placeholder.com/150x150/000000/ffffff?text=KS',
        school: 'Itachiyama',
        specialty: 'Flexible Wrist',
    },
    {
        id: 28,
        name: 'Motoya Komori',
        position: 'L' as PlayerPosition,
        height: '180.0 cm',
        power: 88,
        profile_image_url: 'https://via.placeholder.com/150x150/8bc34a/ffffff?text=MK',
        school: 'Itachiyama',
        specialty: 'Perfect Reception',
    },

    // Nekoma additional
    {
        id: 29,
        name: 'Tetsuro Kuroo',
        position: 'MB' as PlayerPosition,
        height: '187.7 cm',
        power: 90,
        profile_image_url: 'https://via.placeholder.com/150x150/ff5722/ffffff?text=TK',
        school: 'Nekoma',
        specialty: 'Read Blocking',
    },
    {
        id: 30,
        name: 'Kenma Kozume',
        position: 'S' as PlayerPosition,
        height: '169.2 cm',
        power: 75,
        profile_image_url: 'https://via.placeholder.com/150x150/ffeb3b/ffffff?text=KK',
        school: 'Nekoma',
        specialty: 'Brain',
    },
    {
        id: 31,
        name: 'Morisuke Yaku',
        position: 'L' as PlayerPosition,
        height: '165.2 cm',
        power: 85,
        profile_image_url: 'https://via.placeholder.com/150x150/9c27b0/ffffff?text=MY',
        school: 'Nekoma',
        specialty: 'Perfect Dig',
    },

    // Fukurodani
    {
        id: 32,
        name: 'Kotaro Bokuto',
        position: 'WS' as PlayerPosition,
        height: '185.5 cm',
        power: 95,
        profile_image_url: 'https://via.placeholder.com/150x150/ff9800/ffffff?text=KB',
        school: 'Fukurodani',
        specialty: 'Cross Shot',
    },
    {
        id: 33,
        name: 'Keiji Akaashi',
        position: 'S' as PlayerPosition,
        height: '182.3 cm',
        power: 87,
        profile_image_url: 'https://via.placeholder.com/150x150/3f51b5/ffffff?text=KA',
        school: 'Fukurodani',
        specialty: 'Precise Toss',
    },
];

// Function to add extended players to the main roster
export function addExtendedPlayers(mainPlayers: Player[]): Player[] {
    return [...mainPlayers, ...extendedPlayers];
}

// Utility functions for filtering players
export const positionFilters = {
    setter: (players: Player[]) => players.filter(p => p.position === 'S'),
    middleBlocker: (players: Player[]) => players.filter(p => p.position === 'MB'),
    wingSpiker: (players: Player[]) => players.filter(p => p.position === 'WS'),
    opposite: (players: Player[]) => players.filter(p => p.position === 'OP'),
    libero: (players: Player[]) => players.filter(p => p.position === 'L'),
};

export const teamFilters = {
    karasuno: (players: Player[]) => players.filter(p => p.school === 'Karasuno'),
    nekoma: (players: Player[]) => players.filter(p => p.school === 'Nekoma'),
    aoba: (players: Player[]) => players.filter(p => p.school === 'Aoba Johsai'),
    shiratorizawa: (players: Player[]) => players.filter(p => p.school === 'Shiratorizawa'),
    fukurodani: (players: Player[]) => players.filter(p => p.school === 'Fukurodani'),
    inarizaki: (players: Player[]) => players.filter(p => p.school === 'Inarizaki'),
    itachiyama: (players: Player[]) => players.filter(p => p.school === 'Itachiyama'),
};

export const powerRankings = {
    'Elite': (players: Player[]) => players.filter(p => (p.power || 0) >= 90),
    'High Tier': (players: Player[]) => players.filter(p => (p.power || 0) >= 80 && (p.power || 0) < 90),
    'Mid Tier': (players: Player[]) => players.filter(p => (p.power || 0) >= 70 && (p.power || 0) < 80),
    'Developing': (players: Player[]) => players.filter(p => (p.power || 0) < 70),
};

// Formation presets
export const formationPresets = {
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
        WS1: 32, // Bokuto
        WS2: 17, // Iwaizumi
        MB1: 29, // Kuroo
        MB2: 26, // Suna
        OP: 27, // Sakusa
        S: 24, // Atsumu
        L: 28, // Komori
    },
};
