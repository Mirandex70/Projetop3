const express = require("express");
const router = express.Router();

const carro = require("../controllers/carro.controller.js");

router.post("/carros", carro.create);

router.get("/carros", carro.findAllByUser);

//router.get("/carros/:id_carro", carro.findById);

router.put("/carros/:id_carro/", carro.update);

router.delete("/carros/:id_carro", carro.delete);

router.delete("/carros", carro.deleteAll);

router.get("/search/:marca", carro.searchByName);


module.exports = router;
