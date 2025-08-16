// Utility functions for the Haikyu Team Builder application
import { Player, PlayerPosition, Bond } from './types.js';

/**
 * Validates if a player can be placed in a specific position
 */
export function isValidPlayerPosition(player: Player, requiredPosition: PlayerPosition): boolean {
    return player.position === requiredPosition;
}

/**
 * Generates a placeholder image URL for a player
 */
export function getPlayerImageUrl(player: Player, size: string = '150x150'): string {
    if (player.profile_image_url) {
        return player.profile_image_url;
    }

    const initial = player.name.charAt(0).toUpperCase();
    return `https://via.placeholder.com/${size}/667eea/white?text=${initial}`;
}

/**
 * Formats player position for display
 */
export function formatPlayerPosition(position: PlayerPosition): string {
    const positionNames: Record<PlayerPosition, string> = {
        'L': 'Libero',
        'MB': 'Middle Blocker',
        'WS': 'Wing Spiker',
        'OP': 'Opposite',
        'S': 'Setter',
    };

    return positionNames[position] || position;
}

/**
 * Groups players by their school
 */
export function groupPlayersBySchool(players: Player[]): Record<string, Player[]> {
    return players.reduce((groups, player) => {
        const school = player.school || 'Unknown';
        if (!groups[school]) {
            groups[school] = [];
        }
        groups[school].push(player);
        return groups;
    }, {} as Record<string, Player[]>);
}

/**
 * Groups players by their position
 */
export function groupPlayersByPosition(players: Player[]): Record<PlayerPosition, Player[]> {
    return players.reduce((groups, player) => {
        if (!groups[player.position]) {
            groups[player.position] = [];
        }
        groups[player.position].push(player);
        return groups;
    }, {} as Record<PlayerPosition, Player[]>);
}

/**
 * Filters players by rarity
 */
export function filterPlayersByRarity(players: Player[], rarity: string): Player[] {
    return players.filter(player => player.rarity === rarity);
}

/**
 * Sorts players by power (if available)
 */
export function sortPlayersByPower(players: Player[], descending: boolean = true): Player[] {
    return [...players].sort((a, b) => {
        const powerA = a.power || 0;
        const powerB = b.power || 0;
        return descending ? powerB - powerA : powerA - powerB;
    });
}

/**
 * Calculates the school composition of a team
 */
export function calculateSchoolComposition(teamPlayers: Player[]): Record<string, number> {
    return teamPlayers.reduce((composition, player) => {
        const school = player.school || 'Unknown';
        composition[school] = (composition[school] || 0) + 1;
        return composition;
    }, {} as Record<string, number>);
}

/**
 * Checks if a bond is active based on current team players
 */
export function isBondActive(bond: Bond, currentPlayerIds: number[]): boolean {
    return bond.participants.every(participantId =>
        currentPlayerIds.includes(participantId)
    );
}

/**
 * Gets the percentage of bond completion
 */
export function getBondCompletionPercentage(bond: Bond, currentPlayerIds: number[]): number {
    const presentParticipants = bond.participants.filter(participantId =>
        currentPlayerIds.includes(participantId)
    );
    return Math.round((presentParticipants.length / bond.participants.length) * 100);
}

/**
 * Validates a complete team formation
 */
export function validateTeamFormation(teamPlayers: Player[]): {
    isValid: boolean;
    errors: string[];
} {
    const errors: string[] = [];
    const positions = teamPlayers.map(p => p.position);

    // Check for required positions
    const requiredPositions: PlayerPosition[] = ['S', 'L', 'MB', 'WS', 'OP'];
    const positionCounts = positions.reduce((counts, pos) => {
        counts[pos] = (counts[pos] || 0) + 1;
        return counts;
    }, {} as Record<PlayerPosition, number>);

    // Validate setter count
    if (!positionCounts['S'] || positionCounts['S'] !== 1) {
        errors.push('Team must have exactly 1 Setter');
    }

    // Validate libero count
    if (!positionCounts['L'] || positionCounts['L'] !== 1) {
        errors.push('Team must have exactly 1 Libero');
    }

    // Validate middle blocker count
    if (!positionCounts['MB'] || positionCounts['MB'] !== 2) {
        errors.push('Team must have exactly 2 Middle Blockers');
    }

    // Validate wing spiker count
    if (!positionCounts['WS'] || positionCounts['WS'] !== 2) {
        errors.push('Team must have exactly 2 Wing Spikers');
    }

    // Validate opposite count
    if (!positionCounts['OP'] || positionCounts['OP'] !== 1) {
        errors.push('Team must have exactly 1 Opposite');
    }

    // Check for duplicate players
    const playerIds = teamPlayers.map(p => p.id);
    const uniquePlayerIds = new Set(playerIds);
    if (playerIds.length !== uniquePlayerIds.size) {
        errors.push('Team cannot have duplicate players');
    }

    return {
        isValid: errors.length === 0,
        errors
    };
}

/**
 * Debounce function for performance optimization
 */
export function debounce<T extends (...args: any[]) => any>(
    func: T,
    wait: number
): (...args: Parameters<T>) => void {
    let timeout: NodeJS.Timeout;

    return function (this: any, ...args: Parameters<T>) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

/**
 * Deep clone an object
 */
export function deepClone<T>(obj: T): T {
    return JSON.parse(JSON.stringify(obj));
}
