import cronstrue from "cronstrue";
import { call, put } from "typed-redux-saga";
import {
  CreateOneTimeNotificationDto,
  CreateReoccurringNotificationDto,
  NotificationModel,
  NotificationsService,
} from "../../../swagger/api";
import {
  currentActionNames,
  sessionActions,
} from "../../session/session.slice";

import { notesActions } from "../notes.slice";

export function* sendReminderSaga(action: notesActions["sendReminder"]) {
  yield* put(sessionActions.setCurrentAction(currentActionNames.setReminder));
  const { date, type, name, noteId } = action.payload;
  let response: NotificationModel;

  if (type === NotificationModel.type.ONE_TIME) {
    const requestDate: CreateOneTimeNotificationDto = {
      name,
      noteId,
      triggerTime: date.triggerTime,
    };

    console.log("try 1", requestDate);
    try {
      response = yield* call(
        NotificationsService.notificationsControllerCreate,
        requestDate
      );
    } catch (error) {
      console.error(error);
    }
  }

  if (type === NotificationModel.type.REOCCURRING) {
    const requestDate: CreateReoccurringNotificationDto = {
      name,
      noteId,
      dayOfWeek: date.dayOfWeek,
      hours: date.hours,
      minutes: date.minutes,
      timezoneOffset: new Date().getTimezoneOffset(),
    };
    console.log("try 2", requestDate);

    try {
      response = yield* call(
        NotificationsService.notificationsControllerCreateReoccurring,
        requestDate
      );
    } catch (error) {
      console.error(error);
    }
  }
  console.log("response", response);

  if (response?.expression) {
    const expression = cronstrue.toString(response.expression);
    yield* put(
      notesActions.setReminder({
        id: response.id,
        expression: expression.substring(0, expression.length - 1),
      })
    );
  }

  yield* put(
    sessionActions.removeCurrentAction(currentActionNames.setReminder)
  );
}
