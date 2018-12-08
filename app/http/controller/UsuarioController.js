const isAdmin = (token, UserModel) => {
    UserModel.find({token: token}).then(user => {
        if (user === null) return false;
        if (user.id % 3 === 0 || user.id === 1) return true;
        return false;
    })
}

module.exports = UserModel => { return { 

    getUsers: (req, res) => {
        UserModel.findAll().then(users => {
            res.json(users.map(user => {
                return user.hideData(user);
            }))
        });
    },

    auth: (req, res) => {
        UserModel.findOne({where: {correo: req.body.correo}}).then(user => {
            if (user === null) return res.status(401).json({error: "Unauthorized"});
            if (user.isValidPassword(req.body.password, user)) {
                token = "abc";
                user.token = token;
                user.save();
                return res.json({token: token})
            }
            return res.status(401).json({error: "Unauthorized"});
        })
    },

    create: (req, res) => {
        if (req.body.id) req.body.id = undefined;
        let user = UserModel.build(req.body);
        user.save()
            .then(user => res.json(user.hideData(user)))
            .catch(error => { res.status(500).json({error: error}); });
    },

    find: (req, res) => {
        return res.json(req.user.hideData(req.user));        
    },

    update: (req, res) => {
        let user = req.user;
        user.nombres = req.body.nombres || user.nombres;
        user.apellidos = req.body.apellidos || user.apellidos;
        user.cedula = req.body.cedula || user.cedula;
        user.save()
            .then(user => res.json(req.user.hideData(user)))
            .catch(error => { res.status(500).json({error: error}); });
    },

    delete: (req, res) => {
        let user = req.user;
        user.destroy({where: {id: req.params.id}})
            .then(elem => { res.status(204).end(); })
            .catch(error => { res.status(500).json({error: error});});
    }

}};
