/**
 * Haikyu!! Flight High Team Builder
 * 
 * This application demonstrates the power of vibe coding methodology - a modern approach
 * to software development that emphasizes creative flow, iterative architecture, and
 * emergent design patterns. The modular structure, TypeScript implementation, and
 * component-based architecture emerged organically through collaborative AI-assisted
 * development sessions.
 * 
 * Vibe coding principles demonstrated:
 * - Organic architecture evolution
 * - Continuous feedback loops
 * - Modular component design
 * - Performance optimization through iteration
 * - Clean code emergence without over-engineering
 * 
 * @author Angelo
 * @methodology Vibe Coding
 * @framework Vanilla TypeScript + Web Components
 */

import {
    Character,
    Bond,
    CurrentTeam,
    Language,
    SortBy,
    Rarity,
    Position,
    DragState,
    PositionMapping,
    SchoolBond
} from './types/index.js';
import { charactersData } from './characters.js';
import { bondsData } from './bonds.js';
import { schoolBondsData } from './schoolBonds.js';
import { createPlayerCard } from './components/PlayerCard.js';
import { createSelectablePlayerCard } from './components/SelectablePlayerCard.js';
import { POSITION_MAPPINGS, RARITY_ORDER, POSITION_LABELS } from './config/constants.js';
import { getPositionLabel } from './utils/i18n.js';
import { addPlayerToTeam, removePlayerEverywhere, removePlayerFromTeam } from './services/teamState.js';
import { computeSchoolComposition } from './services/teamStats.js';
import { computeBondStatuses } from './services/bondsStats.js';
import { generateBondEffectHTML } from './ui/bondsRenderer.js';
import { rotatePlayersClockwise } from './ui/rotationAnimation.js';
import { setupPositionSelector, showPositionSelector, hidePositionSelector, PositionSelectorContext } from './ui/positionSelector.js';
import { addDragListeners as addExternalDragListeners, setupDragAndDrop as setupCourtDragAndDrop, clearHighlights } from './ui/dragAndDrop.js';
import { debug } from './utils/debug.js';
import { formatBonusText, getInitialBonusLevel } from './utils/formatters.js';

export class HaikyuTeamBuilder {
    private players: Character[] = [];
    private bonds: Bond[] = [];
    private schoolBonds: SchoolBond[] = [];
    private currentTeam: CurrentTeam = {};
    private selectedPlayer: Character | null = null; // Position selector state now managed in positionSelectorCtx
    private usedPlayerIds: Set<number> = new Set();
    private positionMappings: PositionMapping;
    private dragState: DragState;
    private currentSortBy: SortBy = 'rarity'; // Default sort by rarity
    private rarityOrder: Rarity[] = RARITY_ORDER;
    private draggedFromPosition: string | undefined = undefined;

    constructor() {
        this.currentSortBy = 'rarity'; // Changed default sort to rarity

        this.positionMappings = POSITION_MAPPINGS;

        this.dragState = {
            draggedPlayer: null,
            draggedFromTeam: false,
            dragSuccess: false,
            isDragging: false,
            dragStartTime: 0
        };

        this.init();
    }

    private async init(): Promise<void> {
        // Get the current language from languageManager
        const currentLanguage = window.languageManager
            ? window.languageManager.getCurrentLanguage()
            : 'es';
        debug('Initializing with language:', currentLanguage);

        await this.loadPlayers(currentLanguage);
        this.renderAvailablePlayers();
        this.setupDragAndDrop(); // now delegates to extracted module
        this.setupEventListeners();
        this.initializePositionSelector();
        this.setupSortingControls();
        this.initializeSchoolStats();
        this.initializeBonds();
        this.setupRotationButton();
    }

    public async loadPlayers(language: Language = 'es'): Promise<void> {
        try {
            debug(`Loading players with language: ${language}`);

            // Use imported data instead of fetch
            debug('Using imported charactersData and bondsData');

            // Convert base characters to characters with names already included
            this.players = Object.values(charactersData.characters).map((baseChar: Character) => ({
                ...baseChar,
                name: baseChar.name // Name is now included directly
            }) as Character);
            debug('Players loaded count:', this.players.length);
            debug('Characters keys sample:', Object.keys(charactersData.characters).slice(0, 5));
            // Convert bonds to simple format (use language-specific names)
            // Filter to show only link skills (is_link_skill: true)
            this.bonds = bondsData.bonds
                .filter(bond => bond.is_link_skill === true)
                .map(bond => {
                    // If bond already has rich_text keep it, otherwise attempt auto-generation
                    const hasRich = (bond as any).rich_text;
                    let autoRich: any = hasRich ? (bond as any).rich_text : null;
                    if (!hasRich && bond.effects_by_character && bond.effects_by_character.length > 0) {
                        autoRich = this.generateRichTextFromEffects(bond, language);
                    }
                    return ({
                        id: bond.id,
                        name: bond.name,
                        participants: bond.participants,
                        is_link_skill: bond.is_link_skill,
                        effects_by_character: hasRich ? undefined : bond.effects_by_character, // hide original if converted
                        effect_summary: bond.effect_summary,
                        rich_text: autoRich,
                        type: bond.is_link_skill ? 'link_skill' : 'kizuna_skill',
                        currentCount: 0,
                        requiredCount: bond.participants.length,
                        isActive: false,
                        missingCount: bond.participants.length
                    } as Bond);
                });

            // Load school bonds
            this.schoolBonds = schoolBondsData.school_bonds;

            debug(`Loaded players: ${this.players.length} bonds: ${this.bonds.length} school bonds: ${this.schoolBonds.length} (lang=${language})`);
            debug('Sample bonds:', this.bonds.slice(0, 3).map(b => ({ name: b.name, participants: b.participants })));
            debug('School bonds:', this.schoolBonds.map(sb => ({ school: sb.school, name: sb.name })));
        } catch (error) {
            console.error('Error loading players:', error);
            // Initialize with empty data if import fails
            this.players = [];
            this.bonds = [];
            this.schoolBonds = [];
        }
    }

