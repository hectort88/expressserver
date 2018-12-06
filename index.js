const app = require("express")();

app.get("/", (request, response) => {
    response.send("Hello World");
});