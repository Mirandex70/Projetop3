const sequelize = require("sequelize");
const db = require("../config/db.config.js");

let Carro = db.define(
  "carro",
  {
    id_carro: {
      type: sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    marca: sequelize.STRING,
    data: sequelize.INTEGER,
    cor: sequelize.STRING,
  },
  {
    timestamps: false,
    tableName: "carro",
  },
  console.log("Entrei na model.")
);

module.exports = Carro;
