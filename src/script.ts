// Team Builder para Haikyu Flight High - TypeScript Version
import {
    Player,
    Bond,
    GameData,
    TeamPosition,
    PositionMapping,
    PlayerPosition,
    SchoolStats,
} from './types.js';
import { ImageManager } from './image-manager.js';
import { SEOManager } from './seo-manager.js';
import { SEOAuditor } from './seo-auditor.js';
import { SEOImplementationPlan } from './seo-implementation-plan.js';

export class HaikyuTeamBuilder {
    private players: Player[] = [];
    private bonds: Bond[] = [];
    private currentTeam: TeamPosition = {};
    private selectedPlayer: Player | null = null;
    private usedPlayerIds: Set<number> = new Set();
    private imageManager: ImageManager = ImageManager.getInstance();
    private seoManager: SEOManager = SEOManager.getInstance();
    private seoAuditor: SEOAuditor = new SEOAuditor(this.seoManager);
    private seoImplementationPlan: SEOImplementationPlan = new SEOImplementationPlan(this.seoManager);
    private positionMappings: PositionMapping = {
        'position-1': 'OP', // Back left - Opposite (SERVING POSITION)
        'position-5': 'WS', // Back right - Wing Spiker
        'position-6': 'MB', // Back center - Middle Blocker
        'position-3': 'MB', // Front center - Middle Blocker
        'position-4': 'WS', // Front left - Wing Spiker
        'position-2': 'S', // Front right - Setter
        'position-libero': 'L', // Libero
    };
    private draggedPlayer: Player | null = null;
    private draggedFromTeam: boolean = false;
    private draggedFromPosition: string = '';
    private dragSuccess: boolean = false;

    constructor() {
        this.init();
    }

    async init(): Promise<void> {
        // Cargar el mapeo de imágenes primero
        await this.imageManager.loadImageMapping();

        await this.loadPlayers();

        // Precargar imágenes críticas para mejor rendimiento
        this.imageManager.preloadCriticalImages(this.players);

        this.renderAvailablePlayers();
        this.setupDragAndDrop();
        this.setupEventListeners();
        this.initializeSchoolStats();
        this.initializeBonds();
        this.setupRotationButton();

        // Mostrar estadísticas de imágenes en la consola
        this.logImageStats();

        // Optimizar SEO
        this.optimizeSEO();
    }

    async loadPlayers(): Promise<void> {
        try {
            const response = await fetch('./haikyu_fly_high_full_v3.json');
            const data: GameData = await response.json();
            this.players = data.characters;
            this.bonds = data.bonds || [];
            console.log(
                `Loaded ${this.players.length} players and ${this.bonds.length} bonds`
            );
        } catch (error) {
            console.error('Error loading players:', error);
            // Fallback data if JSON fails to load
            this.players = this.getFallbackPlayers();
            this.bonds = [];
        }
    }

    private getFallbackPlayers(): Player[] {
        return [
            {
                id: 1,
                name: 'Shoyo Hinata',
                position: 'MB',
                school: 'Karasuno',
                profile_image_url:
                    'https://naoshisan.com/wp-content/uploads/2025/03/28cced128bf2a4498597c0161fc4f3f3.png',
            },
            {
                id: 2,
                name: 'Tobio Kageyama',
                position: 'S',
                school: 'Karasuno',
                profile_image_url:
                    'https://naoshisan.com/wp-content/uploads/2024/12/ca6bb0e7b26f52219d1e1840215a093d.png',
            },
            {
                id: 3,
                name: 'Kei Tsukishima',
                position: 'MB',
                school: 'Karasuno',
                profile_image_url:
                    'https://via.placeholder.com/150x150/764ba2/white?text=KT',
            },
            {
                id: 4,
                name: 'Yu Nishinoya',
                position: 'L',
                school: 'Karasuno',
                profile_image_url:
                    'https://naoshisan.com/wp-content/uploads/2024/12/3491ad3eb1e911aa855d0aaaefb85a7c.png',
            },
            {
                id: 5,
                name: 'Asahi Azumane',
                position: 'WS',
                school: 'Karasuno',
                profile_image_url:
                    'https://via.placeholder.com/150x150/795548/white?text=AA',
            },
            {
                id: 6,
                name: 'Daichi Sawamura',
                position: 'OP',
                school: 'Karasuno',
                profile_image_url:
                    'https://naoshisan.com/wp-content/uploads/2024/12/984598f1c1dd4e7b249a80be6a3fe796.png',
            },
            {
                id: 7,
                name: 'Ryunosuke Tanaka',
                position: 'WS',
                school: 'Karasuno',
                profile_image_url:
                    'https://via.placeholder.com/150x150/f44336/white?text=RT',
            },
        ];
    }

    renderAvailablePlayers(): void {
        const playerGrid = document.querySelector('.player-grid') as HTMLElement;
        if (!playerGrid) return;

        // Group players by position for better organization
        const playersByPosition = this.groupPlayersByPosition();

        playerGrid.innerHTML = '';

        // Render players grouped by position
        Object.keys(playersByPosition).forEach((position) => {
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
            positionHeader.innerHTML = `${this.getPositionName(position as PlayerPosition)}`;
            playerGrid.appendChild(positionHeader);

            playersByPosition[position].forEach((player) => {
                // Only show players that are not already in the team
                if (!this.usedPlayerIds.has(player.id)) {
                    const playerElement = this.createAvailablePlayerElement(player);
                    playerGrid.appendChild(playerElement);
                }
            });
        });
    }

    private groupPlayersByPosition(): { [key: string]: Player[] } {
        const grouped: { [key: string]: Player[] } = {};
        this.players.forEach((player) => {
            const pos = player.position;
            if (!grouped[pos]) grouped[pos] = [];
            grouped[pos].push(player);
        });
        return grouped;
    }

    private getPositionName(position: PlayerPosition): string {
        const names: { [key in PlayerPosition]: string } = {
            L: 'Libero',
            MB: 'Middle Blocker',
            WS: 'Wing Spiker',
            OP: 'Opposite',
            S: 'Setter',
        };
        return names[position] || position;
    }

    private createAvailablePlayerElement(player: Player): HTMLElement {
        const playerDiv = document.createElement('div');
        playerDiv.className = 'available-player';
        playerDiv.draggable = true;
        playerDiv.dataset.playerId = player.id.toString();
        playerDiv.dataset.position = player.position;

        // Usar ImageManager para obtener la URL de imagen optimizada
        const imageUrl = this.imageManager.getPlayerImageUrl(player);

        playerDiv.innerHTML = `
            <div class="player-image" style="background-image: url('${imageUrl}')"></div>
            <div class="player-name">${player.name}</div>
            <div class="position-tag">${player.position}</div>
        `;

        // Add drag event listeners
        playerDiv.addEventListener('dragstart', (e: DragEvent) => {
            this.draggedPlayer = player;
            this.draggedFromTeam = false;
            this.dragSuccess = false;
            if (e.dataTransfer) {
                e.dataTransfer.effectAllowed = 'move';
                e.dataTransfer.setData('text/plain', player.id.toString());
            }
            playerDiv.style.opacity = '0.5';
        });

        playerDiv.addEventListener('dragend', () => {
            playerDiv.style.opacity = '1';
            this.clearHighlights();
            this.draggedPlayer = null;
            this.draggedFromTeam = false;
            this.dragSuccess = false;
        });

        playerDiv.addEventListener('click', () => {
            this.showPlayerModal(player);
        });

        return playerDiv;
    }

