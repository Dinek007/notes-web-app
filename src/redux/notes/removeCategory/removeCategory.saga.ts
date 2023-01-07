import { apply } from 'redux-saga/effects';
import { call, put, select } from 'typed-redux-saga';
import { FoldersService } from '../../../swagger/api';
import { sessionSelectors } from '../../session/session.selectors';
import { currentActionNames, currentCategoryNames, sessionActions } from '../../session/session.slice';
import { getCategoriesAndNotesSaga } from '../getCategoriesAndNotes/getCategoriesAndNotes.saga';
import { notesActions } from '../notes.slice';


export function* removeCategorySaga(action: notesActions["removeCategory"]) {
  yield* put(
    sessionActions.setCurrentAction(currentActionNames.removingFolder)
  );

  try {
    yield* call(
      FoldersService.foldersControllerRemoveUserFolder,
      action.payload
    );
  } catch (error) {
    console.error(error);
  }

  yield* call(getCategoriesAndNotesSaga);

  yield* put(
    sessionActions.removeCurrentAction(currentActionNames.removingFolder)
  );
  yield* put(
    sessionActions.setCurrentCategory({
      id: "",
      name: currentCategoryNames.home,
    })
  );
} 