import './App.css';
import LoginPage from './pages/login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignupPage from './pages/signup';
import HomePage from './pages/home';

function App() {
  return (
    <div className="App">
     <BrowserRouter> <Routes >
      <Route path="/" element={<HomePage />}/>
      <Route path="/login" element={<LoginPage />} /> 
      <Route path="/signup" element={<SignupPage />} /></Routes> 

      
      </BrowserRouter>
      
    </div>
  );
}

export default App;
