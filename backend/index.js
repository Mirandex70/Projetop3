const express = require('express');
const app = express();

//configurações
app.set('port', process.eventNames.port || process.env.PORT || 5000);
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", "./views");

app.use("/",( req,res,next) => {
   // console.log("URL: " + req.url + " || " + req.ip);
   // console.log("Data: ", new Date());
    next();
});

app.use("/", require("./routes/main.route"));
app.use("/users", require("./routes/user.route"));
app.use("/", require("./routes/carro.route"));
app.use("/", require("./routes/auth.route"));

app.listen (app.get("port"),() => {
    console.log("Servidor iniciado na porta: " + app.get("port"));
});

app.use("/pages", express.static("./views/pages"));
app.use("/images", express.static("./assets/images"));
app.use("/assets", express.static("./assets"));
app.use("/css", express.static("./node_modules/bootstrap/dist/css"));
app.use("/js", express.static("./node_modules/bootstrap/dist/js"));
app.use("/js", express.static("./node_modules/jquery/dist"));

