import { 
  Language, 
  TranslationStrings, 
  Translations 
} from './types/index.js';

export class LanguageManager {
  private currentLanguage: Language;
  private translations: Translations;

  constructor() {
    this.currentLanguage = (localStorage.getItem('haikyu-language') as Language) || 'en';
    this.translations = this.getTranslations();
    this.init();
  }

  private getTranslations(): Translations {
    return {
      en: {
        // Header
        title: '🏐 Haikyu Flight High Team Builder',
        subtitle: 'Create Perfect Volleyball Teams with Character Bonds & School Synergies',

        // Main sections
        schoolBonds: 'School Bonds',
        bonds: 'Bonds',
        selectPlayers: 'Select Players',

        // Positions
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

        // Position Selector
        selectPlayerFor: 'Select',
        forThisPosition: 'for this position',

        // Sorting
        sortBy: 'Sort by:',
        sortByName: 'Name',
        sortByRarity: 'Rarity',

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

        // Schools
        schools: {
          'Karasuno': 'Karasuno',
          'Nekoma': 'Nekoma',
          'Aoba Johsai': 'Aoba Johsai',
          'Shiratorizawa': 'Shiratorizawa',
          'Fukurōdani': 'Fukurodani',
          'Date Tech': 'Date Tech',
          'Inarizaki': 'Inarizaki',
          'Itachiyama': 'Itachiyama'
        },

        // Other
        and: 'and',
        members: 'members',
        school: 'school',

        // Language selector
        language: 'Language:',

        // Meta tags
        pageTitle: 'Haikyu Flight High Team Builder | Create Perfect Volleyball Teams | Free Online Tool',
        metaDescription: '🏐 Build your perfect Haikyu Flight High volleyball team! Create teams with Karasuno, Nekoma, Shiratorizawa characters. Interactive team builder with bonds, statistics and school synergies. Free Haikyu team planner tool.',
        metaKeywords: 'haikyu flight high team builder, haikyu fly high team, haikyu volleyball team creator, haikyu team planner, haikyu flight high characters, haikyu team composition, karasuno team builder, nekoma team builder, shiratorizawa team builder, haikyu bonds calculator, volleyball team simulator, haikyu game team, anime volleyball team, haikyu interactive tool, haikyu team optimizer, flight high team maker, haikyu squad builder, volleyball anime team'
      },

      es: {
        // Header
        title: '🏐 Constructor de Equipos Haikyu Flight High',
        subtitle: 'Crea Equipos de Voleibol Perfectos con Vínculos de Personajes y Sinergias Escolares',

        // Main sections
        schoolBonds: 'Vínculos por Escuela',
        bonds: 'Vínculos',
        selectPlayers: 'Seleccionar Jugadores',

        // Positions
        opposite: 'Opposite',
        middleBlocker: 'Middle Blocker',
        wingSpiker: 'Wing Spiker',
        setter: 'Setter',
        libero: 'Libero',

        // Modal
        height: 'Altura:',
        position: 'Posición:',
        power: 'Poder:',
        selectPlayer: 'Seleccionar Jugador',
        playerBonds: 'Vínculos de este Personaje:',

        // Position Selector
        selectPlayerFor: 'Seleccionar',
        forThisPosition: 'para esta posición',

        // Sorting
        sortBy: 'Ordenar por:',
        sortByName: 'Nombre',
        sortByRarity: 'Rareza',

        // Rotation
        rotateTooltip: 'Rotar jugadores en sentido horario',

        // Team/Bonds Status Messages
        noPlayersSelected: 'No hay jugadores seleccionados',
        noBondsAvailable: 'No hay vínculos disponibles',
        noDetailedEffects: 'Vínculo sin efectos detallados:',
        bondType: 'Tipo:',
        linkSkill: 'Link Skill',
        kizunaSkill: 'Kizuna Skill',

        // Bond Effects
        characterEffects: 'Efectos por Personaje:',
        effectsPerCharacter: 'Efectos por Personaje:',

        // Schools
        schools: {
          'Karasuno': 'Karasuno',
          'Nekoma': 'Nekoma',
          'Aoba Johsai': 'Aoba Johsai',
          'Shiratorizawa': 'Shiratorizawa',
          'Fukurōdani': 'Fukurōdani',
          'Date Tech': 'Date Tech',
          'Inarizaki': 'Inarizaki',
          'Itachiyama': 'Itachiyama'
        },

        // Other
        and: 'y',
        members: 'miembros',
        school: 'escuela',

        // Language selector
        language: 'Idioma:',

        // Meta tags
        pageTitle: 'Constructor de Equipos Haikyu Flight High | Crea Equipos de Voleibol Perfectos | Herramienta Gratuita Online',
        metaDescription: '🏐 ¡Construye tu equipo perfecto de Haikyu Flight High! Crea equipos con personajes de Karasuno, Nekoma, Shiratorizawa. Constructor de equipos interactivo con vínculos, estadísticas y sinergias escolares. Herramienta gratuita de planificación de equipos Haikyu.',
        metaKeywords: 'constructor equipos haikyu flight high, equipo haikyu fly high, creador equipos voleibol haikyu, planificador equipos haikyu, personajes haikyu flight high, composición equipos haikyu, constructor equipos karasuno, constructor equipos nekoma, constructor equipos shiratorizawa, calculadora vínculos haikyu, simulador equipos voleibol, equipo juego haikyu, equipo voleibol anime, herramienta interactiva haikyu, optimizador equipos haikyu, creador equipos flight high, constructor escuadras haikyu, equipo anime voleibol'
      }
    };
  }

