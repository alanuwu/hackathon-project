// Realizar una petición GET al endpoint de alertas
axios.get('http://localhost:3000/alertas/')
    .then(response => {
        const alertas = response.data;
        const alertasContainer = document.getElementById('alertas');

        alertas.forEach(alerta => {
            let tipoClase = '';
            const humedad = parseFloat(alerta.mensaje.match(/\d+/)[0]);

            if (humedad >= 59 && humedad <= 60) {
                tipoClase = 'border border-4 border-warning'; // Borde amarillo más grueso
            } else {
                tipoClase = 'border border-4 border-danger'; // Borde rojo más grueso
            }

            const alertaHTML = `
                <div class="card mb-3 ${tipoClase}">
                    <div class="card-body">
                        <h5 class="card-title">Dispositivo: ${alerta.device_id}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">Hora: ${new Date(alerta.timestamp).toLocaleTimeString()}</h6>
                        <p class="card-text">${alerta.mensaje}</p>
                    </div>
                </div>
            `;

            alertasContainer.innerHTML += alertaHTML;
        });
    })
    .catch(error => {
        console.error('Error al obtener las alertas:', error);
    });