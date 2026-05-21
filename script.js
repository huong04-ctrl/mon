// Sample Data for Restaurants
const restaurants = [
    {
        id: 1,
        name: "Myeongdong Kyoja (명동교자)",
        lat: 37.5626,
        lng: 126.9850,
        desc: "Famous for kalguksu (noodle soup) and dumplings.",
        price: "💰 ~10,000 KRW",
        tags: ["english", "cheap"]
    },
    {
        id: 2,
        name: "Halal Guys Itaewon",
        lat: 37.5345,
        lng: 126.9945,
        desc: "Popular halal food platter. Great portion sizes.",
        price: "💰 ~12,000 KRW",
        tags: ["halal", "english"]
    },
    {
        id: 3,
        name: "Plant Cafe Seoul",
        lat: 37.5332,
        lng: 126.9938,
        desc: "100% Vegan restaurant and bakery.",
        price: "💰 ~15,000 KRW",
        tags: ["vegan", "english"]
    },
    {
        id: 4,
        name: "Gimbap Cheonguk (김밥천국)",
        lat: 37.5583,
        lng: 126.9443,
        desc: "Super cheap local eats. Quick bites, many options.",
        price: "💰 ~5,000 KRW",
        tags: ["cheap"]
    },
    {
        id: 5,
        name: "Busan Jib Halal Meat",
        lat: 37.5623,
        lng: 126.9840,
        desc: "Halal certified authentic Korean BBQ experience.",
        price: "💰 ~20,000 KRW",
        tags: ["halal", "english"]
    }
];

let map;
let markersLayer;

// Initialize Map
function initMap() {
    // Center map around Seoul (can be changed to school location later)
    map = L.map('map').setView([37.5500, 126.9800], 12);

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap'
    }).addTo(map);

    markersLayer = L.layerGroup().addTo(map);
    
    // Initial Render
    renderRestaurants(restaurants);
}

// Render Restaurants in Sidebar and on Map
function renderRestaurants(data) {
    const listContainer = document.getElementById('restaurantList');
    listContainer.innerHTML = '';
    markersLayer.clearLayers(); // Clear old markers

    if (data.length === 0) {
        listContainer.innerHTML = '<p style="text-align:center; color: #747d8c; margin-top:20px;">No restaurants found matching criteria.</p>';
        return;
    }

    data.forEach(res => {
        // Create Sidebar Card
        const card = document.createElement('div');
        card.className = 'restaurant-card';
        card.innerHTML = `
            <h4>${res.name}</h4>
            <p style="font-size:0.85rem; color:#747d8c;">${res.desc}</p>
            <div style="font-size:0.85rem; font-weight:600; margin-top:5px;">${res.price}</div>
            <div class="restaurant-tags">
                ${res.tags.map(tag => `<span class="tag ${tag}">${getTagLabel(tag)}</span>`).join('')}
            </div>
        `;

        // Pan to marker on card click
        card.addEventListener('click', () => {
            map.setView([res.lat, res.lng], 16, { animate: true });
            marker.openPopup();
        });

        listContainer.appendChild(card);

        // Create Map Marker
        const marker = L.marker([res.lat, res.lng]);
        
        // Custom Popup
        const popupContent = `
            <div class="popup-title">${res.name}</div>
            <div class="popup-desc">${res.desc}</div>
            <div style="font-size:0.8rem; font-weight:bold; margin-top:5px; color: #ff6b6b;">${res.price}</div>
        `;
        marker.bindPopup(popupContent);
        markersLayer.addLayer(marker);
    });
}

function getTagLabel(tag) {
    const labels = {
        'halal': '☪️ Halal',
        'vegan': '🥗 Vegan',
        'english': '🇬🇧 English Menu',
        'cheap': '💸 Cheap'
    };
    return labels[tag] || tag;
}

// Filtering Logic
const filterButtons = document.querySelectorAll('.chip');
let activeFilter = 'all';

filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all
        filterButtons.forEach(b => b.classList.remove('active'));
        // Add to clicked
        btn.classList.add('active');
        
        activeFilter = btn.dataset.filter;
        applyFilters();
    });
});

// Search Logic
const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('input', applyFilters);

function applyFilters() {
    const searchTerm = searchInput.value.toLowerCase();
    
    const filtered = restaurants.filter(res => {
        // Tag Match
        const matchesTag = activeFilter === 'all' || res.tags.includes(activeFilter);
        // Search Match
        const matchesSearch = res.name.toLowerCase().includes(searchTerm) || 
                              res.desc.toLowerCase().includes(searchTerm);
                              
        return matchesTag && matchesSearch;
    });

    renderRestaurants(filtered);
}

// Make sure to call initMap when window loads
window.onload = initMap;
