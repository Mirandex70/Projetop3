const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth.controller");

const middleware = require("../middleware");

router.post("/login", authController.login);
router.post("/register", authController.register);
router.post("/refreshtoken", authController.refreshToken);
router.get("/logout", authController.logout);

module.exports = router;