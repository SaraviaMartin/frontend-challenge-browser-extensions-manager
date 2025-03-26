// Datos de las extensiones
const extensions = [
    {
    "id": 1,
    "name": "DevLens",
    "description": "Quickly inspect page layouts and visualize element boundaries.",
    "icon": "./assets/icons/devlens.svg",
    "active": true
},
{
    "id": 2,
    "name": "StyleSpy",
    "description": "Instantly analyze and copy CSS from any webpage element.",
    "icon": "./assets/icons/stylespy.svg",
    "active": true
},
{
    "id": 3,
    "name": "SpeedBoost",
    "description": "Optimizes browser resource usage to accelerate page loading.",
    "icon": "./assets/icons/speedboost.svg",
    "active": false
},
{
    "id": 4,
    "name": "JSONWizard",
    "description": "Formats, validates, and prettifies JSON responses in-browser.",
    "icon": "./assets/icons/jsonwizard.svg",
    "active": true
},
{
    "id": 5,
    "name": "TabMaster Pro",
    "description": "Organizes browser tabs into groups and sessions.",
    "icon": "./assets/icons/tabmasterpro.svg",
    "active": true
},
{
    "id": 6,
    "name": "ViewportBuddy",
    "description": "Simulates various screen resolutions directly within the browser.",
    "icon": "./assets/icons/viewportbuddy.svg",
    "active": false
},
{
    "id": 7,
    "name": "Markup Notes",
    "description": "Enables annotation and notes directly onto webpages for collaborative debugging.",
    "icon": "./assets/icons/markupnotes.svg",
    "active": true
},
{
    "id": 8,
    "name": "GridGuides",
    "description": "Overlay customizable grids and alignment guides on any webpage.",
    "icon": "./assets/icons/gridguides.svg",
    "active": false
},
{
    "id": 9,
    "name": "Palette Picker",
    "description": "Instantly extracts color palettes from any webpage.",
    "icon": "./assets/icons/palettepicker.svg",
    "active": true
},
{
    "id": 10,
    "name": "LinkChecker",
    "description": "Scans and highlights broken links on any page.",
    "icon": "./assets/icons/linkchecker.svg",
    "active": true
},
{
    "id": 11,
    "name": "DOM Snapshot",
    "description": "Capture and export DOM structures quickly.",
    "icon": "./assets/icons/domsnapshot.svg",
    "active": false
},
{
    "id": 12,
    "name": "ConsolePlus",
    "description": "Enhanced developer console with advanced filtering and logging.",
    "icon": "./assets/icons/consoleplus.svg",
    "active": true
}
];

const extensionsMap = new Map(extensions.map(ext => [ext.id, ext]));

function getExtensionById(id) {
    return extensionsMap.get(id);
}

// Estado de la aplicación
let currentFilter = 'all';
let isDarkMode = false;

// Función para crear una card de extensión
function createExtensionCard(extension) {
    const card = document.createElement('div');
    card.className = 'extension-card';
    card.dataset.id = extension.id;
    
    // Crear un elemento de imagen y verificar si existe el ícono
    const img = new Image();
    const iconSrc = extension.icon || '#'; // Usa # como fallback si no hay ícono
    
    card.innerHTML = `
        <div class="extension-header">
            <div class="extension-info">
                <div class="extension-icon-wrapper">
                    <img src="${iconSrc}" 
                         alt="${extension.name}" 
                         class="extension-icon">
                </div>
                <div>
                    <h3>${extension.name}</h3>
                    <p>${extension.description}</p>
                </div>
            </div>
            <label class="toggle-switch">
                <input type="checkbox" ${extension.active ? 'checked' : ''}>
                <span class="slider"></span>
            </label>
        </div>
        <button class="remove-btn">Remove</button>
    `;
    
    return card;
}

// Función para manejar los eventos de la card
function setupCardEvents(card, extension) {
    const toggleInput = card.querySelector('input[type="checkbox"]');
    const removeBtn = card.querySelector('.remove-btn');
    
    toggleInput.addEventListener('change', (e) => {
        extension.active = e.target.checked;
        updateVisibility(card, currentFilter);
    });
    
    removeBtn.addEventListener('click', () => {
        const index = extensions.findIndex(ext => ext.id === extension.id);
        if (index > -1) {
            extensions.splice(index, 1);
            card.remove();
        }
    });
}

// Función para actualizar la visibilidad de una card según el filtro
function updateVisibility(card, filter) {
    const extensionId = parseInt(card.dataset.id);
    const extension = extensions.find(ext => ext.id === extensionId);
    
    if (!extension) return;

    const shouldDisplay = 
        filter === 'all' || 
        (filter === 'active' && extension.active) || 
        (filter === 'inactive' && !extension.active);
    
    card.style.display = shouldDisplay ? 'block' : 'none';
}

// Función para renderizar todas las extensiones
function renderExtensions() {
    const container = document.getElementById('extensionsContainer');
    if (!container) return;
    
    // Limpia el contenedor
    container.innerHTML = '';
    
    // Crea y añade todas las cards
    extensions.forEach(extension => {
        const card = createExtensionCard(extension);
        setupCardEvents(card, extension);
        container.appendChild(card);
        updateVisibility(card, currentFilter);
    });
}

// Función para manejar el cambio de filtro
function handleFilterChange(newFilter) {
    currentFilter = newFilter;
    const cards = document.querySelectorAll('.extension-card');
    cards.forEach(card => updateVisibility(card, currentFilter));
}

// Función para cambiar el tema
function toggleTheme() {
    isDarkMode = !isDarkMode;
    document.body.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
}

// Inicialización cuando el DOM está listo
document.addEventListener('DOMContentLoaded', () => {
    // Renderiza la lista inicial
    renderExtensions();
    
    // Configura los filtros
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            filterButtons.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            handleFilterChange(e.target.dataset.filter);
        });
    });
    
    // Configura el toggle de tema
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
});