    // Auto-migrate structured per-character bonuses into a single rich text description
    private generateRichTextFromEffects(bond: any, lang: string) {
        try {
            const language = lang || 'es';
            const partsES: string[] = [];
            const partsEN: string[] = [];
            const variables: any[] = [];
            let maxLevels = 1;
            let varCounter = 1;

            (bond.effects_by_character || []).forEach((charEffect: any) => {
                charEffect.bonuses.forEach((bonus: any) => {
                    // Determine level arrays
                    let levelsES: string[] = [];
                    let levelsEN: string[] = [];
                    if (bonus.levels) {
                        if (Array.isArray(bonus.levels)) {
                            levelsES = levelsEN = bonus.levels;
                        } else {
                            levelsES = bonus.levels.es || bonus.levels[language] || [];
                            levelsEN = bonus.levels.en || bonus.levels[language] || levelsES;
                        }
                    }
                    maxLevels = Math.max(maxLevels, levelsES.length, levelsEN.length);
                    const varName = `Var${varCounter++}`;
                    variables.push({ name: varName, levels: { es: levelsES, en: levelsEN } });

                    const attrES = typeof bonus.attribute === 'object' ? (bonus.attribute.es || bonus.attribute.en) : bonus.attribute;
                    const attrEN = typeof bonus.attribute === 'object' ? (bonus.attribute.en || bonus.attribute.es) : bonus.attribute;
                    // Ideally map character id to name, but names may not be loaded yet; keep attribute only
                    partsES.push(`${attrES}: [${varName}]`);
                    partsEN.push(`${attrEN}: [${varName}]`);
                });
            });

            const templateES = partsES.join(' • ');
            const templateEN = partsEN.join(' • ');
            return { template: { es: templateES, en: templateEN }, variables, maxLevels };
        } catch (e) {
            console.warn('Failed to auto-generate rich text for bond', bond.id, e);
            return null;
        }
    }

    private getPlayerImageUrl(player: Character): string {
        // Use the profile_image_url directly (should now point to local paths)
        return (
            player.profile_image_url ||
            'https://via.placeholder.com/150x150/cccccc/666666?text=No+Image'
        );
    }

    private formatBonusText(bonusValue: string): string { return formatBonusText(bonusValue); }

    private renderAvailablePlayers(): void {
        const playerGrid = document.querySelector('.player-grid') as HTMLElement;
        if (!playerGrid) return;

        // Accessibility roles
        playerGrid.setAttribute('role', 'list');
        playerGrid.setAttribute('aria-label', 'Available players');

        // Get sorted players
        const sortedPlayers = this.getSortedPlayers();

        // Group sorted players by position for better organization
        const playersByPosition = this.groupPlayersByPosition(sortedPlayers);

        playerGrid.innerHTML = '';

        // Define fixed order for position categories
        const fixedPositionOrder: Position[] = ['MB', 'WS', 'S', 'OP', 'L'];

        // Render players grouped by position in fixed order
        fixedPositionOrder.forEach((position) => {
            if (playersByPosition[position] && playersByPosition[position].length > 0) {
                const positionHeader = document.createElement('div');
                positionHeader.className = 'position-header';
                positionHeader.style.cssText = `
          width: 100%; 
          grid-column: 1 / -1; 
          margin: 10px 0 5px 0; 
          padding: 5px 10px; 
          background: rgba(255,255,255,0.1); 
          border-radius: 10px; 
          text-align: center;
          font-size: 0.9rem;
          font-weight: bold;
        `;
                positionHeader.innerHTML = `${this.getPositionName(position)}`;
                playerGrid.appendChild(positionHeader);

                playersByPosition[position].forEach((player) => {
                    if (!this.usedPlayerIds.has(player.id)) {
                        const playerElement = this.createAvailablePlayerElement(player);
                        playerElement.setAttribute('role', 'listitem');
                        playerElement.setAttribute('aria-label', `${player.name} (${player.position})`);
                        playerGrid.appendChild(playerElement);
                    }
                });
            }
        });
    }

