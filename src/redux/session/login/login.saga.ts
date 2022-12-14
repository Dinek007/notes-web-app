import { call, put, select } from 'typed-redux-saga';
import { RouterPaths } from '../../../router/router.paths';
import { UserService } from '../../../swagger/api';
import { setToken } from '../../../swagger/swagger.config';
import { navigationActions } from '../../navigation/navigation.slice';
import { getCategoriesAndNotesSaga } from '../../notes/getCategoriesAndNotes/getCategoriesAndNotes.saga';
import { sessionSelectors } from '../session.selectors';
import { currentActionNames, currentCategoryNames, SessionActions, sessionActions } from '../session.slice';

export function* loginSaga(action: SessionActions['login']) {
    const currentCategory = yield* select(sessionSelectors.currentCategory)
    yield* put(sessionActions.setCurrentCategory({
        id: '',
        name: currentCategoryNames.home
    }))
    yield* put(sessionActions.setLoginLoading(true))
    yield* put(sessionActions.setFoldersAndNotesLoading(true))
    yield* put(sessionActions.setCurrentAction(currentActionNames.loadingFoldersAndNotes))

    const responseLogin = yield* call(
        UserService.userControllerLogin,
        action.payload
    )

    yield* put(navigationActions.navigate(RouterPaths.Notes))
    yield* put(sessionActions.setAuthToken(responseLogin.accessToken))

    yield* call(setToken, responseLogin.accessToken)

    yield* call(getCategoriesAndNotesSaga)
    yield* put(sessionActions.setCurrentCategory(currentCategory))
    yield* put(sessionActions.setLoginLoading(false))
    yield* put(sessionActions.setFoldersAndNotesLoading(false))
    yield* put(sessionActions.setCurrentAction(''))

}   