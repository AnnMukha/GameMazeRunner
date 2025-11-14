import { createContext, useContext, useState } from "react";

const GameStateContext = createContext();

export const GameStateProvider = ({ children }) => {
  const [screen, setScreen] = useState("menu");
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

  // 🟢 Перехід на наступний рівень (для adventure-режиму)
  const nextLevel = () => {
    const newLevel = level + 1;
    let newDifficulty = difficulty;

    // кожен непарний рівень — підвищення складності
    if (newLevel % 2 === 1) {
      if (newDifficulty === "easy") newDifficulty = "medium";
      else if (newDifficulty === "medium") newDifficulty = "hard";
    }

    setLevel(newLevel);
    setDifficulty(newDifficulty);

    if (newLevel > 6) {
      setScreen("final");
    }
  };

  // 🟢 Запис результату рівня
  //   difficultyLabel — це ТА складність, з якою реально грали (activeDifficulty)
  const completeLevel = (difficulty, time) => {
  setRecords(prev => {
    // 🔥 Перевіряємо, чи вже є запис цього рівня
    const exists = prev.some(r => r.level === level);

    if (exists) return prev; // ❌ не додаємо дубль

    return [
      ...prev,
      { level, difficulty, time }
    ];
  });
};


  const resetAll = () => {
    setLevel(1);
    setDifficulty("easy");
    setRecords([]);
    setScreen("menu");
  };

  const goToFinalResults = () => {
    setScreen("final");
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
        resetAll,
        goToFinalResults,
      }}
    >
      {children}
    </GameStateContext.Provider>
  );
};

export const useGameState = () => useContext(GameStateContext);
