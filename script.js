// Team Builder para Haikyu Flight High
class HaikyuTeamBuilder {
  constructor() {
    this.players = [];
    this.bonds = [];
    this.imageMapping = {};
    this.currentTeam = {};
    this.selectedPlayer = null;
    this.selectedPosition = null; // For position selector
    this.positionSelectorActive = false; // Track if position selector is open
    this.usedPlayerIds = new Set(); // Track players already in team
    this.positionMappings = {
      'position-1': 'OP', // Back left - Opposite (SERVING POSITION)
      'position-5': 'WS', // Back right - Wing Spiker
      'position-6': 'MB', // Back center - Middle Blocker
      'position-3': 'MB', // Front center - Middle Blocker
      'position-4': 'WS', // Front left - Wing Spiker
      'position-2': 'S', // Front right - Setter
      'position-libero': 'L', // Libero
    };
    this.draggedPlayer = null;
    this.draggedFromTeam = false;
    this.dragSuccess = false;
    this.isDragging = false; // Track if a drag operation is in progress
    this.dragStartTime = 0; // Track when drag started
    this.init();
  }

  async init() {
    // Get the current language from languageManager
    const currentLanguage = window.languageManager
      ? window.languageManager.getCurrentLanguage()
      : 'es';
    console.log('Initializing with language:', currentLanguage);

    await this.loadPlayers(currentLanguage);
    await this.loadImageMapping();
    this.renderAvailablePlayers();
    this.setupDragAndDrop();
    this.setupEventListeners();
    this.setupPositionSelector(); // Add position selector setup
    this.initializeSchoolStats();
    this.initializeBonds();
    this.setupRotationButton();
  }

  async loadPlayers(language = 'es') {
    try {
      // Choose JSON file based on language
      const jsonFile =
        language === 'en'
          ? './haikyu_fly_high_full_v3_en.json'
          : './haikyu_fly_high_full_v3.json';
      console.log(`Loading players from: ${jsonFile}`);

      const response = await fetch(jsonFile);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      this.players = data.characters || [];
      this.bonds = data.bonds || [];
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
      console.warn('Error loading players, using fallback:', error.message);
      // Fallback data if JSON fails to load
      this.players = this.getFallbackPlayers();
      this.bonds = [];
    }
  }

  async loadImageMapping() {
    try {
      const response = await fetch('./image-mapping.json');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      this.imageMapping = await response.json();
      console.log(
        `Loaded image mapping for ${
          Object.keys(this.imageMapping).length
        } characters`
      );
    } catch (error) {
      console.warn('Error loading image mapping:', error.message);
      this.imageMapping = {};
    }
  }

  getPlayerImageUrl(player) {
    // First try to find local image using the mapping
    if (this.imageMapping && player.id && this.imageMapping[player.id]) {
      return this.imageMapping[player.id].local_path;
    }

    // Fallback to original profile_image_url
    return (
      player.profile_image_url ||
      'https://via.placeholder.com/150x150/cccccc/666666?text=No+Image'
    );
  }

