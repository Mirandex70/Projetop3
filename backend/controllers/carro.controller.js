const Carro = require("../models/carro.model.js");

exports.create = (req, res) => {
  const carro = new Carro({
      marca: req.body.marca,
      data: req.body.data,
      id_user: idUser,
      cor: req.body.cor,
  });
  Carro.create(carro, (error, data) => {
      if (error) {
          res.status(500).send({
              message: error.message || "Ocorreu um erro ao tentar criar um novo carro.",
          });
      } else {
          res.redirect("/carros");
      }
  });
};

exports.findAllByUser = (req, res) => {
  Carro.getAllByUser(idUser, (error, data) => {
    if (error) {
      res.status(500).send({
        message: error.message || "Ocorreu um erro ao tentar aceder aos dados dos Carros",
      });
    } else {
      console.log("Carros encontrados:", data);
      res.render('pages/home', { carros: data });
    }
  });
};

exports.findOne = (req, res) => {
  Carro.findById(req.params.id_carro, (error, data) => {
    if (error) {
      if (error.result === "não encontrado") {
        res.status(404).send({
          message: "Carro com o ID ${req.params.id_carro} não encontrado.",
        });
      } else {
        res.status(500).send({
          message:
            "Ocorreu um erro ao tentar aceder aos dados do carro com o ID " +
            req.params.id_carro +
            ".",
        });
      }
    } else res.render('pages/update', { carro: data });
  });
};

exports.update = (req, res) => {
  if (!req.body) {
    res.status(400).send({ success: false, message: "Conteúdo inexistente." });
  }

  const { id_carro, marca, cor, data } = req.body;

  const updatedData = {
    marca,
    data,
    cor
  };

  Carro.updateById(
    id_carro,
    updatedData,
    (error, updatedCarro) => {
      if (error) {
        if (error.result === "não encontrado") {
          res.status(404).send({
            success: false,
            message: `Carro com o ID ${req.body.id_carro} não encontrado. [${error.message}]`,
          });
        } else {
          res.status(500).send({
            success: false,
            message: `Ocorreu um erro ao tentar atualizar os dados do carro com o ID ${req.body.id_carro}. [${error.message}]`,
          });
        }
      } else {
        console.log ("Carro atualizado com sucesso")
      }
    }
  );

  Carro.getAllByUser(idUser, (error, data) => {
    if (error) {
      res.status(500).send({
        message: error.message || "Ocorreu um erro ao tentar aceder aos dados dos Carros",
      });
    } else {
      console.log("Carros encontrados:", data);
      res.render('pages/home', { carros: data });
    }
  });
};

exports.delete = (req, res) => {
  Carro.remove(req.params.id_carro, (error, data) => {
    if (error) {
      if (error.result === "não encontrado") {
        res.status(404).send({
          message: "Carro com o ID ${req.params.id_carro} não encontrado.",
        });
      } else {
        res.status(500).send({
          message:
            "Ocorreu um erro ao tentar apagar os dados do carro com ID " +
            req.params.id_carro +
            ".",
        });
      }
    } else res.send({ message: "Carro apagado com sucesso" });
  });
};

exports.deleteAll = (req, res) => {
  Carro.removeAll((error, data) => {
    if (error)
      res.status(500).send({
        message:
          error.message || "Ocorreu um erro ao tentar apagar os carro.",
      });
    else res.send({ message: "Todos os carro apagados com sucesso" });
  });
};

exports.searchByName = (req, res) => {
  const marca = req.query.marca;

  Carro.findByName(marca, idUser, (error, data) => {
    if (error) {
      res.status(500).send({
        message: error.message || "Ocorreu um erro ao tentar aceder aos dados dos Carros",
      });
    } else {
      console.log("Carros encontrados:", data);
      res.render('pages/search', { carros: data });
    }
  });
};
