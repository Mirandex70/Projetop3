const sequelize = require("sequelize");
const conexao = new sequelize(
    "projetotestestetstetststet", "root", "123", {
        host: "localhost",
        port: 5001,
        dialect: "mysql",
    }
);

module.exports = conexao;