import Header from "../components/Header";
import MazeGrid from "../components/MazeGrid";
import Button from "../components/Button";

export default function GamePage({ onFinish }) {
  return (
    <div className="container">
      <Header title="Maze Runner — Level 1" />
      <MazeGrid />
      <Button text="Finish Game" onClick={onFinish} />
    </div>
  );
}
