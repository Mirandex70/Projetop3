const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config.js');

const Imagem = sequelize.define('imagens', {
  id_imagem: {
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

module.exports = Imagem;