    private setupDragAndDrop(): void {
        const courtPositions = document.querySelectorAll('.position');

        courtPositions.forEach((position) => {
            const positionElement = position as HTMLElement;

            positionElement.addEventListener('dragover', (e: DragEvent) => {
                e.preventDefault();
                if (e.dataTransfer) {
                    e.dataTransfer.dropEffect = 'move';
                }

                // Check if position is valid for dragged player (allow replacement)
                if (
                    this.draggedPlayer &&
                    this.isValidPosition(this.draggedPlayer, positionElement.className) &&
                    !this.isDuplicatePlayer(this.draggedPlayer, positionElement)
                ) {
                    positionElement.style.backgroundColor = 'rgba(76, 175, 80, 0.5)';
                    positionElement.style.transform = 'scale(1.02)';
                } else {
                    positionElement.style.backgroundColor = '';
                    positionElement.style.transform = '';
                }
            });

            positionElement.addEventListener('dragleave', () => {
                positionElement.style.backgroundColor = '';
                positionElement.style.transform = '';
            });

            positionElement.addEventListener('drop', (e: DragEvent) => {
                e.preventDefault();
                positionElement.style.backgroundColor = '';
                positionElement.style.transform = '';

                if (
                    this.draggedPlayer &&
                    this.isValidPosition(this.draggedPlayer, positionElement.className) &&
                    !this.isDuplicatePlayer(this.draggedPlayer, positionElement)
                ) {
                    this.dragSuccess = true;
                    this.placePlayerInPosition(this.draggedPlayer, positionElement);
                    // Clear highlights immediately after successful placement
                    this.clearHighlights();
                }
                // Si no es válido, simplemente no hace nada (el jugador vuelve a su lugar)
            });
        });

        // Highlight valid positions when dragging starts
        document.addEventListener('dragstart', () => {
            if (this.draggedPlayer) {
                this.highlightValidPositions(this.draggedPlayer);
            }
        });

        document.addEventListener('dragend', () => {
            this.clearHighlights();
        });
    }

    private isValidPosition(player: Player, positionClasses: string): boolean {
        const positionClass = positionClasses
            .split(' ')
            .find((cls) => cls.startsWith('position-') && this.positionMappings[cls]);

        if (!positionClass) return false;

        const requiredPosition = this.positionMappings[positionClass];
        return player.position === requiredPosition;
    }

    private hasPlayerWithSameName(playerName: string): boolean {
        return Object.values(this.currentTeam).some(
            (player) =>
                player &&
                player.name === playerName &&
                player.id !== this.draggedPlayer?.id
        );
    }

