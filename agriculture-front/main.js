

function toggleMenu() {
    const menu = document.getElementById('menu');
    menu.classList.toggle('active');
}


function cargarDatos() {
    axios.get('/sensores').then(response => {
        document.getElementById('Sensores').innerText = JSON.stringify(response.data);
    });
    axios.get('mediciones').then(response => {
        document.getElementById('Mediciones').innerText = JSON.stringify(response.data);
    });
    axios.get('/riego').then(response => {
        document.getElementById('Riego').innerText = JSON.stringify(response.data);
    });
    axios.get('/alertas').then(response => {
        document.getElementById('Alertas').innerText = JSON.stringify(response.data);
    });
}

document.addEventListener("DOMContentLoaded", cargarDatos);
