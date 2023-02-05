import { apply } from "redux-saga/effects";
import { call, put, select } from "typed-redux-saga";
import { FoldersService, NotesService } from "../../../swagger/api";
import { sessionSelectors } from "../../session/session.selectors";
import {
  currentActionNames,
  currentCategoryNames,
  sessionActions,
} from "../../session/session.slice";
import { getNotes } from "../getCategoriesAndNotes/getNotes.saga";
import { notesActions } from "../notes.slice";

export function* updateCategorySaga(action: notesActions["updateCategory"]) {
  yield* put(sessionActions.setCurrentAction(currentActionNames.updateFolder));

  try {
    yield* call(
      FoldersService.foldersControllerUpdateUserFolder,
      action.payload.folderId,
      action.payload.folderElements
    );
  } catch (error) {
    console.error(error);
  }

  yield* call(getNotes);

  yield* put(
    sessionActions.removeCurrentAction(currentActionNames.updateFolder)
  );
}
