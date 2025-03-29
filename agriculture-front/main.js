window.onload = init;
var headers = {};
var url = "http://localhost:3000";

function init() {
        window.location.href = "index.html";
    
}

function loadSensores() {
    axios.get(url + "/sensores")
    .then(function(res){
        console.log(res);
        displaySensores(res.data.message);
    }).catch(function(err){
        console.log(err);
    })
} 

function displaySensores(sensores) {
    var body = document.querySelector("body");
    for(var i = 0; i<pokemon.length; i++){
        // Crear un nuevo div para cada sensor;
    }
}
