import { call, put, select } from 'typed-redux-saga';
import { CreateNoteReqDto, FoldersService, NotesService } from '../../../swagger/api';
import { sessionSelectors } from '../../session/session.selectors';
import { currentActionNames, currentCategoryNames, sessionActions } from '../../session/session.slice';
import { getCategoriesAndNotesSaga } from '../getCategoriesAndNotes/getCategoriesAndNotes.saga';
import { notesActions } from '../notes.slice';


export function* newNoteSaga(_action: notesActions['newNote']) {
    yield* put(sessionActions.setFoldersAndNotesLoading(true))
    yield* put(sessionActions.setCurrentAction(currentActionNames.addingNote))
    const currentCategoryData = yield* select(sessionSelectors.currentCategory)

    const note: CreateNoteReqDto = {
        color: '#FFDF6D',
        content: 'Add content here.',
        folderId: currentCategoryData.id,
        height: 270,
        name: 'New note.',
        width: 200,
        x: 25,
        y: 25,
        zIndex: 100
    }

    const responseCreateNote = yield* call(
        NotesService.notesControllerCreate,
        note
    )

    yield* call(getCategoriesAndNotesSaga)
    yield* put(sessionActions.setFoldersAndNotesLoading(false))
    yield* put(sessionActions.setCurrentAction(''))
}   