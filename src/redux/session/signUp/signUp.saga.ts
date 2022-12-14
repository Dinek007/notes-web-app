import { call, put } from 'typed-redux-saga';
import { RouterPaths } from '../../../router/router.paths';
import { UserService } from '../../../swagger/api';
import { setToken } from '../../../swagger/swagger.config';
import { navigationActions } from '../../navigation/navigation.slice';
import { SessionActions, sessionActions } from '../session.slice';

export function* signUpSaga(action: SessionActions['signUp']) {
    const responseSignUp = yield* call(
        UserService.userControllerSignUp,
        action.payload
    )

    yield* put(navigationActions.navigate(RouterPaths.Notes))
    yield* put(sessionActions.setAuthToken(responseSignUp.accessToken))

    yield* call(setToken, responseSignUp.accessToken)
}   