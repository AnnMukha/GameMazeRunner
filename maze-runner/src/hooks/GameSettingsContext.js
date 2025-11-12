import { createContext, useContext, useState } from "react";

const SettingsContext = createContext();

export const GameSettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState({
    mode: "adventure",      // adventure | custom
    difficulty: "easy",     // використовується лише для custom
    timerMode: "none",      // none | limit
    timeLimit: 60           // секунди
  });

  const updateSettings = (newSettings) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useGameSettings = () => useContext(SettingsContext);
