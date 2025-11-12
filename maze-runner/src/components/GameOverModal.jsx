export default function GameOverModal({ onRestart, onNext, onExit, isFinal }) {
  return (
    <>
      <div className="modal-overlay" />
      <div className="modal">
        <h2>🎮 Гру завершено!</h2>
        {isFinal ? (
          <p>Вітаємо! Це був останній рівень 🎉</p>
        ) : (
          <p>Хочеш спробувати ще раз, перейти на наступний рівень чи вийти?</p>
        )}
        <div style={{ display: "flex", justifyContent: "center", gap: 12 }}>
          {!isFinal && <button onClick={onRestart}>🔄 Заново</button>}
          {!isFinal && <button onClick={onNext}>➡️ Наступний рівень</button>}
          <button onClick={onExit}>📚 Вийти</button>
        </div>
      </div>
    </>
  );
}
