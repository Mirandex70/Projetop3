const Imagem = require('../models/imagem.model.js');

exports.create = (req, res) => {
  const { id_carro, imagem_nome, imagem_url } = req.body;

  Imagem.create({
    id_carro: id_carro,
    imagem_nome: imagem_nome,
    imagem_url: imagem_url
  })
    .then(imagem => {
      res.status(201).send(imagem); 
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || 'Ocorreu um erro ao criar a imagem.'
      });
    });
};

exports.findAllByCar = (req, res) => {
  const id_carro = req.params.id_carro;

  Imagem.findAll({ where: { id_carro: id_carro } })
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

exports.delete = (req, res) => {
  const id_imagem = req.params.id_imagem;

  Imagem.destroy({ where: { id_imagem: id_imagem } })
    .then(num => {
      if (num == 1) {
        res.send({
          message: 'A imagem foi apagada com sucesso!'
        });
      } else {
        res.send({
          message: `Não foi possível apagar a imagem com o ID=${id_imagem}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || 'Ocorreu um erro ao apagar a imagem.'
      });
    });
};
