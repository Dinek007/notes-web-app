import { apply } from 'redux-saga/effects';
import { call, put, select } from 'typed-redux-saga';
import { FoldersService } from '../../../swagger/api';
import { sessionSelectors } from '../../session/session.selectors';
import { currentActionNames, currentCategoryNames, sessionActions } from '../../session/session.slice';
import { getCategories } from "../getCategoriesAndNotes/getCategoriesAndNotes.saga";
import { getNotes } from "../getCategoriesAndNotes/getNotes.saga";
import { notesActions } from "../notes.slice";

export function* newCategorySaga(action: notesActions["newCategory"]) {
  yield* put(sessionActions.setCurrentAction(currentActionNames.addingFolder));

  let responseCreateFolder;
  try {
    responseCreateFolder = yield* call(
      FoldersService.foldersControllerCreate,
      action.payload
    );
  } catch (error) {
    console.error(error);
  }

  yield* call(getCategories);
  yield* put(
    sessionActions.setCurrentCategory({
      id: responseCreateFolder.id,
      name: responseCreateFolder.name,
    })
  );

  yield* put(
    sessionActions.removeCurrentAction(currentActionNames.addingFolder)
  );
} 