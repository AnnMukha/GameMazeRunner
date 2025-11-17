// src/pages/ResultPage.jsx
import React from "react";
import styles from "../styles/ResultPage.module.css";
import Button from "../components/Button";
import { useGameState } from "../hooks/useGameState";
import { useNavigate, useParams } from "react-router-dom";

export default function ResultPage() {
  const { records, resetAll } = useGameState();
  const navigate = useNavigate();
  const { id } = useParams();

  const goMenu = () => {
    resetAll();
    navigate(`/user/${id}/menu`);
  };

  // Гарантуємо, що records завжди масив
  const safeRecords = Array.isArray(records) ? records : [];

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Результати гри</h1>

      <div className={styles.resultBox}>
        {safeRecords.length === 0 ? (
          <p className={styles.noResults}>Результатів поки немає</p>
        ) : (
          <div className={styles.list}>
            {safeRecords.map((item, index) => (
              <div key={index} className={styles.row}>
                <span className={styles.level}>Рівень {item.level}</span>

                <span className={styles.difficulty}>
                  {item.difficulty === "easy" && "Легко"}
                  {item.difficulty === "medium" && "Середньо"}
                  {item.difficulty === "hard" && "Складно"}
                </span>

                <span className={styles.time}>{item.time}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className={styles.buttonWrapper}>
        <Button icon="🏠" text="У меню" onClick={goMenu} />
      </div>
    </div>
  );
}

