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

import { useSelector, useDispatch } from "react-redux";
import {
  selectGameState,
  nextLevel as nextLevelAction,
  completeLevel as completeLevelAction,
  goToFinalResults as goToFinalResultsAction,
  resetAll as resetAllAction,
} from "../store/gameStateSlice";
import { selectSettings } from "../store/gameSettingsSlice";

import styles from "../styles/GamePage.module.css";

export default function GamePage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const dispatch = useDispatch();

  const { level, difficulty } = useSelector(selectGameState);
  const settings = useSelector(selectSettings);

  const [seed, setSeed] = useState(Date.now());
  const [isOver, setIsOver] = useState(false);
  const [isFailed, setIsFailed] = useState(false);
  const [attemptsLeft, setAttemptsLeft] = useState(3);
  const [finishLocked, setFinishLocked] = useState(false);

  const activeDifficulty =
    settings.mode === "custom" ? settings.difficulty : difficulty;

  const size =
    activeDifficulty === "easy" ? 5 :
    activeDifficulty === "medium" ? 7 : 9;

  const { maze } = useMaze(size, activeDifficulty, seed);

  const { position, moveUp, moveDown, moveLeft, moveRight } = usePlayer(
    maze,
    () => handleFinish(),
    seed
  );

  const { seconds, reset, formatTime } = useTimer(!isOver);

  const onExit = () => {
    if (settings.timerMode === "none") {
      dispatch(goToFinalResultsAction());
      navigate(`/user/${id}/result`);
    } else {
      dispatch(resetAllAction());
      navigate(`/user/${id}/menu`);
    }
  };

  const goToMenu = () => {
    dispatch(resetAllAction());
    navigate(`/user/${id}/menu`);
  };

  const goToResults = () => {
    dispatch(goToFinalResultsAction());
    navigate(`/user/${id}/result`);
  };

  useEffect(() => {
    if (
      settings.timerMode === "limit" &&
      seconds >= settings.timeLimit &&
      !isOver
    ) {
      handleFail();
    }
  }, [seconds, settings, isOver]);

  const handleFinish = () => {
    if (finishLocked) return;
    setFinishLocked(true);

    setIsOver(true);
    setIsFailed(false);

    const timeResult =
      settings.timerMode === "limit"
        ? `${Math.max(settings.timeLimit - seconds, 0)}s`
        : formatTime();

    dispatch(
      completeLevelAction({
        difficulty: activeDifficulty,
        time: timeResult,
      })
    );
  };

  const handleFail = () => {
    setIsOver(true);
    setIsFailed(true);
    setAttemptsLeft((prev) => prev - 1);
  };

  const restart = () => {
    setFinishLocked(false);
    setIsOver(false);
    setIsFailed(false);
    reset();
    setSeed(Date.now() + Math.random() * 999999);
  };

  const next = () => {
    if (level === 6) return;

    setFinishLocked(false);
    dispatch(nextLevelAction());
    reset();

    setIsOver(false);
    setIsFailed(false);
    setSeed(Date.now() + Math.random() * 999999);
  };

  const isFinalLevel = level === 6;

  return (
    <div className={styles.gameWrapper}>
      <Header title={`Level ${level} — ${activeDifficulty}`} />

      <div className={styles.timer}>
        {settings.timerMode === "limit" ? (
          <p>⏳ Час: {Math.max(settings.timeLimit - seconds, 0)}s</p>
        ) : (
          <p>⏱️ Час: {formatTime()}</p>
        )}
      </div>

      <div className={styles.mazeBox}>
        <MazeGrid maze={maze} playerPosition={position} />
      </div>

      <div className={styles.controls}>
        <Button icon="⬆️" onClick={moveUp} />

        <div className={styles.middleRow}>
          <Button icon="⬅️" onClick={moveLeft} />
          <Button icon="⬇️" onClick={moveDown} />
          <Button icon="➡️" onClick={moveRight} />
        </div>
      </div>

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
