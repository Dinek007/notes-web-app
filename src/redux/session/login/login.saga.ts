import { call, put } from 'typed-redux-saga';
import { RouterPaths } from '../../../router/router.paths';
import { UserService } from '../../../swagger/api';
import { navigationActions } from '../../navigation/navigation.slice';
import { SessionActions, sessionActions } from '../session.slice';


export function* loginSaga(
    action: SessionActions['login']
) {
    console.log(action.payload)
    const responseLogin = yield* call(
        UserService.userControllerLogin,
        action.payload
    )

    yield* put(navigationActions.navigate(RouterPaths.SignUp))

    console.log(responseLogin)
}   