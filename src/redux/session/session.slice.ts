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

export enum currentActionNames {
  addingFolder = 'Adding folder',
  addingNote = 'Adding note',
  removingFolder = 'Removing folder',
  removingNote = 'Removing note',
  savingNote = 'Saving Note',
  editingNote = 'Editing note',
  loadingFoldersAndNotes = 'Loading folders and notes',
  updateNote = 'Update note'
}

export class SessionState {
  public currentCategory: { id: string, name: string } = { id: '', name: currentCategoryNames.home }
  public currentNote: { id: string, name: string } = { id: '', name: '' }
  public currentAction: string = 'Editing Note'

  public authToken: string = ''
  public loading: { login: boolean, foldersAndNotes: boolean } = { login: false, foldersAndNotes: false }
}

export const sessionSlice = createSlice({
  initialState: { ...new SessionState() },
  name: StoreKeys.Session,
  reducers: {
    login: (state, _action: PayloadAction<LoginReqDTO>) => state,
    signUp: (state, _action: PayloadAction<SignupReqDTO>) => state,
    setCurrentCategory: (state, action: PayloadAction<{ id: string, name: string }>) => {
      state.currentCategory = action.payload
    },
    setCurrentNote: (state, action: PayloadAction<{ id: string, name: string }>) => {
      state.currentNote = action.payload
    },
    setCurrentAction: (state, action: PayloadAction<string>) => {
      state.currentAction = action.payload
    },
    setAuthToken: (state, action: PayloadAction<string>) => {
      state.authToken = action.payload
    },
    setLoginLoading: (state, action: PayloadAction<boolean>) => {
      state.loading.login = action.payload
    },
    setFoldersAndNotesLoading: (state, action: PayloadAction<boolean>) => {
      state.loading.foldersAndNotes = action.payload
    },
  }
})

export const sessionActions = sessionSlice.actions
export const sessionReducer = sessionSlice.reducer

export type SessionActions = ActionsType<typeof sessionActions>;