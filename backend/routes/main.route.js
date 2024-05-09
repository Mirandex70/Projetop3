const express = require ("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.render("pages/index");
});

router.get("/login", (req, res) => {
    res.render("pages/login");
});

router.get("/registar", (req, res) => {
    res.render("pages/registar");
});

router.get("/home", (req, res) => {
    res.render("pages/home") ;
});

router.get("/carros/create", (req, res) => {
    res.render("pages/criarcarro") ;
});

router.get("/user", (req, res) => {
    res.render("pages/user");
});

router.get("/search", (req, res) => {
    res.render("pages/search");
});


module.exports = router;