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
  yield* put(sessionActions.setCurrentAction(currentActionNames.updateNote));

  try {
    yield* call(
      NotesService.notesControllerUpdate,
      action.payload.noteId,
      action.payload.noteElements
    );
  } catch (error) {
    console.error(error);
  }

  yield* put(sessionActions.removeCurrentAction(currentActionNames.updateNote));
}
