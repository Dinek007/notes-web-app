import { apply } from "redux-saga/effects";
import { call, put, select } from "typed-redux-saga";
import { FoldersService, NotesService } from "../../../swagger/api";
import { sessionSelectors } from "../../session/session.selectors";
import {
  currentActionNames,
  currentCategoryNames,
  sessionActions,
} from "../../session/session.slice";
import { getCategoriesAndNotesSaga } from "../getCategoriesAndNotes/getCategoriesAndNotes.saga";
import { notesActions } from "../notes.slice";

export function* updateNoteSaga(action: notesActions["updateNote"]) {
  //yield* put(sessionActions.setFoldersAndNotesLoading(true))
  yield* put(sessionActions.setCurrentAction(currentActionNames.updateNote));

  const responseCreateFolder = yield* call(
    NotesService.notesControllerUpdate,
    action.payload.noteId,
    action.payload.noteElements
  );

  // yield* call(getCategoriesAndNotesSaga)
  // yield* put(sessionActions.setFoldersAndNotesLoading(false))
  yield* put(sessionActions.setCurrentAction(""));
}
