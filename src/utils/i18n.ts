import { debug } from './debug.js';
import { Position } from '../types/index.js';

// Positions remain in English always (no translation)
const POSITION_KEY_MAP: Record<Position, string> = {
    MB: 'Middle Blocker',
    WS: 'Wing Spiker',
    OP: 'Opposite',
    S: 'Setter',
    L: 'Libero'
};

export function t(key: string, fallback?: string): string {
    const lang = window.languageManager?.getCurrentLanguage() || 'es';
    try {
        const value = window.languageManager?.t(key as any);
        if (typeof value === 'string') return value;
    } catch (e) {
        debug('Missing translation key:', key);
    }
    return fallback || key;
}

export function getPositionLabel(pos: Position): string {
    return POSITION_KEY_MAP[pos] || pos;
}

export function listAllPositionLabels(): Record<Position, string> {
    const out: any = {};
    (Object.keys(POSITION_KEY_MAP) as Position[]).forEach(p => { out[p] = POSITION_KEY_MAP[p]; });
    return out;
}
