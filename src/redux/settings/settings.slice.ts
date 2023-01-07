import {
  ActionCreatorsMapObject,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { RouterPaths } from "../../router/router.paths";
import { StoreKeys } from "../store.keys";

export type ActionsType<A extends ActionCreatorsMapObject> = {
  [actionName in keyof A]: ReturnType<A[actionName]>;
};

export type size = { width: string; height: string };

export enum themeNames {
  dark = "dark",
  light = "light",
}

export enum noteColorsPalette {
  red = "#E74C3C",
  orange = "#F39C12",
  pink = "#ff96c5",
  yellow = "#ffdf6d",
  green = "#cff800",
  lightGreen = "#82E0AA",
  violet = "#A569BD",
  lightViolet = "#D2B4DE",
  blue = "#14548F",
  lightBlue = "#5DADE2",
  gray = "#85929E",
  lightGray = "#CCD1D1",
}

export enum fontSizes {
  verySmall = "8px",
  small = "10px",
  medium = "12px",
  big = "14px",
  veryBig = "16px",
}

export const noteSizes = {
  medium: {
    width: "",
    height: "",
  },
};

export const boardSizes = {
  medium: {
    width: "",
    height: "",
  },
};

export const defaultSettings = {
  theme: themeNames.dark,
  mainColor: noteColorsPalette.blue,
  noteColor: noteColorsPalette.yellow,
  fontSize: fontSizes.small,
  noteSize: noteSizes.medium,
  boardSizes: boardSizes.medium,
};

export class SettingsState {
  public theme: string = defaultSettings.theme;
  public mainColor: string = defaultSettings.mainColor;
  public noteColor: string = defaultSettings.noteColor;
  public fontSize: string = defaultSettings.fontSize;
  public noteSize: size = defaultSettings.noteSize;
  public boardSize: size = defaultSettings.boardSizes;
}

export const settingsSlice = createSlice({
  initialState: { ...new SettingsState() },
  name: StoreKeys.Settings,
  reducers: {
    setTheme: (state, action: PayloadAction<string>) => {
      state.theme = action.payload;
    },
    setMainColor: (state, action: PayloadAction<string>) => {
      state.mainColor = action.payload;
    },
    setNoteColor: (state, action: PayloadAction<string>) => {
      state.noteColor = action.payload;
    },
    setFontSize: (state, action: PayloadAction<string>) => {
      state.fontSize = action.payload;
    },
    setNoteSize: (state, action: PayloadAction<size>) => {
      state.noteSize = action.payload;
    },
    setBoardSize: (state, action: PayloadAction<size>) => {
      state.boardSize = action.payload;
    },
  },
});

export const settingsActions = settingsSlice.actions;
export const settingsReducer = settingsSlice.reducer;

export type SettingsActions = ActionsType<typeof settingsActions>;