// Initialize the Haikyu Team Builder application
// This file serves as a bridge between modular TypeScript and global script execution

import { LanguageManager } from './LanguageManager.js';
import { HaikyuTeamBuilder } from './HaikyuTeamBuilder.js';

// Initialize the application with TypeScript modules
async function initializeApp(): Promise<void> {
  try {
    window.languageManager = new LanguageManager();
    const teamBuilder = new HaikyuTeamBuilder();
    window.teamBuilder = teamBuilder;
    
    // Store instance for global access
    (window as any).teamBuilderInstance = teamBuilder;
    
    console.log('Application initialized successfully');
  } catch (error) {
    console.error('Failed to initialize application:', error);
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  initializeApp();
}
