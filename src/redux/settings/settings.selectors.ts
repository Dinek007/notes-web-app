import { createSelector } from "@reduxjs/toolkit";
import { StoreKeys } from "../store.keys";
import { CreatedSelectors, StoreState } from "../store.types";

const settingsSlice: CreatedSelectors[StoreKeys.Settings] = (
  state: StoreState
) => state[StoreKeys.Settings];

const theme = createSelector(
  settingsSlice,
  (reducerState) => reducerState.theme
);
const mainColor = createSelector(
  settingsSlice,
  (reducerState) => reducerState.mainColor
);
const noteColor = createSelector(
  settingsSlice,
  (reducerState) => reducerState.noteColor
);
const fontSize = createSelector(
  settingsSlice,
  (reducerState) => reducerState.fontSize
);
const noteSize = createSelector(
  settingsSlice,
  (reducerState) => reducerState.noteSize
);
const boardSize = createSelector(
  settingsSlice,
  (reducerState) => reducerState.boardSize
);

export const settingsSelectors = {
  theme,
  mainColor,
  noteColor,
  fontSize,
  noteSize,
  boardSize,
};
