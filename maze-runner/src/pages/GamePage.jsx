import Header from "../components/Header";
import MazeGrid from "../components/MazeGrid";
import Button from "../components/Button";
import { useMaze } from "../hooks/useMaze";
import { usePlayer } from "../hooks/usePlayer";
import { useGameState } from "../hooks/useGameState";

export default function GamePage({ onFinish }) {
  const { level } = useGameState();
  const { maze } = useMaze(5);
  const { position, moveUp, moveDown, moveLeft, moveRight } = usePlayer(5);

  return (
    <div className="container">
      <Header title={`Maze Runner — Level ${level}`} />
      <MazeGrid maze={maze} playerPosition={position} />

      <div className="controls">
        <Button text="⬆️ Up" onClick={moveUp} />
        <div style={{ display: "flex", justifyContent: "center", gap: "10px", margin: "10px 0" }}>
          <Button text="⬅️ Left" onClick={moveLeft} />
          <Button text="➡️ Right" onClick={moveRight} />
        </div>
        <Button text="⬇️ Down" onClick={moveDown} />
      </div>

      <Button text="Finish Game" onClick={onFinish} />
    </div>
  );
}
