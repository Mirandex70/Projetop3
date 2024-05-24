import "./App.css";
import LoginPage from "./pages/login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignupPage from "./pages/registar";
import HomePage from "./pages/home";
import Perfil from "./pages/perfil";
import CarPage from "./pages/car";

function App() {
  const user = {
    isAuthenticated: true,
    data: {
      id: 1,
      name: "John Doe",
      email: "bLpUz@example.com",
      password: "password123",
      cars: [
        {
          id: 1,
          brand: "Mercedes-Benz",
          color: "Preto",
          image:
            "https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
          id: 2,
          brand: "Audi",
          color: "Branco",
          image:
            "https://unsplash.com/pt-br/fotografias/white-audi-a4-q5-2017-Cs-bzLNgxJXB-w",
        },
        {
          id: 3,
          brand: "BMW",
          color: "Vermelho",
          image:
            "https://unsplash.com/pt-br/fotografias/red-bmw-7-series-Cs-bzLNgxJXB-w",
        },
        {
          id: 4,
          brand: "Ferrari",
          color: "Vermelho",
          image:
            "https://unsplash.com/pt-br/fotografias/red-ferrari-laferrari-Cs-bzLNgxJXB-w",
        },
        {
          id: 5,
          brand: "Lamborghini",
          color: "Laranja",
          image:
            "https://unsplash.com/pt-br/fotografias/orange-lamborghini-aventador-SV-Cs-bzLNgxJXB-w",
        },
      ],
    },
  };
  return (
    <div className="App">
      <BrowserRouter>
        {" "}
        <Routes>
          <Route path="/" element={<HomePage user={user} />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registar" element={<SignupPage />} />
          <Route path="/perfil" element={<Perfil user={user} />} />
          <Route path="/car/:id" element={<CarPage user={user} />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
