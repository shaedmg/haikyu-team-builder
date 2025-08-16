// Script to generate English version of the JSON file
const fs = require('fs');

// Translation mappings - COMPLETE
const bondNameTranslations = {
  "'Campeón Absoluto' y Colocador Sólido":
    "'Absolute Champion' and Solid Setter",
  "'Cerebro' y 'Torre de Control'": "'Brain' and 'Control Tower'",
  "'Coraje' y 'Espíritu Competitivo'": "'Courage' and 'Competitive Spirit'",
  "'Escudo' y 'Lanza'": "'Shield' and 'Spear'",
  "'Guardián' y 'As'": "'Guardian' and 'Ace'",
  "'Núcleo' y 'Torre de Control'": "'Core' and 'Control Tower'",
  "'Rey' y 'Gran Rey'": "'King' and 'Great King'",
  "'Ushiwaka' y 'Benkei'": "'Ushiwaka' and 'Benkei'",
  'Adivinanza vs. Sistema': 'Intuition vs. System',
  Amigos: 'Friends',
  'Amigos de la Clase de Voleibol': 'Volleyball Class Friends',
  'Amigos de la Infancia que Jugaron en Secundaria y Preparatoria':
    'Childhood Friends Who Played in Middle and High School',
  'Amigos para Siempre': 'Friends Forever',
  'Amistad Peculiar': 'Peculiar Friendship',
  'Amistad Peculiar (SSR ver.)': 'Peculiar Friendship (SSR ver.)',
  'Antiguo y Nuevo Capitán de Date Tech': 'Former and New Date Tech Captain',
  'As Milagroso y Colocador Atento': 'Miraculous Ace and Attentive Setter',
  'Aspirantes a As': 'Aspiring Aces',
  'Baño en el Mar': 'Sea Bathing',
  'Bloqueadores Centrales de Fukurōdani': 'Fukurodani Central Blockers',
  'Bloqueadores Centrales de Shiratorizawa': 'Shiratorizawa Central Blockers',
  'Buenos Rivales': 'Good Rivals',
  'Cañón y Muro de Hierro': 'Cannon and Iron Wall',
  'Cerebro y Eje': 'Brain and Axis',
  'Club de Fans de Kiyoko-san': 'Kiyoko-san Fan Club',
  'Colocadores de Date Tech': 'Date Tech Setters',
  'Colocadores de Diferentes Tipos': 'Different Type Setters',
  'Colocadores de Karasuno': 'Karasuno Setters',
  'Compañero de Confianza': 'Trusted Partner',
  'Compañeros Colocadores del Campamento Juvenil':
    'Youth Camp Setter Companions',
  'Compañeros de Práctica de Tokio': 'Tokyo Practice Partners',
  'Compañeros de Práctica de Tokio (Habilidad)':
    'Tokyo Practice Partners (Skill)',
  'Compañeros de equipo en el campamento de entrenamiento juvenil de todo Japón (Kizuna)':
    'All-Japan Youth Training Camp Teammates (Kizuna)',
  'Compañeros del Campamento Intensivo Juvenil de Japón':
    'Japan Youth Intensive Camp Companions',
  'Confianza Despiadada': 'Ruthless Trust',
  'Confianza en Formación': 'Trust in Formation',
  'Contemplando los Cerezos en Flor': 'Cherry Blossom Viewing',
  'Del Gran As al As': 'From Great Ace to Ace',
  'Detrás de las Sonrisas': 'Behind the Smiles',
  'Dos de Alta Tensión': 'High Tension Duo',
  'Dúo de Raros': 'Rare Duo',
  'Dúo de Raros (SSR ver.)': 'Rare Duo (SSR ver.)',
  "El Momento de 'Engancharse' al Voleibol":
    "The Moment of Getting 'Hooked' on Volleyball",
  'Enganchados al Voleibol': 'Hooked on Volleyball',
  'Expectativa del Senpai': "Senpai's Expectation",
  "Grupo de los 'Rojos' de Karasuno": "Karasuno 'Reds' Group",
  'Guardianes del Equipo': 'Team Guardians',
  "Guía Educativa de 'Protección'": "'Protection' Educational Guide",
  'Hacia Nuevas Alturas': 'Towards New Heights',
  'Honestidad y Calma': 'Honesty and Calm',
  'La Base de Karasuno': "Karasuno's Foundation",
  "La Importancia de una 'Base'": "The Importance of a 'Foundation'",
  'Los Gemelos Más Fuertes de la Preparatoria':
    'The Strongest High School Twins',
  'Los Genios de Karasuno': "Karasuno's Geniuses",
  'Maestro y Discípulo': 'Master and Disciple',
  'Nuevo Capitán y Gran Novato': 'New Captain and Great Rookie',
  "Oponente 'Inconquistable'": "'Unconquerable' Opponent",
  'Pasión Oculta': 'Hidden Passion',
  'Primer Discípulo': 'First Disciple',
  'Primer Dúo': 'First Duo',
  'Rematadores de Date Tech': 'Date Tech Spikers',
  'Rematadores de Jōzenji': 'Jozenji Spikers',
  'Rematadores de Shiratorizawa': 'Shiratorizawa Spikers',
  'Respiración Acompasada': 'Synchronized Breathing',
  'Rivales Predestinados': 'Destined Rivals',
  'Segundo Año de Aoba Johsai': 'Aoba Johsai Second Years',
  'Segundo Año de Inarizaki': 'Inarizaki Second Years',
  'Segundo Año de Karasuno': 'Karasuno Second Years',
  'Segundo Año de Shiratorizawa': 'Shiratorizawa Second Years',
  'Senpais Confiables': 'Reliable Senpais',
  'Sociedad de Lobos': 'Wolf Society',
  'Sol y Luna': 'Sun and Moon',
  'Taciturno y Lengua Afilada': 'Taciturn and Sharp Tongue',
  'Taciturno y Lengua Afilada (SSR ver.)':
    'Taciturn and Sharp Tongue (SSR ver.)',
  'Tercer Año de Date Tech': 'Date Tech Third Years',
  'Tercer Año de Fukurōdani': 'Fukurodani Third Years',
  'Tercer Año de Karasuno': 'Karasuno Third Years',
  'Tercer Año de Karasuno (SP ver.)': 'Karasuno Third Years (SP ver.)',
  'Tercer Año de Shiratorizawa': 'Shiratorizawa Third Years',
  'Tipos Similares': 'Similar Types',
  'Un atacante de primer nivel y un libero de primer nivel':
    'A first-class attacker and a first-class libero',
  '¡Amigo!': 'Friend!',
};

