import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "../styles/StartPage.module.css";

export default function StartPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <div className={styles.startWrapper}>
      <div className={styles.startContainer}>
        <h1 className={styles.title}>MAZE RUNNER</h1>

        <p className={styles.subtitle}>
          Вирушай у неоновий кам’яний лабіринт. Знайди шлях крізь темряву та  
          відкрий портал світла.
        </p>

        <button
          className={styles.startButton}
          onClick={() => navigate(`/user/${id}/menu`)}
        >
          <span>▶</span> Start Adventure
        </button>
      </div>
    </div>
  );
}
