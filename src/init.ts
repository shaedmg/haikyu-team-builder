// Initialize the Haikyu Team Builder application
// This file serves as a bridge between modular TypeScript and global script execution

import { LanguageManager } from './LanguageManager.js';
import { HaikyuTeamBuilder } from './HaikyuTeamBuilder.js';

// First try to import from TypeScript modules if available
async function initializeFromModules(): Promise<boolean> {
  try {
    window.languageManager = new LanguageManager();
    const teamBuilder = new HaikyuTeamBuilder();
    window.teamBuilder = teamBuilder;
    
    // Store instance for global access
    (window as any).teamBuilderInstance = teamBuilder;
    
    console.log('Initialized from TypeScript modules');
    return true;
  } catch (error) {
    console.log('Failed to initialize from modules:', error);
    return false;
  }
}

// Fallback to global classes if modules fail
function initializeFromGlobals(): boolean {
  const LanguageManagerGlobal = (window as any).LanguageManager;
  const HaikyuTeamBuilderGlobal = (window as any).HaikyuTeamBuilder;
  
  if (LanguageManagerGlobal && HaikyuTeamBuilderGlobal) {
    window.languageManager = new LanguageManagerGlobal();
    const teamBuilder = new HaikyuTeamBuilderGlobal();
    window.teamBuilder = teamBuilder;
    
    // Store instance for global access
    (window as any).teamBuilderInstance = teamBuilder;
    
    console.log('Initialized from global classes');
    return true;
  }
  return false;
}

// Main initialization function
async function initializeApp(): Promise<void> {
  const moduleSuccess = await initializeFromModules();
  
  if (!moduleSuccess) {
    const globalSuccess = initializeFromGlobals();
    
    if (!globalSuccess) {
      console.error('Failed to initialize application: no valid classes found');
    }
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  initializeApp();
}
