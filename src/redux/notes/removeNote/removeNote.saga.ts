import { apply } from 'redux-saga/effects';
import { call, put, select } from 'typed-redux-saga';
import { FoldersService, NotesService } from '../../../swagger/api';
import { sessionSelectors } from '../../session/session.selectors';
import { currentActionNames, currentCategoryNames, sessionActions } from '../../session/session.slice';
import { getCategoriesAndNotesSaga } from '../getCategoriesAndNotes/getCategoriesAndNotes.saga';
import { notesActions } from '../notes.slice';


export function* removeNoteSaga(action: notesActions["removeNote"]) {
  yield* put(sessionActions.setCurrentAction(currentActionNames.removingNote));

  try {
    yield* call(NotesService.notesControllerRemove, action.payload);
  } catch (error) {
    console.error(error);
  }

  yield* call(getCategoriesAndNotesSaga);

  yield* put(
    sessionActions.removeCurrentAction(currentActionNames.removingNote)
  );
} 