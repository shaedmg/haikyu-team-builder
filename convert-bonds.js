const fs = require('fs');

// Read the current bonds.json
const bondsData = JSON.parse(fs.readFileSync('./bonds.json', 'utf8'));

// Translation mappings for bond names
const bondNameTranslations = {
  'Dúo de Raros': {
    es: 'Dúo de Raros',
    en: 'Weird Duo',
  },
  'Contemplando los Cerezos en Flor': {
    es: 'Contemplando los Cerezos en Flor',
    en: 'Cherry Blossom Viewing',
  },
  'Adivinanza vs. Sistema': {
    es: 'Adivinanza vs. Sistema',
    en: 'Guess vs. System',
  },
  'Tercer Año de Karasuno': {
    es: 'Tercer Año de Karasuno',
    en: 'Karasuno Third Years',
  },
  'La Base de Karasuno': {
    es: 'La Base de Karasuno',
    en: "Karasuno's Foundation",
  },
  'Detrás de las Sonrisas': {
    es: 'Detrás de las Sonrisas',
    en: 'Behind the Smiles',
  },
  "'Guardián' y 'As'": {
    es: "'Guardián' y 'As'",
    en: "'Guardian' and 'Ace'",
  },
  'Cañón y Muro de Hierro': {
    es: 'Cañón y Muro de Hierro',
    en: 'Cannon and Iron Wall',
  },
  'Club de Fans de Kiyoko-san': {
    es: 'Club de Fans de Kiyoko-san',
    en: 'Kiyoko-san Fan Club',
  },
  'Segundo Año de Karasuno': {
    es: 'Segundo Año de Karasuno',
    en: 'Karasuno Second Years',
  },
  '¡Amigo!': {
    es: '¡Amigo!',
    en: 'Friend!',
  },
  "'Escudo' y 'Lanza'": {
    es: "'Escudo' y 'Lanza'",
    en: "'Shield' and 'Spear'",
  },
  'Maestro y Discípulo': {
    es: 'Maestro y Discípulo',
    en: 'Teacher and Student',
  },
  'Los Genios de Karasuno': {
    es: 'Los Genios de Karasuno',
    en: "Karasuno's Geniuses",
  },
  'Colocadores de Karasuno': {
    es: 'Colocadores de Karasuno',
    en: 'Karasuno Setters',
  },
  'Tercer Año de Karasuno (SP ver.)': {
    es: 'Tercer Año de Karasuno (SP ver.)',
    en: 'Karasuno Third Years (SP ver.)',
  },
  'Sol y Luna': {
    es: 'Sol y Luna',
    en: 'Sun and Moon',
  },
  "El Momento de 'Engancharse' al Voleibol": {
    es: "El Momento de 'Engancharse' al Voleibol",
    en: "The Moment of 'Getting Hooked' on Volleyball",
  },
  "'Coraje' y 'Espíritu Competitivo'": {
    es: "'Coraje' y 'Espíritu Competitivo'",
    en: "'Courage' and 'Competitive Spirit'",
  },
  "'Cerebro' y 'Torre de Control'": {
    es: "'Cerebro' y 'Torre de Control'",
    en: "'Brain' and 'Control Tower'",
  },
  'Senpais Confiables': {
    es: 'Senpais Confiables',
    en: 'Reliable Senpais',
  },
  "'Núcleo' y 'Torre de Control'": {
    es: "'Núcleo' y 'Torre de Control'",
    en: "'Core' and 'Control Tower'",
  },
  'Tipos Similares': {
    es: 'Tipos Similares',
    en: 'Similar Types',
  },
  "Guía Educativa de 'Protección'": {
    es: "Guía Educativa de 'Protección'",
    en: "'Protection' Educational Guide",
  },
  'Guardianes del Equipo': {
    es: 'Guardianes del Equipo',
    en: 'Team Guardians',
  },
  "Oponente 'Inconquistable'": {
    es: "Oponente 'Inconquistable'",
    en: "'Unconquerable' Opponent",
  },
  'Respiración Acompasada': {
    es: 'Respiración Acompasada',
    en: 'Synchronized Breathing',
  },
  'Rivales Predestinados': {
    es: 'Rivales Predestinados',
    en: 'Destined Rivals',
  },
  "'Rey' y 'Gran Rey'": {
    es: "'Rey' y 'Gran Rey'",
    en: "'King' and 'Great King'",
  },
  'Hacia Nuevas Alturas': {
    es: 'Hacia Nuevas Alturas',
    en: 'Towards New Heights',
  },
  'Confianza Despiadada': {
    es: 'Confianza Despiadada',
    en: 'Ruthless Trust',
  },
  'Compañero de Confianza': {
    es: 'Compañero de Confianza',
    en: 'Trusted Partner',
  },
  'Sociedad de Lobos': {
    es: 'Sociedad de Lobos',
    en: 'Wolf Pack',
  },
  'Honestidad y Calma': {
    es: 'Honestidad y Calma',
    en: 'Honesty and Calm',
  },
  'Pasión Oculta': {
    es: 'Pasión Oculta',
    en: 'Hidden Passion',
  },
  'Segundo Año de Aoba Johsai': {
    es: 'Segundo Año de Aoba Johsai',
    en: 'Aoba Johsai Second Years',
  },
  'Baño en el Mar': {
    es: 'Baño en el Mar',
    en: 'Sea Bathing',
  },
  'Taciturno y Lengua Afilada': {
    es: 'Taciturno y Lengua Afilada',
    en: 'Taciturn and Sharp Tongue',
  },
  'Taciturno y Lengua Afilada (SSR ver.)': {
    es: 'Taciturno y Lengua Afilada (SSR ver.)',
    en: 'Taciturn and Sharp Tongue (SSR ver.)',
  },
  'Amistad Peculiar (SSR ver.)': {
    es: 'Amistad Peculiar (SSR ver.)',
    en: 'Peculiar Friendship (SSR ver.)',
  },
  'Nuevo Capitán y Gran Novato': {
    es: 'Nuevo Capitán y Gran Novato',
    en: 'New Captain and Great Rookie',
  },
  'Antiguo y Nuevo Capitán de Date Tech': {
    es: 'Antiguo y Nuevo Capitán de Date Tech',
    en: 'Former and New Captain of Date Tech',
  },
  'Colocadores de Date Tech': {
    es: 'Colocadores de Date Tech',
    en: 'Date Tech Setters',
  },
  'Tercer Año de Date Tech': {
    es: 'Tercer Año de Date Tech',
    en: 'Date Tech Third Years',
  },
  'Rematadores de Date Tech': {
    es: 'Rematadores de Date Tech',
    en: 'Date Tech Spikers',
  },
  'Amigos para Siempre': {
    es: 'Amigos para Siempre',
    en: 'Friends Forever',
  },
  "'Campeón Absoluto' y Colocador Sólido": {
    es: "'Campeón Absoluto' y Colocador Sólido",
    en: "'Absolute Champion' and Solid Setter",
  },
  'Tercer Año de Shiratorizawa': {
    es: 'Tercer Año de Shiratorizawa',
    en: 'Shiratorizawa Third Years',
  },
  'Del Gran As al As': {
    es: 'Del Gran As al As',
    en: 'From Great Ace to Ace',
  },
  "'Ushiwaka' y 'Benkei'": {
    es: "'Ushiwaka' y 'Benkei'",
    en: "'Ushiwaka' and 'Benkei'",
  },
  'Bloqueadores Centrales de Shiratorizawa': {
    es: 'Bloqueadores Centrales de Shiratorizawa',
    en: 'Shiratorizawa Middle Blockers',
  },
  'Expectativa del Senpai': {
    es: 'Expectativa del Senpai',
    en: "Senpai's Expectations",
  },
  'Rematadores de Shiratorizawa': {
    es: 'Rematadores de Shiratorizawa',
    en: 'Shiratorizawa Spikers',
  },
  'Segundo Año de Shiratorizawa': {
    es: 'Segundo Año de Shiratorizawa',
    en: 'Shiratorizawa Second Years',
  },
  'Colocadores de Diferentes Tipos': {
    es: 'Colocadores de Diferentes Tipos',
    en: 'Different Type Setters',
  },
  'As Milagroso y Colocador Atento': {
    es: 'As Milagroso y Colocador Atento',
    en: 'Miraculous Ace and Attentive Setter',
  },
  'Compañeros de Práctica de Tokio': {
    es: 'Compañeros de Práctica de Tokio',
    en: 'Tokyo Practice Partners',
  },
  'Primer Discípulo': {
    es: 'Primer Discípulo',
    en: 'First Disciple',
  },
  'Enganchados al Voleibol': {
    es: 'Enganchados al Voleibol',
    en: 'Hooked on Volleyball',
  },
  'Compañeros de Práctica de Tokio (Habilidad)': {
    es: 'Compañeros de Práctica de Tokio (Habilidad)',
    en: 'Tokyo Practice Partners (Skill)',
  },
  'Tercer Año de Fukurōdani': {
    es: 'Tercer Año de Fukurōdani',
    en: 'Fukurōdani Third Years',
  },
  'Bloqueadores Centrales de Fukurōdani': {
    es: 'Bloqueadores Centrales de Fukurōdani',
    en: 'Fukurōdani Middle Blockers',
  },
  "La Importancia de una 'Base'": {
    es: "La Importancia de una 'Base'",
    en: "The Importance of a 'Foundation'",
  },
  'Dos de Alta Tensión': {
    es: 'Dos de Alta Tensión',
    en: 'Two High-Tension',
  },
  'Rematadores de Jōzenji': {
    es: 'Rematadores de Jōzenji',
    en: 'Jōzenji Spikers',
  },
  'Los Gemelos Más Fuertes de la Preparatoria': {
    es: 'Los Gemelos Más Fuertes de la Preparatoria',
    en: 'The Strongest Twins in High School',
  },
  'Cerebro y Eje': {
    es: 'Cerebro y Eje',
    en: 'Brain and Axis',
  },
};

