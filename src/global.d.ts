// Global type declarations for Haikyu Team Builder

import type { HaikyuTeamBuilder } from './script';
import type { LanguageManager, TranslationDict } from './translations';

declare global {
    interface Window {
        teamBuilder: HaikyuTeamBuilder;
        languageManager: LanguageManager;
        translations: TranslationDict;
        LanguageManager: typeof LanguageManager;
    }
}

export {};
