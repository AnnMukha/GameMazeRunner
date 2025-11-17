// src/App.js
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import StartPage from "./pages/StartPage";
import MenuPage from "./pages/MenuPage";
import GamePage from "./pages/GamePage";
import ResultPage from "./pages/ResultPage";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Редиректор з кореня */}
        <Route path="/" element={<Navigate to="/user/1/start" replace />} />

        <Route path="/user/:id/start" element={<StartPage />} />
        <Route path="/user/:id/menu" element={<MenuPage />} />
        <Route path="/user/:id/game" element={<GamePage />} />
        <Route path="/user/:id/result" element={<ResultPage />} />

        {/* 404 */}
        <Route path="*" element={<Navigate to="/user/1/start" replace />} />
      </Routes>
    </Router>
  );
}
