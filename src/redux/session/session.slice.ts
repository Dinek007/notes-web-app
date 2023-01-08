import { ActionCreatorsMapObject, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { LoginReqDTO, SignupReqDTO } from '../../swagger/api'
import { StoreKeys } from '../store.keys'

export type ActionsType<A extends ActionCreatorsMapObject> = {
  [actionName in keyof A]: ReturnType<A[actionName]>;
};

export enum currentCategoryNames {
  home = "Home",
  settings = "Settings",
  changeLog = "Change logs",
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
  updateFolder = "Updating folder",
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
  updateFolder = "updateFolder",
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
  updateFolder: boolean;
};

export const defaultActions: currentActions = {
  addingFolder: false,
  addingNote: false,
  editingNote: false,
  loadingFoldersAndNotes: false,
  removingFolder: false,
  removingNote: false,
  savingNote: false,
  updateNote: false,
  updateFolder: false,
};

export class SessionState {
  public loginInfo: boolean = false;
  public currentCategory: { id: string; name: string } = {
    id: "",
    name: currentCategoryNames.home,
  };
  public currentNote: { id: string; name: string } = { id: "", name: "" };
  public currentAction: currentActions = defaultActions;

  public authToken: string = "";
  public loading: { login: boolean; foldersAndNotes: boolean } = {
    login: false,
    foldersAndNotes: false,
  };
}

export const sessionSlice = createSlice({
  initialState: { ...new SessionState() },
  name: StoreKeys.Session,
  reducers: {
    resetSessionState: (state, _action) => {
      state.loginInfo = false;
      state.currentCategory = {
        id: "",
        name: currentCategoryNames.home,
      };
      state.currentNote = { id: "", name: "" };
      state.currentAction = defaultActions;
      state.authToken = "";
      state.loading = {
        login: false,
        foldersAndNotes: false,
      };
    },
    setLoginInfo: (state, action: PayloadAction<boolean>) => {
      state.loginInfo = action.payload;
    },
    logout: (state, _action) => {
      state.loginInfo = false;
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
    resetCurrentActions: (state, _action) => {
      state.currentAction = defaultActions;
    },
  },
});

export const sessionActions = sessionSlice.actions
export const sessionReducer = sessionSlice.reducer

export type SessionActions = ActionsType<typeof sessionActions>;