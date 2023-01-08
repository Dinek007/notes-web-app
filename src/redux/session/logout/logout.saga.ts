import { call, put, select } from "typed-redux-saga";
import { RouterPaths } from "../../../router/router.paths";
import { navigationActions } from "../../navigation/navigation.slice";
import { notesActions } from "../../notes/notes.slice";
import { sessionActions } from "../session.slice";

export function* logOutSaga() {
  yield* put(navigationActions.navigate(RouterPaths.Login));
  yield* put(sessionActions.resetSessionState({}));
  yield* put(notesActions.resetNotesState({}));
}
