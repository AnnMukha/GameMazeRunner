import ReactDOM from "react-dom";

export default function GameOverModal({ onRestart, onNext, onExit, isFinal }) {
  return ReactDOM.createPortal(
    <>
      <div className="modal-overlay"></div>

      <div className="modal">
        <h2>🎉 Рівень пройдено!</h2>

        {isFinal ? (
          <p>Це був останній рівень! 🎯</p>
        ) : (
          <p>Готові перейти далі?</p>
        )}

        <div style={{ display: "flex", justifyContent: "center", gap: 12 }}>
          {!isFinal && <button onClick={onRestart}>🔄 Заново</button>}
          {!isFinal && <button onClick={onNext}>➡️ Далі</button>}
          <button onClick={onExit}>🏠 У меню</button>
        </div>
      </div>
    </>,
    document.getElementById("portal-root")
  );
}

