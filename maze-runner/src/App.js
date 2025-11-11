import { useState } from "react";
import "./styles/globals.css";
import StartPage from "./pages/StartPage";
import GamePage from "./pages/GamePage";
import ResultPage from "./pages/ResultPage";

export default function App() {
  const [currentPage, setCurrentPage] = useState("start"); // start | game | result

  const handleStart = () => setCurrentPage("game");
  const handleFinish = () => setCurrentPage("result");
  const handleRestart = () => setCurrentPage("start");

  return (
    <>
      {currentPage === "start" && <StartPage onStart={handleStart} />}
      {currentPage === "game" && <GamePage onFinish={handleFinish} />}
      {currentPage === "result" && <ResultPage onRestart={handleRestart} />}
    </>
  );
}
