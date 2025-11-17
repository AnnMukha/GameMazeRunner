// src/pages/ResultPage.jsx
import React from "react";
import styles from "../styles/ResultPage.module.css";
import Button from "../components/Button";
import { useNavigate, useParams } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { selectGameState, resetAll } from "../store/gameStateSlice";

export default function ResultPage() {
  const { records } = useSelector(selectGameState);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const { id } = useParams();

  const goMenu = () => {
    dispatch(resetAll());
    navigate(`/user/${id}/menu`);
  };

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

