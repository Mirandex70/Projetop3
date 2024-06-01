const sequelize = require("../config/database");
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
  const { email, password } = req.body;

  const auth = await Auth.findOne({ where: { email: email } })
    .then((result) => {
      return result;
    })
    .catch((error) => {
      res.status(500).send({
        success: false,
        message: error.message || "Ocorreu um erro na execução da operação.",
      });
    });

  if (password === null || typeof password === "undefined") {
    res.status(403).json({
      success: false,
      message: error.message ||"Ocorreu um erro na execução da operação.",
    });
  } else
{
    if (email && password && auth) {
      //compara as passwords (em hash)
      const isMatch = await bcrypt.compare(password, auth.password);

      if (email == auth.email && isMatch) {
        let token = jwt.sign(
          {
            email: email,
          },
          config.secret,
          { expiresIn: config.timer }
        );

        res.status(200).json({
          success: true,
          AccessToken: token,
        });
      } else {
        res.status(403).json({
          success: false,
          message: error.message || "Ocorreu um erro na execução da operação.",
        });
      }
    } else {
      res.status(400).json({
        success: false,
        message: error.message || "Ocorreu um erro na execução da operação.",
      });
    }
  }
};

controllers.refreshToken = async (req, res) => {};

controllers.logout = async (req, res) => {};

module.exports = controllers;