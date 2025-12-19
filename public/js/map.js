// Initialize the map with a default view (World view)
const map = L.map('map').setView([20, 0], 2);

// Add OpenStreetMap tiles
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var redIcon = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

// Function to convert address to coordinates (Geocoding)
async function geocodeAddress(address) {
    try {
        const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`);
        const data = await response.json();

        if (data.length > 0) {
            //api will send me newrby location i will take most preferrred location 
            const lat = data[0].lat;
            const lon = data[0].lon;

            // Update map view to the location
            map.setView([lat, lon], 13);

            // Add a marker
            L.marker([lat, lon],{ icon: redIcon }).addTo(map)
                .bindPopup(`<b>${address}</b><br>Exact location provided after booking.`)
                .openPopup();
        } else {
            console.error("Location not found");
        }
    } catch (error) {
        console.error("Error geocoding address:", error);
    }
}

// Call the function using the variable from EJS
geocodeAddress(listingLocation);