import Header from "../components/Header";
import Button from "../components/Button";

export default function ResultPage({ onRestart }) {
  return (
    <div className="container">
      <Header title="🏆 Результати гри" />
      <p>Твій час: 00:45</p>
      <p>Рівень: 1</p>
      <Button text="Play Again" onClick={onRestart} />
    </div>
  );
}
