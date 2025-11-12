import { useState, useEffect } from "react";
import Header from "../components/Header";
import MazeGrid from "../components/MazeGrid";
import Button from "../components/Button";
import GameOverModal from "../components/GameOverModal";
import { useMaze } from "../hooks/useMaze";
import { usePlayer } from "../hooks/usePlayer";
import { useTimer } from "../hooks/useTimer";
import { useGameState } from "../hooks/useGameState";
import { useGameSettings } from "../hooks/GameSettingsContext";

export default function GamePage({ onExit }) {
  const { level, difficulty, nextLevel, completeLevel } = useGameState();
  const { settings } = useGameSettings();

  const [seed, setSeed] = useState(0);
  const [isOver, setIsOver] = useState(false);
  const [isFailed, setIsFailed] = useState(false);
  const [attemptsLeft, setAttemptsLeft] = useState(3);

  // 🧩 Вибір складності
  const activeDifficulty =
    settings.mode === "custom" ? settings.difficulty : difficulty;

  // 📏 Розмір лабіринту
  const size =
    activeDifficulty === "easy" ? 5 :
    activeDifficulty === "medium" ? 7 : 9;

  // 🧱 Генерація лабіринту
  const { maze } = useMaze(size, activeDifficulty, seed);

  // 🚶 Рух гравця
  const { position, moveUp, moveDown, moveLeft, moveRight } = usePlayer(
    maze,
    () => handleFinish(),
    seed
  );

  // ⏱️ Таймер
  const { formatTime, reset, seconds } = useTimer(!isOver);

  // 🔔 Обробка вичерпання часу
  useEffect(() => {
    if (settings.timerMode === "limit" && seconds >= settings.timeLimit) {
      handleFail();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seconds, settings.timerMode, settings.timeLimit]);

  // 🏁 Гравець досяг кінця
  const handleFinish = () => {
    if (settings.timerMode === "limit") {
      setIsOver(true); // без запису часу
    } else {
      completeLevel(formatTime());
      setIsOver(true);
    }
  };

  // ❌ Коли час закінчився
  const handleFail = () => {
    setIsFailed(true);
    setIsOver(true);
    setAttemptsLeft((prev) => prev - 1);
  };

  // 🔄 Почати рівень заново
  const restart = () => {
    setIsOver(false);
    setIsFailed(false);
    reset();
    setSeed((s) => s + 1);
  };

  // ⏭️ Перейти до наступного рівня
  const next = () => {
    setIsOver(false);
    setIsFailed(false);
    reset();
    setSeed((s) => s + 1);
    if (typeof nextLevel === "function") nextLevel(); // ✅ захист
  };

  return (
    <div className="game-container">
      <Header title={`Maze Runner — Level ${level} (${activeDifficulty})`} />

      {/* Таймер або час */}
      {settings.timerMode === "limit" ? (
        <p>⏳ Залишилось: {Math.max(settings.timeLimit - seconds, 0)}s</p>
      ) : (
        <p>⏱️ Час: {formatTime()}</p>
      )}

      <MazeGrid maze={maze} playerPosition={position} />

      {/* Кнопки керування */}
      <div className="controls">
        <Button text="⬆️ Up" onClick={moveUp} />
        <div className="middle-buttons">
          <Button text="⬅️ Left" onClick={moveLeft} />
          <Button text="➡️ Right" onClick={moveRight} />
        </div>
        <Button text="⬇️ Down" onClick={moveDown} />
      </div>

      {/* 🏁 Успішне завершення */}
      {isOver && !isFailed && (
        <GameOverModal
          onRestart={restart}
          onNext={next}
          onExit={onExit}
          isFinal={false}
        />
      )}

      {/* ❌ Програш через час */}
      {isFailed && (
        <div className="fail-modal animate-fade">
          <h2>⏰ Час вийшов!</h2>
          {attemptsLeft > 0 ? (
            <>
              <p>Ви не встигли, залишилось спроб: {attemptsLeft}</p>
              <Button text="🔄 Спробувати ще раз" onClick={restart} />
            </>
          ) : (
            <>
              <p>😢 У вас закінчилися всі спроби!</p>
              <Button text="🏠 У меню" onClick={onExit} />
            </>
          )}
        </div>
      )}
    </div>
  );
}


