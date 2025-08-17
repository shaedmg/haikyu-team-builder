import {
    Character,
    BaseCharacter,
    Bond,
    SimpleBond,
    BondsData,
    GameData,
    ImageMapping,
    CurrentTeam,
    SchoolStats,
    Language,
    SortBy,
    Rarity,
    CharactersData,
    Position,
    DragState,
    PositionMapping,
    HaikyuTeamBuilderConfig
} from './types/index.js';

export class HaikyuTeamBuilder {
    private players: Character[] = [];
    private bonds: Bond[] = [];
    private imageMapping: ImageMapping = {};
    private currentTeam: CurrentTeam = {};
    private selectedPlayer: Character | null = null;
    private selectedPosition: string | null = null;
    private positionSelectorActive: boolean = false;
    private usedPlayerIds: Set<number> = new Set();
    private positionMappings: PositionMapping;
    private dragState: DragState;
    private currentSortBy: SortBy = 'rarity'; // Default sort by rarity
    private rarityOrder: Rarity[] = ['SP', 'UR', 'SSR', 'SR', 'R', 'N'];
    private draggedFromPosition?: string;

    constructor() {
        this.currentSortBy = 'rarity'; // Changed default sort to rarity

        this.positionMappings = {
            'position-1': 'OP', // Back left - Opposite (SERVING POSITION)
            'position-5': 'WS', // Back right - Wing Spiker
            'position-6': 'MB', // Back center - Middle Blocker
            'position-3': 'MB', // Front center - Middle Blocker
            'position-4': 'WS', // Front left - Wing Spiker
            'position-2': 'S',  // Front right - Setter
            'position-libero': 'L', // Libero
        };

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
        console.log('Initializing with language:', currentLanguage);

        await this.loadPlayers(currentLanguage);
        this.renderAvailablePlayers();
        this.setupDragAndDrop();
        this.setupEventListeners();
        this.setupPositionSelector();
        this.setupSortingControls();
        this.initializeSchoolStats();
        this.initializeBonds();
        this.setupRotationButton();
    }

    public async loadPlayers(language: Language = 'es'): Promise<void> {
        try {
            console.log(`Loading players with language: ${language}`);

            // Load base character data
            const charactersResponse = await fetch('./characters.json');
            if (!charactersResponse.ok) {
                throw new Error(`HTTP error loading characters! status: ${charactersResponse.status}`);
            }
            const charactersData: CharactersData = await charactersResponse.json();

            // Load bonds data
            const bondsResponse = await fetch('./bonds.json');
            if (!bondsResponse.ok) {
                throw new Error(`HTTP error loading bonds! status: ${bondsResponse.status}`);
            }
            const bondsData: BondsData = await bondsResponse.json();

            // Convert base characters to characters with names already included
            this.players = Object.values(charactersData.characters).map((baseChar: BaseCharacter) => ({
                ...baseChar,
                name: baseChar.name // Name is now included directly
            }) as Character);
            console.log({ players: this.players })
            console.log({ characters: charactersData.characters })
            // Convert bonds to simple format (use language-specific names)
            this.bonds = bondsData.bonds.map(bond => ({
                id: bond.id,
                name: bond.name, // Keep as multilingual object for proper handling
                participants: bond.participants,
                is_link_skill: bond.is_link_skill,
                effects_by_character: bond.effects_by_character, // Keep original structure
                effect_summary: bond.effect_summary,
                type: bond.is_link_skill ? 'link_skill' : 'kizuna_skill',
                currentCount: 0,
                requiredCount: bond.participants.length,
                isActive: false,
                missingCount: bond.participants.length
            } as Bond));

            console.log(
                `Loaded ${this.players.length} players and ${this.bonds.length} bonds (Language: ${language})`
            );
            console.log(
                'Sample bonds:',
                this.bonds
                    .slice(0, 3)
                    .map((b) => ({ name: b.name, participants: b.participants }))
            );
        } catch (error) {
            console.warn('Error loading players, trying fallback:', (error as Error).message);
            // Fallback to old format if new format fails
            await this.loadPlayersLegacy(language);
        }
    }

    private async loadPlayersLegacy(language: Language = 'es'): Promise<void> {
        try {
            // Fallback to old JSON structure
            const jsonFile = language === 'en'
                ? './haikyu_fly_high_full_v3_en.json'
                : './haikyu_fly_high_full_v3.json';
            console.log(`Loading players from legacy format: ${jsonFile}`);

            const response = await fetch(jsonFile);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data: GameData = await response.json();
            this.players = data.characters || [];
            // this.bonds = data.bonds || []; // Legacy format - not compatible with new Bond type
            console.log(
                `Loaded ${this.players.length} players from legacy format (bonds loaded separately)`
            );
        } catch (error) {
            console.warn('Error loading legacy players, using fallback:', (error as Error).message);
            // Final fallback data if everything fails
            this.players = this.getFallbackPlayers();
            this.bonds = [];
        }
    }

