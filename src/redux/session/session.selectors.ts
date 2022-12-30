import { createSelector } from '@reduxjs/toolkit'
import { StoreKeys } from '../store.keys'
import { CreatedSelectors, StoreState } from '../store.types'

const sessionSlice: CreatedSelectors[StoreKeys.Session] = (
  state: StoreState
) => state[StoreKeys.Session]

const currentCategory = createSelector(
  sessionSlice,
  (reducerState) => reducerState.currentCategory
)

const currentNote = createSelector(
  sessionSlice,
  (reducerState) => reducerState.currentNote
)

const currentAction = createSelector(
  sessionSlice,
  (reducerState) => reducerState.currentAction
)

const loginLoading = createSelector(
  sessionSlice,
  (reducerState) => reducerState.loading.login
)

const foldersAndNotesLoading = createSelector(
  sessionSlice,
  (reducerState) => reducerState.loading.foldersAndNotes
)

const authToken = createSelector(
  sessionSlice,
  (reducerState) => reducerState.authToken
)

export const sessionSelectors = {
  currentCategory,
  currentNote,
  currentAction,
  loginLoading,
  foldersAndNotesLoading,
  authToken
}
