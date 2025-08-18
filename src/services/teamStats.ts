import { CurrentTeam, Character } from '../types/index.js';

// PURE: compute school composition counts
export function computeSchoolComposition(team: CurrentTeam): Record<string, number> {
    const counts: Record<string, number> = {};
    Object.values(team).forEach((p: Character | null | undefined) => {
        if (p && p.school) {
            counts[p.school] = (counts[p.school] || 0) + 1;
        }
    });
    return counts;
}
