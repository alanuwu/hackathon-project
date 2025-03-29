//Dependencies
const morgan = require('morgan');
const express = require("express");
const app = express();
//Routers

const mediciones = require('./routes/mediciones');
const sensores = require('./routes/sensores');
const riego = require('./routes/riego');
const alertas = require('./routes/alertas');
//Middleware

const notFound = require('./middleware/notFound');
const index = require('./middleware/index')
const jsonwebtoken = require('jsonwebtoken');
const cors = require('./middleware/cors');

app.use(cors);
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


/*
Verbos HTTP
GET - obtener recursos
POST - almacenar/crear recursos   
PUT - modificar un recurso completo
PATCH - modificar una parte recurso
DELETE - borrar un recurso
*/

app.get("/", index );
app.use("/mediciones", mediciones);
app.use("/sensores", sensores);
app.use("/riego", riego);
app.use("/alertas", alertas);



app.use(notFound);

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running...");
});


