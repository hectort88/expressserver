const express = require("express");
const usersRouter = express.Router();
const usersController = require("../app/http/controller/UsuarioController");

usersRouter.route("/users").get(usersController.getUsers);

module.exports = usersRouter;