require('dotenv').config();
const port = process.env.port || 3000;
const express = require("express");
const bodyParser = require("body-parser");
const usersRouter = require("./routes/usuarios");
const app = express();
const conexion = require("./conf/database").connecion();

//Ruta de prueba
const nietzsche = require("./app/nietzsche");
app.get("/", (request, response) => {
    response.send({ "Nietzsche": nietzsche.getQuote(nietzsche.quotes) });
});

//Ruta de la api y parser
app.use(bodyParser.json())
   .use(bodyParser.urlencoded({ extended: true }))
   .use("/api", usersRouter);

//Verificar Conexion
conexion.authenticate()
        .then(() => console.log("Conectado a la base de datos"))
        .error((err) => console.error("Error de conexion:", err));

//Iniciar Servicio
app.listen(port, () => console.log("Corriendo en el puerto:", port));