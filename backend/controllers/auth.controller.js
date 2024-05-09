const User = require("../models/user.model.js");

exports.login = (req, res) => {
  const user = new User({
    email: req.body.email,
    password: req.body.password,
  });

  User.login(user, (error, data) => {
    if (error) {
      if (error.result === "não encontrado") {
        res.status(404).send({
          message: `Utilizador com o ID ${req.params.id_user} não encontrado.`,
        });
      } else {
        res.status(500).send({
          message:
            "Ocorreu um erro ao tentar aceder aos dados do utilizador com o ID " +
            req.params.id_user +
            ".",
        });
      }
    } else { 
      console.log("login");
    }
  });
};

exports.register = (req, res) => {
  const user = new User({
    marca: req.body.marca,
    email: req.body.email,
    password: req.body.password,
  });

  User.register(user, (error, data) => {
    if (error) {
      res.status(500).send({
        message: "Erro ao tentar registar o utilizador.",
      });
    } else {
      res.render("pages/login", { user: data });
    }
  });
};

exports.logout = (req, res) => {
  console.log("logout");
  res.redirect("/");
};
