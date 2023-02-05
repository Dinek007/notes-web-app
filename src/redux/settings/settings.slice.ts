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
  blue = "#14548F",
  yellow = "#F9F871",
  violet = "#7564AE",
  pink = "#E978B8",
  brown = "#883C12",
  green = "#00645F",
  gray = "#887456",
  lightGreen = "#00c7A0",
}

export enum fontSizes {
  verySmall = "8px",
  small = "10px",
  medium = "12px",
  big = "14px",
  veryBig = "16px",
}

export const noteSizes = {
  small: {
    width: "200",
    height: "270",
  },
  medium: {
    width: "250",
    height: "350",
  },
  big: {
    width: "350",
    height: "470",
  },
};

export const boardSizes = {
  fhd: {
    width: "",
    height: "",
  },
  k2: {
    width: "",
    height: "",
  },
  k4: {
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
  boardSizes: boardSizes.fhd,
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
