const db = require("../conf/database");
const conn = db.connect();
const bcrypt = require('bcrypt');

const User = conn.define("usuarios", {
    id: {
        type: db.sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombres: {
        type: db.sequelize.STRING,
        validate: {
            notEmpty: true
        }
    },
    apellidos: {
        type: db.sequelize.STRING,
        validate: {
            notEmpty: true
        }
    },
    cedula: {
        type: db.sequelize.STRING,
        validate: {
            notEmpty: true
        }
    },
    correo: {
        type: db.sequelize.STRING,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: db.sequelize.STRING,
        validate: {
            notEmpty: true
        }
    },
    ultimoAcceso: db.sequelize.DATE,
},
{
    paranoid: true,
    hooks: {
        beforeCreate: (user) => {
            user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));
        }
    }
});


(function() {
    function isValidPassword(password) {
        return bcrypt.compareSync(password, this.password)
    }

    function hideData() {
        this.password = undefined;
        this.token = undefined;
        this.deletedAt = undefined;
        return this;
    }

    isValidPassword.bind(User);
    hideData.bind(User);
    User.prototype.isValidPassword = isValidPassword;
    User.prototype.hideData = hideData;
})();

module.exports = {
    Model: User
}
