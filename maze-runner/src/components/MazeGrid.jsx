import Player from "./Player";

export default function MazeGrid({ maze, playerPosition }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${maze.length}, 60px)`,
        gap: "5px",
        marginTop: "20px",
      }}
    >
      {maze.map((row, rowIndex) =>
        row.map((_, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
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
            {playerPosition.row === rowIndex && playerPosition.col === colIndex && <Player />}
          </div>
        ))
      )}
    </div>
  );
}
