const loraDataContainer = document.getElementById('loraDataContainer');
const nbDataContainer = document.getElementById('nbDataContainer');

function displayHumidityData(data, container) {
    container.innerHTML = ''; // Limpiar el contenedor
    data.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('col');
        card.innerHTML = `
            <div class="card shadow-sm">
                <div class="card-body">
                    <h5 class="card-title">${new Date(item.timestamp).toLocaleTimeString()}</h5>
                    <p class="card-text">Dispositivo: ${item.device_id}</p>
                    <p class="card-text">Humedad: ${item.humidity} %</p>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

// Fetch data from the backend
function fetchSensorData(endpoint, container) {
    fetch(`http://localhost:3000/riego/${endpoint}`)
        .then(response => response.json())
        .then(data => displayHumidityData(data, container))
        .catch(error => console.error(`Error fetching riego/${endpoint} data:`, error));
}

// Fetch and display data for both sensors
document.addEventListener('DOMContentLoaded', () => {
    fetchSensorData('1', loraDataContainer); // Updated endpoint
    fetchSensorData('2', nbDataContainer);  // Updated endpoint
});
