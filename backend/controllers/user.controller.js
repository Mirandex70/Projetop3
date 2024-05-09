const User = require("../models/user.model.js");

exports.create = (req, res) => {

    const user = new User({
        marca: req.body.marca,
        email: req.body.email,
        password: req.body.password,
      });

  if (error)
    res.status(500).send({
      message:
        error.message || "Ocorreu um erro ao tentar criar um novo utilizador.",
    });
  else res.send(data);
};

exports.findAll = (req, res) => {
  User.getAll((error, data) => {
    if (error)
      res.status(500).send({
        message:
          error.message ||
          "Ocorreu um erro ao tentar aceder aos dados dos Utilizadores",
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
  User.findById(req.params.id_user, (error, data) => {
    if (error) {
      if (error.result === "não encontrado") {
        res.status(404).send({
          message: "Utilizador com o ID ${req.params.id_user} não encontrado.",
        });
      } else {
        res.status(500).send({
          message:
            "Ocorreu um erro ao tentar aceder aos dados do utilizador com o ID " +
            req.params.id_user +
            ".",
        });
      }
    } else res.send(data);
  });
};

exports.update = (req, res) => {
  if (req.body) {
    res.status(400),
      send({
        message: "O conteúdo não pode ser vazio!",
      });
  }

  User.updateById(req.params.id_user, new User(req.body), (error, data) => {
    if (error) {
      if (error.result === "não encontrado") {
        res.status(404).send({
          message: "Utilizador com o ID ${req.params.id_user} não encontrado.",
        });
      } else {
        res.status(500).send({
          message:
            "Ocorreu um erro ao tentar utilizar os dados do utilizador com o ID " +
            req.params.id_user +
            ".",
        });
      }
    } else res.send(data);
  });
};

exports.delete = (req, res) => {
  User.remove(req.params.id_user, (error, data) => {
    if (error) {
      if (error.result === "não encontrado") {
        res.status(404).send({
          message: "Utilizador com o ID ${req.params.id_user} não encontrado.",
        });
      } else {
        res.status(500).send({
          message:
            "Ocorreu um erro ao tentar apagar os dados do utilizador com ID " +
            req.params.id_user +
            ".",
        });
      }
    } else res.send({ message: "Utilizador apagado com sucesso" });
  });
};

exports.deleteAll = (req, res) => {
  User.removeAll((error, data) => {
    if (error)
      res.status(500).send({
        message:
          error.message || "Ocorreu um erro ao tentar apagar os utilizadores.",
      });
    else res.send({ message: "Todos os utilizadores apagados com sucesso" });
  });
};
