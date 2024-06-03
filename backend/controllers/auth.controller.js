const sequelize = require("../config/db.config");
const Auth = require("../models/auth.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const config = require("../config/config");

const controllers = {};
sequelize.sync();

controllers.register = async (req, res) => {
  const { nome, email, password } = req.body;
  const dados = await Auth.create({
    nome: nome,
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
    console.log(dados)

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
      user: auth.dataValues,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Ocorreu um erro na execução da operação.",
    });
  }
};

controllers.userDelete = async (req, res) => {
  const { id_user } = req.params;
  const dados = await Auth.destroy({ where: { id_user } })
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
    message: "Eliminação concluída com sucesso.",
  });
};

controllers.userUpdate = async (req, res) => {
  const { id_user } = req.params;
  const { nome, email, password } = req.body;
  const dados = await Auth.update(
    {
      nome: nome,
      email: email,
      password: password,
    },
    { where: { id_user } }
  )
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
    message: "Actualização concluída com sucesso.",
  });
};

controllers.refreshToken = async (req, res) => {};

controllers.logout = async (req, res) => {};

module.exports = controllers;