    private isDuplicatePlayer(draggedPlayer: Player, targetPosition: HTMLElement): boolean {
        // Get the position class of the target
        const targetPositionClass = targetPosition.className
            .split(' ')
            .find((cls) => cls.startsWith('position-') && this.positionMappings[cls]);

        // If dragging from team, allow swaps between same position types
        if (this.draggedFromTeam && this.draggedFromPosition) {
            const sourcePositionType = this.positionMappings[this.draggedFromPosition];
            const targetPositionType = targetPositionClass ? this.positionMappings[targetPositionClass] : undefined;

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

    private highlightValidPositions(player: Player): void {
        const courtPositions = document.querySelectorAll('.position');
        courtPositions.forEach((position) => {
            const positionElement = position as HTMLElement;
            if (
                this.isValidPosition(player, positionElement.className) &&
                !this.isDuplicatePlayer(player, positionElement)
            ) {
                positionElement.style.backgroundColor = 'rgba(76, 175, 80, 0.3)';
                positionElement.style.border = '3px solid #4CAF50';
            }
        });
    }

    private clearHighlights(): void {
        const courtPositions = document.querySelectorAll('.position');
        courtPositions.forEach((position) => {
            const positionElement = position as HTMLElement;
            positionElement.style.backgroundColor = '';
            positionElement.style.border = '';
            positionElement.style.transform = '';
        });
    }

    private placePlayerInPosition(player: Player, positionElement: HTMLElement): void {
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
            this.draggedFromTeam &&
            this.positionMappings[this.draggedFromPosition] ===
            this.positionMappings[positionClass]
        ) {
            // Place the existing player in the dragged player's original position
            this.currentTeam[this.draggedFromPosition] = existingPlayer;
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

    private renderPlayerInPosition(player: Player, positionElement: HTMLElement): void {
        const playerSlot = positionElement.querySelector('.player-slot') as HTMLElement;
        if (!playerSlot) return;

        // Usar ImageManager para obtener la URL de imagen optimizada
        const imageUrl = this.imageManager.getPlayerImageUrl(player);

        playerSlot.innerHTML = `
            <div class="player-card filled" data-player-id="${player.id}" draggable="true">
                <div class="player-image" style="background-image: url('${imageUrl}')"></div>
                <div class="player-name">${player.name}</div>
                <div class="position-tag">${player.position}</div>
            </div>
        `;

        const playerCard = playerSlot.querySelector('.player-card') as HTMLElement;

        // Add drag event listeners for players in positions
        playerCard.addEventListener('dragstart', (e: DragEvent) => {
            this.draggedPlayer = player;
            this.draggedFromTeam = true;
            this.draggedFromPosition = positionElement.className
                .split(' ')
                .find(
                    (cls) => cls.startsWith('position-') && this.positionMappings[cls]
                ) || '';
            this.dragSuccess = false;
            if (e.dataTransfer) {
                e.dataTransfer.effectAllowed = 'move';
                e.dataTransfer.setData('text/plain', player.id.toString());
            }
            playerCard.style.opacity = '0.5';
        });

        playerCard.addEventListener('dragend', () => {
            playerCard.style.opacity = '1';
            this.clearHighlights();

            // If drag was from team and not successful (didn't land in valid position), remove from team
            if (this.draggedFromTeam && !this.dragSuccess) {
                this.removePlayerFromPosition(positionElement);
            }

            this.draggedPlayer = null;
            this.draggedFromTeam = false;
            this.dragSuccess = false;
        });

        // Add click event to view player details
        playerSlot.addEventListener('click', () => {
            this.showPlayerModal(player);
        });

        // Add right-click to remove player
        playerSlot.addEventListener('contextmenu', (e: MouseEvent) => {
            e.preventDefault();
            this.removePlayerFromPosition(positionElement);
        });
    }

    private renderEmptyPosition(positionElement: HTMLElement, positionClass: string): void {
        const playerSlot = positionElement.querySelector('.player-slot') as HTMLElement;
        if (!playerSlot) return;

        const requiredPosition = this.positionMappings[positionClass];
        const positionNames: { [key in PlayerPosition]: string } = {
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

    private getPositionNumber(positionClass: string): string {
        const numbers: { [key: string]: string } = {
            'position-1': '4',
            'position-6': '6',
            'position-5': '2',
            'position-4': '1',
            'position-3': '3',
            'position-2': '5',
            'position-libero': '7',
        };
        return numbers[positionClass] || '?';
    }

    private removePlayerFromPosition(positionElement: HTMLElement): void {
        const positionClass = positionElement.className
            .split(' ')
            .find((cls) => cls.startsWith('position-') && this.positionMappings[cls]);

        if (!positionClass) return;

        if (this.currentTeam[positionClass]) {
            const removedPlayer = this.currentTeam[positionClass]!;

            // Remove from team and from used players set
            delete this.currentTeam[positionClass];
            this.usedPlayerIds.delete(removedPlayer.id);

            this.renderEmptyPosition(positionElement, positionClass);

            // Re-render available players to show the removed player again
            this.renderAvailablePlayers();

            // Update school statistics and bonds
            this.updateTeamStats();
        }
    }

    private showPlayerModal(player: Player): void {
        this.selectedPlayer = player;

        // Usar ImageManager para obtener la URL de imagen optimizada
        const imageUrl = this.imageManager.getPlayerImageUrl(player);

        const modalPlayerImage = document.getElementById('modalPlayerImage') as HTMLImageElement;
        const modalPlayerName = document.getElementById('modalPlayerName') as HTMLElement;
        const modalPlayerSchool = document.getElementById('modalPlayerSchool') as HTMLElement;
        const modalPlayerPosition = document.getElementById('modalPlayerPosition') as HTMLElement;
        const modalPlayerRarity = document.getElementById('modalPlayerRarity') as HTMLElement;

        if (modalPlayerImage) modalPlayerImage.src = imageUrl;
        if (modalPlayerName) modalPlayerName.textContent = player.name;
        if (modalPlayerSchool) modalPlayerSchool.textContent = player.school || 'Unknown';
        if (modalPlayerPosition) modalPlayerPosition.textContent = this.getPositionName(player.position);
        if (modalPlayerRarity) modalPlayerRarity.textContent = player.rarity || 'N/A';

        // Clear and update stats
        const statsContainer = document.getElementById('modalPlayerStats') as HTMLElement;
        if (statsContainer) {
            statsContainer.innerHTML = `
            <div class="stat">
                <span class="stat-label">Rareza:</span>
                <span class="stat-value">${player.rarity || 'N/A'}</span>
            </div>
            <div class="stat">
                <span class="stat-label">Variante:</span>
                <span class="stat-value">${player.variant || 'Normal'}</span>
            </div>
            <div class="stat">
                <span class="stat-label">Escuela:</span>
                <span class="stat-value">${player.school}</span>
            </div>
            <div class="stat">
                <span class="stat-label">Posición:</span>
                <span class="stat-value">${this.getPositionName(player.position)}</span>
            </div>
        `;
        }

        const modal = document.getElementById('playerModal') as HTMLElement;
        if (modal) modal.style.display = 'block';
    }

    private setupEventListeners(): void {
        // Initialize empty positions
        const positions = document.querySelectorAll('.position');
        positions.forEach((position) => {
            const positionElement = position as HTMLElement;
            const positionClass = positionElement.className
                .split(' ')
                .find(
                    (cls) => cls.startsWith('position-') && this.positionMappings[cls]
                );
            if (positionClass) {
                this.renderEmptyPosition(positionElement, positionClass);
            }
        });

        // Modal events
        const modal = document.getElementById('playerModal') as HTMLElement;
        const closeBtn = document.querySelector('.close') as HTMLElement;
        const selectBtn = document.getElementById('selectPlayerBtn') as HTMLButtonElement;

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

        window.onclick = (event: Event) => {
            if (event.target === modal) {
                if (modal) modal.style.display = 'none';
            }
        };
    }

    private autoPlacePlayer(player: Player): void {
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

    // School composition tracking functions
    private initializeSchoolStats(): void {
        this.updateTeamStats();
    }

    private getSchoolComposition(): SchoolStats {
        const schoolCount: SchoolStats = {};

        // Count players in current team by school
        Object.values(this.currentTeam).forEach((player) => {
            if (player && player.school) {
                schoolCount[player.school] = (schoolCount[player.school] || 0) + 1;
            }
        });

        return schoolCount;
    }

    private updateSchoolStats(): void {
        const schoolStats = document.getElementById('schoolStats') as HTMLElement;
        if (!schoolStats) return;

        const schoolComposition = this.getSchoolComposition();

        // Get all unique schools from current team
        const allSchools = [
            ...new Set(
                Object.values(this.currentTeam)
                    .filter((player) => player && player.school)
                    .map((player) => player!.school)
            ),
        ];

        // If no players in team, show empty state
        if (allSchools.length === 0) {
            schoolStats.innerHTML =
                '<div class="no-players">No hay jugadores seleccionados</div>';
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

    // Bonds functionality
    private initializeBonds(): void {
        this.updateBonds();
    }

    private updateBonds(): void {
        const bondsSection = document.getElementById('bondsSection') as HTMLElement;
        if (!bondsSection) return;

        // Get current team player IDs
        const currentPlayerIds = Object.values(this.currentTeam)
            .filter((player) => player)
            .map((player) => player!.id);

        if (currentPlayerIds.length === 0) {
            bondsSection.innerHTML =
                '<div class="no-players">No hay jugadores seleccionados</div>';
            return;
        }

        // Filter and evaluate bonds with sorting data
        const relevantBonds = this.bonds
            .filter((bond) => {
                // Only show Kizuna Skills (exclude attribute bonds)
                if (bond.is_link_skill === false) {
                    return false;
                }

                // Check if at least one participant is in current team
                return bond.participants.some((participantId) =>
                    currentPlayerIds.includes(participantId)
                );
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
                return a.name.localeCompare(b.name);
            });

        if (relevantBonds.length === 0) {
            bondsSection.innerHTML =
                '<div class="no-players">No hay vínculos disponibles</div>';
            return;
        }

        // Create bond items from sorted bonds
        const bondItems = relevantBonds
            .map((bond) => {
                const isActive = bond.isActive;
                const currentCount = bond.currentCount;
                const requiredCount = bond.requiredCount;

                // Get participant images HTML
                const participantImagesHTML = bond.participants
                    .map((participantId) => {
                        const player = this.players.find((p) => p.id === participantId);
                        if (player) {
                            // Usar ImageManager para obtener la URL de imagen optimizada
                            const imageUrl = this.imageManager.getPlayerImageUrl(player);
                            return `<img src="${imageUrl}" alt="${player.name}" class="participant-image" title="${player.name}">`;
                        }
                        return `<div class="participant-image" style="background: #666; display: flex; align-items: center; justify-content: center; color: white; font-size: 12px; width: 48px; height: 60px;" title="ID:${participantId}">?</div>`;
                    })
                    .join('');

                // Generate detailed effect HTML based on bond type
                const effectHTML = this.generateBondEffectHTML(bond);

                return `
        <div class="bond-item ${isActive ? 'active' : 'inactive'
                    }" data-bond-id="${bond.participants.join('-')}">
          <div class="bond-header" onclick="teamBuilder.toggleBondDetails(this)">
            <div class="bond-name">${bond.name}</div>
            <div class="bond-controls">
              <span class="bond-count ${isActive ? 'complete' : ''
                    }">${currentCount}/${requiredCount}</span>
              <span class="expand-icon">▶</span>
            </div>
          </div>
          <div class="bond-details" style="display: none;">
            ${effectHTML}
          </div>
        </div>
      `;
            })
            .join('');

        bondsSection.innerHTML = bondItems;
    }

    toggleBondDetails(headerElement: HTMLElement): void {
        const bondItem = headerElement.closest('.bond-item') as HTMLElement;
        const details = bondItem.querySelector('.bond-details') as HTMLElement;
        const icon = headerElement.querySelector('.expand-icon') as HTMLElement;

        // Close other open bond details
        document.querySelectorAll('.bond-details').forEach((detail) => {
            const detailElement = detail as HTMLElement;
            if (detailElement !== details) {
                detailElement.style.display = 'none';
                const otherIcon = detailElement
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

    private generateBondEffectHTML(bond: Bond): string {
        if (bond.is_link_skill) {
            // Kizuna Skill - show general effect
            return `<div class="bond-effect kizuna-skill">
        <div class="effect-type">🔗 Habilidad Kizuna</div>
        <div class="effect-description">${bond.effect_summary || 'Efecto especial'
                }</div>
      </div>`;
        } else if (bond.effects_by_character) {
            // Attribute bond - show effects by character and levels
            let effectsHTML = '<div class="bond-effect attribute-bond">';
            effectsHTML +=
                '<div class="effect-type">📈 Ventaja de atributos de vínculo</div>';

            bond.effects_by_character.forEach((characterEffect) => {
                const player = this.players.find(
                    (p) => p.id === characterEffect.character_id
                );
                const playerName = player
                    ? player.name
                    : `ID: ${characterEffect.character_id}`;

                effectsHTML += `<div class="character-effect">
          <div class="character-name">Desbloquea la bonificación: <span class="player-highlight">${playerName.toUpperCase()}</span></div>`;

                characterEffect.bonuses.forEach((bonus) => {
                    effectsHTML += `<div class="bonus-levels">`;
                    bonus.levels.forEach((level, index) => {
                        const levelNum = index + 1;
                        const isCurrentLevel = index === 0; // Por defecto mostramos nivel 1
                        effectsHTML += `<div class="level ${isCurrentLevel ? 'current-level' : ''
                            }">
              Nv. ${levelNum}: ${bonus.attribute}${level}
            </div>`;
                    });
                    effectsHTML += `</div>`;
                });

                effectsHTML += `</div>`;
            });

            effectsHTML += '</div>';
            return effectsHTML;
        } else {
            // Fallback for other types
            return `<div class="bond-effect">
        <div class="effect-description">${bond.effect_summary || 'Efecto no especificado'
                }</div>
      </div>`;
        }
    }

    private updateTeamStats(): void {
        this.updateSchoolStats();
        this.updateBonds();
    }

    // Rotation functionality
    private setupRotationButton(): void {
        const rotationButton = document.getElementById('rotationButton') as HTMLButtonElement;
        console.log('Botón de rotación encontrado:', rotationButton);
        if (rotationButton) {
            rotationButton.addEventListener('click', () => {
                console.log('Botón de rotación clickeado');
                this.rotatePlayersClockwise();
            });
        } else {
            console.error('No se encontró el botón de rotación');
        }
    }

    private rotatePlayersClockwise(): void {
        console.log('=== INICIANDO ROTACIÓN DE POSICIONES ===');

        // Define la secuencia de rotación de posiciones (horario)
        const rotationSequence = [
            'position-1', // OP
            'position-6', // MB
            'position-5', // WS
            'position-2', // S
            'position-3', // MB
            'position-4', // WS
        ];

        // Obtener el contenido completo de cada posición (jugador + etiquetas)
        const positionContents: { [key: string]: Player | null } = {};
        const positionMappings: { [key: string]: PlayerPosition } = {};

        rotationSequence.forEach((pos) => {
            // Guardar el jugador actual en esa posición
            positionContents[pos] = this.currentTeam[pos] || null;
            // Guardar el mapping de posición actual
            positionMappings[pos] = this.positionMappings[pos];
        });

        console.log('Contenido de posiciones antes de rotar:', positionContents);

        // Animación del botón
        const rotationButton = document.getElementById('rotationButton') as HTMLElement;
        if (rotationButton) {
            rotationButton.classList.add('rotating');
            setTimeout(() => {
                rotationButton.classList.remove('rotating');
            }, 600);
        }

        // Crear animaciones de desplazamiento
        this.animatePositionMovement(rotationSequence, () => {
            // Callback que se ejecuta cuando terminan las animaciones

            // Rotar los mappings de posiciones
            const newPositionMappings: { [key: string]: PlayerPosition } = {};
            rotationSequence.forEach((pos, index) => {
                const nextIndex = (index + 1) % rotationSequence.length;
                const nextPos = rotationSequence[nextIndex];
                newPositionMappings[nextPos] = positionMappings[pos];
            });

            // Rotar el contenido de las posiciones (jugadores)
            const newPositionContents: { [key: string]: Player | null } = {};
            rotationSequence.forEach((pos, index) => {
                const nextIndex = (index + 1) % rotationSequence.length;
                const nextPos = rotationSequence[nextIndex];
                newPositionContents[nextPos] = positionContents[pos];
            });

            // Actualizar los mappings internos
            Object.assign(this.positionMappings, newPositionMappings);

            // Limpiar el equipo actual
            rotationSequence.forEach((pos) => {
                delete this.currentTeam[pos];
            });

            // Aplicar el nuevo contenido
            Object.assign(this.currentTeam, newPositionContents);

            // Renderizar todas las posiciones con su nuevo contenido
            rotationSequence.forEach((pos) => {
                const positionElement = document.querySelector(`.${pos}`) as HTMLElement;
                if (positionElement) {
                    if (this.currentTeam[pos]) {
                        // Hay un jugador, renderizarlo
                        this.renderPlayerInPosition(this.currentTeam[pos]!, positionElement);
                    } else {
                        // No hay jugador, renderizar posición vacía con nueva etiqueta
                        this.renderEmptyPosition(positionElement, pos);
                    }
                }
            });

            // Actualizar estadísticas de escuela y bonds
            this.updateTeamStats();

            console.log('=== ROTACIÓN COMPLETADA ===');
            console.log('Nuevos mappings:', this.positionMappings);
            console.log('Nuevo estado del equipo:', this.currentTeam);
        });
    }

    private animatePositionMovement(rotationSequence: string[], callback: () => void): void {
        // Obtener las posiciones actuales de cada elemento
        const positions: { [key: string]: { x: number; y: number } } = {};
        rotationSequence.forEach((pos) => {
            const element = document.querySelector(`.${pos}`) as HTMLElement;
            if (element) {
                const rect = element.getBoundingClientRect();
                positions[pos] = { x: rect.left, y: rect.top };
            }
        });

        // Calcular las posiciones de destino (siguiente en la secuencia)
        const animations: Array<{ element: HTMLElement; deltaX: number; deltaY: number }> = [];
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

        // Aplicar las animaciones
        animations.forEach(({ element, deltaX, deltaY }) => {
            if (element) {
                element.style.transition = 'transform 0.8s ease-in-out';
                element.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
                element.style.zIndex = '1000';
            }
        });

        // Después de la animación, limpiar estilos y ejecutar callback
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

    /**
     * Muestra estadísticas de uso de imágenes en la consola
     */
    private logImageStats(): void {
        const stats = this.imageManager.getImageStats(this.players);
        console.log('📊 Image Statistics:');
        console.log(`  Total players: ${stats.total}`);
        console.log(`  Local images: ${stats.local} (${Math.round((stats.local / stats.total) * 100)}%)`);
        console.log(`  External images: ${stats.external} (${Math.round((stats.external / stats.total) * 100)}%)`);
        console.log(`  Missing images: ${stats.missing} (${Math.round((stats.missing / stats.total) * 100)}%)`);

        if (stats.local > 0) {
            console.log('✅ Local images are being used for better performance and SEO!');
        }
    }

    /**
     * Optimiza el SEO de la aplicación
     */
    private async optimizeSEO(): Promise<void> {
        // Actualizar meta tags
        this.seoManager.updateMetaTags({
            title: 'Haikyu Flight High - Team Builder | Construye tu Equipo de Volleyball',
            description: 'Construye tu equipo perfecto de volleyball con personajes de Haikyu!! Arrastra y suelta jugadores, gestiona vínculos y optimiza la composición escolar.',
            keywords: [
                'haikyu', 'volleyball', 'team builder', 'anime', 'manga',
                'sports game', 'interactive', 'karasuno', 'nekoma',
                'shiratorizawa', 'aoba johsai', 'bokuto', 'hinata', 'kageyama'
            ],
            canonical: window.location.href
        });

        // Generar datos estructurados
        this.seoManager.generateGameStructuredData();

        // Optimizar imágenes después de que se carguen
        setTimeout(() => {
            this.seoManager.optimizeImages();
        }, 1000);

        // Analizar rendimiento de imágenes
        try {
            const performance = await this.seoManager.analyzeImagePerformance();
            console.log('🚀 Image Performance Analysis:');
            console.log(`  Average load time: ${Math.round(performance.averageLoadTime)}ms`);
            console.log(`  Local images: ${performance.localImages}/${performance.totalImages}`);
            console.log(`  Slow images (>500ms): ${performance.slowImages.length}`);

            if (performance.slowImages.length > 0) {
                console.warn('⚠️ Slow loading images:', performance.slowImages);
            }
        } catch (error) {
            console.warn('Could not analyze image performance:', error);
        }
    }

    /**
     * Ejecuta una auditoría completa de SEO
     */
    public async runSEOAudit(): Promise<any> {
        console.log('🔍 Iniciando auditoría SEO del sitio...');

        try {
            const results = await this.seoAuditor.performCompleteAudit();

            // Mostrar resultados en la consola
            console.log('📊 Auditoría SEO completada:', results);

            // Generar y mostrar reporte HTML
            const htmlReport = this.seoAuditor.generateHTMLReport(results);
            this.displaySEOReport(htmlReport);

            return results;
        } catch (error) {
            console.error('❌ Error durante la auditoría SEO:', error);
        }
    }

    /**
     * Genera y ejecuta un plan de implementación SEO personalizado
     */
    public async implementSEOPlan(): Promise<void> {
        console.log('🚀 Generando plan de implementación SEO...');

        try {
            // Generar plan personalizado basado en auditoría
            const tasks = await this.seoImplementationPlan.generateCustomPlan();

            console.log(`📋 Plan generado con ${tasks.length} tareas:`);
            tasks.forEach((task, index) => {
                console.log(`${index + 1}. ${task.title} (${task.priority} - ${task.estimatedTime})`);
            });

            // Preguntar al usuario si quiere ejecutar el plan
            const shouldExecute = confirm(
                `¿Deseas ejecutar el plan de SEO con ${tasks.length} tareas?\n\n` +
                `Esto mejorará significativamente el SEO del sitio.\n\n` +
                `Tiempo estimado: ${this.calculateTotalTime(tasks)}`
            );

            if (shouldExecute) {
                await this.seoImplementationPlan.executePlan(tasks);
                console.log('✅ Plan de SEO ejecutado completamente!');

                // Ejecutar nueva auditoría para ver mejoras
                setTimeout(() => {
                    console.log('🔄 Ejecutando auditoría post-implementación...');
                    this.runSEOAudit();
                }, 2000);
            } else {
                console.log('⏸️ Ejecución del plan cancelada por el usuario');
            }

        } catch (error) {
            console.error('❌ Error ejecutando plan SEO:', error);
        }
    }

    /**
     * Muestra un comando de auditoría rápida en la consola
     */
    public showSEOCommands(): void {
        console.log(`
🎯 COMANDOS SEO DISPONIBLES:

📊 AUDITORÍA Y ANÁLISIS:
   teamBuilder.runSEOAudit()              // Auditoría completa
   teamBuilder.showSEOAnalysis()          // Análisis detallado
   teamBuilder.generateHTMLOptimizationReport() // Reporte HTML

🚀 IMPLEMENTACIÓN AUTOMÁTICA:
   teamBuilder.implementSEOPlan()         // Plan completo personalizado
   teamBuilder.implementHTMLOptimizations() // Optimizar HTML crítico
   teamBuilder.implementPWA()             // Progressive Web App

🔧 MEJORAS ESPECÍFICAS:
   teamBuilder.implementWebP()            // Conversión WebP
   teamBuilder.implementAnalytics()       // GA4 + Search Console
   teamBuilder.optimizeTitle()            // Optimizar título
   teamBuilder.addCanonicalURL()          // Agregar canonical

📱 VERIFICACIONES:
   teamBuilder.checkMobileOptimization()  // Estado móvil
   teamBuilder.checkI18nStatus()          // Internacionalización
   teamBuilder.checkPWAStatus()           // Estado PWA

� PERFORMANCE:
   teamBuilder.analyzeImagePerformance()  // Análisis de imágenes
   teamBuilder.getPerformanceMetrics()    // Métricas de rendimiento

💡 TIP: Ejecuta implementHTMLOptimizations() para mejoras inmediatas!
        `);
    }

    /**
     * Muestra análisis detallado del SEO actual
     */
    public async showSEOAnalysis(): Promise<void> {
        console.group('🔍 ANÁLISIS SEO DETALLADO');

        // Estado de imágenes
        const imageStats = this.imageManager.getImageStats(this.players);
        console.log('🖼️ Imágenes:', imageStats);

        // Estado SEO general
        console.log('📊 SEO Data: Meta tags y schemas implementados');

        // Métricas de performance
        const performanceData = await this.getPerformanceMetrics();
        console.log('⚡ Performance:', performanceData);

        // Estado de PWA
        const pwaStatus = this.checkPWAStatus();
        console.log('📱 PWA Status:', pwaStatus);

        console.groupEnd();
    }

    /**
     * Implementa específicamente PWA
     */
    public async implementPWA(): Promise<void> {
        console.log('📱 Implementando Progressive Web App...');

        try {
            // Crear Service Worker básico
            const swContent = `
const CACHE_NAME = 'haikyu-team-builder-v1';
const urlsToCache = [
  '/',
  '/styles.css',
  '/src/script.js',
  '/assets/images/',
  '/manifest.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
            `;

            // Crear manifest
            const manifest = {
                name: "Haikyu Team Builder",
                short_name: "HaikyuTB",
                description: "Construye tu equipo ideal de voleibol",
                start_url: "/",
                display: "standalone",
                background_color: "#ffffff",
                theme_color: "#ff6b35",
                icons: [
                    {
                        src: "assets/images/icon-192.png",
                        sizes: "192x192",
                        type: "image/png"
                    }
                ]
            };

            // Agregar elementos al DOM
            if (!document.querySelector('link[rel="manifest"]')) {
                const manifestLink = document.createElement('link');
                manifestLink.rel = 'manifest';
                manifestLink.href = '/manifest.json';
                document.head.appendChild(manifestLink);
            }

            // Registrar Service Worker si está disponible
            if ('serviceWorker' in navigator) {
                try {
                    await navigator.serviceWorker.register('/sw.js');
                    console.log('✅ Service Worker registrado exitosamente');
                } catch (error) {
                    console.error('❌ Error registrando Service Worker:', error);
                }
            }

            console.log('✅ PWA implementado correctamente');
            console.log('💡 Archivos requeridos: /sw.js y /manifest.json');

        } catch (error) {
            console.error('❌ Error implementando PWA:', error);
        }
    }

    /**
     * Verifica optimización móvil
     */
    public checkMobileOptimization(): void {
        console.group('📱 VERIFICACIÓN MÓVIL');

        const viewport = document.querySelector('meta[name="viewport"]');
        console.log('Viewport:', viewport ? '✅' : '❌', viewport?.getAttribute('content'));

        const touchTargets = document.querySelectorAll('button, .draggable, a');
        let optimizedTargets = 0;

        touchTargets.forEach(target => {
            const rect = target.getBoundingClientRect();
            if (rect.width >= 44 && rect.height >= 44) {
                optimizedTargets++;
            }
        });

        const optimizationRate = (optimizedTargets / touchTargets.length) * 100;
        console.log(`Touch Targets: ${optimizedTargets}/${touchTargets.length} optimizados (${optimizationRate.toFixed(1)}%)`);

        const images = document.querySelectorAll('img');
        const responsiveImages = Array.from(images).filter(img =>
            img.style.maxWidth === '100%' || img.hasAttribute('srcset')
        ).length;

        console.log(`Imágenes Responsivas: ${responsiveImages}/${images.length}`);

        console.groupEnd();
    }

    /**
     * Implementa optimizaciones HTML automáticamente
     */
    public implementHTMLOptimizations(): void {
        console.log('🔧 Implementando optimizaciones HTML críticas...');

        try {
            // 1. Optimizar title si es muy largo
            this.optimizeTitle();

            // 2. Agregar canonical URL si falta
            this.addCanonicalURL();

            // 3. Completar Open Graph
            this.completeOpenGraph();

            // 4. Agregar datos estructurados críticos
            this.addCriticalStructuredData();

            // 5. Agregar security headers via meta
            this.addSecurityHeaders();

            // 6. Agregar performance hints
            this.addPerformanceHints();

            // 7. Mejorar meta description
            this.optimizeMetaDescription();

            // 8. Agregar PWA basics
            this.addPWABasics();

            console.log('✅ Optimizaciones HTML implementadas exitosamente!');
            console.log('📊 Ejecuta teamBuilder.runSEOAudit() para ver las mejoras');

        } catch (error) {
            console.error('❌ Error implementando optimizaciones HTML:', error);
        }
    }

    /**
     * Optimiza el título si es muy largo
     */
    private optimizeTitle(): void {
        const titleElement = document.querySelector('title');
        if (titleElement && titleElement.textContent) {
            const currentTitle = titleElement.textContent;

            if (currentTitle.length > 60) {
                const optimizedTitle = 'Haikyu Team Builder | Crea tu Equipo de Voleibol';
                titleElement.textContent = optimizedTitle;

                console.log('📝 Title optimizado:', {
                    antes: `${currentTitle} (${currentTitle.length} chars)`,
                    después: `${optimizedTitle} (${optimizedTitle.length} chars)`
                });

                // Actualizar Open Graph title también
                const ogTitle = document.querySelector('meta[property="og:title"]');
                if (ogTitle) {
                    ogTitle.setAttribute('content', optimizedTitle);
                }

                // Actualizar Twitter title
                const twitterTitle = document.querySelector('meta[name="twitter:title"]');
                if (twitterTitle) {
                    twitterTitle.setAttribute('content', optimizedTitle);
                }
            }
        }
    }

    /**
     * Agrega canonical URL si falta
     */
    private addCanonicalURL(): void {
        if (!document.querySelector('link[rel="canonical"]')) {
            const canonical = document.createElement('link');
            canonical.rel = 'canonical';
            canonical.href = window.location.origin + window.location.pathname;
            document.head.appendChild(canonical);

            console.log('🔗 Canonical URL agregado:', canonical.href);
        }
    }

    /**
     * Completa Open Graph faltante
     */
    private completeOpenGraph(): void {
        const currentUrl = window.location.href;
        const baseUrl = window.location.origin;

        // Agregar URL si falta
        if (!document.querySelector('meta[property="og:url"]')) {
            this.addMetaProperty('og:url', currentUrl);
            console.log('🌐 og:url agregado');
        }

        // Agregar imagen si falta
        if (!document.querySelector('meta[property="og:image"]')) {
            this.addMetaProperty('og:image', `${baseUrl}/assets/images/og-image.jpg`);
            this.addMetaProperty('og:image:width', '1200');
            this.addMetaProperty('og:image:height', '630');
            this.addMetaProperty('og:image:type', 'image/jpeg');
            this.addMetaProperty('og:image:alt', 'Haikyu Team Builder - Construye tu equipo de voleibol');
            console.log('🖼️ og:image agregado');
        }

        // Agregar locale si falta
        if (!document.querySelector('meta[property="og:locale"]')) {
            this.addMetaProperty('og:locale', 'es_ES');
            console.log('🌍 og:locale agregado');
        }
    }

    /**
     * Agrega datos estructurados críticos
     */
    private addCriticalStructuredData(): void {
        // Verificar si ya existen datos estructurados
        const existingSchemas = document.querySelectorAll('script[type="application/ld+json"]');

        if (existingSchemas.length === 0) {
            // WebApplication Schema
            const webAppSchema = {
                "@context": "https://schema.org",
                "@type": "WebApplication",
                "name": "Haikyu Team Builder",
                "description": "Construye tu equipo perfecto de voleibol con personajes del anime Haikyu!!",
                "url": window.location.origin,
                "applicationCategory": "GameApplication",
                "operatingSystem": "Web Browser",
                "offers": {
                    "@type": "Offer",
                    "price": "0",
                    "priceCurrency": "EUR"
                },
                "author": {
                    "@type": "Person",
                    "name": "Angelo"
                },
                "isAccessibleForFree": true,
                "isFamilyFriendly": true
            };

            this.addStructuredData(webAppSchema);
            console.log('📊 WebApplication schema agregado');

            // VideoGame Schema
            const videoGameSchema = {
                "@context": "https://schema.org",
                "@type": "VideoGame",
                "name": "Haikyu Team Builder",
                "description": "Interactive volleyball team building game based on Haikyu anime",
                "genre": ["Sports", "Simulation", "Strategy"],
                "gamePlatform": "Web Browser",
                "url": window.location.origin,
                "offers": {
                    "@type": "Offer",
                    "price": "0",
                    "priceCurrency": "EUR"
                }
            };

            this.addStructuredData(videoGameSchema);
            console.log('🎮 VideoGame schema agregado');
        }
    }

    /**
     * Agrega security headers via meta tags
     */
    private addSecurityHeaders(): void {
        const securityHeaders = [
            { 'http-equiv': 'X-Content-Type-Options', content: 'nosniff' },
            { 'http-equiv': 'X-Frame-Options', content: 'SAMEORIGIN' },
            { 'http-equiv': 'X-XSS-Protection', content: '1; mode=block' },
            { 'http-equiv': 'Referrer-Policy', content: 'strict-origin-when-cross-origin' }
        ];

        securityHeaders.forEach(header => {
            const key = Object.keys(header)[0];
            const existingHeader = document.querySelector(`meta[${key}="${header[key as keyof typeof header]}"]`);

            if (!existingHeader) {
                const meta = document.createElement('meta');
                if (key === 'http-equiv') {
                    meta.setAttribute('http-equiv', header['http-equiv'] as string);
                } else {
                    meta.setAttribute(key, header[key as keyof typeof header] as string);
                }
                meta.setAttribute('content', header.content);
                document.head.appendChild(meta);
            }
        });

        console.log('🛡️ Security headers agregados');
    }

    /**
     * Agrega performance hints
     */
    private addPerformanceHints(): void {
        // DNS prefetch para dominios externos
        const domains = ['fonts.googleapis.com', 'fonts.gstatic.com', 'cdnjs.cloudflare.com'];

        domains.forEach(domain => {
            if (!document.querySelector(`link[rel="dns-prefetch"][href*="${domain}"]`)) {
                const link = document.createElement('link');
                link.rel = 'dns-prefetch';
                link.href = `//${domain}`;
                document.head.appendChild(link);
            }
        });

        // Preconnect para recursos críticos
        if (!document.querySelector('link[rel="preconnect"][href*="fonts.googleapis.com"]')) {
            const preconnect = document.createElement('link');
            preconnect.rel = 'preconnect';
            preconnect.href = 'https://fonts.googleapis.com';
            document.head.appendChild(preconnect);
        }

        console.log('⚡ Performance hints agregados');
    }

    /**
     * Optimiza meta description
     */
    private optimizeMetaDescription(): void {
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
            const currentDesc = metaDesc.getAttribute('content') || '';

            // Si es muy técnica o larga, optimizarla
            if (currentDesc.length > 160 || !currentDesc.includes('🏐')) {
                const optimizedDesc = '🏐 Crea el equipo perfecto de Haikyu! Arrastra personajes, forma vínculos y domina el voleibol. ¡Juega gratis ahora!';
                metaDesc.setAttribute('content', optimizedDesc);

                // Actualizar Open Graph description también
                const ogDesc = document.querySelector('meta[property="og:description"]');
                if (ogDesc) {
                    ogDesc.setAttribute('content', optimizedDesc);
                }

                // Actualizar Twitter description
                const twitterDesc = document.querySelector('meta[name="twitter:description"]');
                if (twitterDesc) {
                    twitterDesc.setAttribute('content', optimizedDesc);
                }

                console.log('📝 Meta description optimizada:', {
                    antes: `${currentDesc} (${currentDesc.length} chars)`,
                    después: `${optimizedDesc} (${optimizedDesc.length} chars)`
                });
            }
        }
    }

    /**
     * Agrega elementos básicos de PWA
     */
    private addPWABasics(): void {
        // Theme color si falta
        if (!document.querySelector('meta[name="theme-color"]')) {
            const themeColor = document.createElement('meta');
            themeColor.name = 'theme-color';
            themeColor.content = '#667eea';
            document.head.appendChild(themeColor);
            console.log('� Theme color agregado');
        }

        // Apple mobile web app tags
        if (!document.querySelector('meta[name="apple-mobile-web-app-capable"]')) {
            const appleMeta = document.createElement('meta');
            appleMeta.name = 'apple-mobile-web-app-capable';
            appleMeta.content = 'yes';
            document.head.appendChild(appleMeta);

            const appleTitle = document.createElement('meta');
            appleTitle.name = 'apple-mobile-web-app-title';
            appleTitle.content = 'Haikyu TB';
            document.head.appendChild(appleTitle);

            console.log('📱 Apple mobile web app tags agregados');
        }
    }

    // Métodos auxiliares
    private addMetaProperty(property: string, content: string): void {
        const meta = document.createElement('meta');
        meta.setAttribute('property', property);
        meta.setAttribute('content', content);
        document.head.appendChild(meta);
    }

    private addStructuredData(data: any): void {
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(data, null, 2);
        document.head.appendChild(script);
    }

    /**
     * Genera reporte de optimizaciones HTML aplicadas
     */
    public generateHTMLOptimizationReport(): void {
        console.group('📋 REPORTE DE OPTIMIZACIONES HTML');

        // Verificar mejoras implementadas
        const checks = {
            canonical: !!document.querySelector('link[rel="canonical"]'),
            structuredData: document.querySelectorAll('script[type="application/ld+json"]').length > 0,
            ogImage: !!document.querySelector('meta[property="og:image"]'),
            ogUrl: !!document.querySelector('meta[property="og:url"]'),
            securityHeaders: !!document.querySelector('meta[http-equiv="X-Content-Type-Options"]'),
            themeColor: !!document.querySelector('meta[name="theme-color"]'),
            appleWebApp: !!document.querySelector('meta[name="apple-mobile-web-app-capable"]'),
            dnsPretech: document.querySelectorAll('link[rel="dns-prefetch"]').length > 0,
            preconnect: !!document.querySelector('link[rel="preconnect"]')
        };

        let score = 0;
        const total = Object.keys(checks).length;

        for (const [check, passed] of Object.entries(checks)) {
            const status = passed ? '✅' : '❌';
            const description = this.getCheckDescription(check);
            console.log(`${status} ${description}`);
            if (passed) score++;
        }

        const percentage = Math.round((score / total) * 100);
        console.log('');
        console.log(`🎯 SCORE OPTIMIZACIONES: ${score}/${total} (${percentage}%)`);

        if (percentage >= 90) {
            console.log('🏆 ¡Excelente! HTML altamente optimizado para SEO');
        } else if (percentage >= 70) {
            console.log('👍 Bueno! Algunas optimizaciones pendientes');
        } else {
            console.log('⚠️ Se necesitan más optimizaciones');
        }

        console.groupEnd();
    }

    private getCheckDescription(check: string): string {
        const descriptions: Record<string, string> = {
            canonical: 'Canonical URL',
            structuredData: 'Datos estructurados JSON-LD',
            ogImage: 'Open Graph imagen',
            ogUrl: 'Open Graph URL',
            securityHeaders: 'Security headers',
            themeColor: 'Theme color',
            appleWebApp: 'Apple mobile web app',
            dnsPretech: 'DNS prefetch',
            preconnect: 'Preconnect optimization'
        };
        return descriptions[check] || check;
    }

    /**
     * Verifica estado de internacionalización
     */
    public checkI18nStatus(): void {
        console.group('🌐 ESTADO INTERNACIONALIZACIÓN');

        const hreflangTags = document.querySelectorAll('link[rel="alternate"][hreflang]');
        console.log(`Hreflang tags: ${hreflangTags.length}`);

        const htmlLang = document.documentElement.lang;
        console.log(`HTML lang: ${htmlLang || 'No definido'}`);

        const title = document.title;
        const isSpanish = /[ñáéíóúü]/i.test(title);
        console.log(`Contenido en español: ${isSpanish ? '✅' : '❓'}`);

        console.log('🎯 Idiomas recomendados para implementar:');
        console.log('  - Inglés (audiencia global)');
        console.log('  - Japonés (audiencia nativa)');
        console.log('  - Portugués (Brasil)');

        console.groupEnd();
    }    // Métodos auxiliares
    private displaySEOReport(htmlReport: string): void {
        // Crear ventana emergente con el reporte
        const reportWindow = window.open('', '_blank', 'width=800,height=600,scrollbars=yes');
        if (reportWindow) {
            reportWindow.document.write(htmlReport);
            reportWindow.document.close();
        } else {
            console.log('📄 Reporte HTML generado (popup bloqueado):', htmlReport);
        }
    }

    private calculateTotalTime(tasks: any[]): string {
        // Estimación simplificada
        const highPriorityTasks = tasks.filter(t => t.priority === 'high').length;
        const mediumPriorityTasks = tasks.filter(t => t.priority === 'medium').length;
        const lowPriorityTasks = tasks.filter(t => t.priority === 'low').length;

        const estimatedHours = (highPriorityTasks * 3) + (mediumPriorityTasks * 6) + (lowPriorityTasks * 12);

        if (estimatedHours < 24) {
            return `${estimatedHours} horas`;
        } else {
            const days = Math.ceil(estimatedHours / 8);
            return `${days} días laborales`;
        }
    }

    private async getPerformanceMetrics(): Promise<any> {
        if ('performance' in window) {
            const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
            return {
                loadTime: navigation.loadEventEnd - navigation.fetchStart,
                domContentLoaded: navigation.domContentLoadedEventEnd - navigation.fetchStart,
                firstContentfulPaint: this.getFirstContentfulPaint(),
                imageCount: document.querySelectorAll('img').length,
                scriptCount: document.querySelectorAll('script').length
            };
        }
        return { error: 'Performance API no disponible' };
    }

    private getFirstContentfulPaint(): number | null {
        const entries = performance.getEntriesByType('paint');
        const fcpEntry = entries.find(entry => entry.name === 'first-contentful-paint');
        return fcpEntry ? fcpEntry.startTime : null;
    }

    private checkPWAStatus(): any {
        return {
            serviceWorker: 'serviceWorker' in navigator,
            manifest: !!document.querySelector('link[rel="manifest"]'),
            httpsEnabled: location.protocol === 'https:',
            installable: 'BeforeInstallPromptEvent' in window,
            cacheAPI: 'caches' in window
        };
    }
}

// Global variable for backwards compatibility
declare global {
    interface Window {
        teamBuilder: HaikyuTeamBuilder;
    }
}

// Initialize the team builder when the page loads
document.addEventListener('DOMContentLoaded', () => {
    window.teamBuilder = new HaikyuTeamBuilder();

    // Mostrar comandos SEO disponibles después de 2 segundos
    setTimeout(() => {
        console.log('%c🎯 ¡SEO Tools Disponibles!', 'color: #4CAF50; font-weight: bold; font-size: 16px;');
        console.log('Ejecuta: teamBuilder.showSEOCommands() para ver todas las opciones');
        console.log('O ejecuta: teamBuilder.runSEOAudit() para una auditoría completa');
    }, 2000);
});
