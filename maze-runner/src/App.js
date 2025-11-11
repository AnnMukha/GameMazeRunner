import React, { useState } from "react";
import StartPage from "./pages/StartPage";
import GamePage from "./pages/GamePage";
import ResultPage from "./pages/ResultPage";
import "./styles/globals.css";

export default function App() {
  const [stage, setStage] = useState("start");

  const handleStart = () => setStage("game");
  const handleFinish = () => setStage("result");
  const handleRestart = () => setStage("start");

  return (
    <>
      {stage === "start" && <StartPage onStart={handleStart} />}
      {stage === "game" && <GamePage onFinish={handleFinish} />}
      {stage === "result" && <ResultPage onRestart={handleRestart} />}
    </>
  );
}
