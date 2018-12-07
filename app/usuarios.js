const db = require("../conf/database");
const conn = db.connecion();

module.exports = {
    //User Model
    User: () => {
        return conn.define("usuarios", {
            id: {
                type: db.sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            nombres: db.sequelize.STRING,
            apellidos: db.sequelize.STRING,
            cedula: db.sequelize.STRING,
            correo: db.sequelize.STRING,
            password: db.sequelize.STRING,
            token: db.sequelize.STRING,
            ultimoAcceso: db.sequelize.DATE,
        },
        {
            paranoid: true,
        }
        );
    }
}