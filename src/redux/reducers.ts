import { combineReducers } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'
import { navigationReducer } from './navigation/navigation.slice'
import { notesReducer } from './notes/notes.slice'
import { sessionReducer } from './session/session.slice'
import storage from 'redux-persist/lib/storage'

import { StoreKeys } from './store.keys'

import { StoreType } from './store.types'

const persistConfig = {
  key: 'root',
  throttle: 1000,
  storage: storage,
  whitelist: [
    StoreKeys.Session,
    StoreKeys.Navigation,
    StoreKeys.Notes
  ],
  transforms: []
}

export const reducers = {
  [StoreKeys.Session]: sessionReducer,
  [StoreKeys.Navigation]: navigationReducer,
  [StoreKeys.Notes]: notesReducer
}

export type Store = StoreType<typeof reducers>

export default persistReducer(persistConfig, combineReducers(reducers))
