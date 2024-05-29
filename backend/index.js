//dependências
const express = require('express');
const cors = require('cors');
const bodyParser = require('express');

//app
const app = express();
app.set("port", process.env.PORT || 5001);
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

//rotas
app.use("/", require("./routes/main.route"));
app.use("/api/carros", require("./routes/carro.route"));

app.listen(app.get("port"), () => {
    console.log("Servidor iniciado na porta: "+app.get ("port"));
})