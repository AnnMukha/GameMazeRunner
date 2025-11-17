import { useTimer } from "../hooks/useTimer";
import styles from "../styles/GamePage.module.css";

export default function TimerBox({ isOver, timerMode, timeLimit }) {
  const { seconds, formatTime } = useTimer(!isOver);

  return (
    <div className={styles.timer}>
      {timerMode === "limit" ? (
        <p>⏳ Час: {Math.max(timeLimit - seconds, 0)}s</p>
      ) : (
        <p>⏱️ Час: {formatTime()}</p>
      )}
    </div>
  );
}
