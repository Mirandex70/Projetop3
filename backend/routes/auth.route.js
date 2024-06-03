const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth.controller");

const middleware = require("../middleware");

router.post("/login", authController.login);
router.post("/register", authController.register);
router.post("/refreshtoken", authController.refreshToken);
router.get("/logout", authController.logout);
router.delete("/delete/:id_user", authController.userDelete);
router.put("/update/:id_user", authController.userUpdate);

module.exports = router;