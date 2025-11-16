import { createContext, useContext, useState } from "react";

const SettingsContext = createContext();

export const GameSettingsProvider = ({ children }) => {
  // 💾 зберігаємо з localStorage або створюємо початкові налаштування
  const [settings, setSettings] = useState(() => {
    return JSON.parse(localStorage.getItem("mazeSettings")) || {
      mode: "adventure",      // adventure | custom
      difficulty: "easy",     // only for custom
      timerMode: "none",      // none | limit
      timeLimit: 60           // seconds
    };
  });

  // 💾 зберігання результатів (stats)
  const [stats, setStats] = useState(() => {
    return JSON.parse(localStorage.getItem("mazeStats")) || [];
  });

  // ============================
  // ✔ UPDATE SETTINGS
  // ============================
  const updateSettings = (newSettings) => {
    setSettings(prev => {
      const updated = { ...prev, ...newSettings };
      localStorage.setItem("mazeSettings", JSON.stringify(updated));
      return updated;
    });
  };

  // ============================
  // ✔ ADD RESULT
  // ============================
  const addResult = (difficulty, time) => {
    const newEntry = { difficulty, time, date: new Date().toISOString() };

    setStats(prev => {
      const updated = [...prev, newEntry];
      localStorage.setItem("mazeStats", JSON.stringify(updated));
      return updated;
    });
  };

  // ============================
  // ✔ CLEAR STATS
  // ============================
  const clearStats = () => {
    setStats([]);
    localStorage.removeItem("mazeStats");
  };

  return (
    <SettingsContext.Provider
      value={{
        settings,
        updateSettings,
        stats,
        addResult,
        clearStats
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useGameSettings = () => useContext(SettingsContext);
