//dependências
const express = require('express');
const cors = require('cors');
const bodyParser = require('express');

//app
const app = express();
app.set("port", process.env.PORT || 5001);
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ credentials:true, origin:'http://localhost:3000'}));


//rotas
app.use("/", require("./routes/main.route"));
app.use("/api/carros", require("./routes/carro.route"));
app.use("/api/user", require("./routes/user.route"));
app.use("/api/auth", require("./routes/auth.route"));
app.use("/api/imagem-carro", require("./routes/imagemcarro.route")); 
app.use("/api/imagens", require("./routes/imagens.route"));

app.listen(app.get("port"), () => {
    console.log("Servidor iniciado na porta: "+app.get ("port"));
})