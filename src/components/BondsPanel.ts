// BondsPanel.ts - encapsulated bonds panel logic as a component

export class BondsPanel {
  private bondsPanelBtn: HTMLButtonElement | null;
  private bondsPanel: HTMLElement | null;
  private closeBondsPanel: HTMLButtonElement | null;
  private bondsPanelContent: HTMLElement | null;
  private schoolPanel: HTMLElement | null;
  private gameArea: HTMLElement | null;

  constructor() {
    this.bondsPanelBtn = document.getElementById('bondsPanelBtn') as HTMLButtonElement | null;
    this.bondsPanel = document.getElementById('bondsPanel') as HTMLElement | null;
    this.closeBondsPanel = document.getElementById('closeBondsPanel') as HTMLButtonElement | null;
    this.bondsPanelContent = document.getElementById('bondsPanelContent') as HTMLElement | null;
    this.schoolPanel = document.querySelector('.school-panel') as HTMLElement | null;
    this.gameArea = document.querySelector('.game-area') as HTMLElement | null;
  }

  public init() {
    if (!this.bondsPanelBtn || !this.bondsPanel || !this.closeBondsPanel || !this.bondsPanelContent || !this.schoolPanel || !this.gameArea) return;

    this.bondsPanelBtn.addEventListener('click', this.openPanel);
    this.closeBondsPanel.addEventListener('click', this.closePanel);
    if (this.bondsPanel) {
      this.bondsPanel.addEventListener('keydown', this.handleKeyDown);
    }
    document.addEventListener('mousedown', this.handleClickOutside);
    window.addEventListener('resize', this.handleResize);
    // On load, ensure correct placement
    if (this.isSmallScreen()) {
      this.moveSchoolPanelToMain();
    }
  }

  private isSmallScreen = (): boolean => window.innerWidth <= 1400;

  private moveSchoolPanelToOverlay = () => {
    if (
      this.isSmallScreen() &&
      this.bondsPanelContent &&
      this.schoolPanel &&
      !this.bondsPanelContent.contains(this.schoolPanel)
    ) {
      this.bondsPanelContent.appendChild(this.schoolPanel);
    }
  };

  private moveSchoolPanelToMain = () => {
    if (
      !this.isSmallScreen() &&
      this.gameArea &&
      this.schoolPanel &&
      !this.gameArea.contains(this.schoolPanel)
    ) {
      this.gameArea.insertBefore(this.schoolPanel, this.gameArea.firstChild);
    }
  };

  private openPanel = () => {
    this.moveSchoolPanelToOverlay();
    if (this.bondsPanel) {
      this.bondsPanel.classList.add('open');
      this.bondsPanel.focus();
    }
    if (this.bondsPanelBtn) {
      this.bondsPanelBtn.setAttribute('aria-expanded', 'true');
    }
    document.body.classList.add('bonds-panel-open');
    document.body.style.overflow = 'hidden';
  };

  private closePanel = () => {
    if (this.bondsPanel) {
      this.bondsPanel.classList.remove('open');
    }
    if (this.bondsPanelBtn) {
      this.bondsPanelBtn.setAttribute('aria-expanded', 'false');
      this.bondsPanelBtn.focus();
    }
    document.body.classList.remove('bonds-panel-open');
    document.body.style.overflow = '';
    this.moveSchoolPanelToMain();
  };

  private handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') this.closePanel();
  };

  private handleClickOutside = (e: MouseEvent) => {
    if (
      this.bondsPanel &&
      this.bondsPanel.classList.contains('open') &&
      !this.bondsPanel.contains(e.target as Node) &&
      e.target !== this.bondsPanelBtn
    ) {
      this.closePanel();
    }
  };

  private handleResize = () => {
    if (this.bondsPanel && this.bondsPanel.classList.contains('open')) {
      this.moveSchoolPanelToOverlay();
    } else {
      this.moveSchoolPanelToMain();
    }
  };
}
