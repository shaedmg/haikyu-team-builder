// Initialize the Exercises page
// This file serves as a bridge between modular TypeScript and the exercises page

import { exerciseAnswers } from './exerciseAnswers.js';

// Translation strings for the exercises page
const translations = {
    en: {
        language: 'Language',
        nav: {
            team_builder: 'Team Builder',
            exercises: 'Exercises'
        },
        exercises: {
            title: 'Exercises',
            subtitle: 'Browse through the exercise mode questions and their possible rewards',
            option: 'Option'
        }
    },
    es: {
        language: 'Idioma',
        nav: {
            team_builder: 'Constructor de Equipo',
            exercises: 'Ejercicios'
        },
        exercises: {
            title: 'Ejercicios',
            subtitle: 'Explora las preguntas del modo ejercicios y sus posibles recompensas',
            option: 'Opción'
        }
    }
};

class ExercisesPage {
    private currentLanguage: string;

    constructor() {
        this.currentLanguage = this.detectLanguage();
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
        this.renderExercises();
        this.updateLanguage();
    }

    private setupLanguageSelector(): void {
        const select = document.getElementById('languageSelect') as HTMLSelectElement;
        if (select) {
            select.value = this.currentLanguage;

            select.addEventListener('change', (e) => {
                const target = e.target as HTMLSelectElement;
                this.currentLanguage = target.value;
                localStorage.setItem('haikyu-language', this.currentLanguage);
                this.updateLanguage();
                this.renderExercises(); // Re-render with new language
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
        return `assets/images/answers_rewards/${rewardName}`;
    }

    private renderExercises(): void {
        const grid = document.getElementById('exercisesGrid');
        if (!grid) return;

        grid.innerHTML = '';

        exerciseAnswers.forEach((exercise, index) => {
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
