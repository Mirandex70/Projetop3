const express = require('express');
const router = express.Router();
const imagensController = require('../controllers/imagens.controller.js');

// Rota para criar uma nova imagem
router.post('/', imagensController.create);

// Rota para obter todas as imagens
router.get('/', imagensController.findAll);

// Rota para obter uma imagem pelo ID
router.get('/:id_imagem', imagensController.findById);

// Rota para atualizar uma imagem pelo ID
router.put('/:id_imagem', imagensController.update);

// Rota para obter todas as imagens relacionadas a um carro específico
router.get('/carro/:id_carro', imagensController.findAllByCar);

// Rota para apagar uma imagem pelo ID
router.delete('/:id_imagem', imagensController.delete);


module.exports = router;