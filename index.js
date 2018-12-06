require('dotenv').config();
const app = require("express")();
const port = process.env.port || 3000;

app.get("/", (request, response) => {
    response.send({"Message": "Hello World"});
});

app.listen(port, () => console.log(`Corriendo en el puerto ${port}`));