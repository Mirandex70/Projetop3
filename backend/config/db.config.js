const sequelize = require("sequelize");
const conexao = new sequelize(
 {
        host: "localhost",
        port: 3306,
        database: "projetop2",
        username: "root",
        password: "123",
        dialect: "mysql",
    }
);

module.exports = conexao;