import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { GameSettingsProvider } from "./hooks/GameSettingsContext";
import { GameStateProvider } from "./hooks/useGameState";
import "./styles/globals.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <GameSettingsProvider>
      <GameStateProvider>
        <App />
      </GameStateProvider>
    </GameSettingsProvider>
  </React.StrictMode>
);
