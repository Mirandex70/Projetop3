const sequelize = require("sequelize");
const conexao = new sequelize(
    "projetop2", "root", "123", {
        host: "localhost",
        port: 3306,
        dialect: "mysql",
    }
);

module.exports = conexao;