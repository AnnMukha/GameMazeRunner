import { useNavigate, useParams } from "react-router-dom";
import { useGameState } from "../hooks/useGameState";

export default function ResultPage() {
  const { records } = useGameState();
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <div className="result-container">
      <h1>🏆 Вітаємо! Гру завершено!</h1>

      {records.length > 0 && (
        <div className="result-content">
          <h2>📊 Динаміка проходження</h2>

          <table>
            <thead>
              <tr>
                <th>Рівень</th>
                <th>Складність</th>
                <th>Час</th>
              </tr>
            </thead>

            <tbody>
              {records.map((r, i) => (
                <tr key={i}>
                  <td>{r.level}</td>
                  <td>{r.difficulty}</td>
                  <td>{r.time}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <button onClick={() => navigate(`/user/${id}/menu`)}>
            🏠 У меню
          </button>
        </div>
      )}
    </div>
  );
}