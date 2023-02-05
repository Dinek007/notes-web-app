import { apply } from 'redux-saga/effects';
import { call, put, select } from 'typed-redux-saga';
import {
  FoldersService,
  NotesService,
  ResetService,
} from "../../../swagger/api";
import { sessionSelectors } from "../../session/session.selectors";
import {
  currentActionNames,
  currentCategoryNames,
  sessionActions,
} from "../../session/session.slice";
import { getNotes } from "../getCategoriesAndNotes/getNotes.saga";
import { notesActions } from "../notes.slice";

export function* removeNoteSaga(action: notesActions["removeNote"]) {
  yield* put(sessionActions.setCurrentAction(currentActionNames.removingNote));

  try {
    yield* call(ResetService.resetControllerRemoveNote, action.payload);
  } catch (error) {
    console.error(error);
  }

  yield* call(getNotes);

  yield* put(
    sessionActions.removeCurrentAction(currentActionNames.removingNote)
  );
} 