const express = require('express');

const sensores = express.Router();
const datos = require("../datos-json/datos-Sensores.json")



sensores.get("/", async (req, res, next) => {
    console.log("adentro de sensores");
    return res.status(200).json(datos);
});



module.exports = sensores;