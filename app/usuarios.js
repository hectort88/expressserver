const db = require("../conf/database");
const conn = db.connect();
const bcrypt = require('bcrypt');

module.exports = {
    //User Model
    User: () => {
        return conn.define("usuarios", {
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
            token: db.sequelize.STRING,
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
    }
}