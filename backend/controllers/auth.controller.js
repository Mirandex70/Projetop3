const sequelize = require("../config/db.config");
const Auth = require("../models/auth.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const config = require("../config/config");

const controllers = {};
sequelize.sync();

controllers.register = async (req, res) => {
  const { email, password } = req.body;
  const dados = await Auth.create({
    email: email,
    password: password,
  })
    .then((result) => {
      return result;
    })
    .catch((error) => {
      res.status(500).send({
        success: false,
        message: error.message || "Ocorreu um erro na execução da operação.",
      });
    });

  res.status(200).json({
    success: true,
    data: dados,
  });
};

controllers.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email e password devem ser fornecidos.",
      });
    }

    const auth = await Auth.findOne({ where: { email } });
    
    if (!auth) {
      return res.status(401).json({
        success: false,
        message: "Autenticação inválida. Utizador não encontrado.",
      });
    }

    const isMatch = await bcrypt.compare(password, auth.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Autenticação inválida. Password inválida.",
      });
    }

    const token = jwt.sign(
      { email: auth.email },
      config.secret,
      { expiresIn: config.timer }
    );

    return res.status(200).json({
      success: true,
      AccessToken: token,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Ocorreu um erro na execução da operação.",
    });
  }
};

controllers.refreshToken = async (req, res) => {};

controllers.logout = async (req, res) => {};

module.exports = controllers;