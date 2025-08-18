import { debug } from './debug.js';

export function formatBonusText(bonusValue: string): string {
    debug('formatBonusText in:', bonusValue);
    if (!bonusValue || typeof bonusValue !== 'string') return bonusValue || '';
    if (bonusValue === 'Activado' || bonusValue === 'Eliminado') return bonusValue;
    const multiplierMatch = bonusValue.match(/^x(\d+(?:\.\d+)?)%$/);
    if (multiplierMatch) return `×${multiplierMatch[1]}%`;
    const complexMatch = bonusValue.match(/^(\+?\d+)\s+(\+?\d+%)$/);
    if (complexMatch) {
        let points = complexMatch[1];
        let percentage = complexMatch[2];
        if (!points.startsWith('+') && !points.startsWith('-')) points = '+' + points;
        if (!percentage.startsWith('+') && !percentage.startsWith('-')) percentage = '+' + percentage;
        const lang = window.languageManager?.getCurrentLanguage() || 'es';
        const puntos = lang === 'en' ? 'points' : 'puntos';
        const adicional = lang === 'en' ? 'additional' : 'adicional';
        return `${points} ${puntos} ${percentage} ${adicional}`;
    }
    const percentageMatch = bonusValue.match(/^(\+?-?\d+(?:\.\d+)?)%$/);
    if (percentageMatch) {
        const v = percentageMatch[1];
        return (v.startsWith('+') || v.startsWith('-') ? v : '+' + v) + '%';
    }
    const numberMatch = bonusValue.match(/^(\+?-?\d+(?:\.\d+)?)$/);
    if (numberMatch) {
        const v = numberMatch[1];
        return (v.startsWith('+') || v.startsWith('-') ? v : '+' + v);
    }
    return bonusValue;
}

export function getInitialBonusLevel(bonus: any): string {
    if (!bonus?.levels) return 'N/A';
    const lang = window.languageManager?.getCurrentLanguage() || 'es';
    if (Array.isArray(bonus.levels)) return bonus.levels[0] || 'N/A';
    if (typeof bonus.levels === 'object') {
        const arr = bonus.levels[lang] || bonus.levels.es || bonus.levels;
        return Array.isArray(arr) ? (arr[0] || 'N/A') : 'N/A';
    }
    return 'N/A';
}