    private getSortedPlayers(): Character[] {
        const playersToSort = [...this.players];

        if (this.currentSortBy === 'name') {
            return playersToSort.sort((a, b) => a.name.localeCompare(b.name));
        } else if (this.currentSortBy === 'rarity') {
            return playersToSort.sort((a, b) => {
                const rarityA = this.rarityOrder.indexOf(a.rarity);
                const rarityB = this.rarityOrder.indexOf(b.rarity);

                // If rarity is the same, sort by name
                if (rarityA === rarityB) {
                    return a.name.localeCompare(b.name);
                }

                return rarityA - rarityB;
            });
        }

        return playersToSort;
    }

    private groupPlayersByPosition(players: Character[] = []): { [key: string]: Character[] } {
        const playersToGroup = players.length > 0 ? players : this.players;
        const grouped: { [key: string]: Character[] } = {};

        // Initialize all position groups to maintain order
        ['MB', 'WS', 'S', 'OP', 'L'].forEach(pos => {
            grouped[pos] = [];
        });

        // Group players while preserving the input order (which is already sorted)
        playersToGroup.forEach((player) => {
            const pos = player.position;
            if (grouped[pos]) {
                grouped[pos].push(player);
            }
        });

        return grouped;
    }

    private getPositionName(position: Position): string { return getPositionLabel(position); }

    // Export for global use
    public updateBonds(): void {
        this.renderBonds();
        this.renderSchoolBonds();
    }

    public updateSchoolStats(): void {
        this.renderSchoolBonds();
    }

    private renderBonds(): void {
        const bondsSection = document.getElementById('bondsSection');
        if (!bondsSection) return;

        // Get current team player IDs
        const currentPlayerIds = Object.values(this.currentTeam)
            .filter((player) => player)
            .map((player) => player!.id);

        if (currentPlayerIds.length === 0) {
            bondsSection.innerHTML = `<div class="no-players">${window.languageManager
                ? (window.languageManager.t('noPlayersSelected') as string)
                : 'No hay jugadores seleccionados'
                }</div>`;
            return;
        }
        const computed = computeBondStatuses(this.currentTeam, this.bonds);
        const relevantBonds = computed.filter(b => b.currentCount > 0)
            .sort((a, b) => {
                if (a.isActive && !b.isActive) return -1;
                if (!a.isActive && b.isActive) return 1;
                if (a.currentCount !== b.currentCount) return b.currentCount - a.currentCount;
                const lang = window.languageManager ? window.languageManager.getCurrentLanguage() : 'es';
                const aName = typeof a.name === 'object' ? (a.name as any)[lang] || (a.name as any).es : a.name;
                const bName = typeof b.name === 'object' ? (b.name as any)[lang] || (b.name as any).es : b.name;
                return aName.localeCompare(bName);
            });

        if (relevantBonds.length === 0) {
            bondsSection.innerHTML = `<div class="no-players">${window.languageManager
                ? (window.languageManager.t('noBondsAvailable') as string)
                : 'No hay vínculos disponibles'
                }</div>`;
            return;
        }

        // Create bond items from sorted bonds
        const bondItems = relevantBonds
            .map((bond) => {
                const isActive = bond.isActive;
                const currentCount = bond.currentCount;
                const requiredCount = bond.requiredCount;

                // Get the correct name for the current language
                const currentLanguage = window.languageManager ? window.languageManager.getCurrentLanguage() : 'es';
                const bondName = typeof bond.name === 'object' ? (bond.name as any)[currentLanguage] || (bond.name as any).es : bond.name;

                return `
        <div class="bond-item ${isActive ? 'active' : 'inactive'
                    }" data-bond-id="${bond.participants.join('-')}">
          <div class="bond-header" onclick="teamBuilder.toggleBondDetails(this)">
            <div class="bond-name">${bondName}</div>
            <div class="bond-controls">
              <span class="bond-count ${isActive ? 'complete' : ''
                    }">${currentCount}/${requiredCount}</span>
              <span class="expand-icon">▼</span>
            </div>
          </div>
          <div class="bond-details" style="display: none;">
                 ${generateBondEffectHTML(bond, currentPlayerIds, {
                        players: this.players,
                        getPlayerImageUrl: this.getPlayerImageUrl.bind(this),
                        formatBonusText: this.formatBonusText.bind(this),
                        getInitialBonusLevel: this.getInitialBonusLevel.bind(this)
                    })}
          </div>
        </div>
      `;
            })
            .join('');

        bondsSection.innerHTML = bondItems;
    }

