import { ActionCreatorsMapObject, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { LoginReqDTO, SignupReqDTO } from '../../swagger/api'
import { StoreKeys } from '../store.keys'

export type ActionsType<A extends ActionCreatorsMapObject> = {
  [actionName in keyof A]: ReturnType<A[actionName]>;
};

export enum currentCategoryNames {
  home = 'Home',
  settings = 'Settings'
}

export enum currentActionTexts {
  addingFolder = "Adding category",
  addingNote = "Adding note",
  removingFolder = "Removing category",
  removingNote = "Removing note",
  savingNote = "Saving Note",
  editingNote = "Editing note",
  loadingFoldersAndNotes = "Loading categories and notes",
  updateNote = "Updating note",
}

export enum currentActionNames {
  addingFolder = "addingFolder",
  addingNote = "addingNote",
  removingFolder = "removingFolder",
  removingNote = "removingNote",
  savingNote = "savingNote",
  editingNote = "editingNote",
  loadingFoldersAndNotes = "loadingFoldersAndNotes",
  updateNote = "updateNote",
}

export type currentActions = {
  addingFolder: boolean;
  addingNote: boolean;
  removingFolder: boolean;
  removingNote: boolean;
  savingNote: boolean;
  editingNote: boolean;
  loadingFoldersAndNotes: boolean;
  updateNote: boolean;
};

export type settings = {
  mainColor: string;
  noteColor: string;
  noteSize: {
    width: number;
    height: number;
  };
  boardSize: {
    width: number;
    height: number;
  };
  fontSize: number;
};

export class SessionState {
  public loginInfo: boolean = false;
  public currentCategory: { id: string; name: string } = {
    id: "",
    name: currentCategoryNames.home,
  };
  public currentNote: { id: string; name: string } = { id: "", name: "" };
  public currentAction: currentActions = {
    addingFolder: false,
    addingNote: false,
    editingNote: false,
    loadingFoldersAndNotes: false,
    removingFolder: false,
    removingNote: false,
    savingNote: false,
    updateNote: false,
  };

  public authToken: string = "";
  public loading: { login: boolean; foldersAndNotes: boolean } = {
    login: false,
    foldersAndNotes: false,
  };

  public settings;
}

export const sessionSlice = createSlice({
  initialState: { ...new SessionState() },
  name: StoreKeys.Session,
  reducers: {
    setLoginInfo: (state, action: PayloadAction<boolean>) => {
      state.loginInfo = action.payload;
    },
    login: (state, _action: PayloadAction<LoginReqDTO>) => state,
    signUp: (state, _action: PayloadAction<SignupReqDTO>) => state,
    refreshPage: (state, _action) => state,
    setCurrentCategory: (
      state,
      action: PayloadAction<{ id: string; name: string }>
    ) => {
      state.currentCategory = action.payload;
    },
    setCurrentNote: (
      state,
      action: PayloadAction<{ id: string; name: string }>
    ) => {
      state.currentNote = action.payload;
    },
    setCurrentAction: (state, action: PayloadAction<string>) => {
      state.currentAction[action.payload] = true;
    },
    removeCurrentAction: (state, action: PayloadAction<string>) => {
      state.currentAction[action.payload] = false;
    },
    setAuthToken: (state, action: PayloadAction<string>) => {
      state.authToken = action.payload;
    },
    setLoginLoading: (state, action: PayloadAction<boolean>) => {
      state.loading.login = action.payload;
    },
    setFoldersAndNotesLoading: (state, action: PayloadAction<boolean>) => {
      state.loading.foldersAndNotes = action.payload;
    },
  },
});

export const sessionActions = sessionSlice.actions
export const sessionReducer = sessionSlice.reducer

export type SessionActions = ActionsType<typeof sessionActions>;