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

import { useNavigate, useParams } from "react-router-dom";

export default function GamePage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    level,
    difficulty,
    nextLevel,
    completeLevel,
    goToFinalResults,
    resetAll,          // 🔥 додали
  } = useGameState();

  const { settings } = useGameSettings();

  const [seed, setSeed] = useState(Date.now());
  const [isOver, setIsOver] = useState(false);
  const [isFailed, setIsFailed] = useState(false);
  const [attemptsLeft, setAttemptsLeft] = useState(3);

  // Вибір складності
  const activeDifficulty =
    settings.mode === "custom" ? settings.difficulty : difficulty;

  // Розмір лабіринту
  const size =
    activeDifficulty === "easy"
      ? 5
      : activeDifficulty === "medium"
      ? 7
      : 9;

  // Генеруємо лабіринт
  const { maze } = useMaze(size, activeDifficulty, seed);

  // Гравець
  const { position, moveUp, moveDown, moveLeft, moveRight } = usePlayer(
    maze,
    () => handleFinish(),
    seed
  );

  // Таймер
  const { seconds, reset, formatTime } = useTimer(!isOver);

  // 🔥 Вихід з гри:
  // - без таймера → на сторінку результатів
  // - з таймером → у головне меню (налаштування)
  const onExit = () => {
    if (settings.timerMode === "none") {
      goToFinalResults();
      navigate(`/user/${id}/result`);
    } else {
      resetAll();
      navigate(`/user/${id}/menu`);
    }
  };

  // Перевірка таймера (режим limit)
  useEffect(() => {
    if (
      settings.timerMode === "limit" &&
      seconds >= settings.timeLimit
    ) {
      handleFail();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seconds]);

  // Якщо пройшла рівень
    // Якщо пройшла рівень
// прапорець, щоб не викликати finish двічі
const [finishLocked, setFinishLocked] = useState(false);

const handleFinish = () => {
  if (finishLocked) return; // 🔥 БЛОКУЄМО ПОВТОРНИЙ ЗАПИС
  setFinishLocked(true);

  setIsOver(true);
  setIsFailed(false);

  if (settings.timerMode === "none") {
    completeLevel(activeDifficulty, formatTime());
  }
};

  // Якщо не встигла
  const handleFail = () => {
    setIsOver(true);
    setIsFailed(true);
    setAttemptsLeft((prev) => prev - 1);
  };

  // Почати рівень заново (той самий рівень)
const restart = () => {
  setFinishLocked(false);   // 🔥 Додано
  setIsOver(false);
  setIsFailed(false);
  reset();
  setSeed(Date.now() + Math.random() * 999999);
};


  // Перейти на наступний рівень
const next = () => {
  setFinishLocked(false);   // 🔥 Додано

  if (level === 6) return;

  nextLevel();
  reset();
  setIsOver(false);
  setIsFailed(false);
  setSeed(Date.now() + Math.random() * 999999);
};


  return (
    <div className="game-container">
      <Header title={`Level ${level} — ${activeDifficulty}`} />

      {/* Таймер */}
      {settings.timerMode === "limit" ? (
        <p>⏳ Час: {Math.max(settings.timeLimit - seconds, 0)}s</p>
      ) : (
        <p>⏱️ Час: {formatTime()}</p>
      )}

      <MazeGrid maze={maze} playerPosition={position} />

      {/* Кнопки управління */}
      <div className="controls">
        <Button text="⬆️ Up" onClick={moveUp} />

        <div className="middle-buttons">
          <Button text="⬅️ Left" onClick={moveLeft} />
          <Button text="➡️ Right" onClick={moveRight} />
        </div>

        <Button text="⬇️ Down" onClick={moveDown} />
      </div>

      {/* МОДАЛКА — пройшла рівень */}
      {isOver && !isFailed && (
        <GameOverModal
          isFinal={level === 6}
          timerMode={settings.timerMode}
          onRestart={settings.timerMode === "limit" ? null : restart}
          onNext={level === 6 ? null : next}
          onExit={onExit}
        />
      )}

      {/* МОДАЛКА — програла */}
      {isFailed && (
        <div className="fail-modal animate-fade">
          <h2>⏰ Час вийшов!</h2>

          {attemptsLeft > 0 ? (
            <>
              <p>Залишилося спроб: {attemptsLeft}</p>
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

