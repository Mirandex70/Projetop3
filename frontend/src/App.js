import "./App.css";
import LoginPage from "./components/auth/login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignupPage from "./pages/registar";
import HomePage from "./pages/home";
import Perfil from "./pages/perfil";
import CarPage from "./pages/car";
import { useEffect, useState } from "react";
import authService from "./services/auth.service";
import { useNavigate } from "react-router-dom";

function App() {
  const [user, setUser] = useState("");
  const nav = useNavigate();

  useEffect(() => {
    updateUser();
  });

  //Handler de logout
  const logoutHandler = () => {
    authService.logout();
    setUser(null);
    nav("/");
  };

  //Handler de gestão de users
  const updateUser = async () => {
    if (user === null || user === "") {
      const currentUser = await authService.getCurrentUser();
      if (currentUser) setUser({ user: currentUser });
    }
  };
  return (
    <div className="App">
      
        <Routes>
          <Route path="/" element={<HomePage logout={logoutHandler} />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registar" element={<SignupPage />} />
          <Route path="/perfil" element={<Perfil updateUser={updateUser}  />} />
          <Route path="/car/:id_carro" element={<CarPage user={user}/>} />
        </Routes>
      
    </div>
  );
}

export default App;
