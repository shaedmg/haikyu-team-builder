// Translations for Haikyu Team Builder - TypeScript Version
export interface Translation {
  // Header
  title: string;
  subtitle: string;

  // Main sections
  schoolBonds: string;
  bonds: string;
  selectPlayers: string;

  // Positions
  opposite: string;
  middleBlocker: string;
  wingSpiker: string;
  setter: string;
  libero: string;

  // Modal
  height: string;
  position: string;
  power: string;
  selectPlayer: string;
  playerBonds: string;
  noAvailablePositions: string;

  // Rotation
  rotateTooltip: string;

  // Team/Bonds Status Messages
  noPlayersSelected: string;
  noBondsAvailable: string;
  noDetailedEffects: string;
  bondType: string;
  linkSkill: string;
  kizunaSkill: string;

  // Bond Effects
  characterEffects: string;
  effectsPerCharacter: string;
  attributeBondAdvantage: string;
  unlocksBonus: string;
  level: string;
  kizunaSkillType: string;
  specialEffect: string;
  effectNotSpecified: string;
  noLevelsAvailable: string;

  // Bonus value translations
  points: string;
  additional: string;

  // Attributes
  attack: string;
  defense: string;
  speed: string;
  stamina: string;
  technique: string;
  mental: string;
  serve: string;
  receive: string;
  block: string;
  spike: string;

  // Language selector
  language: string;
  english: string;
  spanish: string;

  // Meta tags
  metaDescription: string;
  metaKeywords: string;
  pageTitle: string;

  // Additional attributes for Spanish/English compatibility
  [key: string]: string;
}

export interface TranslationDict {
  en: Translation;
  es: Translation;
}

