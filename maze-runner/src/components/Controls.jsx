import Button from "./Button";
import { usePlayer } from "../hooks/usePlayer";

export default function Controls({ maze, seed, onFinish }) {
  const { position, moveUp, moveDown, moveLeft, moveRight } = usePlayer(
    maze,
    onFinish,
    seed
  );

  return (
    <div>
      <Button icon="⬆️" onClick={moveUp} />
      <div style={{ display: "flex", gap: "18px", marginTop: "10px" }}>
        <Button icon="⬅️" onClick={moveLeft} />
        <Button icon="⬇️" onClick={moveDown} />
        <Button icon="➡️" onClick={moveRight} />
      </div>
    </div>
  );
}
