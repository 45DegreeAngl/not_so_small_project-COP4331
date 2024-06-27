import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';

import WelcomePage from './pages/WelcomePage';
import LoginPage from './pages/LoginPage';
import CardPage from './pages/CardPage';
import RegisterPage from './pages/RegisterPage'
import AboutUsPage from './pages/AboutUsPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path ="/" element={<WelcomePage />}/>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cards" element={<CardPage />} />
        <Route path="/register" element={<RegisterPage />}/>
        <Route path="/about-us" element={<AboutUsPage />} />
      </Routes>
    </BrowserRouter>
    );
}

export default App;
