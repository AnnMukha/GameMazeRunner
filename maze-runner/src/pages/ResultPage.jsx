import Header from "../components/Header";
import Button from "../components/Button";
import { useGameState } from "../hooks/useGameState";
import { useGameSettings } from "../hooks/GameSettingsContext";

export default function ResultPage({ onRestart }) {
  const { records, resetAll, exitToMenu } = useGameState();
  const { settings } = useGameSettings();
  const isTimerMode = settings?.timerMode === "limit";

  return (
    <div className="result-container">
      <Header title="🏆 Гру завершено!" />
      <div className="result-content">
        <p>Вітаємо! Ти пройшла всі рівні 🎉</p>

        {!isTimerMode && records.length > 0 ? (
          <>
            <h3>📊 Попередні результати:</h3>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {records.map((r, i) => (
                <li key={i}>
                  • Рівень {r.level} ({r.difficulty}) — {r.time}
                </li>
              ))}
            </ul>
          </>
        ) : isTimerMode ? (
          <p>⏳ Гра з обмеженням часу завершена!</p>
        ) : null}

        <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
          <Button text="⬅️ У меню" onClick={exitToMenu} />
          <Button text="🗑️ Очистити все" onClick={resetAll} />
          <Button text="🔁 Заново" onClick={onRestart} />
        </div>
      </div>
    </div>
  );
}