    private renderSchoolBonds(): void {
        const schoolStats = document.getElementById('schoolStats');
        if (!schoolStats) return;

        // Get current team composition by school
        const schoolComposition = computeSchoolComposition(this.currentTeam);
        const currentLanguage = window.languageManager ? window.languageManager.getCurrentLanguage() : 'es';

        // Filter to only show school bonds that have at least 1 player (like normal bonds)
        const relevantSchoolBonds = this.schoolBonds.filter(schoolBond => {
            const schoolCount = schoolComposition[schoolBond.school] || 0;
            return schoolCount > 0; // Only show if there's at least 1 player from this school
        });

        if (relevantSchoolBonds.length === 0) {
            schoolStats.innerHTML = `<div class="no-players">${window.languageManager
                ? (window.languageManager.t('noBondsAvailable') as string)
                : 'No hay vínculos de escuela disponibles'
                }</div>`;
            return;
        }

        const schoolBondItems = relevantSchoolBonds.map(schoolBond => {
            const schoolCount = schoolComposition[schoolBond.school] || 0;
            // Use only the school name, not the full bond name
            const schoolName = schoolBond.school;

            // Bond is active only when it has exactly 4 players from the school
            const isActive = schoolCount >= 4;

            // Generate just the effect text without level selectors or participant images
            const effectText = schoolBond.rich_text ? this.generateSchoolBondEffectText(schoolBond.rich_text, currentLanguage) : '';

            return `
                <div class="bond-item ${isActive ? 'active' : 'inactive'}" data-bond-id="school-${schoolBond.school}">
                    <div class="bond-header" onclick="teamBuilder.toggleBondDetails(this)">
                        <div class="bond-name">${schoolName}</div>
                        <div class="bond-controls">
                            <span class="bond-count ${isActive ? 'complete' : ''}">${schoolCount}/4</span>
                            <span class="expand-icon">▼</span>
                        </div>
                    </div>
                    <div class="bond-details" style="display: none;">
                        ${effectText}
                    </div>
                </div>
            `;
        }).join('');

        schoolStats.innerHTML = schoolBondItems;
    }

    private generateSchoolBondEffectText(richText: any, language: string): string {
        if (!richText || !richText.template) return '';

        const template = richText.template[language] || richText.template.es || '';

        // Use the same rich text processing as normal bonds
        const processedText = this.processRichTextTemplate(template, richText.variables || [], language, 1);

        // Use the same structure as normal bonds with rich-text-body and rich-text-description
        return `
            <div class="bond-effect rich-text-bond">
                <div class="rich-text-body">
                    <div class="rich-text-description">${processedText}</div>
                </div>
            </div>
        `;
    }

    // Helper method to process rich text templates (same as in bondsRenderer.ts)
    private processRichTextTemplate(template: string, variables: any[], lang: string, level: number): string {
        return template.replace(/\[(.+?)\]/g, (_m, varName: string) => {
            const variable = variables.find((v: any) => v.name.toLowerCase() === varName.toLowerCase());
            if (!variable) return varName; // unknown
            let values = variable.levels;
            let arr = Array.isArray(values) ? values : (values[lang] || values.es || []);
            if (!Array.isArray(arr) || arr.length === 0) return varName;
            const value = arr[Math.min(level - 1, arr.length - 1)];
            return `<span class="rich-var" data-var="${varName}" data-level="${level}">${value}</span>`;
        });
    }


    private getInitialBonusLevel(bonus: any): string { return getInitialBonusLevel(bonus); }

