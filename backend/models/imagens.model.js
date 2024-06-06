const sequelize = require('../config/db.config.js');
const { DataTypes } = require('sequelize');
const imagensCarro = require("../models/imagemcarro.model.js")

const Imagem = sequelize.define('imagens', {
    id_imagem: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    imagem_nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imagem_url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    timestamps: false,
    tableName: 'imagens',
  });

  Imagem.hasOne(imagensCarro, {
    foreignKey: 'id_imagem' 
  })
  
  
  module.exports = Imagem;
  