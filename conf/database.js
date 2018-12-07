require('dotenv').config();
const Sequelize = require('sequelize');

module.exports = {
    connecion: () => {
        return new Sequelize({
            dialect: 'mysql',
            port: process.env.db_port,
            host: process.env.db_host,
            database: process.env.db_name,
            username: process.env.db_user,
            password: process.env.db_pass,
            operatorsAliases: false
        })
    },
    sequelize: Sequelize
}