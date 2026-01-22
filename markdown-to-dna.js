// Liste des fichiers de contenu dans l'ordre d'affichage
const contentFiles = [
    'content/intro.md',
    'content/test-project-1.md',
    'content/test-project-2.md',
    'content/test-project-3.md',
    'content/vc-threonate.md'
];

// Charger tous les fichiers et assembler
async function loadAllContent() {
    try {
        const allHTML = [];
        
        for (const file of contentFiles) {
            const response = await fetch(file);
            if (response.ok) {
                const markdown = await response.text();
                const html = marked.parse(markdown);
                allHTML.push(html);
            } else {
                console.warn(`Fichier non trouvé: ${file}`);
            }
        }
        
        const combinedHTML = allHTML.join('\n');
        const accordionHTML = convertToAccordions(combinedHTML);
        document.getElementById('content').innerHTML = accordionHTML;

        // Initialiser les accordéons après création
        setTimeout(() => {
            calculateAllHeights();
            addPearlClickZones();
    
            // Ajouter les événements sur les titres
            const titles = document.querySelectorAll('.accordion-title');
            titles.forEach(title => {
                title.addEventListener('click', (e) => {
                    e.preventDefault();
                    const item = title.closest('.accordion-item');
                    toggleAccordion(item);
                });
            });
        }, 100);


        
    } catch (error) {
        console.error('Erreur chargement:', error);
    }
}

// Convertir HTML plat en structure d'accordéons DNA
function convertToAccordions(html) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const elements = Array.from(doc.body.children);
    
    let result = '';
    let stack = [];
    
    elements.forEach(el => {
        const tag = el.tagName.toLowerCase();
        
        if (tag === 'h1') {
            result += el.outerHTML;
        } else if (['h2', 'h3', 'h4', 'h5'].includes(tag)) {
            const level = parseInt(tag[1]);
            
            while (stack.length > 0 && stack[stack.length - 1] >= level) {
                result += '</div></div>';
                stack.pop();
            }
            
            result += `<div class="accordion-item">`;
            result += `<${tag} class="accordion-title">${el.textContent}</${tag}>`;
            result += `<div class="accordion-content">`;
            
            stack.push(level);
        } else {
            result += el.outerHTML;
        }
    });
    
    while (stack.length > 0) {
        result += '</div></div>';
        stack.pop();
    }
    
    return result;
}

document.addEventListener('DOMContentLoaded', loadAllContent);
