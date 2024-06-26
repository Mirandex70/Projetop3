import axios from "axios";

class AuthService {
  //criar a função de login
  async login(email, password) {
    return axios
      .post("http://localhost:5001/api/auth/login", { email, password })
      .then((result) => {
        if (result.data.success && result.data.AccessToken) {
          console.log(" result.data" + result.data)
          localStorage.setItem("user", JSON.stringify(result.data));
         
        }
        return result.data;
      })
      .catch((error) => {
        console.error("Ocorreu um erro na execução do pedido." + error.message);
        alert(
          "Não foi possível aceder ao sistema. Tente novamente mais tarde!"
        );
      });
  }

  // função de registar
  async register(nome, email, password) {
    return axios
      .post("http://localhost:5001/api/auth/register", { nome,email, password })
      .then((result) => {
        if (result.data.success && result.data.AccessToken) {
          localStorage.setItem("user", JSON.stringify(result.data));
        }
        return result.data;
      })
      .catch((error) => {
        console.error("Ocorreu um erro na execução do pedido." + error.message);
        alert(
          "Não foi possível aceder ao sistema. Tente novamente mais tarde!"
        );
      });
  }

  //função de logout
  async logout() {
    localStorage.removeItem("user");
    window.location.reload();
  }
  

  //função que retorna o atual user
  async getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}
export default new AuthService();