// Attribute translations (from our previous translations.ts)
const attributeTranslations = {
  Ataque: 'Attack',
  'Ataque Rápido': 'Quick Attack',
  'Ataque Rápido (en buena jugada)': 'Quick Attack (on good play)',
  Bloqueo: 'Block',
  'Bloqueo de dos': 'Double Block',
  'Bloqueo de dos (potencia combinada)': 'Double Block (combined power)',
  'Bloqueo de línea delantera': 'Front Line Block',
  'Bloqueo de línea delantera (equipo)': 'Front Line Block (team)',
  Colocación: 'Set',
  'Colocación (para combo con Ushijima)': 'Set (for combo with Ushijima)',
  'Colocación (para combo con Bokuto)': 'Set (for combo with Bokuto)',
  Conciencia: 'Awareness',
  'Conciencia (por cada acumulación de Defensa sin Fisuras)':
    'Awareness (per Flawless Defense stack)',
  Defensa: 'Defense',
  'Defensa sin Fisuras': 'Flawless Defense',
  'Defensa sin Fisuras (acumulaciones iniciales)':
    'Flawless Defense (initial stacks)',
  'Espíritu Competitivo (acumulación cuando Hinata usa súper)':
    'Competitive Spirit (stack when Hinata uses super)',
  'Ira al rematador oponente': 'Anger towards opposing spiker',
  'Modo Depresivo': 'Depressive Mode',
  'Moral del equipo': 'Team Morale',
  'Moral del equipo (al activar bloqueo)':
    'Team Morale (when activating block)',
  Potencia: 'Power',
  'Potencia (en combo con Shirabu)': 'Power (in combo with Shirabu)',
  'Potencia (bonus adicional)': 'Power (additional bonus)',
  Reacción: 'Reaction',
  'Reacción (al usar habilidad de recepción con Espíritu Competitivo)':
    'Reaction (when using reception skill with Competitive Spirit)',
  'Reacción (en bloqueo de 2/3 durante moral de equipo)':
    'Reaction (in 2/3 block during team morale)',
  Recepción: 'Reception',
  Remate: 'Spike',
  'Remate (con colocación de Shirabu)': "Spike (with Shirabu's set)",
  'Remate (con colocación de Akaashi)': "Spike (with Akaashi's set)",
  'Remate (bonus adicional)': 'Spike (additional bonus)',
  'Remate del equipo': 'Team Spike',
  Saque: 'Serve',
  'Técnica de Ataque': 'Attack Technique',
  'Técnica de Defensa': 'Defense Technique',
};