export const translations: TranslationDict = {
  en: {
    // Header
    title: '🏐 Haikyu Flight High Team Builder',
    subtitle: 'Create Perfect Volleyball Teams with Character Bonds & School Synergies',

    // Main sections
    schoolBonds: 'School Bonds',
    bonds: 'Bonds',
    selectPlayers: 'Select Players',

    // Positions (keep original)
    opposite: 'Opposite',
    middleBlocker: 'Middle Blocker',
    wingSpiker: 'Wing Spiker',
    setter: 'Setter',
    libero: 'Libero',

    // Modal
    height: 'Height:',
    position: 'Position:',
    power: 'Power:',
    selectPlayer: 'Select Player',
    playerBonds: 'Character Bonds:',
    noAvailablePositions: 'No available positions for',

    // Rotation
    rotateTooltip: 'Rotate players clockwise',

    // Team/Bonds Status Messages
    noPlayersSelected: 'No players selected',
    noBondsAvailable: 'No bonds available',
    noDetailedEffects: 'Bond without detailed effects:',
    bondType: 'Type:',
    linkSkill: 'Link Skill',
    kizunaSkill: 'Kizuna Skill',

    // Bond Effects
    characterEffects: 'Character Effects:',
    effectsPerCharacter: 'Effects per Character:',
    attributeBondAdvantage: 'Attribute Bond Advantage',
    unlocksBonus: 'Unlocks bonus:',
    level: 'Lv.',
    kizunaSkillType: '🔗 Kizuna Skill',
    specialEffect: 'Special effect',
    effectNotSpecified: 'Effect not specified',
    noLevelsAvailable: 'No levels available',

    // Bonus value translations
    points: 'points',
    additional: 'additional',

    // Attributes (common bonus types)
    attack: 'Attack',
    defense: 'Defense',
    speed: 'Speed',
    stamina: 'Stamina',
    technique: 'Technique',
    mental: 'Mental',
    serve: 'Serve',
    receive: 'Receive',
    block: 'Block',
    spike: 'Spike',
    bloqueo: 'Block',
    ataque: 'Attack',
    defensa: 'Defense',
    velocidad: 'Speed',
    resistencia: 'Stamina',
    tecnica: 'Technique',
    saque: 'Serve',
    recepcion: 'Receive',
    remate: 'Spike',
    colocacion: 'Setting',

    // Specific attribute translations
    setting: 'Setting',
    'front line block (team)': 'Front Line Block (Team)',
    'quick attack': 'Quick Attack',
    'competitive spirit': 'Competitive Spirit',
    reaction: 'Reaction',
    'seamless defense': 'Seamless Defense',
    awareness: 'Awareness',

    // Specific bond name translations from JSON
    'rare duo': 'Rare Duo',
    'cherry blossom viewing': 'Cherry Blossom Viewing',
    'tokyo practice partners': 'Tokyo Practice Partners',
    'shiratorizawa central blockers': 'Shiratorizawa Central Blockers',
    'fukurodani central blockers': 'Fukurodani Central Blockers',
    'first disciple': 'First Disciple',
    "senpai's expectation": "Senpai's Expectation",

    // Meta tags
    metaDescription: '🏐 Build your perfect Haikyu Flight High volleyball team! Create teams with Karasuno, Nekoma, Shiratorizawa characters. Interactive team builder with bonds, statistics and school synergies. Free Haikyu team planner tool.',
    metaKeywords: 'haikyu flight high team builder, haikyu fly high team, haikyu volleyball team creator, haikyu team planner, haikyu flight high characters, haikyu team composition, karasuno team builder, nekoma team builder, shiratorizawa team builder, haikyu bonds calculator, volleyball team simulator, haikyu game team, anime volleyball team, haikyu interactive tool, haikyu team optimizer, flight high team maker, haikyu squad builder, volleyball anime team',
    pageTitle: 'Haikyu Flight High Team Builder | Create Perfect Volleyball Teams | Free Online Tool',

    // Language selector
    language: 'Language:',
    english: 'English',
    spanish: 'Español',
  },
  es: {
    // Header
    title: '🏐 Constructor de Equipos Haikyu Flight High',
    subtitle: 'Crea Equipos de Voleibol Perfectos con Vínculos de Personajes y Sinergias Escolares',

    // Main sections
    schoolBonds: 'Vínculos Escolares',
    bonds: 'Vínculos',
    selectPlayers: 'Seleccionar Jugadores',

    // Positions (keep original)
    opposite: 'Opuesto',
    middleBlocker: 'Bloqueador Central',
    wingSpiker: 'Rematador',
    setter: 'Colocador',
    libero: 'Líbero',

    // Modal
    height: 'Altura:',
    position: 'Posición:',
    power: 'Poder:',
    selectPlayer: 'Seleccionar Jugador',
    playerBonds: 'Vínculos del Personaje:',
    noAvailablePositions: 'No hay posiciones disponibles para',

    // Rotation
    rotateTooltip: 'Rotar jugadores en sentido horario',

    // Team/Bonds Status Messages
    noPlayersSelected: 'No hay jugadores seleccionados',
    noBondsAvailable: 'No hay vínculos disponibles',
    noDetailedEffects: 'Vínculo sin efectos detallados:',
    bondType: 'Tipo:',
    linkSkill: 'Habilidad de Enlace',
    kizunaSkill: 'Habilidad Kizuna',

    // Bond Effects
    characterEffects: 'Efectos de Personaje:',
    effectsPerCharacter: 'Efectos por Personaje:',
    attributeBondAdvantage: 'Ventaja de atributos de vínculo',
    unlocksBonus: 'Desbloquea la bonificación:',
    level: 'Nv.',
    kizunaSkillType: '🔗 Habilidad Kizuna',
    specialEffect: 'Efecto especial',
    effectNotSpecified: 'Efecto no especificado',
    noLevelsAvailable: 'No hay niveles disponibles',

    // Bonus value translations
    points: 'puntos',
    additional: 'adicional',

    // Attributes (common bonus types)
    attack: 'Ataque',
    defense: 'Defensa',
    speed: 'Velocidad',
    stamina: 'Resistencia',
    technique: 'Técnica',
    mental: 'Mental',
    serve: 'Saque',
    receive: 'Recepción',
    block: 'Bloqueo',
    spike: 'Remate',
    bloqueo: 'Bloqueo',
    ataque: 'Ataque',
    defensa: 'Defensa',
    velocidad: 'Velocidad',
    resistencia: 'Resistencia',
    tecnica: 'Técnica',
    saque: 'Saque',
    recepcion: 'Recepción',
    remate: 'Remate',
    colocacion: 'Colocación',

    // Specific attribute translations
    setting: 'Colocación',
    'front line block (team)': 'Bloqueo de línea delantera (equipo)',
    'quick attack': 'Ataque rápido',
    'competitive spirit': 'Espíritu competitivo',
    reaction: 'Reacción',
    'seamless defense': 'Defensa sin fisuras',
    awareness: 'Conciencia',

    // Specific bond name translations from JSON
    'rare duo': 'Dúo de Raros',
    'cherry blossom viewing': 'Contemplando los Cerezos en Flor',
    'tokyo practice partners': 'Compañeros de Práctica de Tokio',
    'shiratorizawa central blockers': 'Bloqueadores Centrales de Shiratorizawa',
    'fukurodani central blockers': 'Bloqueadores Centrales de Fukurōdani',
    'first disciple': 'Primer Discípulo',
    "senpai's expectation": 'Expectativa del Senpai',

    // Meta tags
    metaDescription: '🏐 ¡Construye tu equipo perfecto de Haikyu Flight High! Crea equipos con personajes de Karasuno, Nekoma, Shiratorizawa. Constructor de equipos interactivo con vínculos, estadísticas y sinergias escolares. Herramienta gratuita de planificación de equipos Haikyu.',
    metaKeywords: 'constructor equipos haikyu flight high, equipo haikyu fly high, creador equipos voleibol haikyu, planificador equipos haikyu, personajes haikyu flight high, composición equipos haikyu, constructor equipos karasuno, constructor equipos nekoma, constructor equipos shiratorizawa, calculadora vínculos haikyu, simulador equipos voleibol, equipo juego haikyu, equipo voleibol anime, herramienta interactiva haikyu, optimizador equipos haikyu, creador equipos flight high, constructor escuadras haikyu, equipo anime voleibol',
    pageTitle: 'Constructor de Equipos Haikyu Flight High | Crea Equipos de Voleibol Perfectos | Herramienta Gratuita Online',

    // Language selector
    language: 'Idioma:',
    english: 'English',
    spanish: 'Español',
  },
};

