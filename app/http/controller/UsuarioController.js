const jwt = require('jsonwebtoken');

const isAdmin = (user) => {
    if (user.id % 3 === 0 || user.id === 1) return true;
    return false;
}

module.exports = UserModel => { return { 

    getUsers: (req, res) => {
        UserModel.findAll().then(users => {
            res.json(users.map(user => {
                return user.hideData();
            }).filter(user => { 
                return (req.isAdmin) ? true: !isAdmin(user);
            }))
        });
    },

    auth: (req, res) => {
        UserModel.findOne({where: {correo: req.body.correo, deletedAt: null}}).then(user => {
            if (user === null) return res.status(401).json({error: "Unauthorized"});
            if (user.isValidPassword(req.body.password)) {
                let token = jwt.sign({admin: isAdmin(user)}, process.env.jwt_secret);
                return res.json({
                    token: token,
                    nombres: user.nombres,
                    apellidos: user.apellidos,
                    correo: user.correo,
                    id: user.id
                });
            }
            return res.status(401).json({error: "Unauthorized"});
        })
    },

    create: (req, res) => {
        if (req.body.id) req.body.id = undefined;
        let user = UserModel.build(req.body);
        user.save()
            .then(user => res.json(user.hideData()))
            .catch(error => { res.status(500).json(error); });
    },

    find: (req, res) => {
        return res.json(req.user.hideData());
    },

    update: (req, res) => {
        let user = req.user;
        if (req.isAdmin && !isAdmin(user)) {
            user.nombres = req.body.nombres || user.nombres;
            user.apellidos = req.body.apellidos || user.apellidos;
            user.cedula = req.body.cedula || user.cedula;
            user.save()
                .then(user => res.json(req.user.hideData()))
                .catch(error => res.status(500).json(error));
        } else {
            return res.status(401).json({error: "Unauthorized"});
        }
    },

    delete: (req, res) => {
        let user = req.user;
        if (req.isAdmin && !isAdmin(user)) {
            user.destroy({where: {id: req.params.id}})
                .then(elem => { res.status(200).json({message: 'ok', usuario: elem}); }).catch(error => { 
                    res.status(500).json({error: error});
                });
        } else {
            return res.status(401).json({error: "Unauthorized"});
        }
    }

}};
