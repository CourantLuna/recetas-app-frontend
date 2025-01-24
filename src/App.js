import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginView from "./views/LoginView"; // Importa la vista del login
import DashboardView from "./views/DashboardView"; // Importa la vista del dashboard

const App = () => {
  return (
    <Router>
      {/* El contexto del Router envuelve todo */}
      <Routes>
        {/* Ruta para el Login */}
        <Route path="/" element={<LoginView />} />

        {/* Ruta para el Dashboard */}
        <Route path="/dashboard" element={<DashboardView />} />
      </Routes>
    </Router>
  );
};

export default App;
