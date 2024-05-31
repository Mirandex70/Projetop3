const sequelize = require ("../config/db.config.js");
const Carro = require("../models/carro.model.js");

const controllers = {};
sequelize.sync();

  controllers.getAllCarros = async (req, res) => {
    console.log("Entrei na getAllCarros")
    const dados = await Carro.findAll()
      .then((resultado) => {
        console.log("Entrei na getAllCarros e deu certo.")
        return resultado;
      })
      .catch((error) => {
        res
          .status(500)
          .send({
            success: false,
            message: "Ocorreu um erro na execução da operação." || error.message,
          });
      });
      console.log(dados)
    res.status(200).json({
      data: dados,
      success: true,
    });
  };

  controllers.getCarroById = async (req, res) => {
    const dados = await Carro.findByPk(req.params.id_carro)
      .then((resultado) => {
        return resultado;
      })
      .catch((error) => {
        res
          .status(500)
          .send({
            success: false,
            message: "Ocorreu um erro na execução da operação." || error.message,
          });
      });
    res.status(200).json({
      data: dados,
      success: true,
    });
  };

  module.exports = controllers;