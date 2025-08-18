import { Character } from '../types/index.js';
import { createPlayerCard } from './PlayerCard.js';

// Creates a player card for selection lists (position selector)
export function createSelectablePlayerCard(player: Character, imageUrl: string, onSelect: (player: Character) => void): HTMLElement {
    const card = createPlayerCard(player, imageUrl, { variant: 'selector', showName: false });
    card.addEventListener('click', () => onSelect(player));
    card.addEventListener('keydown', (e: KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onSelect(player);
        }
    });
    return card;
}
