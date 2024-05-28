const sequelize = require("sequelize");
const conexao = new sequelize(
    "projetop2", "root", "123", {
        host: "192.168.65.1",
        port: 3306,
        dialect: "mysql",
    }
);

module.exports = conexao;