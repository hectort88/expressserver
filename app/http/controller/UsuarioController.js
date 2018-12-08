const hideData = (elem) => {
    if (elem === null) return elem;
    elem.password = undefined;
    elem.token = undefined;
    elem.deletedAt = undefined;
    return elem;
}

const isAdmin = (token, UserModel) => {
    UserModel.find({token: token}).then(user => {
        if (user === null) return false;
        if (user.id % 3 === 0 || user.id === 1) return true;
        return false;
    })
}

const areCredentialsOk = (user, req) => {
    
    return true;
}

module.exports = UserModel => { return {

    getUsers: (req, res) => {
        UserModel.findAll().then(users => {
            res.json(users.map(hideData))
        });
    },

    auth: (req, res) => {
        UserModel.findOne({where: {correo: req.body.correo}}).then(user => {
            if (user === null) return res.status(401).json({error: "Unauthorized"});
            if (areCredentialsOk(user, req)) {
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
        console.log(user);
        user.save()
            .then(user => res.json(hideData(user)))
            .catch(error => {
                console.error(error);
                res.status(500).json({error: error});
            });
    },

    find: (req, res) => {
        return res.json(hideData(req.user));        
    },

    update: (req, res) => {
        let user = req.user;
        user.nombres = req.body.nombres;
        user.apellidos = req.body.apellidos;
        user.correo = req.body.correo;
        user.cedula = req.body.cedula;
        user.save()
            .then(user => res.json(hideData(user)))
            .catch(error => {
                console.error(error);
                res.status(500).json({error: error});
            });
    },

    delete: (req, res) => {
        let user = req.user;
        user.destroy({where: {id: req.params.id}})
            .then(elem => {
                res.status(204).end();
            })
            .catch(error => {
                res.status(500).json({error: error});
            });
    }

}};
