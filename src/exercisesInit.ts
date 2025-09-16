// Initialize the Exercises page
// This file serves as a bridge between modular TypeScript and the exercises page

import { exerciseAnswers } from './exerciseAnswers.js';

// Translation strings for the exercises page
const translations = {
    en: {
        language: 'Language',
        nav: {
            team_builder: 'Team Builder',
            exercises: 'Exercises Answers'
        },
        exercises: {
            title: 'Exercises Answers',
            subtitle: 'Browse through the exercise mode questions and their possible rewards',
            option: 'Option',
            search_placeholder: 'Search exercises...',
            search_results: 'Showing {count} of {total} exercises',
            search_no_results: 'No exercises found',
            search_no_results_subtitle: 'Try a different search term',
            search_clear: 'Clear search'
        }
    },
    es: {
        language: 'Idioma',
        nav: {
            team_builder: 'Constructor de Equipo',
            exercises: 'Respuestas Ejercicios'
        },
        exercises: {
            title: 'Respuestas Ejercicios',
            subtitle: 'Explora las preguntas del modo ejercicios y sus posibles recompensas',
            option: 'Opción',
            search_placeholder: 'Buscar ejercicios...',
            search_results: 'Mostrando {count} de {total} ejercicios',
            search_no_results: 'No se encontraron ejercicios',
            search_no_results_subtitle: 'Prueba con otro término de búsqueda',
            search_clear: 'Limpiar búsqueda'
        }
    }
};

class ExercisesPage {
    private currentLanguage: string;
    private filteredExercises: typeof exerciseAnswers = [];
    private searchTerm: string = '';

    constructor() {
        this.currentLanguage = this.detectLanguage();
        this.filteredExercises = [...exerciseAnswers];
        this.init();
    }

    private detectLanguage(): string {
        const saved = localStorage.getItem('haikyu-language');
        if (saved && (saved === 'en' || saved === 'es')) {
            return saved;
        }
        const browserLang = navigator.language.toLowerCase().split('-')[0];
        return browserLang === 'es' ? 'es' : 'en';
    }

    private init(): void {
        this.setupLanguageSelector();
        this.setupSearchFunctionality();
        this.renderExercises();
        this.updateLanguage();
        this.updateSearchResults();
    }

    private setupLanguageSelector(): void {
        const select = document.getElementById('languageSelectNav') as HTMLSelectElement;
        if (select) {
            select.value = this.currentLanguage;

            select.addEventListener('change', (e) => {
                const target = e.target as HTMLSelectElement;
                this.currentLanguage = target.value;
                localStorage.setItem('haikyu-language', this.currentLanguage);
                this.updateLanguage();
                this.renderExercises(); // Re-render with new language
                this.updateSearchResults(); // Update search results with new language
            });
        }
    }

