import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../services/auth.service";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [load, setLoad] = useState(false);
  const nav = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();
    setLoad(true);

    authService
      .login(email, password)
      .then((result) => {
        //console.log(result);
        if (!result) {
          alert("Autenticação inválida!");
          setLoad(false);
        } else {
          setLoad(false);
          setEmail("");
          setPassword("");
          nav("/");
        }
      })
      .catch((error) => {
        console.error(
          "Ocorreu um erro ao executar o pedido. " || error.message
        );
        alert("Ocorreu um erro. Por favor, tente mais tarde.");
      });
  };

  return (
    <>
      <h1>Sistema de Autenticação</h1>
      <form method="post" onSubmit={handleLogin}>
        <label htmlFor="email">Email:</label>&nbsp;
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
          required
        />
        <br />
        <label htmlFor="password">Password:</label>&nbsp;
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
          required
        />
        <br />
        <button type="submit" disabled={load}>
          {load ? "Aguarde..." : "Entrar"}
        </button>
      </form>
    </>
  );
};

export default Login;