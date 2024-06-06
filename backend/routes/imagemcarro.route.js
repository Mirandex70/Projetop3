const express = require('express');
const router = express.Router();
const imagemCarroController = require('../controllers/imagemcarro.controller');

router.post('/create', imagemCarroController.create);
router.put('/:id', imagemCarroController.update);
router.delete('/:id', imagemCarroController.delete);
router.get('/getImage/:id_carro', imagemCarroController.findById);

module.exports = router; 