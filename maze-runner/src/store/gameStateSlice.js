// src/store/gameStateSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  screen: "menu",
  level: 1,
  difficulty: "easy",
  records: [], // { level, difficulty, time }
};

const gameStateSlice = createSlice({
  name: "gameState",
  initialState,
  reducers: {
    startGame(state) {
      state.level = 1;
      state.difficulty = "easy";
      state.records = [];
      state.screen = "game";
    },
    nextLevel(state) {
      const newLevel = state.level + 1;
      let newDifficulty = state.difficulty;

      // як було раніше: кожен непарний рівень — підвищення складності
      if (newLevel % 2 === 1) {
        if (newDifficulty === "easy") newDifficulty = "medium";
        else if (newDifficulty === "medium") newDifficulty = "hard";
      }

      state.level = newLevel;
      state.difficulty = newDifficulty;

      if (newLevel > 6) {
        state.screen = "final";
      }
    },
    completeLevel(state, action) {
      const { difficulty, time } = action.payload;

      // не дублюємо той самий рівень
      const exists = state.records.some((r) => r.level === state.level);
      if (exists) return;

      state.records.push({
        level: state.level,
        difficulty,
        time,
      });
    },
    resetAll(state) {
      state.level = 1;
      state.difficulty = "easy";
      state.records = [];
      state.screen = "menu";
    },
    goToFinalResults(state) {
      state.screen = "final";
    },
  },
});

export const {
    startGame,
    nextLevel,
    completeLevel,
    resetAll,
    goToFinalResults,
} = gameStateSlice.actions;

export const selectGameState = (state) => state.gameState;

export default gameStateSlice.reducer;
