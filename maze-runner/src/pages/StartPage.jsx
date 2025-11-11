import Header from "../components/Header";
import Button from "../components/Button";

export default function StartPage({ onStart }) {
  return (
    <div className="container">
      <Header title="Maze Runner 🧭" />
      <p>Натисни кнопку, щоб почати пригоду!</p>
      <Button text="Start Game" onClick={onStart} />
    </div>
  );
}
