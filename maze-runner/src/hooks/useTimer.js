import { useEffect, useState } from "react";

export const useTimer = (isActive) => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let id;
    if (isActive) id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [isActive]);

  const reset = () => setSeconds(0);
  const formatTime = () =>
    `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(
      seconds % 60
    ).padStart(2, "0")}`;

  return { seconds, formatTime, reset };
};
