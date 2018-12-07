const express = require("express");
const user = require("../app/usuarios");
const User = user.User();
const usersRouter = express.Router();
const usersController = require("../app/http/controller/UsuarioController");

usersRouter.use((req, res, next) => {
    if (req.originalUrl !== "/api/auth") {
        let token = req.body.token || req.query.token || req.headers['x-access-token'];
        if (!token) return res.status(401).json({error: "Unauthorized"});
    }
    next();
});

usersRouter.use("/users/:id", (req, res, next) => {
    User.findByPk(req.params.id).then(user => {
        if (user === null) return res.status(404).json({});
        req.user = user;
        next();
    });
});

usersRouter.route("/auth").post(usersController.auth);
usersRouter.route("/users").get(usersController.getUsers);
usersRouter.route("/users").post(usersController.create);
usersRouter.route("/users/:id").get(usersController.find);
usersRouter.route("/users/:id").put(usersController.update);
usersRouter.route("/users/:id").delete(usersController.delete);

module.exports = usersRouter;