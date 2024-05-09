const express = require("express");
const router = express.Router();

const auth = require("../controllers/auth.controller.js");

router.post("/login", auth.login);

router.post("/registar", auth.register);

router.get("/logout", auth.logout);

module.exports = router;
