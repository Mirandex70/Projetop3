const connection = require("./conexao.db");

const User = function(dados) {
    this.marca = dados.marca,
    this.password = dados.password,
    this.email = dados.email
}

User.create = (novoUser, result) => {
    connection.query("INSERT INTO user SET ?", novoUser, (error, res) => {
        if (error) {
            console.log("error: ", error);
            result(error, null);
            return;
        }

        console.log("Utilizador criado com sucesso: ", { id_user: res.insertID, ...novoUser });
        result(null, { id_user: res.insertID, ...novoUser});
        });   
    };

User.findById = (id_user, result) => {
    connection.query("SELECT * FROM user WHERE id_user = ${id_user}", (error, res) => {
        if (error) {
            console.log("error: ", error);
            result(error, null);
            return;
        }
        if (res.length) {
            console.log("Utilizador encontrado: ", res[0]);
            result(null, res[0]);
            return;
        }
        result({ result: "não encontrado" }, null);

    });

};

User.getAll = result => {
    connection.query("SELECT * FROM user", (error, res) => {
        if(error) {
            console.log("error: ", error);
            result(null, error);
            return;

        }
        console.log("Utilizadores: ", res);
        result(null, res);
    });

};

User.updateById = (id_user, utilizador, result) => {
    connection.query(
        "UPDATE user SET marca = ? WHERE id_user = ?",
        [utilizador.marca, id_user],
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

            console.log("Utilizador atualizado: ", { id_user: id_user, ...utilizador});
            result(null, { id_user: id_user, ...utilizador });
        

        }
    );
};

User.remove = (id_user, result) => {
    connection.query ("DELETE FROM user WHERE id_user = ?", id_user, (error, res) => {
        if (error) {
            console.log("error: ", error);
            result(null, error);
            return;
        }

        if (res.affectedRows == 0) {
            result({ result: "não encontrado" }, null);
            return;
        }

        console.log("Utilizador apagado com o ID: ", id_user);
        result(null, res);
    });
};

User.removeAll = result => {
    connection.query("DELETE FROM user", (error, res) => {
        if (error) {
            console.log("error: ", error);
            result(null, error);
            return;
        }

        console.log("deleted ${res.affectedRows} utilizador" );
        result(null, res);
    });
};

User.login = (user, result) => {
    connection.query("SELECT * FROM user WHERE email =? AND password = ?", [user.email, user.password], (error, res) => {
        if (error) {
            console.log("error: ", error);
            result(error, null);
            return;
        }
        if (res.length) {
            console.log("Utilizador encontrado: ", res[0]);
            result(null, res[0]);
            return;
        }
        result({ result: "não encontrado" }, null);

    });

};

User.register = (user, result) => {
    connection.query("INSERT INTO user SET ?", user, (error, res) => {
        if (error) {
            console.log("error: ", error);
            result(error, null);
            return;
        }
        console.log("Utilizador criado com sucesso: ", { id_user: res.insertId, ...user });
        result(null, { id_user: res.insertId, ...user });
    });
};

module.exports = User;