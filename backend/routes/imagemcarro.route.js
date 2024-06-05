const express = require('express');
const router = express.Router();
const imagemCarroController = require('../controllers/imagemcarro.controller');

router.post('/', imagemCarroController.create);
router.get('/', imagemCarroController.findAll);
router.put('/:id', imagemCarroController.update);
router.delete('/:id', imagemCarroController.delete);
router.get('/getImage/:id', imagemCarroController.findById);

module.exports = router;