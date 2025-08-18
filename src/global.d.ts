// Global type declarations for Haikyu Team Builder

import { HaikyuTeamBuilder as OriginalHaikyuTeamBuilder } from './HaikyuTeamBuilder';
import { HaikyuTeamBuilder as RefactoredHaikyuTeamBuilder } from './HaikyuTeamBuilderRefactored';
import { LanguageManager } from './LanguageManager';

// Global type declarations for Haikyu Team Builder

import { HaikyuTeamBuilder as OriginalHaikyuTeamBuilder } from './HaikyuTeamBuilder';
import { HaikyuTeamBuilder as RefactoredHaikyuTeamBuilder } from './HaikyuTeamBuilderRefactored';
import { LanguageManager } from './LanguageManager';

declare global {
  interface Window {
    teamBuilder?: OriginalHaikyuTeamBuilder;
    languageManager?: LanguageManager;
    HaikyuTeamBuilder?: typeof OriginalHaikyuTeamBuilder;
    LanguageManager?: typeof LanguageManager;
  }

  // DOM element extensions
  interface HTMLElement {
    characterId?: number;
    position?: string;
  }
}

export { };
