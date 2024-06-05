const ImagemCarro = require('../models/imagemcarro.model');

// Criar uma associação de imagem com carro
exports.create = async (req, res) => {
  try {
    const { id_carro, id_imagem } = req.body;
    const imagemCarro = await ImagemCarro.create({ id_carro, id_imagem });
    res.status(201).json(imagemCarro);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Buscar uma associação específica de imagem com carro pelo ID
exports.findById = async (req, res) => {
  try {
    const { id } = req.params;
    const imagemCarro = await ImagemCarro.findByPk(id);
    if (!imagemCarro) {
      return res.status(404).json({ error: 'Associação não encontrada' });
    }
    res.status(200).json(imagemCarro);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Listar todas as associações de imagens com carros
exports.findAll = async (req, res) => {
  try {
    const imagemCarros = await ImagemCarro.findAll();
    res.status(200).json(imagemCarros);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Atualizar uma associação de imagem com carro
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { id_carro, id_imagem } = req.body;
    await ImagemCarro.update({ id_carro, id_imagem }, {
      where: { id }
    });
    res.status(200).json({ message: 'Associação atualizada com sucesso.' });
  } catch (error) {
    res.statu(500).json({ error: error.message });
  }
};

// Excluir uma associação de imagem com carro
exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    await ImagemCarro.destroy({ where: { id } });
    res.status(200).json({ message: 'Associação excluída com sucesso.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};