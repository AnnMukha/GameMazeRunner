import Modal from "./ui/Modal";
import Button from "./Button";
import styles from "../styles/GameOverModal.module.css";

export default function GameOverModal({
  isFinal,
  timerMode,
  onRestart,
  onNext,
  onMenu,
  onResults
}) {
  return (
    <Modal onClose={onMenu}>
      <div className={styles.modalBox}>
        <h2 className={styles.title}>
          {isFinal ? "🏆 Рівень пройдено!" : "🎉 Рівень пройдено!"}
        </h2>

        <p className={styles.subtitle}>
          {isFinal ? "Це був фінальний рівень!" : "Готові перейти далі?"}
        </p>

        <div className={styles.buttons}>
          {!isFinal && timerMode !== "limit" && (
            <Button icon="🔁" text="Заново" onClick={onRestart} />
          )}
          {!isFinal && (
            <Button icon="➡️" text="Далі" onClick={onNext} />
          )}
          {isFinal ? (
            <Button icon="🏆" text="До результатів" onClick={onResults} />
          ) : (
            <Button icon="🏠" text="У меню" onClick={onMenu} />
          )}
        </div>
      </div>
    </Modal>
  );
}

