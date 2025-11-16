import styles from "../styles/MazeGrid.module.css";

export default function MazeGrid({ maze, playerPosition }) {
  if (!maze || maze.length === 0) return null;

  return (
    <div
      className={styles.maze}
      style={{
        gridTemplateColumns: `repeat(${maze[0].length}, 46px)`,
        gridTemplateRows: `repeat(${maze.length}, 46px)`
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
              className={[
                styles.cell,
                isWall ? styles.wall : "",
                !isWall && !isPlayer && !isFinish ? styles.path : "",
                isPlayer ? styles.player : "",
                isFinish ? styles.finish : ""
              ].join(" ")}
            >
              {isPlayer && <span className={styles.eye} />}
            </div>
          );
        })
      )}
    </div>
  );
}

