const express = require('express');

const alertas = express.Router();
const datos = require("../datos-json/alertas-datos.json")



alertas.get("/", async (req, res, next) => {
    console.log("adentro de alertas");
    return res.status(200).json(datos.alertas);
});



module.exports = alertas;