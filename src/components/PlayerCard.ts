import { Character } from '../types/index.js';

export type PlayerCardVariant = 'available' | 'court' | 'selector';

interface PlayerCardOptions {
    variant: PlayerCardVariant;
    showName?: boolean; // some contexts (court/right panel) show name
    draggable?: boolean;
    extraClasses?: string[];
    // For selector variant we use an <img>; others use background-image div for existing styles
}

/**
 * Creates a DOM element representing a player, preserving existing CSS classes & markup.
 * Variants:
 *  - available: used in right side panel grid (class 'available-player') 80x100
 *  - court: used inside a .player-slot on the court (class 'player-card filled') 90x120
 *  - selector: used in bottom position selector carousel (class 'position-player-card') 95x120
 */
export function createPlayerCard(player: Character, imageUrl: string, opts: PlayerCardOptions): HTMLElement {
    const { variant, showName = true, draggable = false, extraClasses = [] } = opts;

    if (variant === 'available') {
        const div = document.createElement('div');
        div.className = ['available-player', ...extraClasses].join(' ');
        if (draggable) div.draggable = true;
        div.dataset.playerId = player.id.toString();
        div.dataset.position = player.position;
        div.innerHTML = `
      <div class="player-image-wrapper" style="width:80px;height:100px;overflow:hidden;">
        <img class="player-image" src="${imageUrl}" alt="${player.name}" loading="lazy" decoding="async" width="80" height="100" />
      </div>
      <div class="player-name">${player.name}</div>
      <div class="position-tag" aria-label="${player.position}">${player.position}</div>
    `;
        return div;
    }

    if (variant === 'court') {
        const wrapper = document.createElement('div');
        wrapper.className = ['player-card', 'filled', ...extraClasses].join(' ');
        if (draggable) wrapper.draggable = true;
        wrapper.dataset.playerId = player.id.toString();
        wrapper.innerHTML = `
      <div class="player-image-wrapper" style="width:90px;height:120px;overflow:hidden;">
        <img class="player-image" src="${imageUrl}" alt="${player.name}" loading="lazy" decoding="async" width="90" height="120" />
      </div>
      ${showName ? `<div class="player-name">${player.name}</div>` : ''}
      <div class="position-tag" aria-label="${player.position}">${player.position}</div>
    `;
        return wrapper;
    }

    // selector variant
    const sel = document.createElement('div');
    sel.className = ['position-player-card', ...extraClasses].join(' ');
    sel.setAttribute('role', 'button');
    sel.setAttribute('tabindex', '0');
    sel.setAttribute('title', player.name);
    sel.innerHTML = `
    <img class="player-image" src="${imageUrl}" alt="${player.name}" loading="lazy" decoding="async" width="95" height="120" style="width:95px;height:120px;object-fit:cover;" />
  `;
    return sel;
}