    private getPlayerImageUrl(player: Character): string {
        // Use the profile_image_url directly (should now point to local paths)
        return (
            player.profile_image_url ||
            'https://via.placeholder.com/150x150/cccccc/666666?text=No+Image'
        );
    }

    private formatBonusText(bonusValue: string): string {
        console.log('formatBonusText called with:', bonusValue);

        if (!bonusValue || typeof bonusValue !== 'string') {
            console.log('returning early - invalid input');
            return bonusValue || '';
        }

        // Handle special common values
        if (bonusValue === 'Activado' || bonusValue === 'Eliminado') {
            return bonusValue;
        }

        // Handle multipliers like "x180%", "x265%", etc.
        const multiplierMatch = bonusValue.match(/^x(\d+(?:\.\d+)?)%$/);
        if (multiplierMatch) {
            const value = multiplierMatch[1];
            const result = `×${value}%`;
            console.log('Multiplier match found:', value, '-> result:', result);
            return result;
        }

        // Handle cases like "+5 +1%", "+7 +2%", etc. (with space between numbers and percentage)
        const complexMatch = bonusValue.match(/^(\+?\d+)\s+(\+?\d+%)$/);
        if (complexMatch) {
            let [, points, percentage] = complexMatch;
            console.log('Complex match found:', points, percentage);

            // Ensure both values have the '+' symbol
            if (!points.startsWith('+') && !points.startsWith('-')) {
                points = '+' + points;
            }
            if (!percentage.startsWith('+') && !percentage.startsWith('-')) {
                percentage = '+' + percentage;
            }

            const result = `${points} ${window.languageManager ? 'puntos' : 'puntos'
                } ${percentage} ${window.languageManager
                    ? 'adicional'
                    : 'adicional'
                }`;
            console.log('Complex result:', result);
            return result;
        }

        // Handle simple percentages like "6%", "10%", etc.
        const percentageMatch = bonusValue.match(/^(\+?-?\d+(?:\.\d+)?)%$/);
        if (percentageMatch) {
            const value = percentageMatch[1];
            let result = value;
            if (!value.startsWith('+') && !value.startsWith('-')) {
                result = '+' + value;
            }
            result += '%';
            console.log('Percentage match found:', value, '-> result:', result);
            return result;
        }

        // Handle simple numbers like "6", "10", etc.
        const numberMatch = bonusValue.match(/^(\+?-?\d+(?:\.\d+)?)$/);
        if (numberMatch) {
            const value = numberMatch[1];
            let result = value;
            if (!value.startsWith('+') && !value.startsWith('-')) {
                result = '+' + value;
            }
            console.log('Number match found:', value, '-> result:', result);
            return result;
        }

        // If it already has '+' or '-', return as is
        if (bonusValue.startsWith('+') || bonusValue.startsWith('-')) {
            console.log('Already has sign, returning as is:', bonusValue);
            return bonusValue;
        }

        // If no pattern matches, return original value
        console.log('No match, returning original:', bonusValue);
        return bonusValue;
    }

    private getFallbackPlayers(): Character[] {
        return [
        ];
    }

