// Initialize the Haikyu Team Builder application
// This file serves as a bridge between modular TypeScript and global script execution

// First try to import from TypeScript modules if available
async function initializeFromModules() {
  try {
    const { LanguageManager } = await import('./dist/translations.js');
    const { HaikyuTeamBuilder } = await import('./dist/script.js');
    
    window.languageManager = new LanguageManager();
    window.teamBuilder = new HaikyuTeamBuilder();
    
    console.log('Initialized from TypeScript modules');
    return true;
  } catch (error) {
    console.log('Failed to initialize from modules:', error);
    return false;
  }
}

// Fallback to global classes if modules fail
function initializeFromGlobals() {
  if (window.LanguageManager && window.HaikyuTeamBuilder) {
    window.languageManager = new window.LanguageManager();
    window.teamBuilder = new window.HaikyuTeamBuilder();
    console.log('Initialized from global classes');
    return true;
  }
  return false;
}

// Main initialization function
async function initializeApp() {
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
