import { useGameState } from "./hooks/useGameState";
import MenuPage from "./pages/MenuPage";
import GamePage from "./pages/GamePage";
import ResultPage from "./pages/ResultPage";

export default function App() {
  const { screen, exitToMenu, records, resetAll, startGame } = useGameState();

  // 🏠 Меню
  if (screen === "menu") return <MenuPage />;

  // 🏁 Фінальна сторінка
  if (screen === "final") {
    return (
      <ResultPage
        onRestart={startGame}
        onExit={exitToMenu}
        records={records}
        resetAll={resetAll}
      />
    );
  }

  // 🎮 Основна гра
  return <GamePage onExit={exitToMenu} />;
}

