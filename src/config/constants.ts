import { PositionMapping, Rarity } from '../types/index.js';

// Positional mapping used across the app (court slots -> required position)
export const POSITION_MAPPINGS: PositionMapping = {
    'position-1': 'OP', // Back left - Opposite (SERVING POSITION)
    'position-5': 'WS', // Back right - Wing Spiker
    'position-6': 'MB', // Back center - Middle Blocker
    'position-3': 'MB', // Front center - Middle Blocker
    'position-4': 'WS', // Front left - Wing Spiker
    'position-2': 'S',  // Front right - Setter
    'position-libero': 'L', // Libero
};

// Global rarity order preference
export const RARITY_ORDER: Rarity[] = ['SP', 'UR', 'SSR', 'SR', 'R', 'N'];

// Labels displayed for empty position placeholders
export const POSITION_LABELS: Record<string, string> = {
    L: 'L',
    MB: 'MB',
    WS: 'WS',
    OP: 'OP',
    S: 'S',
};