  private init(): void {
    this.createLanguageSelector();
    this.applyLanguage(this.currentLanguage);
  }

  private createLanguageSelector(): void {
    const header = document.querySelector('.header');
    if (!header) return;

    // Create language selector container
    const languageContainer = document.createElement('div');
    languageContainer.className = 'language-selector';

    languageContainer.innerHTML = `
      <label for="languageSelect">${this.translations[this.currentLanguage].language}</label>
      <select id="languageSelect">
        <option value="en" ${this.currentLanguage === 'en' ? 'selected' : ''}>English</option>
        <option value="es" ${this.currentLanguage === 'es' ? 'selected' : ''}>Español</option>
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
        this.changeLanguage(target.value as Language);
      });
    }
  }

  public changeLanguage(lang: Language): void {
    this.currentLanguage = lang;
    localStorage.setItem('haikyu-language', lang);
    this.applyLanguage(lang);

    // Reload data with appropriate language JSON
    if (window.teamBuilder) {
      console.log('=== LANGUAGE CHANGE: Reloading data ===');
      console.log('New language:', lang);

      // Reload the JSON data for the new language
      window.teamBuilder?.loadPlayers(lang)
        .then(() => {
          // Update the UI with new data
          window.teamBuilder?.updateBonds();
          window.teamBuilder?.updateSchoolStats();
          console.log('=== Data reloaded successfully ===');
        })
        .catch((error: Error) => {
          console.error('Error reloading data:', error);
        });
    }
  }

  private applyLanguage(lang: Language): void {
    const t = this.translations[lang];

    // Update page title
    const titleMeta = document.querySelector('title');
    if (titleMeta && t.pageTitle) {
      titleMeta.textContent = t.pageTitle;
    }

    // Update meta tags
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription && t.metaDescription) {
      metaDescription.setAttribute('content', t.metaDescription);
    }

    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords && t.metaKeywords) {
      metaKeywords.setAttribute('content', t.metaKeywords);
    }

    const htmlElement = document.querySelector('html');
    if (htmlElement) {
      htmlElement.setAttribute('lang', lang);
    }

    // Update main content
    const headerH1 = document.querySelector('.header h1');
    if (headerH1) {
      headerH1.textContent = t.title;
    }

    const headerSubtitle = document.querySelector('.header-subtitle');
    if (headerSubtitle) {
      headerSubtitle.textContent = t.subtitle;
    }

    // Update section headings
    const schoolHeading = document.querySelector('#school-heading');
    if (schoolHeading) {
      schoolHeading.textContent = t.schoolBonds;
    }

    const bondsHeading = document.querySelectorAll('.school-panel h2')[1];
    if (bondsHeading) {
      bondsHeading.textContent = t.bonds;
    }

    const playersHeading = document.querySelector('#players-heading');
    if (playersHeading) {
      playersHeading.textContent = t.selectPlayers;
    }

    // Update modal labels
    this.updateModalLabels(t);

    // Update sorting controls
    this.updateSortingControls(t);

    // Update rotation button tooltip
    const rotationButton = document.querySelector('#rotationButton');
    if (rotationButton) {
      rotationButton.setAttribute('title', t.rotateTooltip);
    }

    // Update position selector close button
    const positionSelectorClose = document.querySelector('#positionSelectorClose');
    if (positionSelectorClose) {
      positionSelectorClose.setAttribute(
        'aria-label',
        lang === 'en' ? 'Close position selector' : 'Cerrar selector de posición'
      );
    }

    // Update language selector label
    const languageSelectorLabel = document.querySelector('.language-selector label');
    if (languageSelectorLabel) {
      languageSelectorLabel.textContent = t.language;
    }

    // Update Open Graph and Twitter meta tags
    this.updateMetaTags(lang, t);
  }

  private updateModalLabels(t: TranslationStrings): void {
    const heightLabel = document.querySelector('#heightLabel');
    if (heightLabel) heightLabel.textContent = t.height;

    const positionLabel = document.querySelector('#positionLabel');
    if (positionLabel) positionLabel.textContent = t.position;

    const powerLabel = document.querySelector('#powerLabel');
    if (powerLabel) powerLabel.textContent = t.power;

    const selectPlayerBtn = document.querySelector('#selectPlayerBtn');
    if (selectPlayerBtn) selectPlayerBtn.textContent = t.selectPlayer;

    const bondsSectionTitle = document.querySelector('.bonds-section-title');
    if (bondsSectionTitle) bondsSectionTitle.textContent = t.playerBonds;
  }

  private updateSortingControls(t: TranslationStrings): void {
    const sortLabel = document.querySelector('#sortLabel');
    const sortBySelect = document.querySelector('#sortBy') as HTMLSelectElement;
    
    if (sortLabel) sortLabel.textContent = t.sortBy;
    
    if (sortBySelect) {
      const options = sortBySelect.options;
      if (options[0]) options[0].text = t.sortByName;
      if (options[1]) options[1].text = t.sortByRarity;
    }
  }

  private updateMetaTags(lang: Language, t: TranslationStrings): void {
    // Update Open Graph
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle && t.pageTitle) {
      ogTitle.setAttribute('content', t.pageTitle);
    }

    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription && t.metaDescription) {
      ogDescription.setAttribute('content', t.metaDescription);
    }

    const ogLocale = document.querySelector('meta[property="og:locale"]');
    if (ogLocale) {
      ogLocale.setAttribute('content', lang === 'es' ? 'es_ES' : 'en_US');
    }

    // Update Twitter
    const twitterTitle = document.querySelector('meta[property="twitter:title"]');
    if (twitterTitle && t.pageTitle) {
      twitterTitle.setAttribute('content', t.pageTitle);
    }

    const twitterDescription = document.querySelector('meta[property="twitter:description"]');
    if (twitterDescription && t.metaDescription) {
      twitterDescription.setAttribute('content', t.metaDescription);
    }

    // Update hreflang
    const currentUrl = window.location.origin + window.location.pathname;
    const hreflangEn = document.querySelector('link[rel="alternate"][hreflang="en"]');
    if (hreflangEn) {
      hreflangEn.setAttribute('href', currentUrl);
    }

    const hreflangEs = document.querySelector('link[rel="alternate"][hreflang="es"]');
    if (hreflangEs) {
      hreflangEs.setAttribute('href', currentUrl + (lang === 'es' ? 'es/' : ''));
    }
  }

  public t(key: keyof TranslationStrings): string | { [schoolName: string]: string } {
    const value = this.translations[this.currentLanguage][key];
    if (typeof value === 'object') {
      return value;
    }
    return value || key as string;
  }

  public getCurrentLanguage(): Language {
    return this.currentLanguage;
  }

  public translateBondName(bondName: string): string {
    // Since we now load the appropriate JSON based on language,
    // bond names should already be in the correct language
    return bondName;
  }

  public translateAttribute(attribute: string): string {
    // Since we now load the appropriate JSON based on language,
    // attributes should already be in the correct language
    return attribute;
  }
}

// Export for global use
(window as any).LanguageManager = LanguageManager;
