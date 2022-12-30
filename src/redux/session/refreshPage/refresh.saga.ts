import { call, put, select } from 'typed-redux-saga';
import { setToken } from '../../../swagger/swagger.config';
import { getCategoriesAndNotesSaga } from '../../notes/getCategoriesAndNotes/getCategoriesAndNotes.saga';
import { sessionSelectors } from '../session.selectors';
import { currentActionNames, sessionActions, SessionActions } from '../session.slice';

export function* refreshPageSaga(_action: SessionActions['refreshPage']) {
    const token = yield* select(sessionSelectors.authToken)

    yield* call(setToken, token)

    yield* put(sessionActions.setFoldersAndNotesLoading(true))
    yield* put(sessionActions.setCurrentAction(currentActionNames.loadingFoldersAndNotes))

    yield* call(getCategoriesAndNotesSaga)
    yield* put(sessionActions.setFoldersAndNotesLoading(false))
    yield* put(sessionActions.setCurrentAction(''))
}   