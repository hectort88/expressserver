require('dotenv').config();
const port = process.env.port || 3000;
const express = require("express");
const app = express();

const nietzsche = require("./app/nietzsche");
app.get("/", (request, response) => {
    response.send({ "Nietzsche": nietzsche.getQuote(nietzsche.quotes) });
});

app.listen(port, () => console.log(`Corriendo en el puerto ${port}`));