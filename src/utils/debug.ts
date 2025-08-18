// Centralized debug logging utility
// Toggle this flag to enable/disable verbose logs.
export const DEBUG = false; // Set to false for production build.

export function debug(...args: any[]) {
    if (DEBUG) {
        // eslint-disable-next-line no-console
        console.log('[DEBUG]', ...args);
    }
}

export function debugGroup(label: string, fn: () => void) {
    if (!DEBUG) return;
    // eslint-disable-next-line no-console
    console.group(`[DEBUG] ${label}`);
    try { fn(); } finally {
        // eslint-disable-next-line no-console
        console.groupEnd();
    }
}
