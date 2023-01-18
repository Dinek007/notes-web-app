import { apply } from "redux-saga/effects";
import { call, put, select } from "typed-redux-saga";
import { NotificationsService } from "../../../swagger/api";
import { sessionSelectors } from "../../session/session.selectors";
import {
  currentActionNames,
  sessionActions,
} from "../../session/session.slice";
import { notesActions } from "../notes.slice";

export function* removeReminderSaga(action: notesActions["removeReminder"]) {
  yield* put(
    sessionActions.setCurrentAction(currentActionNames.removeReminder)
  );

  try {
    yield* call(
      NotificationsService.notificationsControllerRemove,
      action.payload
    );
  } catch (error) {
    console.error(error);
  }

  yield* put(
    sessionActions.removeCurrentAction(currentActionNames.removeReminder)
  );
}
