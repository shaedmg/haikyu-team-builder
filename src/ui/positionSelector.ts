import { Character, Position } from '../types/index.js';

export interface PositionSelectorContextConfig {
    positionMappings: { [key: string]: Position };
    usedPlayerIds: Set<number>;
    getSortedPlayers: () => Character[];
    createPositionPlayerCard: (player: Character) => HTMLElement;
    placePlayerInPosition: (player: Character, positionElement: HTMLElement) => void;
    onClose?: () => void;
}

export class PositionSelectorContext {
    positionMappings: { [key: string]: Position };
    usedPlayerIds: Set<number>;
    selectedPosition: string | null = null;
    positionSelectorActive = false;
    private _getSortedPlayers: () => Character[];
    private _createPositionPlayerCard: (player: Character) => HTMLElement;
    private _placePlayerInPosition: (player: Character, positionElement: HTMLElement) => void;
    private _onClose?: () => void;

    constructor(cfg: PositionSelectorContextConfig) {
        this.positionMappings = cfg.positionMappings;
        this.usedPlayerIds = cfg.usedPlayerIds;
        this._getSortedPlayers = cfg.getSortedPlayers;
        this._createPositionPlayerCard = cfg.createPositionPlayerCard;
        this._placePlayerInPosition = cfg.placePlayerInPosition;
        this._onClose = cfg.onClose;
    }

    getSortedPlayers() { return this._getSortedPlayers(); }
    createPositionPlayerCard(player: Character) { return this._createPositionPlayerCard(player); }
    placePlayerInPosition(player: Character, el: HTMLElement) { return this._placePlayerInPosition(player, el); }
    close() { if (this._onClose) this._onClose(); }
}

export function setupPositionSelector(ctx: PositionSelectorContext): void {
    const positionSelector = document.getElementById('positionSelector');
    const closeBtn = document.getElementById('positionSelectorClose');

    if (closeBtn) {
        closeBtn.addEventListener('click', () => hidePositionSelector(ctx));
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && ctx.positionSelectorActive) {
            hidePositionSelector(ctx);
        }
    });

    document.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        if (ctx.positionSelectorActive && positionSelector && !positionSelector.contains(target) && !target.closest('.position')) {
            hidePositionSelector(ctx);
        }
    });
}

export function showPositionSelector(ctx: PositionSelectorContext, positionClass: string, _positionElement: HTMLElement): void {
    const requiredPosition = ctx.positionMappings[positionClass];
    if (!requiredPosition) return;

    const positionSelector = document.getElementById('positionSelector');
    const positionPlayersList = document.getElementById('positionPlayersList');
    const positionSelectorTitle = document.getElementById('positionSelectorTitle');

    ctx.selectedPosition = positionClass;
    ctx.positionSelectorActive = true;

    const currentLanguage = window.languageManager ? window.languageManager.getCurrentLanguage() : 'en';
    const positionNames: Record<string, string> = { OP: 'Opposite', WS: 'Wing Spiker', MB: 'Middle Blocker', S: 'Setter', L: 'Libero' };
    if (positionSelectorTitle) {
        const selectText = currentLanguage === 'en' ? 'Select' : 'Seleccionar';
        const forText = currentLanguage === 'en' ? 'for this position' : 'para esta posición';
        positionSelectorTitle.textContent = `${selectText} ${positionNames[requiredPosition]} ${forText}`;
    }

    const sortedPlayers = ctx.getSortedPlayers();
    const compatiblePlayers = sortedPlayers.filter(p => p.position === requiredPosition && !ctx.usedPlayerIds.has(p.id));
    if (positionPlayersList) {
        positionPlayersList.innerHTML = '';
        compatiblePlayers.forEach(player => {
            const card = ctx.createPositionPlayerCard(player);
            positionPlayersList.appendChild(card);
        });
    }

    document.body.classList.add('position-selector-active');
    if (positionSelector) {
        positionSelector.classList.add('active');
        positionSelector.removeAttribute('hidden');
        positionSelector.setAttribute('aria-hidden', 'false');
        positionSelector.setAttribute('aria-modal', 'true');
        // Focus management
        const closeBtn = document.getElementById('positionSelectorClose');
        const focusable = positionSelector.querySelectorAll<HTMLElement>('button, [tabindex="0"], [role="button"], a[href]');
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        // store previously focused element
        (positionSelector as any)._previousFocus = document.activeElement as HTMLElement;
        if (first) first.focus();
        positionSelector.addEventListener('keydown', function trap(e: KeyboardEvent) {
            if (e.key === 'Tab') {
                if (focusable.length === 0) { e.preventDefault(); return; }
                if (e.shiftKey && document.activeElement === first) { e.preventDefault(); (last || first).focus(); }
                else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); (first || last).focus(); }
            } else if (e.key === 'Escape') {
                hidePositionSelector(ctx);
            }
        }, { once: false });
        if (closeBtn) closeBtn.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); hidePositionSelector(ctx); } });
    }
}

export function hidePositionSelector(ctx: PositionSelectorContext): void {
    const positionSelector = document.getElementById('positionSelector');
    ctx.selectedPosition = null;
    ctx.positionSelectorActive = false;
    document.body.classList.remove('position-selector-active');
    if (positionSelector) {
        positionSelector.classList.remove('active');
        // Move focus back before hiding from accessibility tree
        const prev = (positionSelector as any)._previousFocus as HTMLElement | undefined;
        if (prev) setTimeout(() => prev.focus(), 0);
        positionSelector.setAttribute('aria-hidden', 'true');
        positionSelector.setAttribute('aria-modal', 'false');
        positionSelector.setAttribute('hidden', 'true');
    }
    ctx.close();
}
