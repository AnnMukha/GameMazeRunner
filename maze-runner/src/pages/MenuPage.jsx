import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "../styles/MenuPage.module.css";
import Button from "../components/Button";
import { useGameSettings } from "../hooks/GameSettingsContext";

export default function MenuPage() {
  const { updateSettings, settings } = useGameSettings();
  const navigate = useNavigate();
  const { id } = useParams();

  const [mode, setMode] = useState(settings.mode);
  const [difficulty, setDifficulty] = useState(settings.difficulty);
  const [timerMode, setTimerMode] = useState(settings.timerMode);
  const [timeLimit, setTimeLimit] = useState(settings.timeLimit);

  const startGame = () => {
    updateSettings({
      mode,
      difficulty,
      timerMode,
      timeLimit: Number(timeLimit),
    });

    navigate(`/user/${id}/game`);
  };

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Maze Runner</h1>

      <div className={styles.menuBox}>
        <p className={styles.subtitle}>
          Обери параметри гри та почни пригоди у світі неонових лабіринтів!
        </p>

        <div className={styles.field}>
          <label>Режим гри:</label>
          <select value={mode} onChange={(e) => setMode(e.target.value)}>
            <option value="adventure">Пригодницький</option>
            <option value="custom">Користувацький</option>
          </select>
        </div>

        {mode === "custom" && (
          <div className={styles.field}>
            <label>Складність:</label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
            >
              <option value="easy">Легко</option>
              <option value="medium">Середньо</option>
              <option value="hard">Складно</option>
            </select>
          </div>
        )}

        <div className={styles.field}>
          <label>Режим часу:</label>
          <select
            value={timerMode}
            onChange={(e) => setTimerMode(e.target.value)}
          >
            <option value="none">Без обмежень</option>
            <option value="limit">З обмеженням</option>
          </select>
        </div>

        {timerMode === "limit" && (
          <div className={styles.field}>
            <label>Ліміт часу (секунди):</label>
            <input
              type="number"
              value={timeLimit}
              min={10}
              max={999}
              onChange={(e) => setTimeLimit(e.target.value)}
            />
          </div>
        )}

        <Button icon="🎮" text="Почати гру" onClick={startGame} />
      </div>
    </div>
  );
}
