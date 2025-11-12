export default function MazeGrid({ maze, playerPosition }) {
  if (!maze || maze.length === 0) return null;

  return (
    <div
      className="maze"
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${maze[0].length}, 50px)`,
        gridTemplateRows: `repeat(${maze.length}, 50px)`,
        justifyContent: "center",
        margin: "20px auto",
        gap: "5px",
      }}
    >
      {maze.map((row, rowIndex) =>
        row.map((cell, colIndex) => {
          const isPlayer =
            rowIndex === playerPosition.y && colIndex === playerPosition.x;
          const isFinish =
            rowIndex === maze.length - 1 && colIndex === row.length - 1;
          const isWall = cell === 1;

          return (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`cell ${isWall ? "wall" : ""} ${isPlayer ? "player" : ""} ${isFinish ? "finish" : ""}`}
            />
          );
        })
      )}
    </div>
  );
}
