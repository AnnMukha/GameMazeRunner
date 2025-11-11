import { useState } from "react";

export function useGameState() {
  const [level, setLevel] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const startGame = () => {
    setIsPlaying(true);
    setIsFinished(false);
  };

  const finishGame = () => {
    setIsPlaying(false);
    setIsFinished(true);
  };

  const restartGame = () => {
    setLevel(1);
    setIsPlaying(false);
    setIsFinished(false);
  };

  return {
    level,
    isPlaying,
    isFinished,
    startGame,
    finishGame,
    restartGame,
  };
}
