// Team Builder para Haikyu Flight High
class HaikyuTeamBuilder {
  constructor() {
    this.players = [];
    this.currentTeam = {};
    this.selectedPlayer = null;
    this.positionMappings = {
      'position-1': 'WS', // Back left - Wing Spiker
      'position-5': 'WS', // Back right - Wing Spiker
      'position-6': 'MB', // Back center - Middle Blocker
      'position-3': 'MB', // Front center - Middle Blocker
      'position-4': 'OP', // Front left - Opposite
      'position-2': 'S', // Front right - Setter
      'position-libero': 'Li', // Libero
    };
    this.draggedPlayer = null;
    this.init();
  }

  async init() {
    await this.loadPlayers();
    this.renderAvailablePlayers();
    this.setupDragAndDrop();
    this.setupEventListeners();
  }

  async loadPlayers() {
    try {
      const response = await fetch('./haikyu_fly_high_full_v3.json');
      const data = await response.json();
      this.players = data.characters;
      console.log(`Loaded ${this.players.length} players`);
    } catch (error) {
      console.error('Error loading players:', error);
      // Fallback data if JSON fails to load
      this.players = this.getFallbackPlayers();
    }
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

      playersByPosition[position].slice(0, 20).forEach((player) => {
        // Limit to 20 players per position
        const playerElement = this.createAvailablePlayerElement(player);
        playerGrid.appendChild(playerElement);
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
      Li: 'Libero',
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

    const imageUrl =
      player.profile_image_url ||
      `https://via.placeholder.com/80x100/667eea/white?text=${player.name.charAt(
        0
      )}`;

    playerDiv.innerHTML = `
            <div class="player-image" style="background-image: url('${imageUrl}')"></div>
            <div class="player-name">${player.name}</div>
            <div class="position-tag">${player.position}</div>
        `;

    // Add drag event listeners
    playerDiv.addEventListener('dragstart', (e) => {
      this.draggedPlayer = player;
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/plain', player.id);
      playerDiv.style.opacity = '0.5';
    });

    playerDiv.addEventListener('dragend', (e) => {
      playerDiv.style.opacity = '1';
      this.draggedPlayer = null;
    });

    playerDiv.addEventListener('click', () => {
      this.showPlayerModal(player);
    });

    return playerDiv;
  }

  setupDragAndDrop() {
    const courtPositions = document.querySelectorAll('.position');

    courtPositions.forEach((position) => {
      position.addEventListener('dragover', (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';

        // Check if position is valid for dragged player
        if (
          this.draggedPlayer &&
          this.isValidPosition(this.draggedPlayer, position.className) &&
          !this.hasPlayerWithSameName(this.draggedPlayer.name)
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
          !this.hasPlayerWithSameName(this.draggedPlayer.name)
        ) {
          this.placePlayerInPosition(this.draggedPlayer, position);
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
      (player) => player && player.name === playerName
    );
  }

  highlightValidPositions(player) {
    const courtPositions = document.querySelectorAll('.position');
    courtPositions.forEach((position) => {
      if (
        this.isValidPosition(player, position.className) &&
        !this.hasPlayerWithSameName(player.name)
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

    // Remove player from current position if exists
    this.removePlayerFromAllPositions(player.id);

    // Add player to new position
    this.currentTeam[positionClass] = player;
    this.renderPlayerInPosition(player, positionElement);

    console.log(`Placed ${player.name} in ${positionClass}`);
  }

  removePlayerFromAllPositions(playerId) {
    Object.keys(this.currentTeam).forEach((pos) => {
      if (this.currentTeam[pos] && this.currentTeam[pos].id === playerId) {
        delete this.currentTeam[pos];
        // Clear the visual representation
        const positionEl = document.querySelector(`.${pos}`);
        if (positionEl) {
          this.renderEmptyPosition(positionEl, pos);
        }
      }
    });
  }

  renderPlayerInPosition(player, positionElement) {
    const playerSlot = positionElement.querySelector('.player-slot');
    if (!playerSlot) return;

    const imageUrl =
      player.profile_image_url ||
      `https://via.placeholder.com/120x140/667eea/white?text=${player.name.charAt(
        0
      )}`;

    playerSlot.innerHTML = `
            <div class="player-card filled" data-player-id="${player.id}">
                <div class="player-image" style="background-image: url('${imageUrl}')"></div>
                <div class="player-name">${player.name}</div>
                <div class="position-tag">${player.position}</div>
            </div>
        `;

    // Add click event to view player details
    playerSlot.addEventListener('click', () => {
      this.showPlayerModal(player);
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
      Li: 'L',
      MB: 'MB',
      WS: 'WS',
      OP: 'OP',
      S: 'S',
    };

    playerSlot.innerHTML = `
            <div class="player-card empty ${
              requiredPosition === 'Li' ? 'libero' : ''
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
      delete this.currentTeam[positionClass];
      this.renderEmptyPosition(positionElement, positionClass);
    }
  }

  showPlayerModal(player) {
    this.selectedPlayer = player;

    const imageUrl =
      player.profile_image_url ||
      `https://via.placeholder.com/150x150/667eea/white?text=${player.name.charAt(
        0
      )}`;

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
}

// Initialize the team builder when the page loads
document.addEventListener('DOMContentLoaded', () => {
  new HaikyuTeamBuilder();
});
