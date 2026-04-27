// src/store/gameSettingsSlice.js
import { createSlice } from "@reduxjs/toolkit";
import {
  clearOptionalStats,
  hasPreferencesConsent,
} from "../utils/consent";

const loadSettings = () => {
  if (!hasPreferencesConsent()) return null;

  try {
    const raw = localStorage.getItem("mazeSettings");
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
};

const loadStats = () => {
  if (!hasPreferencesConsent()) return [];

  try {
    const raw = localStorage.getItem("mazeStats");
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
};

const initialSettings =
  loadSettings() || {
    mode: "adventure", // adventure | custom
    difficulty: "easy",
    timerMode: "none", // none | limit
    timeLimit: 60,
  };

const initialStats = loadStats();

const gameSettingsSlice = createSlice({
  name: "gameSettings",
  initialState: {
    settings: initialSettings,
    stats: initialStats,
  },
  reducers: {
    updateSettings(state, action) {
      state.settings = {
        ...state.settings,
        ...action.payload,
      };

      if (hasPreferencesConsent()) {
        localStorage.setItem("mazeSettings", JSON.stringify(state.settings));
      }
    },
    addResult(state, action) {
      const { difficulty, time } = action.payload;
      const newEntry = {
        difficulty,
        time,
        date: new Date().toISOString(),
      };
      state.stats.push(newEntry);

      if (hasPreferencesConsent()) {
        localStorage.setItem("mazeStats", JSON.stringify(state.stats));
      }
    },
    clearStats(state) {
      state.stats = [];
      clearOptionalStats();
    },
  },
});

export const { updateSettings, addResult, clearStats } =
  gameSettingsSlice.actions;

export const selectSettings = (state) => state.gameSettings.settings;
export const selectStats = (state) => state.gameSettings.stats;

export default gameSettingsSlice.reducer;