export type SupportedLanguage = 'en' | 'es';

export class LanguageManager {
  private currentLanguage: SupportedLanguage;

  constructor() {
    this.currentLanguage = (localStorage.getItem('haikyu-language') as SupportedLanguage) || 'en';
    this.init();
  }

  init(): void {
    this.createLanguageSelector();
    this.applyLanguage(this.currentLanguage);
  }

  createLanguageSelector(): void {
    const header = document.querySelector('.header');
    if (!header) return;

    // Create language selector container
    const languageContainer = document.createElement('div');
    languageContainer.className = 'language-selector';

    languageContainer.innerHTML = `
      <label for="languageSelect">${translations[this.currentLanguage].language}</label>
      <select id="languageSelect">
        <option value="en" ${this.currentLanguage === 'en' ? 'selected' : ''}>${translations.en.english}</option>
        <option value="es" ${this.currentLanguage === 'es' ? 'selected' : ''}>${translations.es.spanish}</option>
      </select>
    `;

    // Insert after the subtitle
    const subtitle = header.querySelector('.header-subtitle');
    if (subtitle) {
      subtitle.insertAdjacentElement('afterend', languageContainer);
    }

    // Add event listener
    const languageSelect = document.getElementById('languageSelect') as HTMLSelectElement;
    if (languageSelect) {
      languageSelect.addEventListener('change', (e) => {
        const target = e.target as HTMLSelectElement;
        this.changeLanguage(target.value as SupportedLanguage);
      });
    }
  }

  changeLanguage(lang: SupportedLanguage): void {
    this.currentLanguage = lang;
    localStorage.setItem('haikyu-language', lang);
    this.applyLanguage(lang);

    // Reload data with appropriate language JSON
    if ((window as any).teamBuilder) {
      console.log('=== LANGUAGE CHANGE: Reloading data ===');
      console.log('New language:', lang);

      // Reload the JSON data for the new language
      (window as any).teamBuilder
        .loadPlayers(lang)
        .then(() => {
          // Update the UI with new data
          (window as any).teamBuilder.updateBonds();
          (window as any).teamBuilder.updateSchoolStats();
          console.log('=== Data reloaded successfully ===');
        })
        .catch((error: Error) => {
          console.error('Error reloading data:', error);
        });
    }
  }

