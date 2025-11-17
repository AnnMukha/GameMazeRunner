// src/pages/GamePage.jsx
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Header from "../components/Header";
import MazeGrid from "../components/MazeGrid";
import Button from "../components/Button";
import GameOverModal from "../components/GameOverModal";

import { useMaze } from "../hooks/useMaze";
import { usePlayer } from "../hooks/usePlayer";
import { useTimer } from "../hooks/useTimer";
import { useGameState } from "../hooks/useGameState";
import { useGameSettings } from "../hooks/GameSettingsContext";

import styles from "../styles/GamePage.module.css";

export default function GamePage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    level,
    difficulty,
    nextLevel,
    completeLevel,
    goToFinalResults,
    resetAll,
  } = useGameState();

  const { settings } = useGameSettings();

  // 🔑 seed для генерації унікального лабіринту
  const [seed, setSeed] = useState(Date.now());

  // Стани завершення рівня
  const [isOver, setIsOver] = useState(false);
  const [isFailed, setIsFailed] = useState(false);
  const [attemptsLeft, setAttemptsLeft] = useState(3);
  const [finishLocked, setFinishLocked] = useState(false);

  // Обрана складність з урахуванням режиму
  const activeDifficulty =
    settings.mode === "custom" ? settings.difficulty : difficulty;

  // Розмір лабіринту залежно від складності
  const size =
    activeDifficulty === "easy" ? 5 :
    activeDifficulty === "medium" ? 7 : 9;

  // Лабіринт
  const { maze } = useMaze(size, activeDifficulty, seed);

  // Гравець
  const { position, moveUp, moveDown, moveLeft, moveRight } = usePlayer(
    maze,
    () => handleFinish(),
    seed
  );

  // Таймер
  const { seconds, reset, formatTime } = useTimer(!isOver);

  // Вихід з гри (після програшу в таймерному режимі або з кнопки)
  const onExit = () => {
    if (settings.timerMode === "none") {
      goToFinalResults();
      navigate(`/user/${id}/result`);
    } else {
      resetAll();
      navigate(`/user/${id}/menu`);
    }
  };

  // Звичайний вихід у меню
  const goToMenu = () => {
    resetAll();
    navigate(`/user/${id}/menu`);
  };

  // Перейти до сторінки результатів
  const goToResults = () => {
    goToFinalResults();
    navigate(`/user/${id}/result`);
  };

  // Перевірка обмеження часу в режимі "limit"
  useEffect(() => {
    if (
      settings.timerMode === "limit" &&
      seconds >= settings.timeLimit &&
      !isOver
    ) {
      handleFail();
    }
  }, [seconds, settings, isOver]);

  // Успішне завершення рівня
  const handleFinish = () => {
    if (finishLocked) return;
    setFinishLocked(true);

    setIsOver(true);
    setIsFailed(false);

    // Записуємо час для обох режимів
    const timeResult =
      settings.timerMode === "limit"
        ? `${Math.max(settings.timeLimit - seconds, 0)}s`
        : formatTime();

    completeLevel(activeDifficulty, timeResult);
  };

  // Програш по часу
  const handleFail = () => {
    setIsOver(true);
    setIsFailed(true);
    setAttemptsLeft((prev) => prev - 1);
  };

  // Перезапустити поточний рівень
  const restart = () => {
    setFinishLocked(false);
    setIsOver(false);
    setIsFailed(false);
    reset();
    setSeed(Date.now() + Math.random() * 999999);
  };

  // Перейти на наступний рівень
  const next = () => {
    if (level === 6) return;

    setFinishLocked(false);
    nextLevel();
    reset();

    setIsOver(false);
    setIsFailed(false);
    setSeed(Date.now() + Math.random() * 999999);
  };

  const isFinalLevel = level === 6;

  return (
    <div className={styles.gameWrapper}>
      {/* Заголовок */}
      <Header title={`Level ${level} — ${activeDifficulty}`} />

      {/* Таймер */}
      <div className={styles.timer}>
        {settings.timerMode === "limit" ? (
          <p>⏳ Час: {Math.max(settings.timeLimit - seconds, 0)}s</p>
        ) : (
          <p>⏱️ Час: {formatTime()}</p>
        )}
      </div>

      {/* Лабіринт */}
      <div className={styles.mazeBox}>
        <MazeGrid maze={maze} playerPosition={position} />
      </div>

      {/* Керування пересуванням */}
      <div className={styles.controls}>
        <Button icon="⬆️" onClick={moveUp} />

        <div className={styles.middleRow}>
          <Button icon="⬅️" onClick={moveLeft} />
          <Button icon="⬇️" onClick={moveDown} />
          <Button icon="➡️" onClick={moveRight} />
        </div>
      </div>

      {/* Модалка перемоги */}
      {isOver && !isFailed && (
        <GameOverModal
          isFinal={isFinalLevel}
          timerMode={settings.timerMode}
          onRestart={settings.timerMode === "limit" ? null : restart}
          onNext={isFinalLevel ? null : next}
          onMenu={goToMenu}
          onResults={goToResults}
        />
      )}

      {/* Модалка програшу (таймер) */}
      {isFailed && (
        <div className={`${styles.failModal} animate-fade`}>
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

