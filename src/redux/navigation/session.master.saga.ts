import { BrowserHistory } from 'history'
import { all, takeEvery } from 'typed-redux-saga'
import { navigationSaga } from './navigation.saga'
import { navigationActions } from './navigation.slice'

export function* navigationMasterSaga(history: BrowserHistory): Generator {
  yield all([
    takeEvery(
      navigationActions.navigate.type,
      navigationSaga,
      history
    )
  ])
}   