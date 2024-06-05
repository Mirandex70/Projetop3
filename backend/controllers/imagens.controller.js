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

exports.update = (req, res) => {
  const id_imagem = req.params.id_imagem;

  Imagem.update(req.body, { 
    where: { id_imagem: id_imagem } 
  })
    .then(imagem => {
      res.send(imagem); 
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || 'Ocorreu um erro ao atualizar a imagem.'
      });
    });
};


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
