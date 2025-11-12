import { createContext, useContext, useState } from "react";

const GameStateContext = createContext();

export const GameStateProvider = ({ children }) => {
  const [screen, setScreen] = useState("menu"); // menu | game | final
  const [level, setLevel] = useState(1);
  const [difficulty, setDifficulty] = useState("easy");
  const [records, setRecords] = useState([]);

  // 🟢 Початок гри
  const startGame = () => {
    setLevel(1);
    setDifficulty("easy");
    setRecords([]);
    setScreen("game");
  };

  // 🟢 Перехід на наступний рівень
  const nextLevel = () => {
    // Логіка зміни складності (наприклад, кожні 2 рівні)
    const newLevel = level + 1;
    let newDifficulty = difficulty;

    if (newLevel % 2 === 1) {
      if (difficulty === "easy") newDifficulty = "medium";
      else if (difficulty === "medium") newDifficulty = "hard";
    }

    if (newLevel > 6) {
      setScreen("final"); // завершення гри
    } else {
      setLevel(newLevel);
      setDifficulty(newDifficulty);
    }
  };

  // 🟢 Завершення рівня (запис часу)
  const completeLevel = (time) => {
    setRecords((prev) => [...prev, { level, difficulty, time }]);
  };

  // 🏠 Вихід у меню
  const exitToMenu = () => {
    setScreen("menu");
  };

  // 🔄 Повне очищення
  const resetAll = () => {
    setLevel(1);
    setDifficulty("easy");
    setRecords([]);
    setScreen("menu");
  };

  return (
    <GameStateContext.Provider
      value={{
        screen,
        level,
        difficulty,
        records,
        startGame,
        nextLevel,
        completeLevel,
        exitToMenu,
        resetAll,
      }}
    >
      {children}
    </GameStateContext.Provider>
  );
};

export const useGameState = () => useContext(GameStateContext);