function convertBond(bond) {
  const convertedBond = { ...bond };

  // Convert name
  if (bond.name) {
    const translation = bondNameTranslations[bond.name];
    if (translation) {
      convertedBond.name = translation;
    } else {
      // If no translation found, use Spanish as both
      convertedBond.name = {
        es: bond.name,
        en: bond.name, // Default to Spanish if no English translation
      };
    }
  }

  // Convert effect_summary if present
  if (bond.effect_summary) {
    convertedBond.effect_summary = {
      es: bond.effect_summary,
      en: bond.effect_summary, // Would need English translations
    };
  }

  // Convert effects_by_character
  if (bond.effects_by_character) {
    convertedBond.effects_by_character = bond.effects_by_character.map(
      (effect) => {
        const convertedEffect = { ...effect };

        if (effect.bonuses) {
          convertedEffect.bonuses = effect.bonuses.map((bonus) => {
            const convertedBonus = { ...bonus };

            // Convert attribute
            if (bonus.attribute) {
              const englishAttribute = attributeTranslations[bonus.attribute];
              convertedBonus.attribute = {
                es: bonus.attribute,
                en: englishAttribute || bonus.attribute,
              };
            }

            // Convert levels (for now, keep the same for both languages)
            if (bonus.levels) {
              convertedBonus.levels = {
                es: bonus.levels,
                en: bonus.levels, // Same values for both languages
              };
            }

            return convertedBonus;
          });
        }

        return convertedEffect;
      }
    );
  }

  return convertedBond;
}

// Convert all bonds
const convertedData = {
  bonds: bondsData.bonds.map(convertBond),
};

// Write the converted data
fs.writeFileSync(
  './bonds-converted.json',
  JSON.stringify(convertedData, null, 2)
);

console.log('Conversion complete! Check bonds-converted.json');
