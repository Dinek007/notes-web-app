import { call, put, select } from 'typed-redux-saga';
import { RouterPaths } from "../../../router/router.paths";
import { setToken } from "../../../swagger/swagger.config";
import { navigationActions } from "../../navigation/navigation.slice";
import { getCategories } from "../../notes/getCategoriesAndNotes/getCategoriesAndNotes.saga";
import { getNotes } from "../../notes/getCategoriesAndNotes/getNotes.saga";
import { notesActions } from "../../notes/notes.slice";
import { sessionSelectors } from "../session.selectors";
import {
  currentActionNames,
  sessionActions,
  SessionActions,
} from "../session.slice";

export function* refreshPageSaga(_action: SessionActions["refreshPage"]) {
  const loginInfo = yield* select(sessionSelectors.loginInfo);
  yield* put(sessionActions.resetCurrentActions({}));
  yield * put(sessionActions.setLoginError(""));

  if (!loginInfo) {
    yield* put(sessionActions.logout({}));
    return;
  }

  const token = yield* select(sessionSelectors.authToken);

  yield* call(setToken, token);
  yield* put(sessionActions.setFoldersAndNotesLoading(true));
  yield* put(
    sessionActions.setCurrentAction(currentActionNames.loadingFoldersAndNotes)
  );

  yield * call(getCategories);
  yield* call(getNotes);

  yield* put(sessionActions.setFoldersAndNotesLoading(false));
  yield* put(
    sessionActions.removeCurrentAction(
      currentActionNames.loadingFoldersAndNotes
    )
  );
}   