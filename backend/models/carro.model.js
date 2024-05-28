const sequelize = require("sequelize");
const connection = require("../config/db.config.js");

const Carro = function (dados) {
  (this.marca = dados.marca), (this.data = dados.data), (this.id_user = idUser), (this.cor = dados.cor);
};

Carro.create = (novoCarro, result) => {
  if (!novoCarro.marca || !novoCarro.data || !novoCarro.cor) {
    const errorMsg =
      "Certifique-se de fornecer marca, cor e data para criar um carro.";
    console.log("error: ", errorMsg);
    result(errorMsg, null);
    return;
  }

  connection.query(
    "INSERT INTO carro SET ?",
    novoCarro,
    (error, res) => {
      if (error) {
        console.log("Erro na linha 22 (carro.model): ", error);
        result(error, null);
        return;
      }

      console.log("Carro criado com sucesso: ", {
        id_carro: res.insertId,
        ...novoCarro,
      });

      result(null, { id_carro: res.insertId, ...novoCarro });
    }
  );
};

Carro.findById = (id_carro, result) => {
  connection.query(
    "SELECT * FROM carro WHERE id_carro = ?", id_carro,
    (error, res) => {
      if (error) {
        console.log("error: ", error);
        result(error, null);
        return;
      }
      if (res.length) {
        console.log("Carro encontrado: ", res[0]);
        result(null, res[0]);
        return;
      }
      result({ result: "não encontrado" }, null);
    }
  );
};

Carro.getAllByUser = (idUser, result) => {
  connection.query(
    "SELECT * FROM carro WHERE id_user = ?",
    idUser,
    (error, res) => {
      if (error) {
        console.log("error: ", error);
        result(null, error);
        return;
      }
      console.log("Carros: ", res);
      result(null, res);
    }
  );
};

Carro.updateById = (id_carro, carro, result) => {
  connection.query(
    "UPDATE carro SET marca = ?, data = ?, cor = ? WHERE id_carro = ?",
    [carro.marca, carro.data, carro.cor, id_carro],
    (error, res) => {
      if (error) {
        console.log("error: ", error);
        result(null, error);
        return;
      }
      if (res.affectedRows == 0) {
        result({ result: "não encontrado" }, null);
        return;
      }

      console.log("Carro atualizado: ", {
        id_carro: id_carro,
        ...carro,
      });
      result(null, { id_carro: id_carro, ...carro });
    }
  );
};

Carro.remove = (id_carro, result) => {
  connection.query(
    "DELETE FROM carro WHERE id_carro = ?",
    id_carro,
    (error, res) => {
      if (error) {
        console.log("error: ", error);
        result(null, error);
        return;
      }

      if (res.affectedRows == 0) {
        result({ result: "não encontrado" }, null);
        return;
      }

      console.log("Carro apagado com o ID: ", id_carro);
      result(null, res);
    }
  );
};

Carro.removeAll = (result) => {
  connection.query("DELETE FROM carro", (error, res) => {
    if (error) {
      console.log("error: ", error);
      result(null, error);
      return;
    }

    console.log("deleted ${res.affectedRows} carro");
    result(null, res);
  });
};

Carro.findByName = (marca, idUser, result) => {
  connection.query(
    "SELECT * FROM carro WHERE marca LIKE ? AND id_user = ?",
    [`%${marca}%`, idUser],
    (error, res) => {
      if (error) {
        console.log("error: ", error);
        result(null, error);
        return;
      }
      console.log("Carros encontrados: ", res);
      result(null, res);
    }
  );
};

module.exports = Carro;
