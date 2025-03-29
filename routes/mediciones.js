const express = require('express');

const mediciones = express.Router();
const datos = require("../datos-json/estadisticas.json")



mediciones.get("/", async (req, res, next) => {
    console.log("adentro de mediciones");
    return res.status(200).json(datos);
});



module.exports = mediciones;