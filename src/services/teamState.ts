import { Character, CurrentTeam } from '../types/index.js';
import { PositionMapping } from '../types/index.js';

export interface AddPlayerResult {
    team: CurrentTeam;
    replacedPlayer?: Character;
}

// PURE: Remove a player id from any position it occupies (mutates copy, returns new object)
export function removePlayerEverywhere(team: CurrentTeam, playerId: number): CurrentTeam {
    const newTeam: CurrentTeam = { ...team };
    Object.keys(newTeam).forEach(pos => {
        const p = newTeam[pos];
        if (p && p.id === playerId) {
            delete newTeam[pos];
        }
    });
    return newTeam;
}

// PURE: Add player to position (replacing existing). Does NOT enforce validation (caller decides)
export function addPlayerToTeam(team: CurrentTeam, positionClass: string, player: Character): AddPlayerResult {
    const newTeam: CurrentTeam = { ...team };
    const existing = newTeam[positionClass];
    const replacedPlayer = existing ? existing : undefined;
    newTeam[positionClass] = player;
    return { team: newTeam, replacedPlayer };
}

// PURE: Remove player from specific position
export function removePlayerFromTeam(team: CurrentTeam, positionClass: string): { team: CurrentTeam; removed?: Character } {
    if (!team[positionClass]) return { team };
    const newTeam: CurrentTeam = { ...team };
    const existing = newTeam[positionClass];
    const removed = existing ? existing : undefined;
    delete newTeam[positionClass];
    return { team: newTeam, removed };
}

// PURE: Compute valid position class for a HTMLElement's classList (utility for tests - DOM class string)
export function extractPositionClass(className: string, mapping: PositionMapping): string | undefined {
    return className.split(' ').find(cls => cls.startsWith('position-') && mapping[cls]);
}
