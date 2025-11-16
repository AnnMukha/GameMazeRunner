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
import styles from "../styles/GamePage.module.css"; // 🔥 модульні стилі

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

  const [seed, setSeed] = useState(Date.now());
  const [isOver, setIsOver] = useState(false);
  const [isFailed, setIsFailed] = useState(false);
  const [attemptsLeft, setAttemptsLeft] = useState(3);
  const [finishLocked, setFinishLocked] = useState(false); // 🔒 анти-дубль

  // --- ACTIVE DIFFICULTY ---
  const activeDifficulty =
    settings.mode === "custom" ? settings.difficulty : difficulty;

  const size =
    activeDifficulty === "easy" ? 5 :
    activeDifficulty === "medium" ? 7 : 9;

  // --- MAZE ---
  const { maze } = useMaze(size, activeDifficulty, seed);

  // --- PLAYER ---
  const { position, moveUp, moveDown, moveLeft, moveRight } = usePlayer(
    maze,
    () => handleFinish(),
    seed
  );

  // --- TIMER ---
  const { seconds, reset, formatTime } = useTimer(!isOver);

  // --- EXIT RULES ---
  const onExit = () => {
    if (settings.timerMode === "none") {
      goToFinalResults();
      navigate(`/user/${id}/result`);
    } else {
      resetAll();
      navigate(`/user/${id}/menu`);
    }
  };

    // --- EXIT TO MENU (звичайний вихід) ---
    const goToMenu = () => {
      resetAll();
      navigate(`/user/${id}/menu`);
    };

    // --- GO TO RESULTS (фінальний екран) ---
    const goToResults = () => {
      goToFinalResults();   // зберігаємо фінальний результат
      navigate(`/user/${id}/result`);
    };

  // --- TIMER FAIL CHECK ---
  useEffect(() => {
    if (
      settings.timerMode === "limit" &&
      seconds >= settings.timeLimit
    ) {
      handleFail();
    }
  }, [seconds, settings]);


// --- FINISH ---
const handleFinish = () => {
  if (finishLocked) return;
  setFinishLocked(true);

  setIsOver(true);
  setIsFailed(false);

  // 🔥 Записуємо результат для обох режимів
  const timeResult =
    settings.timerMode === "limit"
      ? `${settings.timeLimit - seconds}s`
      : formatTime();

  completeLevel(activeDifficulty, timeResult);
};

  // --- FAIL ---
  const handleFail = () => {
    setIsOver(true);
    setIsFailed(true);
    setAttemptsLeft((prev) => prev - 1);
  };

  // --- RESTART SAME LEVEL ---
  const restart = () => {
    setFinishLocked(false);
    setIsOver(false);
    setIsFailed(false);
    reset();
    setSeed(Date.now() + Math.random() * 999999);
  };

  // --- NEXT LEVEL ---
  const next = () => {
    if (level === 6) return;

    setFinishLocked(false);
    nextLevel();
    reset();

    setIsOver(false);
    setIsFailed(false);
    setSeed(Date.now() + Math.random() * 999999);
  };

  return (
    <div className={styles.gameWrapper}>
      {/* === HEADER === */}
      <Header title={`Level ${level} — ${activeDifficulty}`} />

      {/* === TIMER === */}
      <div className={styles.timer}>
        {settings.timerMode === "limit" ? (
          <p>⏳ Час: {Math.max(settings.timeLimit - seconds, 0)}s</p>
        ) : (
          <p>⏱️ Час: {formatTime()}</p>
        )}
      </div>

      {/* === MAZE === */}
      <div className={styles.mazeBox}>
        <MazeGrid maze={maze} playerPosition={position} />
      </div>

      {/* === CONTROLS === */}
      <div className={styles.controls}>
  <Button icon="⬆️" onClick={moveUp} />

  <div className={styles.middleRow}>
    <Button icon="⬅️" onClick={moveLeft} />
    <Button icon="⬇️" onClick={moveDown} />
    <Button icon="➡️" onClick={moveRight} />
  </div>
</div>



      {/* === WIN MODAL === */}
      {isOver && !isFailed && (
        <GameOverModal
          isFinal={level === 6}
          timerMode={settings.timerMode}
          onRestart={settings.timerMode === "limit" ? null : restart}
          onNext={level === 6 ? null : next}
          onExit={onExit}
          onMenu={goToMenu}
          onResults={goToResults}
        />
      )}

      {/* === FAIL MODAL === */}
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
