const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config.js');

const ImagemCarro = sequelize.define('imagens_carro', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  id_carro: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'carro', 
      key: 'id_carro',
    },
  },
  id_imagem: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'imagens', 
      key: 'id_imagem',
    },
  },
},
  {
    timestamps: false,
    tableName: 'imagens_carro',
  },);
  

module.exports = ImagemCarro;
