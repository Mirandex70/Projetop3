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
    },
  };
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage user={user} />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registar" element={<SignupPage />} />
          <Route path="/perfil" element={<Perfil user={user} />} />
          <Route path="/car/:id_carro" element={<CarPage user={user}/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
