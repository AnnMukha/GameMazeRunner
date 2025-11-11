import Player from "./Player";

export default function MazeGrid() {
  const gridSize = 5; // 5x5 сітка
  const totalCells = gridSize * gridSize;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${gridSize}, 60px)`,
        gridGap: "5px",
        marginTop: "20px",
      }}
    >
      {Array.from({ length: totalCells }).map((_, i) => (
        <div
          key={i}
          style={{
            width: "60px",
            height: "60px",
            backgroundColor: "#333",
            borderRadius: "6px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {i === 0 && <Player />} {/* Герой у першій клітинці */}
        </div>
      ))}
    </div>
  );
}
