const mysql = require("mysql2");
const dbConfig = require("./db.config.js");

const connection = mysql.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
});

connection.connect((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("BD ligada com sucesso!");
  }
});

module.exports = connection;
