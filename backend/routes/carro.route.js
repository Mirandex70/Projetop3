const express = require("express");
const router = express.Router();

const carro = require("../controllers/carro.controller.js");
router.get("/all", carro.getAllCarros);

router.get("/user/:id_user", carro.getCarrosByUser);

router.post("/create", carro.createCarro);

router.put("/update/:id_carro/", carro.updateCarro);

router.delete("/delete/:id_carro", carro.deleteCarro);

router.get("/:id_carro", carro.getCarroById);


module.exports = router;
