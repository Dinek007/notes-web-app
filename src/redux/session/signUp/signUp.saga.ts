import { call, put } from 'typed-redux-saga';
import { RouterPaths } from '../../../router/router.paths';
import { UserService } from '../../../swagger/api';
import { setToken } from '../../../swagger/swagger.config';
import { navigationActions } from '../../navigation/navigation.slice';
import { SessionActions, sessionActions } from '../session.slice';

export function* signUpSaga(action: SessionActions['signUp']) {
    let responseSignUp;
    yield * put(sessionActions.resetCurrentActions({}));
    yield * put(sessionActions.setLoginLoading(true));

    try {
      responseSignUp =
        yield * call(UserService.userControllerSignUp, action.payload);
    } catch (error) {
      console.error(error);
      yield * put(sessionActions.logout({}));
      return;
    }

    console.log(responseSignUp);

    yield * put(sessionActions.setLoginInfo(true));
    yield * put(sessionActions.setLoginLoading(false));
    yield* put(navigationActions.navigate(RouterPaths.Notes))
    yield* put(sessionActions.setAuthToken(responseSignUp.accessToken))

    yield* call(setToken, responseSignUp.accessToken)
}   