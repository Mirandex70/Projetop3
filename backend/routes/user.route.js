const express = require("express");
const router = express.Router();

const user = require("../controllers/user.controller.js");

router.post("/users", user.create);

router.get("/users/:id_user", user.findOne);

router.put("/users/:id_user", user.update);

router.delete("/users/:id_user", user.delete);

module.exports = router;
