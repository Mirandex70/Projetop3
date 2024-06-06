const Imagem = require('../models/imagens.model.js');

exports.findAll = (req, res) => {
    Imagem.findAll()
      .then(imagens => {
        res.send(imagens); 
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || 'Ocorreu um erro ao recuperar as imagens.'
        });
      });
};

exports.findById = (req, res) => {
  const id_imagem = req.params.id_imagem;

  Imagem.findByPk(id_imagem)
    .then(imagem => {
      res.send(imagem); 
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || 'Ocorreu um erro ao recuperar a imagem.'
      });
    });
};