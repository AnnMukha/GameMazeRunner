import { useMemo } from "react";

function mulberry32(a) {
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;

    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;

    return (((t ^ (t >>> 14)) >>> 0) / 4294967296);
  };
}


function pathExists(maze) {
  const n = maze.length;
  const q = [[0, 0]];
  const seen = Array.from({ length: n }, () => Array(n).fill(false));
  seen[0][0] = true;
  const dirs = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];
  while (q.length) {
    const [x, y] = q.shift();
    if (x === n - 1 && y === n - 1) return true;
    for (const [dx, dy] of dirs) {
      const nx = x + dx,
        ny = y + dy;
      if (
        nx >= 0 &&
        ny >= 0 &&
        nx < n &&
        ny < n &&
        !seen[ny][nx] &&
        maze[ny][nx] === 0
      ) {
        seen[ny][nx] = true;
        q.push([nx, ny]);
      }
    }
  }
  return false;
}

function generateMaze(size, difficulty, seed) {
  const random = mulberry32(seed); // 🔥 використовуємо seed

  const maze = Array.from({ length: size }, () => Array(size).fill(1));
  const inB = (x, y) => x >= 0 && y >= 0 && x < size && y < size;
  const dirs = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];

  const shuffle = (a) =>
    a.sort(() => random() - 0.5); // 🔥 seed впливає на порядок

  const carve = (x, y) => {
    maze[y][x] = 0;
    for (const [dx, dy] of shuffle(dirs)) {
      const nx = x + dx * 2,
        ny = y + dy * 2;
      if (inB(nx, ny) && maze[ny][nx] === 1) {
        maze[y + dy][x + dx] = 0;
        carve(nx, ny);
      }
    }
  };

  carve(0, 0);
  maze[size - 1][size - 1] = 0;

  const wallFactor =
    difficulty === "easy"
      ? 0.06
      : difficulty === "medium"
      ? 0.12
      : 0.2;

  for (let y = 0; y < size; y++)
    for (let x = 0; x < size; x++) {
      if (maze[y][x] === 0 && random() < wallFactor) {
        maze[y][x] = 1; // 🔥 seed впливає на стіни
      }
    }

  if (!pathExists(maze)) return generateMaze(size, difficulty, seed + 1);
  return maze;
}

export const useMaze = (size, difficulty, seed) => {
  const maze = useMemo(
    () => generateMaze(size, difficulty, seed),
    [size, difficulty, seed]
  );

  return { maze };
};

