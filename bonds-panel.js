// Bonds panel slide-out logic for responsive UI

document.addEventListener('DOMContentLoaded', function () {
  const bondsPanelBtn = document.getElementById('bondsPanelBtn');
  const bondsPanel = document.getElementById('bondsPanel');
  const closeBondsPanel = document.getElementById('closeBondsPanel');
  const bondsPanelContent = document.getElementById('bondsPanelContent');
  const schoolPanel = document.querySelector('.school-panel');
  const gameArea = document.querySelector('.game-area');

  if (
    !bondsPanelBtn ||
    !bondsPanel ||
    !closeBondsPanel ||
    !bondsPanelContent ||
    !schoolPanel ||
    !gameArea
  )
    return;

  // Helper to check if mobile/tablet
  function isSmallScreen() {
    return window.innerWidth <= 1440;
  }

  // Move .school-panel into overlay
  function moveSchoolPanelToOverlay() {
    if (isSmallScreen() && !bondsPanelContent.contains(schoolPanel)) {
      bondsPanelContent.appendChild(schoolPanel);
    }
  }
  // Move .school-panel back to main layout
  function moveSchoolPanelToMain() {
    if (!isSmallScreen() && !gameArea.contains(schoolPanel)) {
      gameArea.insertBefore(schoolPanel, gameArea.firstChild);
    }
  }

  // Open panel
  bondsPanelBtn.addEventListener('click', function () {
    moveSchoolPanelToOverlay();
    bondsPanel.classList.add('open');
    bondsPanelBtn.setAttribute('aria-expanded', 'true');
    document.body.classList.add('bonds-panel-open');
    bondsPanel.focus();
    document.body.style.overflow = 'hidden';
  });

  // Close panel
  function closePanel() {
    bondsPanel.classList.remove('open');
    bondsPanelBtn.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('bonds-panel-open');
    document.body.style.overflow = '';
    bondsPanelBtn.focus();
    moveSchoolPanelToMain();
  }
  closeBondsPanel.addEventListener('click', closePanel);

  // Close on overlay ESC
  bondsPanel.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closePanel();
  });

  // Optional: click outside to close
  document.addEventListener('mousedown', function (e) {
    if (
      bondsPanel.classList.contains('open') &&
      !bondsPanel.contains(e.target) &&
      e.target !== bondsPanelBtn
    ) {
      closePanel();
    }
  });

  // On resize, move panel as needed
  window.addEventListener('resize', function () {
    if (bondsPanel.classList.contains('open')) {
      moveSchoolPanelToOverlay();
    } else {
      moveSchoolPanelToMain();
    }
  });

  // On load, ensure correct placement
  if (isSmallScreen()) {
    moveSchoolPanelToMain();
  }
});
