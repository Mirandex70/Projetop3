const sequelize = require("sequelize");
const db = require("../config/db.config.js");
const bcrypt = require("bcrypt");

var Auth = db.define(
  "user",
  {
    id_user: {
      type: sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nome: {
      type: sequelize.STRING,
      allowNull: false,
      unique: false,
    },
    email: {
      type: sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: sequelize.STRING,
      allowNull: false,
    },
    
  },
  {
    tableName: "user",
    timestamps: false,
  }
);

Auth.beforeCreate((user, options) => {
  return bcrypt
    .hash(user.password, 10)
    .then((hash) => {
      user.password = hash;
    })
    .catch((error) => {
      throw new Error();
    });
});

module.exports = Auth;