const express = require("express");
const usersRouter = express.Router();
const usersController = require("../app/http/controller/UsuarioController");

usersRouter.route("/user/:id").get(usersController.find);
usersRouter.route("/users").get(usersController.getUsers);
usersRouter.route("/auth").post(usersController.authenticate);

module.exports = usersRouter;