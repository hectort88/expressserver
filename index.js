require('dotenv').config();
const port = process.env.port || 3000;
const express = require("express");
const usersRouter = require("./routes/usuarios");
const app = express();
const conexion = require("./conf/database").connecion();

//Ruta de prueba
const nietzsche = require("./app/nietzsche");
app.get("/", (request, response) => {
    response.send({ "Nietzsche": nietzsche.getQuote(nietzsche.quotes) });
});

//Ruta de la api
app.use("/api", usersRouter);

//Verificar Conexion
conexion.authenticate()
        .then(() => console.log("Conectado a la base de datos"))
        .error((err) => console.error("Error de conexion:", err));

//Iniciar Servicio
app.listen(port, () => console.log("Corriendo en el puerto:", port));