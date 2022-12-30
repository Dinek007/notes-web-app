import { all, takeEvery } from 'typed-redux-saga'
import { loginSaga } from './login/login.saga'
import { refreshPageSaga } from './refreshPage/refresh.saga'
import { sessionActions } from './session.slice'
import { signUpSaga } from './signUp/signUp.saga'

export function* sessionMasterSaga(): Generator {
  yield all([
    takeEvery(
      sessionActions.login.type,
      loginSaga,
    ),
    takeEvery(
      sessionActions.signUp.type,
      signUpSaga,
    ),
    takeEvery(
      sessionActions.refreshPage.type,
      refreshPageSaga,
    ),
  ])
}   