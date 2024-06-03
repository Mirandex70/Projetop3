const { where } = require("sequelize");
const sequelize = require("../config/db.config.js");
const Carro = require("../models/carro.model.js");

const controllers = {};
sequelize.sync();

controllers.getAllCarros = async (req, res) => {
  console.log("Entrei na getAllCarros");
  const dados = await Carro.findAll()
    .then((resultado) => {
      console.log("Entrei na getAllCarros e deu certo.");
      return resultado;
    })
    .catch((error) => {
      res.status(500).send({
        success: false,
        message: "Ocorreu um erro na execução da operação." || error.message,
      });
    });
  console.log(dados);
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
      res.status(500).send({
        success: false,
        message: "Ocorreu um erro na execução da operação." || error.message,
      });
    });
  res.status(200).json({
    data: dados,
    success: true,
  });
};

controllers.getCarrosByUser = async (req, res) => {
  const dados = await Carro.findAll({ where:{  id_user: req.params.id_user }, })
    .then((resultado) => {
      return resultado;
    })
    .catch((error) => {
      res.status(500).send({
        success: false,
        message: "Ocorreu um erro na execução da operação." || error.message,
      });
    });
  res.status(200).json({
    data: dados,
    success: true,
  });
};

controllers.createCarro = async (req, res) => {
    const dados = await Carro.create(req.body)
      .then((result) => {
        return result;
      })
      .catch((error) => {
        res.status(500).send({
          success: false,
          message: "Ocorreu um erro na execução da operação." || error.message,
        });
      });
    res.status(200).json({
      data: dados,
      success: true,
    });
  };

controllers.updateCarro = async (req, res) => { 
    const dados = await Carro.update(req.body, { where: { id_carro: req.params.id_carro } })
      .then((result) => {
        return result;
      })
      .catch((error) => {
        res.status(500).send({
          success: false,
          message: "Ocorreu um erro na execução da operação." || error.message,
        });
      });
    res.status(200).json({
      data: dados,
      success: true,
    });
  };

controllers.deleteCarro = async (req, res) => {
    const dados = await Carro.destroy({ where: { id_carro: req.params.id_carro } })
      .then((result) => {
        return result;
      })
      .catch((error) => {
        res.status(500).send({
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
