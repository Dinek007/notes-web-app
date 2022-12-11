import { createSelector } from '@reduxjs/toolkit'
import { StoreKeys } from '../store.keys'
import { CreatedSelectors, StoreState } from '../store.types'

const networkSlice: CreatedSelectors[StoreKeys.Session] = (
  state: StoreState
) => state[StoreKeys.Session]

const isLoading = createSelector(
  networkSlice,
  (reducerState) => reducerState.isLoading
)

export const sessionSelectors = {
  isLoading
}
