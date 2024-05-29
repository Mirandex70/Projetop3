let jwt = require("jsonwebtoken");
const config = require("./config/config.js");

let checkToken = (req, res, next) => {
  let token = req.headers["x-access-token"] || req.headers["authorization"];

  //valida token e remove o bearer
  if (token != undefined && token.startsWith("Bearer ")) {
    token = token.slice(7, token.length);
  }

  if (token) {
    jwt.verify(token, config.secret, (error, decoded) => {
      if (error) {
        return res.status(403).json({
          success: false,
          message: "Ocorreu um erro na execução da operação.",
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.status(401).json({
      success: false,
      message: "Ocorreu um erro na execução da operação.",
    });
  }
};

module.exports = {
  checkToken: checkToken,
};
