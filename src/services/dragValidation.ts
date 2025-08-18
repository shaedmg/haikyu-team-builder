import { Character, CurrentTeam } from '../types/index.js';
import { PositionMapping } from '../types/index.js';

// PURE: determine if a player's actual position matches the required position of a slot
export function isValidPosition(player: Character, positionClasses: string, mapping: PositionMapping): boolean {
    const positionClass = positionClasses.split(' ').find(cls => cls.startsWith('position-') && mapping[cls]);
    if (!positionClass) return false;
    const required = mapping[positionClass];
    return player.position === required;
}

// PURE: determines whether dropping draggedPlayer into targetElement would duplicate same player elsewhere (respecting swap allowance)
export function isDuplicatePlayer(
    draggedPlayer: Character,
    targetClasses: string,
    mapping: PositionMapping,
    team: CurrentTeam,
    draggedFromTeam: boolean,
    draggedFromPosition: string | undefined
): boolean {
    const targetPositionClass = targetClasses.split(' ').find(cls => cls.startsWith('position-') && mapping[cls]);
    if (!targetPositionClass) return false; // if target invalid, duplication logic not applicable here

    if (draggedFromTeam && draggedFromPosition) {
        const sourceType = mapping[draggedFromPosition];
        const targetType = mapping[targetPositionClass];
        if (sourceType === targetType) {
            return false; // allow movement/swaps within same type
        }
    }

    return Object.entries(team).some(([pos, player]) => {
        return player && player.id === draggedPlayer.id && pos !== targetPositionClass;
    });
}
