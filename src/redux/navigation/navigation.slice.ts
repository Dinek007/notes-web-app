import { ActionCreatorsMapObject, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RouterPaths } from '../../router/router.paths';
import { LoginReqDTO } from '../../swagger/api'
import { StoreKeys } from '../store.keys'

export type ActionsType<A extends ActionCreatorsMapObject> = {
  [actionName in keyof A]: ReturnType<A[actionName]>;
};

export class NavigationState {
  public isLoading: string = 'no ta'
}

export const navigationSlice = createSlice({
  initialState: { ...new NavigationState() },
  name: StoreKeys.Navigation,
  reducers: {
    navigate: (state, _action: PayloadAction<RouterPaths>) => state,
  }
})

export const navigationActions = navigationSlice.actions
export const navigationReducer = navigationSlice.reducer

export type NavigationActions = ActionsType<typeof navigationActions>;