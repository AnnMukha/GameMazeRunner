import { useEffect, useState } from "react";

export const usePlayer = (maze, onReachGoal, resetKey=0) => {
  const size = maze.length;
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => { setPosition({ x: 0, y: 0 }); }, [resetKey, size]);

  const move = (dx, dy) => {
    setPosition(prev => {
      const nx = Math.min(Math.max(prev.x + dx, 0), size - 1);
      const ny = Math.min(Math.max(prev.y + dy, 0), size - 1);
      if (maze[ny][nx] === 1) return prev; // стіна
      if (nx === size - 1 && ny === size - 1) onReachGoal && onReachGoal();
      return { x: nx, y: ny };
    });
  };

  return {
    position,
    moveUp: () => move(0, -1),
    moveDown: () => move(0, 1),
    moveLeft: () => move(-1, 0),
    moveRight: () => move(1, 0),
  };
};
