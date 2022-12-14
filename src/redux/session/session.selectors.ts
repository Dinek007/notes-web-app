import { createSelector } from '@reduxjs/toolkit'
import { StoreKeys } from '../store.keys'
import { CreatedSelectors, StoreState } from '../store.types'

const networkSlice: CreatedSelectors[StoreKeys.Session] = (
  state: StoreState
) => state[StoreKeys.Session]

const currentCategory = createSelector(
  networkSlice,
  (reducerState) => reducerState.currentCategory
)

const currentNote = createSelector(
  networkSlice,
  (reducerState) => reducerState.currentNote
)

const currentAction = createSelector(
  networkSlice,
  (reducerState) => reducerState.currentAction
)

const loginLoading = createSelector(
  networkSlice,
  (reducerState) => reducerState.loading.login
)

const foldersAndNotesLoading = createSelector(
  networkSlice,
  (reducerState) => reducerState.loading.foldersAndNotes
)

export const sessionSelectors = {
  currentCategory,
  currentNote,
  currentAction,
  loginLoading,
  foldersAndNotesLoading
}