    public setBondLevel(bondName: string, characterId: number, attribute: string, level: number): void {
        debug('setBondLevel:', bondName, characterId, attribute, level);

        // Unescapar el nombre del bond para la comparación
        const unescapedBondName = bondName.replace(/\\'/g, "'");

        // Encontrar el bond y actualizar la visualización
        const bonds = document.querySelectorAll('.bond-item');
        bonds.forEach((bondElement) => {
            const bondNameElement = bondElement.querySelector('.bond-name');
            if (bondNameElement &&
                (bondNameElement.textContent?.includes(unescapedBondName) ||
                    bondNameElement.textContent?.includes(bondName))) {

                // Actualizar botones activos para este atributo específico
                const levelSelector = bondElement.querySelector(
                    `.level-selector[data-character-id="${characterId}"][data-attribute="${attribute}"]`
                );
                if (levelSelector) {
                    const levelButtons = levelSelector.querySelectorAll('.level-btn');
                    levelButtons.forEach((btn, index) => {
                        btn.classList.toggle('active', index + 1 === level);
                    });

                    // Actualizar el efecto mostrado
                    const bond = this.bonds.find((b) => {
                        const bondNameText = typeof b.name === 'object'
                            ? (b.name as any)[window.languageManager?.getCurrentLanguage() || 'es'] || (b.name as any).es
                            : b.name;
                        return bondNameText?.includes(unescapedBondName) ||
                            unescapedBondName.includes(bondNameText) ||
                            bondNameText?.includes(bondName) ||
                            bondName.includes(bondNameText);
                    });

                    if (bond && (bond as any).effects_by_character) {
                        const characterEffect = (bond as any).effects_by_character.find(
                            (ce: any) => ce.character_id === characterId
                        );
                        if (characterEffect) {
                            const bonus = characterEffect.bonuses.find(
                                (b: any) => {
                                    const currentLanguage = window.languageManager?.getCurrentLanguage() || 'es';
                                    const bonusAttribute = typeof b.attribute === 'object'
                                        ? (b.attribute[currentLanguage] || b.attribute.es || b.attribute)
                                        : b.attribute;
                                    return bonusAttribute === attribute;
                                }
                            );
                            if (bonus && bonus.levels) {
                                // Handle both old format (array) and new format (object with language keys)
                                const currentLanguage = window.languageManager?.getCurrentLanguage() || 'es';
                                let levelValue;

                                if (Array.isArray(bonus.levels)) {
                                    // Old format
                                    levelValue = bonus.levels[level - 1];
                                } else if (typeof bonus.levels === 'object') {
                                    // New multilingual format
                                    const levelsArray = bonus.levels[currentLanguage] || bonus.levels.es || bonus.levels;
                                    levelValue = Array.isArray(levelsArray) ? levelsArray[level - 1] : levelsArray;
                                }

                                if (levelValue) {
                                    // Buscar el elemento que muestra el valor del efecto
                                    const effectValueElement = bondElement.querySelector(
                                        `.effect-value[data-character-id="${characterId}"][data-attribute="${attribute}"]`
                                    ) as HTMLElement;
                                    if (effectValueElement) {
                                        effectValueElement.textContent = this.formatBonusText(levelValue);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        });
    }

    // Rich text bond level setter
    public setRichBondLevel(bondId: number, level: number): void {
        try {
            const bond = this.bonds.find(b => (b as any).id === bondId);
            if (!bond || !(bond as any).rich_text) return;
            const rich = (bond as any).rich_text;
            const lang = window.languageManager ? window.languageManager.getCurrentLanguage() : 'es';
            const template = rich.template[lang] || rich.template.es;
            const descEl = document.getElementById(`rich-bond-desc-${bondId}`);
            if (!descEl) return;
            // Recompute description using helper from renderer (attached to window?)
            // Duplicated lightweight processor to avoid cross-module import cycles
            const processed = template.replace(/\[(.+?)\]/g, (_m: string, varName: string) => {
                const variable = rich.variables.find((v: any) => v.name.toLowerCase() === varName.toLowerCase());
                if (!variable) return varName;
                const values = variable.levels;
                let arr = Array.isArray(values) ? values : (values[lang] || values.es || []);
                if (!Array.isArray(arr) || arr.length === 0) return varName;
                const value = arr[Math.min(level - 1, arr.length - 1)];
                return `<span class=\"rich-var\" data-var=\"${varName}\" data-level=\"${level}\">${value}</span>`;
            });
            descEl.innerHTML = processed;
            // Update active button
            const container = document.querySelector(`[data-rich-bond-id='${bondId}']`);
            if (container) {
                container.querySelectorAll('.level-btn').forEach(btn => {
                    btn.classList.toggle('active', (btn as HTMLElement).dataset.level === String(level));
                });
            }
        } catch (e) {
            console.error('Error updating rich bond level', e);
        }
    }

    public toggleBondDetails(headerElement: HTMLElement): void {
        const bondItem = headerElement.closest('.bond-item') as HTMLElement;
        const details = bondItem.querySelector('.bond-details') as HTMLElement;

        // Close other open bond details
        document.querySelectorAll('.bond-item.expanded').forEach((openItem) => {
            if (openItem !== bondItem) {
                openItem.classList.remove('expanded');
                const openDetails = openItem.querySelector('.bond-details') as HTMLElement;
                if (openDetails) openDetails.style.display = 'none';
            }
        });

        const isExpanded = bondItem.classList.contains('expanded');
        if (isExpanded) {
            bondItem.classList.remove('expanded');
            details.style.display = 'none';
        } else {
            bondItem.classList.add('expanded');
            details.style.display = 'block';
        }
    }

    private renderSchoolStats(): void {
        const schoolStats = document.getElementById('schoolStats');
        const schoolComposition = this.getSchoolComposition();

        // Get all unique schools from current team
        const allSchools = [
            ...new Set(
                Object.values(this.currentTeam)
                    .filter((player) => player && player.school)
                    .map((player) => player!.school)
            ),
        ];

        if (!schoolStats) return;

        // If no players in team, show empty state
        if (allSchools.length === 0) {
            const noPlayersText = window.languageManager
                ? (window.languageManager.t('noPlayersSelected') as string)
                : 'No hay jugadores seleccionados';
            schoolStats.innerHTML = `<div class="no-players">${noPlayersText}</div>`;
            return;
        }

        // Sort schools by: 1) active buff (>=4 players) first, 2) player count desc, 3) alphabetical
        const sortedSchools = [...allSchools].sort((a, b) => {
            const aCount = schoolComposition[a] || 0;
            const bCount = schoolComposition[b] || 0;
            const aActive = aCount >= 4;
            const bActive = bCount >= 4;
            if (aActive && !bActive) return -1;
            if (!aActive && bActive) return 1;
            if (aCount !== bCount) return bCount - aCount;
            return a.localeCompare(b);
        });

        // Create school items from sorted list
        const schoolItems = sortedSchools
            .map((school) => {
                const count = schoolComposition[school] || 0;
                const isBuffActive = count >= 4;
                return `
                <div class="school-item ${isBuffActive ? 'buff-active' : ''}">
                    <span class="school-name">${school}</span>
                    <div class="school-status">
                        <span class="school-count ${count >= 4 ? 'complete' : ''}">${count}/4</span>
                    </div>
                </div>
            `;
            })
            .join('');

        schoolStats.innerHTML = schoolItems;
    }

    private createAvailablePlayerElement(player: Character): HTMLElement {
        const imageUrl = this.getPlayerImageUrl(player);
        const el = createPlayerCard(player, imageUrl, { variant: 'available', draggable: true });
        this.addDragListeners(el, player);
        return el;
    }

    private addDragListeners(element: HTMLElement, player: Character): void {
        addExternalDragListeners(element, player, {
            dragState: this.dragState,
            positionMappings: this.positionMappings,
            getCurrentTeam: () => this.currentTeam,
            placePlayerInPosition: this.placePlayerInPosition.bind(this),
            getDraggedFromPosition: () => this.draggedFromPosition,
            setDraggedFromPosition: (pos?: string) => { this.draggedFromPosition = pos; }
        });
    }

    private setupDragAndDrop(): void {
        setupCourtDragAndDrop({
            dragState: this.dragState,
            positionMappings: this.positionMappings,
            getCurrentTeam: () => this.currentTeam,
            placePlayerInPosition: this.placePlayerInPosition.bind(this),
            getDraggedFromPosition: () => this.draggedFromPosition,
            setDraggedFromPosition: (pos?: string) => { this.draggedFromPosition = pos; }
        });
    }

    // highlightValidPositions extracted to dragAndDrop module

    private placePlayerInPosition(player: Character, positionElement: HTMLElement): void {
        const positionClass = positionElement.className
            .split(' ')
            .find((cls) => cls.startsWith('position-') && this.positionMappings[cls]);

        if (!positionClass) return;

        // Detect si existe otra variante (mismo nombre diferente id) en otro slot distinto al target
        const existingDifferentVariant = Object.entries(this.currentTeam).find(([pos, p]) => p && p.name === player.name && p.id !== player.id && pos !== positionClass);
        if (existingDifferentVariant) {
            // Bloquear reemplazos cruzados entre posiciones con distinta variante
            return;
        }
        // Remover misma variante (por id) de su slot actual para permitir moverla
        this.currentTeam = removePlayerEverywhere(this.currentTeam, player.id);
        this.usedPlayerIds.forEach(id => {
            if (!Object.values(this.currentTeam).some(p => p && p.id === id)) {
                this.usedPlayerIds.delete(id);
            }
        });

        // Keep reference to origin before we potentially overwrite draggedFromPosition in swap logic
        const originPosition = this.dragState.draggedFromTeam ? this.draggedFromPosition : undefined;

        const existingPlayer = this.currentTeam[positionClass];
        const { team: updatedTeam } = addPlayerToTeam(this.currentTeam, positionClass, player);
        this.currentTeam = updatedTeam;
        this.usedPlayerIds.add(player.id);
        this.renderPlayerInPosition(player, positionElement);

        if (
            existingPlayer &&
            this.dragState.draggedFromTeam &&
            this.draggedFromPosition &&
            this.positionMappings[this.draggedFromPosition] === this.positionMappings[positionClass]
        ) {
            this.currentTeam[this.draggedFromPosition] = existingPlayer;
            const originalPosEl = document.querySelector(`.${this.draggedFromPosition}`) as HTMLElement;
            if (originalPosEl) {
                this.renderPlayerInPosition(existingPlayer, originalPosEl);
            }
        } else if (existingPlayer) {
            this.usedPlayerIds.delete(existingPlayer.id);
        }

        this.renderAvailablePlayers();
        this.updateTeamStats();

        // If it was a simple move (not a swap) from another court slot, clear the origin slot's UI
        if (originPosition && originPosition !== positionClass) {
            const originEl = document.querySelector(`.${originPosition}`) as HTMLElement | null;
            if (originEl && !this.currentTeam[originPosition]) {
                this.renderEmptyPosition(originEl, originPosition);
            }
        }
    }

    private removePlayerFromAllPositions(playerId: number): void {
        this.currentTeam = removePlayerEverywhere(this.currentTeam, playerId);
        this.usedPlayerIds.delete(playerId);
        const positions = document.querySelectorAll('.position');
        positions.forEach(posEl => {
            const positionClass = posEl.className.split(' ').find(cls => cls.startsWith('position-') && this.positionMappings[cls]);
            if (positionClass) {
                const p = this.currentTeam[positionClass];
                if (p) {
                    this.renderPlayerInPosition(p, posEl as HTMLElement);
                } else {
                    this.renderEmptyPosition(posEl as HTMLElement, positionClass);
                }
            }
        });
        this.renderAvailablePlayers();
        this.updateSchoolStats();
    }


    private renderPlayerInPosition(player: Character, positionElement: HTMLElement): void {
        const playerSlot = positionElement.querySelector('.player-slot') as HTMLElement;
        if (!playerSlot) return;

        const imageUrl = this.getPlayerImageUrl(player);
        const card = createPlayerCard(player, imageUrl, { variant: 'court', draggable: true });
        playerSlot.innerHTML = '';
        playerSlot.appendChild(card);

        const playerCard = card as HTMLElement;

        // Add drag event listeners for players in positions
        playerCard.addEventListener('dragstart', (e) => {
            this.dragState.isDragging = true;
            this.dragState.dragStartTime = Date.now();
            this.dragState.draggedPlayer = player;
            this.dragState.draggedFromTeam = true;
            this.draggedFromPosition = positionElement.className
                .split(' ')
                .find(
                    (cls) => cls.startsWith('position-') && this.positionMappings[cls]
                );
            this.dragState.dragSuccess = false;
            e.dataTransfer!.effectAllowed = 'move';
            e.dataTransfer!.setData('text/plain', player.id.toString());
            playerCard.style.opacity = '0.5';
        });

        playerCard.addEventListener('dragend', (_e) => {
            playerCard.style.opacity = '1';
            this.clearHighlights();

            // If drag was from team and not successful, remove from team
            if (this.dragState.draggedFromTeam && !this.dragState.dragSuccess) {
                this.removePlayerFromPosition(positionElement);
            }

            this.dragState.draggedPlayer = null;
            this.dragState.draggedFromTeam = false;
            this.dragState.dragSuccess = false;

            // Reset drag state after a short delay to allow click event to detect it
            setTimeout(() => {
                this.dragState.isDragging = false;
                this.dragState.dragStartTime = 0;
            }, 100);
        });

        // Add click event to open position selector (only if not dragging)
        playerSlot.addEventListener('click', (e) => {
            const timeSinceDrag = Date.now() - this.dragState.dragStartTime;

            // Only open selector if no recent drag operation and position selector not already active
            if (
                !this.dragState.isDragging &&
                timeSinceDrag > 200
            ) {
                e.stopPropagation();
                const positionClass = positionElement.className
                    .split(' ')
                    .find(
                        (cls) => cls.startsWith('position-') && this.positionMappings[cls]
                    );
                if (positionClass) {
                    showPositionSelector(this.positionSelectorCtx, positionClass, positionElement);
                }
            }
        });

        // Add right-click to remove player
        playerSlot.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            this.removePlayerFromPosition(positionElement);
        });
    }

    private renderEmptyPosition(positionElement: HTMLElement, positionClass: string): void {
        const playerSlot = positionElement.querySelector('.player-slot') as HTMLElement;
        if (!playerSlot) return;

        const requiredPosition = this.positionMappings[positionClass];
        if (!requiredPosition) return; // Si no hay posición válida, salir

        // Use centralized labels for position placeholders
        const positionNames = POSITION_LABELS;

        playerSlot.innerHTML = `
      <div class="player-card empty ${requiredPosition === 'L' ? 'libero' : ''
            }">
        <div class="position-label">${positionNames[requiredPosition] || requiredPosition
            }</div>
      </div>
    `;
    }

    private removePlayerFromPosition(positionElement: HTMLElement): void {
        const positionClass = positionElement.className
            .split(' ')
            .find((cls) => cls.startsWith('position-') && this.positionMappings[cls]);

        if (!positionClass) return;

        if (this.currentTeam[positionClass]) {
            const { team: updatedTeam, removed } = removePlayerFromTeam(this.currentTeam, positionClass);
            this.currentTeam = updatedTeam;
            if (removed) this.usedPlayerIds.delete(removed.id);
            this.renderEmptyPosition(positionElement, positionClass);
            this.renderAvailablePlayers();
            this.updateTeamStats();
        }
    }

    private setupEventListeners(): void {
        // Initialize empty positions
        const positions = document.querySelectorAll('.position');
        positions.forEach((position) => {
            const posElement = position as HTMLElement;
            const positionClass = posElement.className
                .split(' ')
                .find(
                    (cls) => cls.startsWith('position-') && this.positionMappings[cls]
                );
            if (positionClass) {
                this.renderEmptyPosition(posElement, positionClass);
            }
        });

        // Modal events
        const modal = document.getElementById('playerModal');
        const closeBtn = document.querySelector('.close') as HTMLElement;
        const selectBtn = document.getElementById('selectPlayerBtn') as HTMLElement;

        if (closeBtn) {
            closeBtn.onclick = () => {
                if (modal) modal.style.display = 'none';
            };
        }

        if (selectBtn) {
            selectBtn.onclick = () => {
                if (this.selectedPlayer) {
                    this.autoPlacePlayer(this.selectedPlayer);
                    if (modal) modal.style.display = 'none';
                }
            };
        }

        window.onclick = (event) => {
            if (event.target === modal) {
                if (modal) modal.style.display = 'none';
            }
        };

        // Add click events to empty positions
        positions.forEach((position) => {
            const posElement = position as HTMLElement;
            const positionClass = posElement.className
                .split(' ')
                .find(
                    (cls) => cls.startsWith('position-') && this.positionMappings[cls]
                );

            if (positionClass) {
                posElement.addEventListener('click', (e) => {
                    // Only show position selector if position is empty
                    if (!this.currentTeam[positionClass]) {
                        e.stopPropagation();
                        showPositionSelector(this.positionSelectorCtx, positionClass, posElement);
                    }
                });
            }
        });
    }

    private autoPlacePlayer(player: Character): void {
        // Find available positions for this player
        const availablePositions = Object.keys(this.positionMappings).filter(
            (posClass) => {
                return (
                    this.positionMappings[posClass] === player.position &&
                    !this.currentTeam[posClass]
                );
            }
        );

        if (availablePositions.length > 0) {
            const positionElement = document.querySelector(
                `.${availablePositions[0]}`
            ) as HTMLElement;
            if (positionElement) {
                this.placePlayerInPosition(player, positionElement);
            }
        } else {
            alert(
                `No hay posiciones disponibles para ${player.name
                } (${this.getPositionName(player.position)})`
            );
        }
    }

    private positionSelectorCtx: PositionSelectorContext = new PositionSelectorContext({
        positionMappings: {} as any,
        usedPlayerIds: this.usedPlayerIds,
        getSortedPlayers: this.getSortedPlayers.bind(this),
        createPositionPlayerCard: (player: Character) => {
            const imageUrl = this.getPlayerImageUrl(player);
            return createSelectablePlayerCard(player, imageUrl, (p) => this.selectPlayerFromPositionSelector(p));
        },
        placePlayerInPosition: this.placePlayerInPosition.bind(this),
        onClose: () => { /* hook for future cleanup */ }
    });

    private initializePositionSelector(): void {
        // Link context to actual mappings
        this.positionSelectorCtx.positionMappings = this.positionMappings as any;
        setupPositionSelector(this.positionSelectorCtx);
    }

    private hidePositionSelector(): void {
        hidePositionSelector(this.positionSelectorCtx);
    }

    // createPositionPlayerCard extracted to components/SelectablePlayerCard.ts

    private selectPlayerFromPositionSelector(player: Character): void {
        if (this.positionSelectorCtx.selectedPosition) {
            const positionElement = document.querySelector(
                `.${this.positionSelectorCtx.selectedPosition}`
            ) as HTMLElement;
            if (positionElement) {
                this.placePlayerInPosition(player, positionElement);
                hidePositionSelector(this.positionSelectorCtx);
            }
        }
    }

    private setupSortingControls(): void {
        const sortBySelect = document.getElementById('sortBy') as HTMLSelectElement;
        if (sortBySelect) {
            sortBySelect.addEventListener('change', (e) => {
                const target = e.target as HTMLSelectElement;
                this.currentSortBy = target.value as SortBy;
                this.renderAvailablePlayers();
                // Re-render position selector if active
                if (this.positionSelectorCtx.positionSelectorActive && this.positionSelectorCtx.selectedPosition) {
                    const positionElement = document.querySelector(
                        `.${this.positionSelectorCtx.selectedPosition}`
                    ) as HTMLElement;
                    showPositionSelector(this.positionSelectorCtx, this.positionSelectorCtx.selectedPosition, positionElement);
                }
            });
        }
    }

    private initializeSchoolStats(): void {
        this.updateTeamStats();
    }

    private initializeBonds(): void {
        this.updateBonds();
    }

    private setupRotationButton(): void {
        const rotationButton = document.getElementById('rotationButton');
        debug('Rotation button found:', !!rotationButton);
        if (rotationButton) {
            rotationButton.setAttribute('role', 'button');
            rotationButton.setAttribute('tabindex', '0');
            rotationButton.setAttribute('aria-label', window.languageManager ? (window.languageManager.t('rotateTooltip') as string) : 'Rotate players');
            rotationButton.addEventListener('click', () => {
                debug('Rotation button clicked');
                rotatePlayersClockwise({
                    currentTeam: this.currentTeam,
                    positionMappings: this.positionMappings,
                    renderPlayerInPosition: this.renderPlayerInPosition.bind(this),
                    renderEmptyPosition: this.renderEmptyPosition.bind(this),
                    updateTeamStats: this.updateTeamStats.bind(this)
                });
            });
            rotationButton.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    (rotationButton as HTMLElement).click();
                }
            });
        } else {
            console.error('Rotation button not found');
        }
    }

    public updateTeamStats(): void {
        this.updateSchoolStats();
        this.updateBonds();
    }

    private getSchoolComposition(): { [school: string]: number } {
        return computeSchoolComposition(this.currentTeam);
    }

    private clearHighlights(): void { clearHighlights(); }
}

// Export for global use
(window as any).HaikyuTeamBuilder = HaikyuTeamBuilder;

// Add global method for bond details toggling
(window as any).teamBuilder = {
    toggleBondDetails: function (headerElement: HTMLElement) {
        if ((window as any).teamBuilderInstance) {
            (window as any).teamBuilderInstance.toggleBondDetails(headerElement);
        }
    }
};
