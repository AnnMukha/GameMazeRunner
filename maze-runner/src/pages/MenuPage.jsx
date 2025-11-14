import { useState } from "react";
import { useGameState } from "../hooks/useGameState";
import { useGameSettings } from "../hooks/GameSettingsContext";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./MenuPage.module.css";

export default function MenuPage() {
  const { startGame, records, resetAll } = useGameState();
  const { settings, updateSettings } = useGameSettings();

  const { id } = useParams();
  const navigate = useNavigate();

  const [mode, setMode] = useState(settings.mode);
  const [difficulty, setDifficulty] = useState(settings.difficulty);
  const [timerMode, setTimerMode] = useState(settings.timerMode);
  const [timeLimit, setTimeLimit] = useState(settings.timeLimit);

  const handleStart = () => {
    updateSettings({ mode, difficulty, timerMode, timeLimit });
    startGame();
    navigate(`/user/${id}/game`);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>🏁 Maze Runner</h1>

      <p className={styles.subtitle}>
        Обери свій режим: у <b>пригодницькому</b> складність зростає автоматично,<br />
        а у <b>користувацькому</b> — ти сам обираєш рівень виклику!
      </p>

      <div className={styles.form}>
        {/* Режим гри */}
        <div className={styles.group}>
          <label>🎮 Режим гри:</label>
          <select value={mode} onChange={(e) => setMode(e.target.value)}>
            <option value="adventure">Пригодницький — від легкого до складного</option>
            <option value="custom">Користувацький — фіксована складність</option>
          </select>
        </div>

        {/* Складність */}
        {mode === "custom" && (
          <div className={styles.group}>
            <label>🎚️ Рівень складності:</label>
            <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
              <option value="easy">Легко (5×5)</option>
              <option value="medium">Середньо (7×7)</option>
              <option value="hard">Важко (9×9)</option>
            </select>
          </div>
        )}

        {/* Таймер */}
        <div className={styles.group}>
          <label>⏱️ Режим часу:</label>
          <select value={timerMode} onChange={(e) => setTimerMode(e.target.value)}>
            <option value="none">Без обмеження часу</option>
            <option value="limit">З обмеженням часу</option>
          </select>
        </div>

        {/* Ліміт */}
        {timerMode === "limit" && (
          <div className={styles.group}>
            <label>⏳ Ліміт (секунди):</label>
            <input
              type="number"
              min="10"
              max="300"
              value={timeLimit}
              onChange={(e) => setTimeLimit(Number(e.target.value))}
            />
          </div>
        )}

        <button className={styles.startButton} onClick={handleStart}>
          ▶️ Почати гру
        </button>
      </div>

      {/* Статистика */}
      {records.length > 0 && (
        <div className={styles.stats}>
          <h3>📊 Попередні результати:</h3>
          <ul>
            {records.map((r, i) => (
              <li key={i}>
                Рівень {r.level} ({r.difficulty}) — {r.time}
              </li>
            ))}
          </ul>
          <button className={styles.clearBtn} onClick={resetAll}>
            🗑️ Очистити статистику
          </button>
        </div>
      )}
    </div>
  );
}

