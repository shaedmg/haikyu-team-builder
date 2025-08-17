// Global type declarations for Haikyu Team Builder

import { HaikyuTeamBuilder } from './HaikyuTeamBuilder';
import { LanguageManager } from './LanguageManager';

declare global {
  interface Window {
    teamBuilder?: HaikyuTeamBuilder;
    languageManager?: LanguageManager;
    HaikyuTeamBuilder?: typeof HaikyuTeamBuilder;
    LanguageManager?: typeof LanguageManager;
  }

  // DOM element extensions
  interface HTMLElement {
    characterId?: number;
    position?: string;
  }
}

export {};
