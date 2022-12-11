import { ActionCreatorsMapObject, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { LoginReqDTO } from '../../swagger/api'
import { StoreKeys } from '../store.keys'

export type ActionsType<A extends ActionCreatorsMapObject> = {
  [actionName in keyof A]: ReturnType<A[actionName]>;
};

export class SessionState {
  public isLoading: string = 'no ta'
}

export const sessionSlice = createSlice({
  initialState: { ...new SessionState() },
  name: StoreKeys.Session,
  reducers: {
    login: (state, _action: PayloadAction<LoginReqDTO>) => state,
  }
})

export const sessionActions = sessionSlice.actions
export const sessionReducer = sessionSlice.reducer

export type SessionActions = ActionsType<typeof sessionActions>;