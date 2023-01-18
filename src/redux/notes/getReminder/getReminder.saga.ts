import { call, put } from "typed-redux-saga";
import {
  NotificationDto,
  NotificationModel,
  NotificationsService,
} from "../../../swagger/api";
import {
  currentActionNames,
  sessionActions,
} from "../../session/session.slice";
import cronstrue from "cronstrue";

import { notesActions } from "../notes.slice";

export function* getReminderSaga(action: notesActions["getReminder"]) {
  yield* put(sessionActions.setCurrentAction(currentActionNames.getReminder));
  let reminder: NotificationDto;
  let date = null;

  try {
    reminder = yield* call(
      NotificationsService.notificationsControllerFindOne,
      action.payload
    );
  } catch (error) {
    console.error(error);
  }

  if (reminder?.notification?.type === NotificationModel.type.ONE_TIME) {
    date = cronstrue.toString(reminder.notification.expression);
    console.log("remonder1", date);
  }

  if (reminder?.notification?.type === NotificationModel.type.REOCCURRING) {
    date = cronstrue.toString(reminder.notification.expression);
    console.log("remonder2", date);
  }

  if (!reminder?.notification?.type) {
    yield* put(notesActions.setReminder({ expression: "", id: "" }));
  }

  if (date) {
    const expression = cronstrue.toString(reminder.notification.expression);

    yield* put(
      notesActions.setReminder({
        id: reminder.notification.id,
        expression: expression.substring(0, expression.length - 1),
      })
    );
  }

  yield* put(
    sessionActions.removeCurrentAction(currentActionNames.getReminder)
  );
}
