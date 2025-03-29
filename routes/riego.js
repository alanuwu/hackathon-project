const express = require('express');
const jwt = require('jsonwebtoken');
const riego = express.Router();
const datos = require("../datos-json/datos-Sensores.json")



riego.get("/1", async (req, res, next) => {
    
    try {
        // Verificar que los LoRa_Sensors existan
        if (!datos.LoRa_Sensors || !datos.LoRa_Sensors.length) {
            return res.status(404).json({ error: "No LoRa sensor data available" });
        }

        // Extraer la humedad de los LoRa_Sensors
        const humidityData = datos.LoRa_Sensors.map(sensor => ({
            device_id: sensor.device_id,
            timestamp: sensor.timestamp,
            humidity: sensor.humidity
        }));

        return res.status(200).json(humidityData);

    } catch (error) {
        next(error);
    }
});


riego.get("/2", async (req, res, next) => {
    try {
        // Verificar que los NB_IoT_Sensors existan
        if (!datos.NB_IoT_Sensors || !datos.NB_IoT_Sensors.length) {
            return res.status(404).json({ error: "No NB-IoT sensor data available" });
        }

        // Extraer la humedad de los NB_IoT_Sensors
        const humidityData = datos.NB_IoT_Sensors.map(sensor => ({
            device_id: sensor.device_id,
            timestamp: sensor.timestamp,
            humidity: sensor.humidity
        }));

        return res.status(200).json(humidityData);

    } catch (error) {
        next(error);
    }
});


module.exports = riego;