import {
    Language,
    TranslationStrings,
    Translations
} from './types/index.js';
import { translations } from './translations.js';

export class LanguageManager {
    private currentLanguage: Language;
    private translations: Translations;

    constructor() {
        // Clear any existing language preference for testing
        // localStorage.removeItem('haikyu-language'); // Uncomment this line to test fresh browser detection
        this.currentLanguage = this.detectBrowserLanguage();
        this.translations = translations;
        this.init();
    }

    private detectBrowserLanguage(): Language {
        // First check if there's a saved preference
        const savedLanguage = localStorage.getItem('haikyu-language') as Language;
        if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'es')) {
            return savedLanguage;
        }

        // Get browser languages in order of preference
        const browserLanguages = navigator.languages || [navigator.language];

        // Check each browser language for supported languages
        for (const lang of browserLanguages) {
            const langCode = lang.toLowerCase().split('-')[0]; // Get just the language part (en from en-US)

            if (langCode === 'es') {
                return 'es';
            } else if (langCode === 'en') {
                return 'en';
            }
        }

        // Default to English if no supported language found (including for Italian, French, etc.)
        return 'en';
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

        // Create bonds button (move from static HTML)
        const bondsBtn = document.getElementById('bondsDrawerBtn');
        let bondsBtnClone: HTMLElement | null = null;
        if (bondsBtn) {
            bondsBtnClone = bondsBtn.cloneNode(true) as HTMLElement;
            bondsBtn.style.display = 'none'; // Hide original
            bondsBtnClone.id = 'bondsDrawerBtnInjected';
            bondsBtnClone.classList.add('injected');
        }

        // Build language selector HTML
        languageContainer.innerHTML = `
                <button
          id="bondsDrawerBtn"
          class="bonds-drawer-btn"
          type="button"
          aria-label="Mostrar vínculos"
        >
          Vínculos
        </button>  
        <label for="languageSelect">${this.translations[this.currentLanguage]?.language || 'Language'}</label>
          <select id="languageSelect">
            <option value="en" ${this.currentLanguage === 'en' ? 'selected' : ''}>English</option>
            <option value="es" ${this.currentLanguage === 'es' ? 'selected' : ''}>Español</option>
          </select>
        `;

        // Insert bonds button as first child if present
        if (bondsBtnClone) {
            bondsBtnClone.style.position = 'absolute';
            bondsBtnClone.style.left = '0';
            bondsBtnClone.style.top = '50%';
            bondsBtnClone.style.transform = 'translateY(-50%)';
            bondsBtnClone.style.margin = '0';
            bondsBtnClone.style.zIndex = '2';
            languageContainer.style.position = 'relative';
            languageContainer.insertBefore(bondsBtnClone, languageContainer.firstChild);
        }

        // Insert after the subtitle
        const subtitle = header.querySelector('.header-subtitle');
        if (subtitle) {
            subtitle.insertAdjacentElement('afterend', languageContainer);
        }

        // Add event listener
        const languageSelect = languageContainer.querySelector('#languageSelect') as HTMLSelectElement;
        if (languageSelect) {
            languageSelect.addEventListener('change', (e) => {
                const target = e.target as HTMLSelectElement;
                this.changeLanguage(target.value as Language);
            });
        }

        // Add event listener for injected bonds button (open drawer)
        if (bondsBtnClone) {
            bondsBtnClone.addEventListener('click', () => {
                const drawer = document.getElementById('bondsDrawer');
                if (drawer) {
                    drawer.setAttribute('aria-hidden', 'false');
                    drawer.classList.add('open');
                }
            });
        }
    }

    public changeLanguage(lang: Language): void {
        this.currentLanguage = lang;
        localStorage.setItem('haikyu-language', lang);
        this.applyLanguage(lang);

        // Reload data with appropriate language JSON
        if (window.teamBuilder) {
            // Reload the JSON data for the new language
            window.teamBuilder?.loadPlayers(lang)
                .then(() => {
                    // Update the UI with new data
                    window.teamBuilder?.updateBonds();
                    window.teamBuilder?.updateSchoolStats();
                    window.teamBuilder?.renderSchoolFilterDropdown();
                })
                .catch((error: Error) => {
                    console.error('Error reloading data:', error);
                });
        }
    }

    private applyLanguage(lang: Language): void {
        const t = this.translations[lang];
        if (!t) {
            console.error(`No translations found for language: ${lang}`);
            return;
        }

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


        // Update section headings (panel principal)
        const schoolHeading = document.querySelector('#school-heading');
        if (schoolHeading) {
            schoolHeading.textContent = t.schoolBonds;
        }
        const bondsHeading = document.querySelectorAll('.school-panel h2')[1];
        if (bondsHeading) {
            bondsHeading.textContent = t.bonds;
        }

        // Update drawer headers
        const drawerSchoolHeading = document.getElementById('drawer-school-heading');
        if (drawerSchoolHeading) {
            drawerSchoolHeading.textContent = t.schoolBonds;
        }
        const drawerBondsHeading = document.getElementById('drawer-bonds-heading');
        if (drawerBondsHeading) {
            drawerBondsHeading.textContent = t.bonds;
        }

        // Update bonds drawer button
        const bondsDrawerBtn = document.getElementById('bondsDrawerBtn');
        if (bondsDrawerBtn) {
            bondsDrawerBtn.textContent = t.bonds;
            bondsDrawerBtn.setAttribute('aria-label', lang === 'en' ? 'Show bonds' : 'Mostrar vínculos');
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

        // Update bond attributes
        this.updateBondAttributes();

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
        const searchInput = document.querySelector('#searchInput') as HTMLInputElement;

        if (sortLabel) sortLabel.textContent = t.sortBy;

        if (sortBySelect) {
            const options = sortBySelect.options;
            if (options[0]) options[0].text = t.sortByName;
            if (options[1]) options[1].text = t.sortByRarity;
        }

        if (searchInput) {
            searchInput.placeholder = t.searchPlayers;
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
        const translations = this.translations[this.currentLanguage];
        if (!translations) {
            console.error(`No translations found for current language: ${this.currentLanguage}`);
            return key as string;
        }

        const value = translations[key];
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
        // Get the current language translations
        const t = this.translations[this.currentLanguage];
        if (!t) {
            console.error(`No translations found for current language: ${this.currentLanguage}`);
            return attribute; // Return original if no translations
        }

        // Clean the attribute string by removing extra context in parentheses
        let cleanAttribute = attribute;

        // Remove parentheses content for cleaner matching
        cleanAttribute = cleanAttribute.replace(/\s*\([^)]*\)/g, '');

        // Try to find exact match first
        if (t.attributes[cleanAttribute]) {
            return t.attributes[cleanAttribute] || attribute;
        }

        // Try to find match with original attribute
        if (t.attributes[attribute]) {
            return t.attributes[attribute] || attribute;
        }

        // Try partial matching for more complex attributes
        for (const [spanishAttr, translatedAttr] of Object.entries(t.attributes)) {
            if (cleanAttribute.includes(spanishAttr) || spanishAttr.includes(cleanAttribute)) {
                return translatedAttr;
            }
        }

        // If no translation found, return original
        return attribute;
    }

    private updateBondAttributes(): void {
        // Update all visible bond attributes with translations
        const attributeElements = document.querySelectorAll('.bonus-attribute');
        attributeElements.forEach((element) => {
            const currentText = element.textContent || '';
            if (currentText) {
                const translatedText = this.translateAttribute(currentText);
                element.textContent = translatedText;
            }
        });
    }
}

// Export for global use
(window as any).LanguageManager = LanguageManager;
