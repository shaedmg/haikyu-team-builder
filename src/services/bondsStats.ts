import { Bond, Character, CurrentTeam } from '../types/index.js';

export interface BondComputed extends Bond {
    currentCount: number;
    missingCount: number;
    isActive: boolean;
}

// PURE: compute bond activation counts based on team
export function computeBondStatuses(team: CurrentTeam, bonds: Bond[]): BondComputed[] {
    const teamIds = new Set<number>();
    Object.values(team).forEach(p => { if (p) teamIds.add(p.id); });

    return bonds.map(b => {
        const participating = b.participants.filter(pid => teamIds.has(pid));
        const currentCount = participating.length;
        const requiredCount = b.participants.length;
        const missingCount = requiredCount - currentCount;
        const isActive = currentCount === requiredCount;
        return { ...b, currentCount, missingCount, isActive } as BondComputed;
    });
}