  applyLanguage(lang: SupportedLanguage): void {
    const t = translations[lang];

    // Update page title
    document.title = t.pageTitle;

    // Update meta tags
    const descriptionMeta = document.querySelector('meta[name="description"]');
    if (descriptionMeta) {
      descriptionMeta.setAttribute('content', t.metaDescription);
    }

    const keywordsMeta = document.querySelector('meta[name="keywords"]');
    if (keywordsMeta) {
      keywordsMeta.setAttribute('content', t.metaKeywords);
    }

    const htmlElement = document.querySelector('html');
    if (htmlElement) {
      htmlElement.setAttribute('lang', lang);
    }

    // Update main content
    const mainTitle = document.querySelector('.header h1');
    if (mainTitle) {
      mainTitle.textContent = t.title;
    }

    const subtitle = document.querySelector('.header-subtitle');
    if (subtitle) {
      subtitle.textContent = t.subtitle;
    }

    // Update section headers with their IDs
    const schoolHeading = document.getElementById('school-heading');
    if (schoolHeading) {
      schoolHeading.textContent = t.schoolBonds;
    }

    const playersHeading = document.getElementById('players-heading');
    if (playersHeading) {
      playersHeading.textContent = t.selectPlayers;
    }

    // Update bonds section
    const bondsHeaders = document.querySelectorAll('h2');
    bondsHeaders.forEach((header) => {
      if (header.textContent === 'Vínculos' || header.textContent === 'Bonds') {
        header.textContent = t.bonds;
      }
    });

    // Update modal content
    const selectPlayerButtons = document.querySelectorAll('.player-modal .select-btn');
    selectPlayerButtons.forEach((button) => {
      if (button.textContent === 'Seleccionar Jugador' || button.textContent === 'Select Player') {
        button.textContent = t.selectPlayer;
      }
    });

    // Update bonds section title in modal
    const bondsSectionTitles = document.querySelectorAll('.bonds-section-title');
    bondsSectionTitles.forEach((title) => {
      if (title.textContent === 'Vínculos de este Personaje:' || title.textContent === 'Character Bonds:') {
        title.textContent = t.playerBonds;
      }
    });

    // Update language selector label
    const languageLabel = document.querySelector('.language-selector label');
    if (languageLabel) {
      languageLabel.textContent = t.language;
    }

    // Update data-i18n elements
    const schoolBondsHeader = document.querySelector('[data-i18n="schoolBonds"]');
    if (schoolBondsHeader) {
      schoolBondsHeader.textContent = t.schoolBonds;
    }

    const bondsHeader = document.querySelector('[data-i18n="bonds"]');
    if (bondsHeader) {
      bondsHeader.textContent = t.bonds;
    }

    const selectPlayersHeader = document.querySelector('[data-i18n="selectPlayers"]');
    if (selectPlayersHeader) {
      selectPlayersHeader.textContent = t.selectPlayers;
    }

    // Update alternate language links
    const currentUrl = window.location.origin + window.location.pathname;
    const enAltLink = document.querySelector('link[rel="alternate"][hreflang="en"]');
    const esAltLink = document.querySelector('link[rel="alternate"][hreflang="es"]');
    
    if (enAltLink) {
      enAltLink.setAttribute('href', currentUrl);
    }
    if (esAltLink) {
      esAltLink.setAttribute('href', currentUrl + (lang === 'es' ? 'es/' : ''));
    }
  }

  t(key: string): string {
    return translations[this.currentLanguage][key] || key;
  }

  // Method to get current language
  getCurrentLanguage(): SupportedLanguage {
    return this.currentLanguage;
  }

  // Method to translate bond names (simplified - now comes from JSON)
  translateBondName(bondName: string): string {
    // Since we now load the appropriate JSON based on language,
    // bond names should already be in the correct language
    return bondName;
  }

  // Method to translate attributes (simplified - now comes from JSON)
  translateAttribute(attribute: string): string {
    // Since we now load the appropriate JSON based on language,
    // attributes should already be in the correct language
    return attribute;
  }
}

// LanguageManager is already exported above
