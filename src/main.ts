// Main entry point for the Haikyu Team Builder application
import { HaikyuTeamBuilder } from './script.js';
import { extendedPlayers, addExtendedPlayers } from './extended-players.js';
import { LanguageManager } from './translations.js';

// Export everything for external use
export { HaikyuTeamBuilder, extendedPlayers, addExtendedPlayers, LanguageManager };
export * from './types.js';

// Initialize the application when DOM is loaded
if (typeof document !== 'undefined') {
    
    // Make classes available globally for backward compatibility
    (window as any).LanguageManager = LanguageManager;
    (window as any).HaikyuTeamBuilder = HaikyuTeamBuilder;
    
    function initializeApp() {
        // Initialize language manager first
        (window as any).languageManager = new LanguageManager();
        // Then initialize team builder
        (window as any).teamBuilder = new HaikyuTeamBuilder();
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeApp);
    } else {
        // DOM is already loaded
        initializeApp();
    }
}
