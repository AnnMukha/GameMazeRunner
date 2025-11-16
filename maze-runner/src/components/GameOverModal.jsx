import React from "react";
import styles from "../styles/GameOverModal.module.css";
import Button from "./Button";

export default function GameOverModal({
  isFinal,
  timerMode,
  onRestart,
  onNext,
  onMenu,
  onResults
}) {
  return (
    <div className={styles.modalBox}>
      <h2 className={styles.title}>
        {isFinal ? "🏆 Рівень пройдено!" : "🎉 Рівень пройдено!"}
      </h2>

      <p className={styles.subtitle}>
        {isFinal ? "Це був фінальний рівень!" : "Готові перейти далі?"}
      </p>

      <div className={styles.buttons}>
        
        {/* Якщо НЕ фінал — показуємо кнопку Restart */}
        {!isFinal && timerMode !== "limit" && (
          <Button icon="🔁" text="Заново" onClick={onRestart} />
        )}

        {/* Якщо НЕ фінал — кнопка Next */}
        {!isFinal && (
          <Button icon="➡️" text="Далі" onClick={onNext} />
        )}

        {/* Якщо фінал — ТІЛЬКИ перехід до результатів */}
        {isFinal ? (
          <Button icon="🏆" text="До результатів" onClick={onResults} />
        ) : (
          <Button icon="🏠" text="У меню" onClick={onMenu} />
        )}
      </div>
    </div>
  );
}
