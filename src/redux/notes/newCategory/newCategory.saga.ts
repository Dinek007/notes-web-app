import { apply } from 'redux-saga/effects';
import { call, put, select } from 'typed-redux-saga';
import { FoldersService } from '../../../swagger/api';
import { sessionSelectors } from '../../session/session.selectors';
import { currentActionNames, currentCategoryNames, sessionActions } from '../../session/session.slice';
import { getCategoriesAndNotesSaga } from '../getCategoriesAndNotes/getCategoriesAndNotes.saga';
import { notesActions } from '../notes.slice';


export function* newCategorySaga(action: notesActions['newCategory']) {
    yield* put(sessionActions.setFoldersAndNotesLoading(true))
    yield* put(sessionActions.setCurrentCategory({
        id: '',
        name: currentCategoryNames.home
    }))
    yield* put(sessionActions.setCurrentAction(currentActionNames.addingFolder))

    const responseCreateFolder = yield* call(
        FoldersService.foldersControllerCreate,
        action.payload
    )

    yield* call(getCategoriesAndNotesSaga)
    yield* put(sessionActions.setCurrentCategory({
        id: responseCreateFolder.id,
        name: responseCreateFolder.name
    }))
    yield* put(sessionActions.setFoldersAndNotesLoading(false))

    yield* put(sessionActions.setCurrentAction(''))
} 