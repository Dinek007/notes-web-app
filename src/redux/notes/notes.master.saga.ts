import { all, takeEvery } from 'typed-redux-saga'
import { getReminderSaga } from "./getReminder/getReminder.saga";
import { newCategorySaga } from "./newCategory/newCategory.saga";
import { newNoteSaga } from "./newNote/newNote.saga";
import { notesActions } from "./notes.slice";
import { removeCategorySaga } from "./removeCategory/removeCategory.saga";
import { removeNoteSaga } from "./removeNote/removeNote.saga";
import { removeReminderSaga } from "./removeReminder/removeReminder.saga";
import { sendReminderSaga } from "./sendReminder/sendReminder.saga";
import { updateCategorySaga } from "./updateCategory/updateCategory.saga";
import { updateNoteSaga } from "./updateNote/updateNote.saga";

export function* notesMasterSaga(): Generator {
  yield all([
    takeEvery(notesActions.newCategory.type, newCategorySaga),
    takeEvery(notesActions.newNote.type, newNoteSaga),
    takeEvery(notesActions.getCategoriesAndNotes.type, newCategorySaga),
    takeEvery(notesActions.removeCategory.type, removeCategorySaga),
    takeEvery(notesActions.removeNote.type, removeNoteSaga),
    takeEvery(notesActions.updateNote.type, updateNoteSaga),
    takeEvery(notesActions.updateCategory.type, updateCategorySaga),
    takeEvery(notesActions.sendReminder.type, sendReminderSaga),
    takeEvery(notesActions.getReminder.type, getReminderSaga),
    takeEvery(notesActions.removeReminder.type, removeReminderSaga),
  ]);
}   