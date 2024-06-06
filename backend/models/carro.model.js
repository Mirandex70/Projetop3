const sequelize = require("sequelize");
const db = require("../config/db.config.js");
const imagensCarro = require("../models/imagemcarro.model.js")

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
);


Carro.hasOne(imagensCarro, {
  foreignKey: 'id_carro' 
})

module.exports = Carro;