    private updateLanguage(): void {
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (key) {
                const translation = this.getTranslation(key);
                if (translation) {
                    element.textContent = translation;
                }
            }
        });

        // Update placeholders
        const placeholderElements = document.querySelectorAll('[data-i18n-placeholder]');
        placeholderElements.forEach(element => {
            const key = element.getAttribute('data-i18n-placeholder');
            if (key) {
                const translation = this.getTranslation(key);
                if (translation && element instanceof HTMLInputElement) {
                    element.placeholder = translation;
                }
            }
        });
    }

    private normalizeText(text: string): string {
        return text
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '') // Remove diacritics/accents
            .replace(/[^\w\s]/g, ' ') // Replace punctuation with spaces
            .replace(/\s+/g, ' ') // Replace multiple spaces with single space
            .trim();
    }

    private setupSearchFunctionality(): void {
        const searchInput = document.getElementById('exerciseSearchInput') as HTMLInputElement;
        const searchClear = document.getElementById('searchClear') as HTMLElement;

        if (!searchInput || !searchClear) return;

        // Search input event listener with debouncing
        let searchTimeout: NodeJS.Timeout;
        searchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                const target = e.target as HTMLInputElement;
                this.searchTerm = target.value;
                this.filterExercises();
                this.renderExercises();
                this.updateSearchResults();

                // Show/hide clear button
                if (this.searchTerm.trim()) {
                    searchClear.style.display = 'block';
                } else {
                    searchClear.style.display = 'none';
                }
            }, 200);
        });

        // Clear button functionality
        searchClear.addEventListener('click', () => {
            searchInput.value = '';
            this.searchTerm = '';
            this.filterExercises();
            this.renderExercises();
            this.updateSearchResults();
            searchClear.style.display = 'none';
            searchInput.focus();
        });

        // Add focus/blur effects
        searchInput.addEventListener('focus', () => {
            const wrapper = searchInput.closest('.search-wrapper');
            wrapper?.classList.add('focused');
        });

        searchInput.addEventListener('blur', () => {
            const wrapper = searchInput.closest('.search-wrapper');
            wrapper?.classList.remove('focused');
        });
    }

    private filterExercises(): void {
        if (!this.searchTerm.trim()) {
            this.filteredExercises = [...exerciseAnswers];
            return;
        }

        const normalizedSearch = this.normalizeText(this.searchTerm);

        this.filteredExercises = exerciseAnswers.filter(exercise => {
            // Only search in the current language
            const currentLanguageText = this.currentLanguage === 'es' ? exercise.es : exercise.en;
            const normalizedText = this.normalizeText(currentLanguageText);

            return normalizedText.includes(normalizedSearch);
        });
    } private updateSearchResults(): void {
        const resultsInfo = document.getElementById('searchResultsInfo');
        if (!resultsInfo) return;

        const totalCount = exerciseAnswers.length;
        const filteredCount = this.filteredExercises.length;

        if (this.searchTerm.trim()) {
            if (filteredCount > 0) {
            } else {
                resultsInfo.textContent = this.getTranslation('exercises.search_no_results') || 'No exercises found';
            }
        } else {
            resultsInfo.textContent = '';
        }
    }

    private getTranslation(key: string): string | undefined {
        const keys = key.split('.');
        let value: any = translations[this.currentLanguage as keyof typeof translations];
        for (const k of keys) {
            value = value?.[k];
        }
        return value;
    }

    private getRewardImagePath(rewardName: string): string {
        return `../assets/images/answers_rewards/${rewardName}`;
    }

    private renderExercises(): void {
        const grid = document.getElementById('exercisesGrid');
        if (!grid) return;

        grid.innerHTML = '';

        // Show no results message if search returned empty
        if (this.filteredExercises.length === 0 && this.searchTerm.trim()) {
            const noResultsDiv = document.createElement('div');
            noResultsDiv.className = 'no-results';
            noResultsDiv.innerHTML = `
                <div class="no-results-icon">🔍</div>
                <div class="no-results-title">${this.getTranslation('exercises.search_no_results')}</div>
                <div class="no-results-subtitle">${this.getTranslation('exercises.search_no_results_subtitle')}</div>
            `;
            grid.appendChild(noResultsDiv);
            return;
        }

        this.filteredExercises.forEach((exercise, index) => {
            const card = document.createElement('div');
            card.className = 'exercise-card';
            card.innerHTML = `
                <div class="exercise-question">
                    ${this.currentLanguage === 'es' ? exercise.es : exercise.en}
                </div>
                <div class="exercise-options">
                    <div class="option-card">
                        <img 
                            class="option-image" 
                            src="${this.getRewardImagePath(exercise.option1)}"
                            alt="${exercise.option1}"
                            onerror="this.src=this.src.replace('.png', '.jpg'); if(this.src.includes('.jpg')) this.onerror=null;"
                        >
                        <div class="option-label">
                            ${this.getTranslation('exercises.option')} A
                        </div>
                    </div>
                    <div class="option-card">
                        <img 
                            class="option-image" 
                            src="${this.getRewardImagePath(exercise.option2)}"
                            alt="${exercise.option2}"
                            onerror="this.src=this.src.replace('.png', '.jpg'); if(this.src.includes('.jpg')) this.onerror=null;"
                        >
                        <div class="option-label">
                            ${this.getTranslation('exercises.option')} B
                        </div>
                    </div>
                </div>
            `;

            grid.appendChild(card);
        });
    }
}

// Initialize the exercises page
async function initializeExercisesPage(): Promise<void> {
    try {
        new ExercisesPage();
        console.log('Exercises page initialized successfully');
    } catch (error) {
        console.error('Failed to initialize exercises page:', error);
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeExercisesPage);
} else {
    initializeExercisesPage();
}