    private renderAvailablePlayers(): void {
        const playerGrid = document.querySelector('.player-grid') as HTMLElement;
        if (!playerGrid) return;

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
                    // Only show players that are not already in the team
                    if (!this.usedPlayerIds.has(player.id)) {
                        const playerElement = this.createAvailablePlayerElement(player);
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

    private getPositionName(position: Position): string {
        const names = {
            L: 'Libero',
            MB: 'Middle Blocker',
            WS: 'Wing Spiker',
            OP: 'Opposite',
            S: 'Setter',
        };
        return names[position] || position;
    }

    // Export for global use
    public updateBonds(): void {
        this.renderBonds();
    }

    public updateSchoolStats(): void {
        this.renderSchoolStats();
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

        // Filter and evaluate bonds with sorting data
        console.log('=== DEBUGGING BONDS ===');
        console.log('Current team player IDs:', currentPlayerIds);
        console.log('Total bonds available:', this.bonds.length);

        const relevantBonds = this.bonds
            .filter((bond) => {
                // Show bonds that have at least one participant in the current team
                if (!bond.participants || bond.participants.length === 0) {
                    return false;
                }

                // Show if at least one participant is in the team
                const hasParticipantInTeam = bond.participants.some((participantId) =>
                    currentPlayerIds.includes(participantId)
                );

                return hasParticipantInTeam;
            })
            .map((bond) => {
                // Add sorting information to each bond
                const presentParticipants = bond.participants.filter((participantId) =>
                    currentPlayerIds.includes(participantId)
                );
                const requiredCount = bond.participants.length;
                const currentCount = presentParticipants.length;
                const isActive = currentCount >= requiredCount;
                const missingCount = requiredCount - currentCount;

                return {
                    ...bond,
                    currentCount,
                    requiredCount,
                    isActive,
                    missingCount,
                };
            })
            .sort((a, b) => {
                // First sort by active status (active bonds first)
                if (a.isActive && !b.isActive) return -1;
                if (!a.isActive && b.isActive) return 1;

                // Then sort by current count (more current players first)
                if (a.currentCount !== b.currentCount) {
                    return b.currentCount - a.currentCount; // Descending order
                }

                // Finally sort alphabetically by name
                const currentLanguage = window.languageManager ? window.languageManager.getCurrentLanguage() : 'es';
                const aName = typeof a.name === 'object' ? (a.name as any)[currentLanguage] || (a.name as any).es : a.name;
                const bName = typeof b.name === 'object' ? (b.name as any)[currentLanguage] || (b.name as any).es : b.name;
                return aName.localeCompare(bName);
            });

        console.log('Relevant bonds after filtering:', relevantBonds.length);

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
              <span class="expand-icon">▶</span>
            </div>
          </div>
          <div class="bond-details" style="display: none;">
            ${this.generateBondEffectHTML(bond, currentPlayerIds)}
          </div>
        </div>
      `;
            })
            .join('');

        bondsSection.innerHTML = bondItems;
    }

    private generateBondEffectHTML(bond: any, currentPlayerIds: number[] = []): string {
        console.log('=== generateBondEffectHTML called ===');
        console.log('Bond name:', bond.name);
        console.log('Bond object keys:', Object.keys(bond));
        console.log('Bond is_link_skill:', bond.is_link_skill);

        const currentLanguage = window.languageManager ? window.languageManager.getCurrentLanguage() : 'es';
        const bondName = typeof bond.name === 'object' ? (bond.name as any)[currentLanguage] || (bond.name as any).es : bond.name;

        // Si no tiene effects_by_character, mostrar mensaje
        if (!bond.effects_by_character || bond.effects_by_character.length === 0) {
            console.log('Bond sin effects_by_character:', bondName);
            const t = window.languageManager
                ? window.languageManager.t.bind(window.languageManager)
                : (key: string) => {
                    const fallbacks: { [key: string]: string } = {
                        noDetailedEffects: 'Vínculo sin efectos detallados:',
                        bondType: 'Tipo:',
                        linkSkill: 'Link Skill',
                        kizunaSkill: 'Kizuna Skill',
                    };
                    return fallbacks[key] || key;
                };

            return `<div class="bond-effect simple-bond">
                <p>${t('noDetailedEffects')} ${bondName}</p>
                <p>${t('bondType')} ${bond.is_link_skill ? t('linkSkill') : t('kizunaSkill')}</p>
            </div>`;
        }

        // Priorizar effects_by_character si existe, incluso para kizuna_skills
        if (bond.effects_by_character && bond.effects_by_character.length > 0) {
            // Attribute bond - show effects by character and levels
            let effectsHTML = '<div class="bond-effect attribute-bond">';
            effectsHTML += '<div class="bond-participants-horizontal">';

            bond.participants.forEach((participantId: number) => {
                const player = this.players.find((p) => p.id === participantId);
                const isInTeam = currentPlayerIds.includes(participantId);
                const playerImageUrl = player ? this.getPlayerImageUrl(player) : '';
                const borderClass = isInTeam ? 'participant-in-team' : 'participant-missing';

                console.log(`Processing participant ${participantId}:`, {
                    playerFound: !!player,
                    isInTeam: isInTeam,
                    currentPlayerIdsLength: currentPlayerIds.length,
                });

                if (playerImageUrl) {
                    effectsHTML += `<img src="${playerImageUrl}" alt="${player ? player.name : participantId
                        }" class="participant-image ${borderClass}" title="${player ? player.name : `ID: ${participantId}`
                        }">`;
                }
            });

            effectsHTML += '</div>'; // Luego mostrar las bonificaciones por personaje

            // Primero mostrar la lista de personajes participantes (formato horizontal simple)
            effectsHTML += '<div class="bonifications-section">';
            const t = window.languageManager
                ? window.languageManager.t.bind(window.languageManager)
                : (key: string) => {
                    const fallbacks: { [key: string]: string } = {
                        effectsPerCharacter: 'Efectos por Personaje:',
                    };
                    return fallbacks[key] || key;
                };

            effectsHTML += `<h4 class="bonifications-title">${t('effectsPerCharacter')}</h4>`;

            bond.effects_by_character.forEach((characterEffect: any) => {
                const player = this.players.find((p) => p.id === characterEffect.character_id);
                const playerName = player ? player.name : `ID: ${characterEffect.character_id}`;
                const playerImageUrl = player ? this.getPlayerImageUrl(player) : null;

                effectsHTML += `<div class="character-effect-container">
                    <div class="character-header">
                        ${playerImageUrl ? `<img src="${playerImageUrl}" alt="${playerName}" class="character-effect-image">` : ''}
                        <div class="character-info">
                            <div class="character-name">${playerName}</div>
                            <div class="character-school">${player ? player.school : ''}</div>
                        </div>
                    </div>`;

                characterEffect.bonuses.forEach((bonus: any, bonusIndex: number) => {
                    console.log(`Processing bonus ${bonusIndex} for character ${characterEffect.character_id}:`, bonus);
                    console.log('Bonus levels:', bonus.levels);
                    console.log('Bonus levels length:', bonus.levels ? bonus.levels.length : 'undefined');
                    console.log('First level value:', bonus.levels && bonus.levels.length > 0 ? bonus.levels[0] : 'N/A');

                    // Get attribute name and translate it
                    const rawAttributeName = typeof bonus.attribute === 'object'
                        ? (bonus.attribute[currentLanguage] || bonus.attribute.es || bonus.attribute)
                        : bonus.attribute;
                    const attributeName = window.languageManager ? window.languageManager.translateAttribute(rawAttributeName) : rawAttributeName;

                    effectsHTML += `<div class="bonus-container">
                        <div class="bonus-attribute">${attributeName}</div>
                        <div class="level-selector" data-character-id="${characterEffect.character_id}" data-attribute="${rawAttributeName}">`;

                    // Crear botones para cada nivel
                    if (bonus.levels) {
                        const currentLanguage = window.languageManager?.getCurrentLanguage() || 'es';
                        let levelsArray;

                        // Handle both old format (array) and new format (object with language keys)
                        if (Array.isArray(bonus.levels)) {
                            // Old format
                            levelsArray = bonus.levels;
                        } else if (typeof bonus.levels === 'object') {
                            // New multilingual format
                            levelsArray = bonus.levels[currentLanguage] || bonus.levels.es || bonus.levels;
                        }

                        if (Array.isArray(levelsArray) && levelsArray.length > 0) {
                            levelsArray.forEach((level: string, index: number) => {
                                const levelNum = index + 1;
                                const isActive = index === 0; // Por defecto nivel 1 activo
                                const escapedBondName = bondName.replace(/'/g, "\\'");
                                effectsHTML += `<button class="level-btn ${isActive ? 'active' : ''}" 
                                    data-level="${levelNum}" 
                                    onclick="window.teamBuilder.setBondLevel('${escapedBondName}', ${characterEffect.character_id}, '${rawAttributeName}', ${levelNum})">
                                    Lv.${levelNum}
                                </button>`;
                            });
                        } else {
                            const noLevelsText = window.languageManager ? window.languageManager.t('noLevelsAvailable') : 'Sin niveles disponibles';
                            effectsHTML += `<span class="no-levels">${noLevelsText}</span>`;
                        }
                    } else {
                        const noLevelsText = window.languageManager ? window.languageManager.t('noLevelsAvailable') : 'Sin niveles disponibles';
                        effectsHTML += `<span class="no-levels">${noLevelsText}</span>`;
                    }

                    effectsHTML += `</div>
                        <div class="current-effect">
                            <span class="effect-value" data-character-id="${characterEffect.character_id}" data-attribute="${rawAttributeName}">${this.formatBonusText(
                        this.getInitialBonusLevel(bonus)
                    )}</span>
                        </div>
                    </div>`;
                });

                effectsHTML += `</div>`;
            });

            effectsHTML += '</div></div>'; // Cerrar bonifications-section y bond-effect
            console.log('Generated HTML length:', effectsHTML.length);
            console.log('HTML preview:', effectsHTML.substring(0, 200) + '...');
            return effectsHTML;
        } else if (bond.is_link_skill) {
            // Kizuna Skill - show general effect
            const t = window.languageManager
                ? window.languageManager.t.bind(window.languageManager)
                : (key: string) => {
                    const fallbacks: { [key: string]: string } = {
                        kizunaSkillType: '🔗 Habilidad Kizuna',
                        specialEffect: 'Efecto especial',
                    };
                    return fallbacks[key] || key;
                };

            const effectDescription = bond.effect_summary && bond.effect_summary[currentLanguage]
                ? bond.effect_summary[currentLanguage]
                : bond.effect_summary && bond.effect_summary.es
                    ? bond.effect_summary.es
                    : t('specialEffect');

            return `<div class="bond-effect kizuna-skill">
                <div class="effect-type">${t('kizunaSkillType')}</div>
                <div class="effect-description">${effectDescription}</div>
            </div>`;
        }

        return '<div class="bond-effect">Tipo de bond no reconocido</div>';
    }

    private getInitialBonusLevel(bonus: any): string {
        if (!bonus.levels) return 'N/A';

        const currentLanguage = window.languageManager?.getCurrentLanguage() || 'es';

        // Handle both old format (array) and new format (object with language keys)
        if (Array.isArray(bonus.levels)) {
            // Old format
            return bonus.levels.length > 0 ? bonus.levels[0] : 'N/A';
        } else if (typeof bonus.levels === 'object') {
            // New multilingual format
            const levelsArray = bonus.levels[currentLanguage] || bonus.levels.es || bonus.levels;
            return Array.isArray(levelsArray) && levelsArray.length > 0 ? levelsArray[0] : 'N/A';
        }

        return 'N/A';
    }

    public setBondLevel(bondName: string, characterId: number, attribute: string, level: number): void {
        console.log('setBondLevel called:', bondName, characterId, attribute, level);

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

    public toggleBondDetails(headerElement: HTMLElement): void {
        const bondItem = headerElement.closest('.bond-item') as HTMLElement;
        const details = bondItem.querySelector('.bond-details') as HTMLElement;
        const icon = headerElement.querySelector('.expand-icon') as HTMLElement;

        // Close other open bond details
        document.querySelectorAll('.bond-details').forEach((detail) => {
            const detailEl = detail as HTMLElement;
            if (detailEl !== details) {
                detailEl.style.display = 'none';
                const otherIcon = detailEl
                    .closest('.bond-item')
                    ?.querySelector('.expand-icon') as HTMLElement;
                if (otherIcon) otherIcon.textContent = '▶';
            }
        });

        // Toggle current bond details
        if (details.style.display === 'none') {
            details.style.display = 'block';
            icon.textContent = '▼';
        } else {
            details.style.display = 'none';
            icon.textContent = '▶';
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

        // Create school items
        const schoolItems = allSchools
            .map((school) => {
                const count = schoolComposition[school] || 0;
                const isBuffActive = count >= 4;

                return `
        <div class="school-item ${isBuffActive ? 'buff-active' : ''}">
          <span class="school-name">${school}</span>
          <div class="school-status">
            <span class="school-count ${count >= 4 ? 'complete' : ''
                    }">${count}/4</span>
          </div>
        </div>
      `;
            })
            .join('');

        schoolStats.innerHTML = schoolItems;
    }

    // Placeholder methods that will be implemented
    private createAvailablePlayerElement(player: Character): HTMLElement {
        const playerDiv = document.createElement('div');
        playerDiv.className = 'available-player';
        playerDiv.draggable = true;
        playerDiv.dataset.playerId = player.id.toString();
        playerDiv.dataset.position = player.position;

        const imageUrl = this.getPlayerImageUrl(player);

        playerDiv.innerHTML = `
      <div class="player-image" style="background-image: url('${imageUrl}')"></div>
      <div class="player-name">${player.name}</div>
      <div class="position-tag">${player.position}</div>
    `;

        this.addDragListeners(playerDiv, player);
        return playerDiv;
    }

    private addDragListeners(element: HTMLElement, player: Character): void {
        element.addEventListener('dragstart', (e) => {
            this.dragState.draggedPlayer = player;
            this.dragState.draggedFromTeam = false;
            this.dragState.dragSuccess = false;
            e.dataTransfer!.effectAllowed = 'move';
            e.dataTransfer!.setData('text/plain', player.id.toString());
            element.style.opacity = '0.5';
        });

        element.addEventListener('dragend', (e) => {
            element.style.opacity = '1';
            this.clearHighlights();
            this.dragState.draggedPlayer = null;
            this.dragState.draggedFromTeam = false;
            this.dragState.dragSuccess = false;
        });

        element.addEventListener('click', () => {
            // this.showPlayerModal(player); // Disabled temporarily
        });
    }

    private setupDragAndDrop(): void {
        const courtPositions = document.querySelectorAll('.position');

        courtPositions.forEach((position) => {
            const posElement = position as HTMLElement;

            posElement.addEventListener('dragover', (e) => {
                e.preventDefault();
                e.dataTransfer!.dropEffect = 'move';

                // Check if position is valid for dragged player (allow replacement)
                if (
                    this.dragState.draggedPlayer &&
                    this.isValidPosition(this.dragState.draggedPlayer, posElement.className) &&
                    !this.isDuplicatePlayer(this.dragState.draggedPlayer, posElement)
                ) {
                    posElement.style.backgroundColor = 'rgba(76, 175, 80, 0.5)';
                    posElement.style.transform = 'scale(1.02)';
                } else {
                    posElement.style.backgroundColor = '';
                    posElement.style.transform = '';
                }
            });

            posElement.addEventListener('dragleave', (e) => {
                posElement.style.backgroundColor = '';
                posElement.style.transform = '';
            });

            posElement.addEventListener('drop', (e) => {
                e.preventDefault();
                posElement.style.backgroundColor = '';
                posElement.style.transform = '';

                if (
                    this.dragState.draggedPlayer &&
                    this.isValidPosition(this.dragState.draggedPlayer, posElement.className) &&
                    !this.isDuplicatePlayer(this.dragState.draggedPlayer, posElement)
                ) {
                    this.dragState.dragSuccess = true;
                    this.placePlayerInPosition(this.dragState.draggedPlayer, posElement);
                    this.clearHighlights();
                }
            });
        });

        // Highlight valid positions when dragging starts
        document.addEventListener('dragstart', (e) => {
            if (this.dragState.draggedPlayer) {
                this.highlightValidPositions(this.dragState.draggedPlayer);
            }
        });

        document.addEventListener('dragend', (e) => {
            this.clearHighlights();
        });
    }

    private isValidPosition(player: Character, positionClasses: string): boolean {
        const positionClass = positionClasses
            .split(' ')
            .find((cls) => cls.startsWith('position-') && this.positionMappings[cls]);

        if (!positionClass) return false;

        const requiredPosition = this.positionMappings[positionClass];
        return player.position === requiredPosition;
    }

    private isDuplicatePlayer(draggedPlayer: Character, targetPosition: HTMLElement): boolean {
        // Get the position class of the target
        const targetPositionClass = targetPosition.className
            .split(' ')
            .find((cls) => cls.startsWith('position-') && this.positionMappings[cls]);

        // If dragging from team, allow swaps between same position types
        if (this.dragState.draggedFromTeam && this.draggedFromPosition) {
            const sourcePositionType = this.positionMappings[this.draggedFromPosition];
            const targetPositionType = this.positionMappings[targetPositionClass!];

            // Allow movement between same position types (e.g., MB to MB)
            if (sourcePositionType === targetPositionType) {
                return false;
            }
        }

        // Check if the same player (same ID) is already in another position
        return Object.entries(this.currentTeam).some(([pos, player]) => {
            return (
                player && player.id === draggedPlayer.id && pos !== targetPositionClass
            );
        });
    }

    private highlightValidPositions(player: Character): void {
        const courtPositions = document.querySelectorAll('.position');
        courtPositions.forEach((position) => {
            const posElement = position as HTMLElement;
            if (
                this.isValidPosition(player, posElement.className) &&
                !this.isDuplicatePlayer(player, posElement)
            ) {
                posElement.style.backgroundColor = 'rgba(76, 175, 80, 0.3)';
                posElement.style.border = '3px solid #4CAF50';
            }
        });
    }

    private placePlayerInPosition(player: Character, positionElement: HTMLElement): void {
        const positionClass = positionElement.className
            .split(' ')
            .find((cls) => cls.startsWith('position-') && this.positionMappings[cls]);

        if (!positionClass) return;

        // Check if there's already a player in this position for swapping
        const existingPlayer = this.currentTeam[positionClass];

        // Remove player from current position if exists
        this.removePlayerFromAllPositions(player.id);

        // Add player to new position
        this.currentTeam[positionClass] = player;
        this.usedPlayerIds.add(player.id);
        this.renderPlayerInPosition(player, positionElement);

        // If there was an existing player and this is a position swap
        if (
            existingPlayer &&
            this.dragState.draggedFromTeam &&
            this.positionMappings[this.draggedFromPosition!] ===
            this.positionMappings[positionClass]
        ) {
            // Place the existing player in the dragged player's original position
            this.currentTeam[this.draggedFromPosition!] = existingPlayer;
            const originalPositionEl = document.querySelector(
                `.${this.draggedFromPosition}`
            ) as HTMLElement;
            if (originalPositionEl) {
                this.renderPlayerInPosition(existingPlayer, originalPositionEl);
            }
        } else if (existingPlayer) {
            // If not a valid swap, remove the existing player from used list
            this.usedPlayerIds.delete(existingPlayer.id);
        }

        // Update the available players list and team stats
        this.renderAvailablePlayers();
        this.updateTeamStats();

        console.log(`Placed ${player.name} in ${positionClass}`);
    }

    private removePlayerFromAllPositions(playerId: number): void {
        Object.keys(this.currentTeam).forEach((pos) => {
            if (this.currentTeam[pos] && this.currentTeam[pos]!.id === playerId) {
                this.usedPlayerIds.delete(playerId);
                delete this.currentTeam[pos];
                // Clear the visual representation
                const positionEl = document.querySelector(`.${pos}`) as HTMLElement;
                if (positionEl) {
                    this.renderEmptyPosition(positionEl, pos);
                }
            }
        });

        // Update available players and school statistics
        this.renderAvailablePlayers();
        this.updateSchoolStats();
    }

    private renderPlayerInPosition(player: Character, positionElement: HTMLElement): void {
        const playerSlot = positionElement.querySelector('.player-slot') as HTMLElement;
        if (!playerSlot) return;

        const imageUrl = this.getPlayerImageUrl(player);
        playerSlot.innerHTML = `
      <div class="player-card filled" data-player-id="${player.id}" draggable="true">
        <div class="player-image" style="background-image: url('${imageUrl}')"></div>
        <div class="player-name">${player.name}</div>
        <div class="position-tag">${player.position}</div>
      </div>
    `;

        const playerCard = playerSlot.querySelector('.player-card') as HTMLElement;

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

        playerCard.addEventListener('dragend', (e) => {
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
                timeSinceDrag > 200 &&
                !this.positionSelectorActive
            ) {
                e.stopPropagation();
                const positionClass = positionElement.className
                    .split(' ')
                    .find(
                        (cls) => cls.startsWith('position-') && this.positionMappings[cls]
                    );
                if (positionClass) {
                    this.showPositionSelector(positionClass, positionElement);
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
        const positionNames = {
            L: 'L',
            MB: 'MB',
            WS: 'WS',
            OP: 'OP',
            S: 'S',
        };

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
            const removedPlayer = this.currentTeam[positionClass];

            // Remove from team and from used players set
            delete this.currentTeam[positionClass];
            this.usedPlayerIds.delete(removedPlayer!.id);

            this.renderEmptyPosition(positionElement, positionClass);

            // Re-render available players to show the removed player again
            this.renderAvailablePlayers();

            // Update school statistics and bonds
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
                        this.showPositionSelector(positionClass, posElement);
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

    private setupPositionSelector(): void {
        const positionSelector = document.getElementById('positionSelector');
        const closeBtn = document.getElementById('positionSelectorClose');

        // Close button event
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                this.hidePositionSelector();
            });
        }

        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.positionSelectorActive) {
                this.hidePositionSelector();
            }
        });

        // Close when clicking outside
        document.addEventListener('click', (e) => {
            const target = e.target as HTMLElement;
            if (
                this.positionSelectorActive &&
                positionSelector &&
                !positionSelector.contains(target) &&
                !target.closest('.position')
            ) {
                this.hidePositionSelector();
            }
        });
    }

    private showPositionSelector(positionClass: string, positionElement: HTMLElement): void {
        const requiredPosition = this.positionMappings[positionClass];
        const positionSelector = document.getElementById('positionSelector');
        const positionPlayersList = document.getElementById('positionPlayersList');
        const positionSelectorTitle = document.getElementById('positionSelectorTitle');

        // Store selected position
        this.selectedPosition = positionClass;
        this.positionSelectorActive = true;

        // Get current language
        const currentLanguage = window.languageManager
            ? window.languageManager.getCurrentLanguage()
            : 'es';

        // Update title
        const positionNames = {
            OP: 'Opposite',
            WS: 'Wing Spiker',
            MB: 'Middle Blocker',
            S: 'Setter',
            L: 'Libero',
        };

        if (positionSelectorTitle) {
            const selectText = currentLanguage === 'en' ? 'Select' : 'Seleccionar';
            const forText = currentLanguage === 'en' ? 'for this position' : 'para esta posición';
            positionSelectorTitle.textContent = `${selectText} ${positionNames[requiredPosition]} ${forText}`;
        }

        // Filter players for this position from the already sorted list
        const sortedPlayers = this.getSortedPlayers();
        const compatiblePlayers = sortedPlayers.filter(
            (player) =>
                player.position === requiredPosition &&
                !this.usedPlayerIds.has(player.id)
        );

        // Clear previous content
        if (positionPlayersList) {
            positionPlayersList.innerHTML = '';

            // Add compatible players
            compatiblePlayers.forEach((player) => {
                const playerCard = this.createPositionPlayerCard(player);
                positionPlayersList.appendChild(playerCard);
            });
        }

        // Show selector with animation
        document.body.classList.add('position-selector-active');
        if (positionSelector) {
            positionSelector.classList.add('active');
            positionSelector.setAttribute('aria-hidden', 'false');
        }
    }

    private hidePositionSelector(): void {
        const positionSelector = document.getElementById('positionSelector');

        this.selectedPosition = null;
        this.positionSelectorActive = false;

        // Hide with animation
        document.body.classList.remove('position-selector-active');
        if (positionSelector) {
            positionSelector.classList.remove('active');
            positionSelector.setAttribute('aria-hidden', 'true');
        }
    }

    private createPositionPlayerCard(player: Character): HTMLElement {
        const playerCard = document.createElement('div');
        playerCard.className = 'position-player-card';
        playerCard.setAttribute('role', 'button');
        playerCard.setAttribute('tabindex', '0');
        playerCard.setAttribute('title', player.name);

        const imageUrl = this.getPlayerImageUrl(player);

        playerCard.innerHTML = `
      <img src="${imageUrl}" alt="${player.name}" loading="lazy" />
    `;

        // Click event to select player
        playerCard.addEventListener('click', () => {
            this.selectPlayerFromPositionSelector(player);
        });

        // Keyboard support
        playerCard.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.selectPlayerFromPositionSelector(player);
            }
        });

        return playerCard;
    }

    private selectPlayerFromPositionSelector(player: Character): void {
        if (this.selectedPosition) {
            const positionElement = document.querySelector(
                `.${this.selectedPosition}`
            ) as HTMLElement;
            if (positionElement) {
                this.placePlayerInPosition(player, positionElement);
                this.hidePositionSelector();
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
                if (this.positionSelectorActive && this.selectedPosition) {
                    const positionElement = document.querySelector(
                        `.${this.selectedPosition}`
                    ) as HTMLElement;
                    this.showPositionSelector(this.selectedPosition, positionElement);
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
        console.log('Rotation button found:', rotationButton);
        if (rotationButton) {
            rotationButton.addEventListener('click', () => {
                console.log('Rotation button clicked');
                this.rotatePlayersClockwise();
            });
        } else {
            console.error('Rotation button not found');
        }
    }

    private rotatePlayersClockwise(): void {
        console.log('=== STARTING POSITION ROTATION ===');

        // Define the clockwise rotation sequence of positions
        const rotationSequence = [
            'position-1', // OP
            'position-6', // MB
            'position-5', // WS
            'position-2', // S
            'position-3', // MB
            'position-4', // WS
        ];

        // Get the complete content of each position (player + labels)
        const positionContents: { [key: string]: Character | null } = {};
        const positionMappings: { [key: string]: Position } = {};

        rotationSequence.forEach((pos) => {
            // Save the current player in that position
            positionContents[pos] = this.currentTeam[pos] || null;
            // Save the current position mapping
            positionMappings[pos] = this.positionMappings[pos];
        });

        console.log('Position contents before rotating:', positionContents);

        // Button animation
        const rotationButton = document.getElementById('rotationButton');
        if (rotationButton) {
            rotationButton.classList.add('rotating');
            setTimeout(() => {
                rotationButton.classList.remove('rotating');
            }, 600);
        }

        // Create movement animations
        this.animatePositionMovement(rotationSequence, () => {
            // Callback executed when animations finish

            // Rotate position mappings
            const newPositionMappings: { [key: string]: Position } = {};
            rotationSequence.forEach((pos, index) => {
                const nextIndex = (index + 1) % rotationSequence.length;
                const nextPos = rotationSequence[nextIndex];
                newPositionMappings[nextPos] = positionMappings[pos];
            });

            // Rotate position contents (players)
            const newPositionContents: { [key: string]: Character | null } = {};
            rotationSequence.forEach((pos, index) => {
                const nextIndex = (index + 1) % rotationSequence.length;
                const nextPos = rotationSequence[nextIndex];
                newPositionContents[nextPos] = positionContents[pos];
            });

            // Update internal mappings
            Object.assign(this.positionMappings, newPositionMappings);

            // Clear current team
            rotationSequence.forEach((pos) => {
                delete this.currentTeam[pos];
            });

            // Apply new content
            Object.assign(this.currentTeam, newPositionContents);

            // Render all positions with their new content
            rotationSequence.forEach((pos) => {
                const positionElement = document.querySelector(`.${pos}`) as HTMLElement;
                if (positionElement) {
                    if (this.currentTeam[pos]) {
                        // There's a player, render them
                        this.renderPlayerInPosition(this.currentTeam[pos]!, positionElement);
                    } else {
                        // No player, render empty position with new label
                        this.renderEmptyPosition(positionElement, pos);
                    }
                }
            });

            // Update school statistics and bonds
            this.updateTeamStats();

            console.log('=== ROTATION COMPLETED ===');
            console.log('New mappings:', this.positionMappings);
            console.log('New team state:', this.currentTeam);
        });
    }

    private animatePositionMovement(rotationSequence: string[], callback: () => void): void {
        // Get current positions of each element
        const positions: { [key: string]: { x: number; y: number } } = {};
        rotationSequence.forEach((pos) => {
            const element = document.querySelector(`.${pos}`) as HTMLElement;
            if (element) {
                const rect = element.getBoundingClientRect();
                positions[pos] = { x: rect.left, y: rect.top };
            }
        });

        // Calculate target positions (next in sequence)
        const animations: Array<{
            element: HTMLElement;
            deltaX: number;
            deltaY: number;
        }> = [];

        rotationSequence.forEach((pos, index) => {
            const nextIndex = (index + 1) % rotationSequence.length;
            const nextPos = rotationSequence[nextIndex];

            const currentPos = positions[pos];
            const targetPos = positions[nextPos];

            if (currentPos && targetPos) {
                const deltaX = targetPos.x - currentPos.x;
                const deltaY = targetPos.y - currentPos.y;

                const element = document.querySelector(`.${pos}`) as HTMLElement;
                if (element) {
                    animations.push({
                        element,
                        deltaX,
                        deltaY,
                    });
                }
            }
        });

        // Apply animations
        animations.forEach(({ element, deltaX, deltaY }) => {
            if (element) {
                element.style.transition = 'transform 0.8s ease-in-out';
                element.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
                element.style.zIndex = '1000';
            }
        });

        // After animation, clean styles and execute callback
        setTimeout(() => {
            animations.forEach(({ element }) => {
                if (element) {
                    element.style.transition = '';
                    element.style.transform = '';
                    element.style.zIndex = '';
                }
            });
            callback();
        }, 800);
    }

    public updateTeamStats(): void {
        this.updateSchoolStats();
        this.updateBonds();
    }

    private getSchoolComposition(): { [school: string]: number } {
        const schoolCount: { [school: string]: number } = {};

        // Count players in current team by school
        Object.values(this.currentTeam).forEach((player) => {
            if (player && player.school) {
                schoolCount[player.school] = (schoolCount[player.school] || 0) + 1;
            }
        });

        return schoolCount;
    }

    private clearHighlights(): void {
        const courtPositions = document.querySelectorAll('.position');
        courtPositions.forEach((position) => {
            const posElement = position as HTMLElement;
            posElement.style.backgroundColor = '';
            posElement.style.border = '';
            posElement.style.transform = '';
        });
    }
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