  formatBonusText(bonusValue) {
    console.log('formatBonusText called with:', bonusValue);

    if (!bonusValue || typeof bonusValue !== 'string') {
      console.log('returning early - invalid input');
      return bonusValue || '';
    }

    // Manejar valores especiales comunes
    if (bonusValue === 'Activado' || bonusValue === 'Eliminado') {
      return bonusValue;
    }

    // Manejar multiplicadores como "x180%", "x265%", etc.
    const multiplierMatch = bonusValue.match(/^x(\d+(?:\.\d+)?)%$/);
    if (multiplierMatch) {
      const value = multiplierMatch[1];
      const result = `×${value}%`;
      console.log('Multiplier match found:', value, '-> result:', result);
      return result;
    }

    // Manejar casos como "+5 +1%", "+7 +2%", etc. (con espacio entre números y porcentaje)
    const complexMatch = bonusValue.match(/^(\+?\d+)\s+(\+?\d+%)$/);
    if (complexMatch) {
      let [, points, percentage] = complexMatch;
      console.log('Complex match found:', points, percentage);

      // Asegurar que ambos valores tengan el símbolo '+'
      if (!points.startsWith('+') && !points.startsWith('-')) {
        points = '+' + points;
      }
      if (!percentage.startsWith('+') && !percentage.startsWith('-')) {
        percentage = '+' + percentage;
      }

      const result = `${points} ${
        window.languageManager ? window.languageManager.t('points') : 'puntos'
      } ${percentage} ${
        window.languageManager
          ? window.languageManager.t('additional')
          : 'adicional'
      }`;
      console.log('Complex result:', result);
      return result;
    }

    // Manejar porcentajes simples como "6%", "10%", etc.
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

    // Manejar números simples como "6", "10", etc.
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

    // Si ya tiene '+' o '-', devolverlo tal como está
    if (bonusValue.startsWith('+') || bonusValue.startsWith('-')) {
      console.log('Already has sign, returning as is:', bonusValue);
      return bonusValue;
    }

    // Si no coincide con ningún patrón, devolver el valor original
    console.log('No match, returning original:', bonusValue);
    return bonusValue;
  }
  getFallbackPlayers() {
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
        position: 'Li',
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

  renderAvailablePlayers() {
    const playerGrid = document.querySelector('.player-grid');
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
      positionHeader.innerHTML = `${this.getPositionName(position)}`;
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

  groupPlayersByPosition() {
    const grouped = {};
    this.players.forEach((player) => {
      const pos = player.position;
      if (!grouped[pos]) grouped[pos] = [];
      grouped[pos].push(player);
    });
    return grouped;
  }

  getPositionName(position) {
    const names = {
      L: 'Libero',
      MB: 'Middle Blocker',
      WS: 'Wing Spiker',
      OP: 'Opposite',
      S: 'Setter',
    };
    return names[position] || position;
  }

  createAvailablePlayerElement(player) {
    const playerDiv = document.createElement('div');
    playerDiv.className = 'available-player';
    playerDiv.draggable = true;
    playerDiv.dataset.playerId = player.id;
    playerDiv.dataset.position = player.position;

    const imageUrl = this.getPlayerImageUrl(player);

    playerDiv.innerHTML = `
            <div class="player-image" style="background-image: url('${imageUrl}')"></div>
            <div class="player-name">${player.name}</div>
            <div class="position-tag">${player.position}</div>
        `;

    // Add drag event listeners
    playerDiv.addEventListener('dragstart', (e) => {
      this.draggedPlayer = player;
      this.draggedFromTeam = false;
      this.dragSuccess = false;
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/plain', player.id);
      playerDiv.style.opacity = '0.5';
    });

    playerDiv.addEventListener('dragend', (e) => {
      playerDiv.style.opacity = '1';
      this.clearHighlights();
      this.draggedPlayer = null;
      this.draggedFromTeam = false;
      this.dragSuccess = false;
    });

    playerDiv.addEventListener('click', () => {
      // this.showPlayerModal(player); // Deshabilitado temporalmente
    });

    return playerDiv;
  }

  setupDragAndDrop() {
    const courtPositions = document.querySelectorAll('.position');

    courtPositions.forEach((position) => {
      position.addEventListener('dragover', (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';

        // Check if position is valid for dragged player (allow replacement)
        if (
          this.draggedPlayer &&
          this.isValidPosition(this.draggedPlayer, position.className) &&
          !this.isDuplicatePlayer(this.draggedPlayer, position)
        ) {
          position.style.backgroundColor = 'rgba(76, 175, 80, 0.5)';
          position.style.transform = 'scale(1.02)';
        } else {
          position.style.backgroundColor = '';
          position.style.transform = '';
        }
      });

      position.addEventListener('dragleave', (e) => {
        position.style.backgroundColor = '';
        position.style.transform = '';
      });

      position.addEventListener('drop', (e) => {
        e.preventDefault();
        position.style.backgroundColor = '';
        position.style.transform = '';

        if (
          this.draggedPlayer &&
          this.isValidPosition(this.draggedPlayer, position.className) &&
          !this.isDuplicatePlayer(this.draggedPlayer, position)
        ) {
          this.dragSuccess = true;
          this.placePlayerInPosition(this.draggedPlayer, position);
          // Clear highlights immediately after successful placement
          this.clearHighlights();
        }
        // Si no es válido, simplemente no hace nada (el jugador vuelve a su lugar)
      });
    });

    // Highlight valid positions when dragging starts
    document.addEventListener('dragstart', (e) => {
      if (this.draggedPlayer) {
        this.highlightValidPositions(this.draggedPlayer);
      }
    });

    document.addEventListener('dragend', (e) => {
      this.clearHighlights();
    });
  }

  isValidPosition(player, positionClasses) {
    const positionClass = positionClasses
      .split(' ')
      .find((cls) => cls.startsWith('position-') && this.positionMappings[cls]);

    if (!positionClass) return false;

    const requiredPosition = this.positionMappings[positionClass];
    return player.position === requiredPosition;
  }

  hasPlayerWithSameName(playerName) {
    return Object.values(this.currentTeam).some(
      (player) =>
        player &&
        player.name === playerName &&
        player.id !== this.draggedPlayer?.id
    );
  }

  isDuplicatePlayer(draggedPlayer, targetPosition) {
    // Get the position class of the target
    const targetPositionClass = targetPosition.className
      .split(' ')
      .find((cls) => cls.startsWith('position-') && this.positionMappings[cls]);

    // If dragging from team, allow swaps between same position types
    if (this.draggedFromTeam && this.draggedFromPosition) {
      const sourcePositionType =
        this.positionMappings[this.draggedFromPosition];
      const targetPositionType = this.positionMappings[targetPositionClass];

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
  highlightValidPositions(player) {
    const courtPositions = document.querySelectorAll('.position');
    courtPositions.forEach((position) => {
      if (
        this.isValidPosition(player, position.className) &&
        !this.isDuplicatePlayer(player, position)
      ) {
        position.style.backgroundColor = 'rgba(76, 175, 80, 0.3)';
        position.style.border = '3px solid #4CAF50';
      }
    });
  }

  clearHighlights() {
    const courtPositions = document.querySelectorAll('.position');
    courtPositions.forEach((position) => {
      position.style.backgroundColor = '';
      position.style.border = '';
      position.style.transform = '';
    });
  }

  placePlayerInPosition(player, positionElement) {
    const positionClass = positionElement.className
      .split(' ')
      .find((cls) => cls.startsWith('position-') && this.positionMappings[cls]);

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
      );
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

  removePlayerFromAllPositions(playerId) {
    Object.keys(this.currentTeam).forEach((pos) => {
      if (this.currentTeam[pos] && this.currentTeam[pos].id === playerId) {
        this.usedPlayerIds.delete(playerId);
        delete this.currentTeam[pos];
        // Clear the visual representation
        const positionEl = document.querySelector(`.${pos}`);
        if (positionEl) {
          this.renderEmptyPosition(positionEl, pos);
        }
      }
    });

    // Update available players and school statistics
    this.renderAvailablePlayers();
    this.updateSchoolStats();
  }

  renderPlayerInPosition(player, positionElement) {
    const playerSlot = positionElement.querySelector('.player-slot');
    if (!playerSlot) return;

    const imageUrl = this.getPlayerImageUrl(player);
    playerSlot.innerHTML = `
            <div class="player-card filled" data-player-id="${player.id}" draggable="true">
                <div class="player-image" style="background-image: url('${imageUrl}')"></div>
                <div class="player-name">${player.name}</div>
                <div class="position-tag">${player.position}</div>
            </div>
        `;

    const playerCard = playerSlot.querySelector('.player-card');

    // Add drag event listeners for players in positions
    playerCard.addEventListener('dragstart', (e) => {
      this.isDragging = true;
      this.dragStartTime = Date.now();
      this.draggedPlayer = player;
      this.draggedFromTeam = true;
      this.draggedFromPosition = positionElement.className
        .split(' ')
        .find(
          (cls) => cls.startsWith('position-') && this.positionMappings[cls]
        );
      this.dragSuccess = false;
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/plain', player.id);
      playerCard.style.opacity = '0.5';
    });

    playerCard.addEventListener('dragend', (e) => {
      playerCard.style.opacity = '1';
      this.clearHighlights();

      // If drag was from team and not successful (didn't land in valid position), remove from team
      if (this.draggedFromTeam && !this.dragSuccess) {
        this.removePlayerFromPosition(positionElement);
      }

      this.draggedPlayer = null;
      this.draggedFromTeam = false;
      this.dragSuccess = false;

      // Reset drag state after a short delay to allow click event to detect it
      setTimeout(() => {
        this.isDragging = false;
        this.dragStartTime = 0;
      }, 100);
    });

    // Add click event to open position selector (only if not dragging)
    playerSlot.addEventListener('click', (e) => {
      const timeSinceDrag = Date.now() - this.dragStartTime;

      // Only open selector if no recent drag operation and position selector not already active
      if (
        !this.isDragging &&
        timeSinceDrag > 200 &&
        !this.positionSelectorActive
      ) {
        e.stopPropagation();
        // DON'T remove the current player, just show the selector for replacement
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

  renderEmptyPosition(positionElement, positionClass) {
    const playerSlot = positionElement.querySelector('.player-slot');
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
            <div class="player-card empty ${
              requiredPosition === 'L' ? 'libero' : ''
            }">
                <div class="position-label">${
                  positionNames[requiredPosition] || requiredPosition
                }</div>
            </div>
        `;
  }

  getPositionNumber(positionClass) {
    const numbers = {
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

  removePlayerFromPosition(positionElement) {
    const positionClass = positionElement.className
      .split(' ')
      .find((cls) => cls.startsWith('position-') && this.positionMappings[cls]);

    if (this.currentTeam[positionClass]) {
      const removedPlayer = this.currentTeam[positionClass];

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

  showPlayerModal(player) {
    this.selectedPlayer = player;

    const imageUrl = this.getPlayerImageUrl(player);

    document.getElementById('modalPlayerImage').src = imageUrl;
    document.getElementById('modalPlayerName').textContent = player.name;
    document.getElementById('modalPlayerSchool').textContent =
      player.school || 'Unknown';
    document.getElementById('modalPlayerPosition').textContent =
      this.getPositionName(player.position);
    document.getElementById('modalPlayerRarity').textContent =
      player.rarity || 'N/A';

    // Clear and update stats
    const statsContainer = document.getElementById('modalPlayerStats');
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
                <span class="stat-value">${this.getPositionName(
                  player.position
                )}</span>
            </div>
        `;

    document.getElementById('playerModal').style.display = 'block';
  }

  setupEventListeners() {
    // Initialize empty positions
    const positions = document.querySelectorAll('.position');
    positions.forEach((position) => {
      const positionClass = position.className
        .split(' ')
        .find(
          (cls) => cls.startsWith('position-') && this.positionMappings[cls]
        );
      if (positionClass) {
        this.renderEmptyPosition(position, positionClass);
      }
    });

    // Modal events
    const modal = document.getElementById('playerModal');
    const closeBtn = document.querySelector('.close');
    const selectBtn = document.getElementById('selectPlayerBtn');

    if (closeBtn) {
      closeBtn.onclick = () => (modal.style.display = 'none');
    }

    if (selectBtn) {
      selectBtn.onclick = () => {
        if (this.selectedPlayer) {
          this.autoPlacePlayer(this.selectedPlayer);
          modal.style.display = 'none';
        }
      };
    }

    window.onclick = (event) => {
      if (event.target === modal) {
        modal.style.display = 'none';
      }
    };

    // Add click events to empty positions
    positions.forEach((position) => {
      const positionClass = position.className
        .split(' ')
        .find(
          (cls) => cls.startsWith('position-') && this.positionMappings[cls]
        );

      if (positionClass) {
        position.addEventListener('click', (e) => {
          // Only show position selector if position is empty
          if (!this.currentTeam[positionClass]) {
            e.stopPropagation();
            this.showPositionSelector(positionClass, position);
          }
        });
      }
    });

    // No need for global tooltip tracking anymore
  }

  autoPlacePlayer(player) {
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
      );
      if (positionElement) {
        this.placePlayerInPosition(player, positionElement);
      }
    } else {
      alert(
        `No hay posiciones disponibles para ${
          player.name
        } (${this.getPositionName(player.position)})`
      );
    }
  }

  // School composition tracking functions
  initializeSchoolStats() {
    this.updateTeamStats();
  }

  getSchoolComposition() {
    const schoolCount = {};

    // Count players in current team by school
    Object.values(this.currentTeam).forEach((player) => {
      if (player && player.school) {
        schoolCount[player.school] = (schoolCount[player.school] || 0) + 1;
      }
    });

    return schoolCount;
  }

  updateSchoolStats() {
    const schoolStats = document.getElementById('schoolStats');
    const schoolComposition = this.getSchoolComposition();

    // Get all unique schools from current team
    const allSchools = [
      ...new Set(
        Object.values(this.currentTeam)
          .filter((player) => player && player.school)
          .map((player) => player.school)
      ),
    ];

    // If no players in team, show empty state
    if (allSchools.length === 0) {
      const noPlayersText = window.languageManager
        ? window.languageManager.t('noPlayersSelected')
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
            <span class="school-count ${
              count >= 4 ? 'complete' : ''
            }">${count}/4</span>
          </div>
        </div>
      `;
      })
      .join('');

    schoolStats.innerHTML = schoolItems;
  }

  // Bonds functionality
  initializeBonds() {
    this.updateBonds();
  }

  updateBonds() {
    const bondsSection = document.getElementById('bondsSection');
    if (!bondsSection) return;

    // Get current team player IDs
    const currentPlayerIds = Object.values(this.currentTeam)
      .filter((player) => player)
      .map((player) => player.id);

    if (currentPlayerIds.length === 0) {
      bondsSection.innerHTML = `<div class="no-players">${
        window.languageManager
          ? window.languageManager.t('noPlayersSelected')
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
        // SOLO mostrar vínculos que tengan is_link_skill: true
        if (!bond.is_link_skill) {
          return false;
        }

        // Mostrar vínculos que tengan al menos un participante en el equipo actual
        if (!bond.participants || bond.participants.length === 0) {
          return false;
        }

        // Mostrar si al menos un participante está en el equipo
        const hasParticipantInTeam = bond.participants.some((participantId) =>
          currentPlayerIds.includes(participantId)
        );

        const shouldShow = hasParticipantInTeam;

        if (
          bond.name.includes('Compañeros de equipo') ||
          bond.name.includes('Amistad')
        ) {
          console.log('Bond:', bond.name);
          console.log('  - is_link_skill:', bond.is_link_skill);
          console.log('  - Participants:', bond.participants);
          console.log('  - hasParticipantInTeam:', hasParticipantInTeam);
          console.log('  - shouldShow:', shouldShow);
        }

        return shouldShow;
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

    console.log('Relevant bonds after filtering:', relevantBonds.length);
    console.log(
      'Bonds found:',
      relevantBonds.map((b) => b.name)
    );

    if (relevantBonds.length === 0) {
      bondsSection.innerHTML = `<div class="no-players">${
        window.languageManager
          ? window.languageManager.t('noBondsAvailable')
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

        // Get participant images HTML
        const participantImagesHTML = bond.participants
          .map((participantId) => {
            const player = this.players.find((p) => p.id === participantId);
            if (player) {
              const imageUrl = this.getPlayerImageUrl(player);
              return `<img src="${imageUrl}" alt="${player.name}" class="participant-image" title="${player.name}">`;
            }
            return `<div class="participant-image" style="background: #666; display: flex; align-items: center; justify-content: center; color: white; font-size: 12px; width: 48px; height: 60px;" title="ID:${participantId}">?</div>`;
          })
          .join('');

        // Generate detailed effect HTML based on bond type
        const effectHTML = this.generateBondEffectHTML(bond, currentPlayerIds);

        return `
        <div class="bond-item ${
          isActive ? 'active' : 'inactive'
        }" data-bond-id="${bond.participants.join('-')}">
          <div class="bond-header" onclick="teamBuilder.toggleBondDetails(this)">
            <div class="bond-name">${bond.name}</div>
            <div class="bond-controls">
              <span class="bond-count ${
                isActive ? 'complete' : ''
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

  toggleBondDetails(headerElement) {
    const bondItem = headerElement.closest('.bond-item');
    const details = bondItem.querySelector('.bond-details');
    const icon = headerElement.querySelector('.expand-icon');

    // Close other open bond details
    document.querySelectorAll('.bond-details').forEach((detail) => {
      if (detail !== details) {
        detail.style.display = 'none';
        const otherIcon = detail
          .closest('.bond-item')
          .querySelector('.expand-icon');
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

  generateBondEffectHTML(bond, currentPlayerIds = []) {
    console.log('=== generateBondEffectHTML called ===');
    console.log('Bond name:', bond.name);
    console.log('Bond object keys:', Object.keys(bond));
    console.log('Bond is_link_skill:', bond.is_link_skill);

    // Si no tiene effects_by_character, mostrar mensaje
    if (!bond.effects_by_character || bond.effects_by_character.length === 0) {
      console.log('Bond sin effects_by_character:', bond.name);
      const t = window.languageManager
        ? window.languageManager.t.bind(window.languageManager)
        : (key) => {
            const fallbacks = {
              noDetailedEffects: 'Vínculo sin efectos detallados:',
              bondType: 'Tipo:',
              linkSkill: 'Link Skill',
              kizunaSkill: 'Kizuna Skill',
            };
            return fallbacks[key] || key;
          };

      return `<div class="bond-effect simple-bond">
        <p>${t('noDetailedEffects')} ${bond.name}</p>
        <p>${t('bondType')} ${
        bond.is_link_skill ? t('linkSkill') : t('kizunaSkill')
      }</p>
      </div>`;
    }

    // Priorizar effects_by_character si existe, incluso para kizuna_skills
    if (bond.effects_by_character && bond.effects_by_character.length > 0) {
      // Attribute bond - show effects by character and levels
      let effectsHTML = '<div class="bond-effect attribute-bond">';
      effectsHTML += '<div class="bond-participants-horizontal">';

      bond.participants.forEach((participantId) => {
        const player = this.players.find((p) => p.id === participantId);
        const isInTeam = currentPlayerIds.includes(participantId);
        const playerImageUrl = player ? this.getPlayerImageUrl(player) : '';
        const borderClass = isInTeam
          ? 'participant-in-team'
          : 'participant-missing';

        console.log(`Processing participant ${participantId}:`, {
          playerFound: !!player,
          isInTeam: isInTeam,
          currentPlayerIdsLength: currentPlayerIds.length,
        });

        if (playerImageUrl) {
          effectsHTML += `<img src="${playerImageUrl}" alt="${
            player ? player.name : participantId
          }" class="participant-image ${borderClass}" title="${
            player ? player.name : `ID: ${participantId}`
          }">`;
        }
      });

      effectsHTML += '</div>'; // Luego mostrar las bonificaciones por personaje

      // Primero mostrar la lista de personajes participantes (formato horizontal simple)
      effectsHTML += '<div class="bonifications-section">';
      const t = window.languageManager
        ? window.languageManager.t.bind(window.languageManager)
        : (key) => {
            const fallbacks = {
              effectsPerCharacter: 'Efectos por Personaje:',
            };
            return fallbacks[key] || key;
          };

      effectsHTML += `<h4 class="bonifications-title">${t(
        'effectsPerCharacter'
      )}</h4>`;

      bond.effects_by_character.forEach((characterEffect) => {
        const player = this.players.find(
          (p) => p.id === characterEffect.character_id
        );
        const playerName = player
          ? player.name
          : `ID: ${characterEffect.character_id}`;
        const playerImageUrl = player ? this.getPlayerImageUrl(player) : null;

        effectsHTML += `<div class="character-effect-container">
          <div class="character-header">
            ${
              playerImageUrl
                ? `<img src="${playerImageUrl}" alt="${playerName}" class="character-effect-image">`
                : ''
            }
            <div class="character-info">
              <div class="character-name">${playerName}</div>
              <div class="character-school">${player ? player.school : ''}</div>
            </div>
          </div>`;

        characterEffect.bonuses.forEach((bonus, bonusIndex) => {
          console.log(
            `Processing bonus ${bonusIndex} for character ${characterEffect.character_id}:`,
            bonus
          );
          console.log('Bonus levels:', bonus.levels);
          console.log(
            'Bonus levels length:',
            bonus.levels ? bonus.levels.length : 'undefined'
          );
          console.log(
            'First level value:',
            bonus.levels && bonus.levels.length > 0 ? bonus.levels[0] : 'N/A'
          );

          effectsHTML += `<div class="bonus-container">
            <div class="bonus-attribute">${bonus.attribute}</div>
            <div class="level-selector" data-character-id="${characterEffect.character_id}" data-attribute="${bonus.attribute}">`;

          // Crear botones para cada nivel
          if (bonus.levels && bonus.levels.length > 0) {
            bonus.levels.forEach((level, index) => {
              const levelNum = index + 1;
              const isActive = index === 0; // Por defecto nivel 1 activo
              const escapedBondName = bond.name.replace(/'/g, "\\'");
              effectsHTML += `<button class="level-btn ${
                isActive ? 'active' : ''
              }" 
                                data-level="${levelNum}" 
                                onclick="window.teamBuilder.setBondLevel('${escapedBondName}', ${
                characterEffect.character_id
              }, '${bonus.attribute}', ${levelNum})">
                Lv.${levelNum}
              </button>`;
            });
          } else {
            const noLevelsText = window.languageManager
              ? window.languageManager.t('noLevelsAvailable')
              : 'Sin niveles disponibles';
            effectsHTML += `<span class="no-levels">${noLevelsText}</span>`;
          }

          effectsHTML += `</div>
            <div class="current-effect">
              <span class="effect-value" data-character-id="${
                characterEffect.character_id
              }" data-attribute="${bonus.attribute}">${this.formatBonusText(
            bonus.levels && bonus.levels.length > 0 ? bonus.levels[0] : 'N/A'
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
        : (key) => {
            const fallbacks = {
              kizunaSkillType: '🔗 Habilidad Kizuna',
              specialEffect: 'Efecto especial',
            };
            return fallbacks[key] || key;
          };

      return `<div class="bond-effect kizuna-skill">
        <div class="effect-type">${t('kizunaSkillType')}</div>
        <div class="effect-description">${
          bond.effect_summary || bond.effects_summary_es || t('specialEffect')
        }</div>
      </div>`;
    }
    // else {
    //   // Fallback for other types
    //   return `<div class="bond-effect">
    //     <div class="effect-description">${
    //       bond.effect_summary ||
    //       bond.effects_summary_es ||
    //       'Efecto no especificado'
    //     }</div>
    //   </div>`;
    // }
  }

  // Nueva función para formatear valores de bono
  formatBonusValue(bonusText) {
    if (!bonusText) return '';

    // Separar valores numéricos y porcentajes
    // Ejemplo: "+5 +1%" -> "+5 puntos + 1% adicional"
    const match = bonusText.match(/([+\-]?\d+)\s*([+\-]?\d+%?)/);
    if (match) {
      const [, points, percentage] = match;
      return `<span class="bonus-points">${points}</span> ${
        window.languageManager ? window.languageManager.t('points') : 'puntos'
      } <span class="bonus-percentage">${percentage}</span> ${
        window.languageManager
          ? window.languageManager.t('additional')
          : 'adicional'
      }`;
    }

    // Si no coincide con el patrón, devolver el texto original
    return bonusText;
  }

  // Nueva función para manejar cambios de nivel de vínculo
  setBondLevel(bondName, characterId, attribute, level) {
    console.log(
      'setBondLevel called:',
      bondName,
      characterId,
      attribute,
      level
    );

    // Unescapar el nombre del bond para la comparación
    const unescapedBondName = bondName.replace(/\\'/g, "'");

    // Encontrar el bond y actualizar la visualización
    const bonds = document.querySelectorAll('.bond-item');
    bonds.forEach((bondElement) => {
      const bondNameElement = bondElement.querySelector('.bond-name');
      if (
        bondNameElement &&
        (bondNameElement.textContent.includes(unescapedBondName) ||
          bondNameElement.textContent.includes(bondName))
      ) {
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
          const bond = this.bonds.find(
            (b) =>
              b.name.includes(unescapedBondName) ||
              unescapedBondName.includes(b.name) ||
              b.name.includes(bondName) ||
              bondName.includes(b.name)
          );
          if (bond && bond.effects_by_character) {
            const characterEffect = bond.effects_by_character.find(
              (ce) => ce.character_id === characterId
            );
            if (characterEffect) {
              const bonus = characterEffect.bonuses.find(
                (b) => b.attribute === attribute
              );
              if (bonus && bonus.levels[level - 1]) {
                // Buscar el elemento que muestra el valor del efecto
                const effectValueElement = bondElement.querySelector(
                  `.effect-value[data-character-id="${characterId}"][data-attribute="${attribute}"]`
                );
                if (effectValueElement) {
                  effectValueElement.textContent = this.formatBonusText(
                    bonus.levels[level - 1]
                  );
                  console.log(
                    'Updated effect value to:',
                    bonus.levels[level - 1]
                  );
                }
              }
            }
          }
        }
      }
    });
  }

  setupBondTooltips() {
    const bondItems = document.querySelectorAll('.bond-item');

    bondItems.forEach((bondItem) => {
      const tooltip = bondItem.querySelector('.bond-tooltip');

      if (tooltip) {
        // Mouse enter event
        bondItem.addEventListener('mouseenter', (e) => {
          tooltip.style.opacity = '1';
          this.positionTooltipSmart(tooltip, e);
        });

        // Mouse leave event
        bondItem.addEventListener('mouseleave', () => {
          tooltip.style.opacity = '0';
        });

        // Mouse move event for positioning
        bondItem.addEventListener('mousemove', (e) => {
          this.positionTooltipSmart(tooltip, e);
        });
      }
    });
  }

  positionTooltipSmart(tooltip, event) {
    // Get viewport dimensions
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft =
      window.pageXOffset || document.documentElement.scrollLeft;

    // Get tooltip dimensions (force visibility to measure)
    const originalOpacity = tooltip.style.opacity;
    tooltip.style.opacity = '1';
    tooltip.style.visibility = 'hidden';
    const tooltipRect = tooltip.getBoundingClientRect();
    const tooltipWidth = tooltipRect.width || 300;
    const tooltipHeight = tooltipRect.height || 200;
    tooltip.style.visibility = 'visible';
    tooltip.style.opacity = originalOpacity;

    // Mouse position
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    // Calculate preferred position (right and below cursor)
    let left = mouseX + 15;
    let top = mouseY + 15;

    // Adjust horizontal position if tooltip goes off right edge
    if (left + tooltipWidth > viewportWidth) {
      left = mouseX - tooltipWidth - 15; // Position to the left of cursor
    }

    // Adjust vertical position if tooltip goes off bottom edge
    if (top + tooltipHeight > viewportHeight) {
      top = mouseY - tooltipHeight - 15; // Position above cursor
    }

    // Ensure tooltip doesn't go off left edge
    if (left < 10) {
      left = 10;
    }

    // Ensure tooltip doesn't go off top edge
    if (top < 10) {
      top = 10;
    }

    // Convert to absolute positioning considering scroll
    tooltip.style.left = left + scrollLeft + 'px';
    tooltip.style.top = top + scrollTop + 'px';
  }

  updateTeamStats() {
    this.updateSchoolStats();
    this.updateBonds();
  }

  // Rotation functionality
  setupRotationButton() {
    const rotationButton = document.getElementById('rotationButton');
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

  rotatePlayersClockwise() {
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
    const positionContents = {};
    const positionMappings = {};

    rotationSequence.forEach((pos) => {
      // Guardar el jugador actual en esa posición
      positionContents[pos] = this.currentTeam[pos] || null;
      // Guardar el mapping de posición actual
      positionMappings[pos] = this.positionMappings[pos];
    });

    console.log('Contenido de posiciones antes de rotar:', positionContents);

    // Animación del botón
    const rotationButton = document.getElementById('rotationButton');
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
      const newPositionMappings = {};
      rotationSequence.forEach((pos, index) => {
        const nextIndex = (index + 1) % rotationSequence.length;
        const nextPos = rotationSequence[nextIndex];
        newPositionMappings[nextPos] = positionMappings[pos];
      });

      // Rotar el contenido de las posiciones (jugadores)
      const newPositionContents = {};
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
        const positionElement = document.querySelector(`.${pos}`);
        if (positionElement) {
          if (this.currentTeam[pos]) {
            // Hay un jugador, renderizarlo
            this.renderPlayerInPosition(this.currentTeam[pos], positionElement);
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

  animatePositionMovement(rotationSequence, callback) {
    // Obtener las posiciones actuales de cada elemento
    const positions = {};
    rotationSequence.forEach((pos) => {
      const element = document.querySelector(`.${pos}`);
      if (element) {
        const rect = element.getBoundingClientRect();
        positions[pos] = { x: rect.left, y: rect.top };
      }
    });

    // Calcular las posiciones de destino (siguiente en la secuencia)
    const animations = [];
    rotationSequence.forEach((pos, index) => {
      const nextIndex = (index + 1) % rotationSequence.length;
      const nextPos = rotationSequence[nextIndex];

      const currentPos = positions[pos];
      const targetPos = positions[nextPos];

      if (currentPos && targetPos) {
        const deltaX = targetPos.x - currentPos.x;
        const deltaY = targetPos.y - currentPos.y;

        animations.push({
          element: document.querySelector(`.${pos}`),
          deltaX,
          deltaY,
        });
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

  // Position Selector Methods
  setupPositionSelector() {
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
      if (
        this.positionSelectorActive &&
        !positionSelector.contains(e.target) &&
        !e.target.closest('.position')
      ) {
        this.hidePositionSelector();
      }
    });
  }

  showPositionSelector(positionClass, positionElement) {
    const requiredPosition = this.positionMappings[positionClass];
    const positionSelector = document.getElementById('positionSelector');
    const positionPlayersList = document.getElementById('positionPlayersList');
    const positionSelectorTitle = document.getElementById(
      'positionSelectorTitle'
    );

    // Store selected position
    this.selectedPosition = positionClass;
    this.positionSelectorActive = true;

    // Get current language and translations
    const currentLanguage = window.languageManager
      ? window.languageManager.getCurrentLanguage()
      : 'es';
    const t = translations[currentLanguage];

    // Update title with translation
    const positionNames = {
      OP: t.opposite,
      WS: t.wingSpiker,
      MB: t.middleBlocker,
      S: t.setter,
      L: t.libero,
    };
    positionSelectorTitle.textContent = `${t.selectPlayerFor} ${positionNames[requiredPosition]} ${t.forThisPosition}`;

    // Filter players for this position
    const compatiblePlayers = this.players.filter(
      (player) =>
        player.position === requiredPosition &&
        !this.usedPlayerIds.has(player.id)
    );

    // Clear previous content
    positionPlayersList.innerHTML = '';

    // Add compatible players
    compatiblePlayers.forEach((player) => {
      const playerCard = this.createPositionPlayerCard(player);
      positionPlayersList.appendChild(playerCard);
    });

    // Show selector with animation
    document.body.classList.add('position-selector-active');
    positionSelector.classList.add('active');
    positionSelector.setAttribute('aria-hidden', 'false');
  }

  hidePositionSelector() {
    const positionSelector = document.getElementById('positionSelector');

    this.selectedPosition = null;
    this.positionSelectorActive = false;

    // Hide with animation
    document.body.classList.remove('position-selector-active');
    positionSelector.classList.remove('active');
    positionSelector.setAttribute('aria-hidden', 'true');
  }

  createPositionPlayerCard(player) {
    const playerCard = document.createElement('div');
    playerCard.className = 'position-player-card';
    playerCard.setAttribute('role', 'button');
    playerCard.setAttribute('tabindex', '0');
    playerCard.setAttribute('title', player.name); // Tooltip for name

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

  selectPlayerFromPositionSelector(player) {
    if (this.selectedPosition) {
      const positionElement = document.querySelector(
        `.${this.selectedPosition}`
      );
      if (positionElement) {
        this.placePlayerInPosition(player, positionElement);
        this.hidePositionSelector();
      }
    }
  }
}

// Initialize the team builder when the page loads
document.addEventListener('DOMContentLoaded', () => {
  // Initialize language manager first
  window.languageManager = new LanguageManager();
  // Then initialize team builder
  window.teamBuilder = new HaikyuTeamBuilder();
});
