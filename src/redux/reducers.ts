import { combineReducers } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import { sessionReducer } from './session/session.slice'

import { StoreKeys } from './store.keys'

import { StoreType } from './store.types'

const persistConfig = {
  key: 'root',
  throttle: 1000,
  storage: localStorage,
  whitelist: [
    StoreKeys.Session
  ],
  transforms: []
}

export const reducers = {
  [StoreKeys.Session]: sessionReducer,
}

export type Store = StoreType<typeof reducers>

export default persistReducer(persistConfig, combineReducers(reducers))
