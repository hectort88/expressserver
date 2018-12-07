const user = require("../../usuarios");
const UserModel = user.User();
const hideData = (elem) => {
    if (elem === null) return elem;
    elem.password = undefined;
    elem.token = undefined;
    return elem;
}
module.exports = {
    getUsers: (req, res) => {
        UserModel.findAll().then(users => {res.json(users.map(hideData))});
    },
    authenticate: (req, res) => {
        
    },
    find: (req, res) => {
        UserModel.findByPk(req.params.id).then(user => {
            if (user === null) return res.status(404).json({});
            return res.json(hideData(user));
        });
    },
    create: (req, res) => {
        
    },
    update: (req, res) => {
        
    },
    delete: (req, res) => {
        
    },
}
