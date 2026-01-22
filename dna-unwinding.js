const MAX_PEARL_WIDTH = 20;
const MIN_PEARL_WIDTH = 2;
const CONTENT_HEIGHT_THRESHOLD = 2000;
const ANIMATION_DURATION = 300;
const ANIMATION_FPS = 60;

// Calculer la largeur de la perle selon la hauteur du contenu
function calculatePearlWidth(contentHeight) {
  if (contentHeight <= 0) return MIN_PEARL_WIDTH;
  if (contentHeight >= CONTENT_HEIGHT_THRESHOLD) return MAX_PEARL_WIDTH;
  
  const ratio = contentHeight / CONTENT_HEIGHT_THRESHOLD;
  return MIN_PEARL_WIDTH + (ratio * (MAX_PEARL_WIDTH - MIN_PEARL_WIDTH));
}

// Animation d'unwinding
function animateUnwinding(item, fromWidth, toWidth, isOpening) {
  const startTime = performance.now();
  const duration = ANIMATION_DURATION;
  
  function animate(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    const easeProgress = isOpening 
      ? 1 - Math.pow(1 - progress, 3)
      : Math.pow(progress, 3);
    
    const currentWidth = fromWidth + (toWidth - fromWidth) * easeProgress;
    item.style.setProperty('--current-width', currentWidth + 'px');
    
    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  }
  
  requestAnimationFrame(animate);
}

// Recalculer la vraie hauteur incluant les sous-accordéons ouverts
function getRealHeight(content) {
  const oldMaxHeight = content.style.maxHeight;
  const oldOverflow = content.style.overflow;
  
  content.style.maxHeight = 'none';
  content.style.overflow = 'visible';
  
  const height = content.scrollHeight;
  
  content.style.maxHeight = oldMaxHeight;
  content.style.overflow = oldOverflow;
  
  return height;
}

// Toggle accordéon avec unwinding
function toggleAccordion(item) {
  const content = item.querySelector(':scope > .accordion-content');
  const isOpen = item.classList.contains('open');
  const pearlWidth = parseFloat(item.style.getPropertyValue('--pearl-width')) || MIN_PEARL_WIDTH;
  
  if (isOpen) {
    content.style.maxHeight = '0';
    item.classList.remove('open');
    animateUnwinding(item, 2, pearlWidth, false);
  } else {
    item.classList.add('open');
    
    // Calculer la vraie hauteur
    const actualHeight = getRealHeight(content);
    
    // Animer depuis 0 vers la hauteur réelle
    content.style.maxHeight = '0';
    setTimeout(() => {
      content.style.maxHeight = actualHeight + 'px';
    }, 10);
    
    animateUnwinding(item, pearlWidth, 2, true);
    
    // Mettre à jour les parents
    setTimeout(() => updateParentHeights(item), 320);
  }
}

// Mettre à jour les hauteurs des parents
function updateParentHeights(item) {
  let parent = item.parentElement;
  
  while (parent) {
    const parentAccordion = parent.closest('.accordion-item');
    if (!parentAccordion) break;
    
    if (parentAccordion.classList.contains('open')) {
      const parentContent = parentAccordion.querySelector(':scope > .accordion-content');
      const newHeight = getRealHeight(parentContent);
      parentContent.style.maxHeight = newHeight + 'px';
      parentAccordion.setAttribute('data-content-height', newHeight);
    }
    
    parent = parentAccordion.parentElement;
  }
}

// Calculer toutes les hauteurs
function calculateAllHeights() {
  const items = document.querySelectorAll('.accordion-item');
  
  items.forEach(item => {
    const content = item.querySelector(':scope > .accordion-content');
    if (!content) return;
    
    const wasOpen = item.classList.contains('open');
    
    // Ouvrir temporairement pour mesurer
    item.classList.add('open');
    const fullHeight = getRealHeight(content);
    
    item.setAttribute('data-content-height', fullHeight);
    
    const pearlWidth = calculatePearlWidth(fullHeight);
    item.style.setProperty('--pearl-width', pearlWidth + 'px');
    
    if (!wasOpen) {
      item.style.setProperty('--current-width', pearlWidth + 'px');
      item.classList.remove('open');
      content.style.maxHeight = '0';
    } else {
      content.style.maxHeight = fullHeight + 'px';
      item.style.setProperty('--current-width', '2px');
    }
  });
}

// Ajouter les zones cliquables pour les perles
function addPearlClickZones() {
    const items = document.querySelectorAll('.accordion-item');
    items.forEach(item => {
        if (!item.querySelector('.pearl-click-zone')) {
            const clickZone = document.createElement('div');
            clickZone.className = 'pearl-click-zone';
            clickZone.addEventListener('click', (e) => {
                e.stopPropagation();
                toggleAccordion(item);
            });
            item.insertBefore(clickZone, item.firstChild);
        }
    });
}

// Initialiser
document.addEventListener('DOMContentLoaded', () => {
    calculateAllHeights();
    addPearlClickZones();
    
    const titles = document.querySelectorAll('.accordion-title');
    titles.forEach(title => {
        title.addEventListener('click', (e) => {
            e.preventDefault();
            const item = title.closest('.accordion-item');
            toggleAccordion(item);
        });
    });
});

// Recalculer au resize
window.addEventListener('resize', calculateAllHeights);