const attributeTranslations = {
  'All-Rounder (efecto al inicio del partido)':
    'All-Rounder (effect at match start)',
  'Ataque Rápido': 'Quick Attack',
  'Ataque Rápido (en buena jugada)': 'Quick Attack (on good play)',
  'Ataque Rápido (potencia)': 'Quick Attack (power)',
  'Ataque Rápido (tempo negativo, no bloqueabLe)':
    'Quick Attack (negative tempo, unblockable)',
  Bloqueo: 'Block',
  'Bloqueo de dos (potencia combinada)': 'Double Block (combined power)',
  'Bloqueo de línea delantera (equipo)': 'Front Line Block (team)',
  'Bloqueo sólido (efecto al inicio del partido)':
    'Solid Block (effect at match start)',
  Colocación: 'Set',
  'Colocación (para ataque rápido tempo negativo)':
    'Set (for negative tempo quick attack)',
  'Colocación (para combo con Bokuto)': 'Set (for combo with Bokuto)',
  'Colocación (para combo con Ushijima)': 'Set (for combo with Ushijima)',
  'Colocación especial para Iwaizumi': 'Special Set for Iwaizumi',
  Conciencia: 'Awareness',
  'Conciencia (al activar habilidad de ataque rápido)':
    'Awareness (when activating quick attack skill)',
  'Conciencia (basada en la Conciencia de Hinata)':
    "Awareness (based on Hinata's Awareness)",
  'Conciencia (por cada acumulación de Defensa sin Fisuras)':
    'Awareness (per Flawless Defense accumulation)',
  'Conciencia de miembros del equipo (durante colocación)':
    'Team Member Awareness (during set)',
  'Conciencia del equipo (por acumulación de Ritmo de Ataque)':
    'Team Awareness (per Attack Rhythm accumulation)',
  "Cooldown de 'Vuela Alto' reducido (cuando ataque rápido es nice play)":
    "'Fly High' Cooldown Reduced (when quick attack is nice play)",
  'Defensa sin Fisuras (acumulaciones iniciales)':
    'Flawless Defense (initial accumulations)',
  'Espíritu Competitivo (acumulación cuando Hinata usa súper)':
    'Competitive Spirit (accumulation when Hinata uses super)',
  'Golpe Poderoso': 'Powerful Hit',
  'Ira al rematador oponente': 'Anger towards opposing spiker',
  Lanzamiento: 'Throw',
  'Modo Depresivo': 'Depressive Mode',
  'Moral del equipo': 'Team Morale',
  'Moral del equipo (al activar bloqueo)':
    'Team Morale (when activating block)',
  'Moral del equipo (al anotar)': 'Team Morale (when scoring)',
  'Moral del equipo (al inicio del rally)': 'Team Morale (at rally start)',
  'Moral del equipo (cuando recepción es PERFECT)':
    'Team Morale (when reception is PERFECT)',
  'Parámetro principal': 'Main Parameter',
  'Parámetros de líder': 'Leader Parameters',
  'Potencia (en combo con Shirabu)': 'Power (in combo with Shirabu)',
  Reacción: 'Reaction',
  'Reacción (al usar habilidad de recepción con Espíritu Competitivo)':
    'Reaction (when using reception skill with Competitive Spirit)',
  'Reacción (en bloqueo de 2/3 durante moral de equipo)':
    'Reaction (in 2/3 block during team morale)',
  Recepción: 'Reception',
  Recibir: 'Receive',
  'Recibir (condicionado a movimiento especial)':
    'Receive (conditional on special movement)',
  Remate: 'Spike',
  'Remate (bonus adicional)': 'Spike (additional bonus)',
  'Remate (con colocación de Akaashi)': "Spike (with Akaashi's set)",
  'Remate (con colocación de Oikawa)': "Spike (with Oikawa's set)",
  'Remate (con colocación de Shirabu)': "Spike (with Shirabu's set)",
  'Remate del equipo': 'Team Spike',
  'Ritmo de Ataque (acumulaciones por combo)':
    'Attack Rhythm (accumulations per combo)',
  Saque: 'Serve',
  'Stamina de habilidades fuertes/ataques (reducción)':
    'Strong Skills/Attacks Stamina (reduction)',
  'Toss para ataque rápido de Kuroo': "Toss for Kuroo's quick attack",
  'Técnica de Ataque': 'Attack Technique',
  'Técnica de Ataque (al atacar)': 'Attack Technique (when attacking)',
  'Técnica de Ataque (hasta que uno deje cancha)':
    'Attack Technique (until one leaves court)',
  'Técnica de Defensa': 'Defense Technique',
};

