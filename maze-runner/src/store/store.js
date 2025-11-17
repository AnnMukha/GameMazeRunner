// src/store/store.js
import { configureStore } from "@reduxjs/toolkit";
import gameSettingsReducer from "./gameSettingsSlice";
import gameStateReducer from "./gameStateSlice";

export const store = configureStore({
  reducer: {
    gameSettings: gameSettingsReducer,
    gameState: gameStateReducer,
  },
});
