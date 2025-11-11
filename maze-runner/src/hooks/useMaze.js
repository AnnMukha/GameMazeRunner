import { useState } from "react";

export function useMaze(size = 5) {
  const [maze] = useState(
    Array.from({ length: size }, () =>
      Array.from({ length: size }, () => 0)
    )
  );
  return { maze, size };
}
