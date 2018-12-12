const express = require("express");
const jwt = require('jsonwebtoken');
const User = require("../app/usuarios").Model;
const usersRouter = express.Router();
const usersController = require("../app/http/controller/UsuarioController")(User);

usersRouter.use("/users", (req, res, next) => {
    if (req.method === 'POST') return next(); //para crear usuario no requiere token
    let token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (!token) return res.status(401).json({error: "Unauthorized"});
    jwt.verify(token, process.env.jwt_secret, (err, decoded) => {
        if (err) {
            return res.status(401).json({error: "Unauthorized", message: err.message});
        }
        req.isAdmin = decoded.admin;
    });
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
