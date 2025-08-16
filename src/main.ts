// Main entry point for the Haikyu Team Builder application
import { HaikyuTeamBuilder } from './script.js';
import { extendedPlayers, addExtendedPlayers } from './extended-players.js';

// Export everything for external use
export { HaikyuTeamBuilder, extendedPlayers, addExtendedPlayers };
export * from './types.js';

// Initialize the application when DOM is loaded
if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
        // Create global instance for backward compatibility
        (window as any).teamBuilder = new HaikyuTeamBuilder();
    });
}
