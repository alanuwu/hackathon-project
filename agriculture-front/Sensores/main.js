window.onload = function () {
    // Inicializar los sensores con LoRa_Sensors por defecto
    loadSensores("LoRa_Sensors");

    // Agregar eventos a los elementos del dropdown
    setupDropdownEvents();
};

var headers = {};
var url = "http://localhost:3000";

function loadSensores(sensorType) {
    axios.get(url + "/sensores")
        .then(function (res) {
            if (res.data && res.data[sensorType]) {
                console.log(res.data[sensorType]);

                // Mapeo de datos correctos
                const sensores = res.data[sensorType].map(sensor => ({
                    nombre: sensor.device_id || "Sin nombre",
                    temperatura: sensor.temperature || "N/A",
                    humedad: sensor.humidity || "N/A",
                    bateria: sensor.battery || "N/A",
                    senal: sensor.signal_strength || "N/A",
                    timestamp: sensor.timestamp || "N/A"
                }));
                const timestamp = res.data[sensorType][0]?.timestamp || "N/A";

                // Llamar a la función para mostrar los sensores
                displaySensores(sensores, sensorType, timestamp);
            } else {
                console.error(`Formato de respuesta incorrecto para ${sensorType}:`, res.data);
            }
        })
        .catch(function (err) {
            console.error(`Error al obtener sensores (${sensorType}): ${err.message || err}`);
            alert(`Error al obtener datos de los sensores ${sensorType}. Por favor, inténtelo de nuevo más tarde.`);
        });
}

function displaySensores(sensores, sensorType, timestamp) {
    // Preservar el navbar
    let mainContent = document.getElementById("main-content");
    if (!mainContent) {
        mainContent = document.createElement("div");
        mainContent.id = "main-content";
        document.body.appendChild(mainContent);
    }
    mainContent.innerHTML = "";

    // Crear el contenedor principal
    var container = document.createElement("div");
    container.className = "container text-center mt-5";

    // Agregar el título con la fecha
    var title = document.createElement("h1");
    title.className = "fw-bold text-success";
    title.innerHTML = `${sensorType.replace("_", " ")}`;
    container.appendChild(title);

    // Crear el contenedor de tarjetas
    var row = document.createElement("div");
    row.className = "row row-cols-1 row-cols-md-3 g-3 mt-4 justify-content-center"; // Centrar las tarjetas

    // Generar las tarjetas para cada sensor
    sensores.forEach((sensor, index) => {
        var card = document.createElement("div");

        // Si es la última tarjeta, usar una clase especial para centrarla
        if (index === sensores.length - 1) {
            card.className = "col d-flex justify-content-center";
        } else {
            card.className = "col";
        }

        const time = sensor.timestamp !== "N/A" ? new Date(sensor.timestamp).toLocaleTimeString() : "N/A";

        card.innerHTML = `
            <div class="card shadow-lg p-3">
                <h3 class="text-primary">${time}</h3>
                <p class="mb-1">Nombre: <strong>${sensor.nombre}</strong></p>
                <p class="mb-1">Temperatura: <strong>${sensor.temperatura} °C</strong></p>
                <p class="mb-1">Humedad: <strong>${sensor.humedad} %</strong></p>
                <p class="mb-1">Batería: <strong>${sensor.bateria} V</strong></p>
                <p class="mb-1">Señal: <strong>${sensor.senal} dBm</strong></p>
            </div>
        `;
        row.appendChild(card);
    });

    // Agregar las tarjetas al contenedor principal
    container.appendChild(row);

    // Agregar el contenedor principal al main content
    document.getElementById("main-content").appendChild(container);
}

function setupDropdownEvents() {
    // Seleccionar los elementos del dropdown en el navbar
    const dropdownItems = document.querySelectorAll('.navbar .dropdown-menu a.dropdown-item');

    // Agregar eventos de clic a cada elemento del dropdown
    dropdownItems.forEach(item => {
        item.addEventListener("click", function (event) {
            event.preventDefault(); // Evitar el comportamiento predeterminado del enlace
            const sensorType = item.dataset.sensor; // Obtener el tipo de sensor del atributo data-sensor

            if (sensorType) {
                loadSensores(sensorType); // Cargar los datos del sensor seleccionado
            } else {
                console.error("El atributo data-sensor no está definido para este elemento.");
            }
        });
    });
}
