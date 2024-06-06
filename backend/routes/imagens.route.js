const express = require('express');
const router = express.Router();
const imagensController = require('../controllers/imagens.controller.js');

router.get('/getAllImages', imagensController.findAll);

router.get('/:id_imagem', imagensController.findById);

module.exports = router;