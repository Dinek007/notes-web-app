import createSagaMiddleware from 'redux-saga'
import rootSaga from './root.saga'

import reducers from './reducers'
import { configureStore } from '@reduxjs/toolkit'
import { createBrowserHistory } from 'history'
import persistStore from 'redux-persist/es/persistStore'

const sagaMiddleware = createSagaMiddleware({
  onError(err) {
    console.error(err)
  }
})

export const browserHistory = createBrowserHistory();

export default () => {
  const store = configureStore({
    reducer: reducers,
    middleware: [sagaMiddleware]
  })
  sagaMiddleware.run(rootSaga, browserHistory)

  const persistor = persistStore(store)

  return {store, persistor}
}