// Translation for level values
const levelTranslations = {
  Activado: 'Activated',
  Eliminado: 'Eliminated',
  activo: 'active',
  disponible: 'available',
  // Numbers and percentages don't need translation, they remain the same
};

// Load original JSON
const originalData = JSON.parse(
  fs.readFileSync('./haikyu_fly_high_full_v3.json', 'utf8')
);

// Function to translate bond names
function translateBondName(name) {
  return bondNameTranslations[name] || name;
}

// Function to translate attributes
function translateAttribute(attribute) {
  return attributeTranslations[attribute] || attribute;
}

// Function to translate level values
function translateLevel(level) {
  return levelTranslations[level] || level;
}

// Create English version
const englishData = {
  characters: originalData.characters, // Characters remain the same
  bonds: originalData.bonds.map((bond) => ({
    ...bond,
    name: translateBondName(bond.name),
    effects_by_character: bond.effects_by_character
      ? bond.effects_by_character.map((effect) => ({
          ...effect,
          bonuses: effect.bonuses.map((bonus) => ({
            ...bonus,
            attribute: translateAttribute(bonus.attribute),
            levels: bonus.levels
              ? bonus.levels.map((level) => translateLevel(level))
              : bonus.levels,
          })),
        }))
      : undefined,
  })),
};

// Write English JSON
fs.writeFileSync(
  './haikyu_fly_high_full_v3_en.json',
  JSON.stringify(englishData, null, 2)
);

console.log('English JSON file generated successfully!');
console.log(`Translated ${originalData.bonds.length} bonds`);
