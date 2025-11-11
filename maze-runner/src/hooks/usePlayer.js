import { useState } from "react";

export function usePlayer(size = 5) {
  const [position, setPosition] = useState({ row: 0, col: 0 }); // старт у верхньому лівому кутку

  const moveUp = () => setPosition(p => ({ ...p, row: Math.max(0, p.row - 1) }));
  const moveDown = () => setPosition(p => ({ ...p, row: Math.min(size - 1, p.row + 1) }));
  const moveLeft = () => setPosition(p => ({ ...p, col: Math.max(0, p.col - 1) }));
  const moveRight = () => setPosition(p => ({ ...p, col: Math.min(size - 1, p.col + 1) }));

  return { position, moveUp, moveDown, moveLeft, moveRight };
}
