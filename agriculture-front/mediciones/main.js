// Realizar una petición GET a localhost:3000/mediciones/
axios.get('http://localhost:3000/mediciones/')
    .then(response => {
        // Manejar la respuesta exitosa
        console.log('Datos recibidos:', response.data);

        // Seleccionar el contenedor donde se mostrará el acordeón
        const medicionesContainer = document.querySelector('.row');

        // Categorías separadas por tecnología
        const loraCategories = ['Humedad_LoRa', 'Temperatura_LoRa'];
        const nbCategories = ['Humedad_NB_IoT', 'Temperatura_NB_IoT'];

        let loraAccordionItems = '';
        let nbAccordionItems = '';

        // Crear el acordeón para las categorías de LoRa
        loraCategories.forEach((category, index) => {
            const data = response.data[category];
            if (data) {
                loraAccordionItems += `
                    <div class="accordion-item">
                        <h2 class="accordion-header" id="headingLora${index}">
                            <button class="accordion-button ${index === 0 ? '' : 'collapsed'}" type="button" data-bs-toggle="collapse" data-bs-target="#collapseLora${index}" aria-expanded="${index === 0 ? 'true' : 'false'}" aria-controls="collapseLora${index}">
                                ${category.replace('_', ' ')}
                            </button>
                        </h2>
                        <div id="collapseLora${index}" class="accordion-collapse collapse ${index === 0 ? 'show' : ''}" aria-labelledby="headingLora${index}" data-bs-parent="#loraAccordion">
                            <div class="accordion-body">
                                <p class="card-text">Media: ${data.media?.toFixed(3) || 'N/A'}</p>
                                <p class="card-text">Mediana: ${data.mediana?.toFixed(3) || 'N/A'}</p>
                                <p class="card-text">Moda: ${data.moda?.toFixed(3) || 'N/A'}</p>
                                <p class="card-text">Varianza: ${data.varianza?.toFixed(3) || 'N/A'}</p>
                                <p class="card-text">Interpretación Varianza: ${data.interpretacion_varianza || 'N/A'}</p>
                                <p class="card-text">Desviación Estándar: ${data.desviacion_estandar?.toFixed(3) || 'N/A'}</p>
                                <p class="card-text">Coef. de Variación: ${data.coef_variacion?.toFixed(3) || 'N/A'}</p>
                                <p class="card-text">Interpretación Coef. Variación: ${data.interpretacion_coef_variacion || 'N/A'}</p>
                                <p class="card-text">Rango: ${data.rango?.toFixed(3) || 'N/A'}</p>
                                <p class="card-text">Mínimo: ${data.min?.toFixed(3) || 'N/A'}</p>
                                <p class="card-text">Máximo: ${data.max?.toFixed(3) || 'N/A'}</p>
                            </div>
                        </div>
                    </div>
                `;
            }
        });

        // Crear el acordeón para las categorías de NB-IoT
        nbCategories.forEach((category, index) => {
            const data = response.data[category];
            if (data) {
                nbAccordionItems += `
                    <div class="accordion-item">
                        <h2 class="accordion-header" id="headingNB${index}">
                            <button class="accordion-button ${index === 0 ? '' : 'collapsed'}" type="button" data-bs-toggle="collapse" data-bs-target="#collapseNB${index}" aria-expanded="${index === 0 ? 'true' : 'false'}" aria-controls="collapseNB${index}">
                                ${category.replace('_', ' ')}
                            </button>
                        </h2>
                        <div id="collapseNB${index}" class="accordion-collapse collapse ${index === 0 ? 'show' : ''}" aria-labelledby="headingNB${index}" data-bs-parent="#nbAccordion">
                            <div class="accordion-body">
                                <p class="card-text">Media: ${data.media?.toFixed(3) || 'N/A'}</p>
                                <p class="card-text">Mediana: ${data.mediana?.toFixed(3) || 'N/A'}</p>
                                <p class="card-text">Moda: ${data.moda?.toFixed(3) || 'N/A'}</p>
                                <p class="card-text">Varianza: ${data.varianza?.toFixed(3) || 'N/A'}</p>
                                <p class="card-text">Interpretación Varianza: ${data.interpretacion_varianza || 'N/A'}</p>
                                <p class="card-text">Desviación Estándar: ${data.desviacion_estandar?.toFixed(3) || 'N/A'}</p>
                                <p class="card-text">Coef. de Variación: ${data.coef_variacion?.toFixed(3) || 'N/A'}</p>
                                <p class="card-text">Interpretación Coef. Variación: ${data.interpretacion_coef_variacion || 'N/A'}</p>
                                <p class="card-text">Rango: ${data.rango?.toFixed(3) || 'N/A'}</p>
                                <p class="card-text">Mínimo: ${data.min?.toFixed(3) || 'N/A'}</p>
                                <p class="card-text">Máximo: ${data.max?.toFixed(3) || 'N/A'}</p>
                            </div>
                        </div>
                    </div>
                `;
            }
        });

        // Generar el HTML de las columnas
        const columnsHTML = `
            <div class="col-md-6">
                <h3 class="text-center custom-title">LoRa</h3>
                <div class="accordion" id="loraAccordion">
                    ${loraAccordionItems}
                </div>
            </div>
            <div class="col-md-6">
                <h3 class="text-center custom-title">NB-IoT</h3>
                <div class="accordion" id="nbAccordion">
                    ${nbAccordionItems}
                </div>
            </div>
        `;

        // En lugar de sobrescribir el contenido, lo agregamos
        medicionesContainer.innerHTML += columnsHTML;

        // Centrar el contenedor y ajustar el tamaño de las letras
        medicionesContainer.classList.add('d-flex', 'justify-content-center', 'align-items-center', 'vh-100');
        medicionesContainer.style.fontSize = '1.5rem';
    })
    .catch(error => {
        // Manejar errores
        console.error('Error al obtener las mediciones:', error);
    });