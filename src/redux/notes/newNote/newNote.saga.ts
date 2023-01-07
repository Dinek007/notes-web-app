import { call, put, select } from "typed-redux-saga";
import {
  CreateNoteReqDto,
  FoldersService,
  NotesService,
} from "../../../swagger/api";
import { sessionSelectors } from "../../session/session.selectors";
import {
  currentActionNames,
  sessionActions,
} from "../../session/session.slice";
import { settingsSelectors } from "../../settings/settings.selectors";
import { noteColorsPalette } from "../../settings/settings.slice";
import { getCategoriesAndNotesSaga } from "../getCategoriesAndNotes/getCategoriesAndNotes.saga";
import { notesSelectors } from "../notes.selectors";
import { notesActions } from "../notes.slice";

export function* newNoteSaga(action: notesActions["newNote"]) {
  yield* put(sessionActions.setCurrentAction(currentActionNames.addingNote));

  const biggestIndex = yield* select(notesSelectors.biggestZIndex);
  const currentCategoryData = yield* select(sessionSelectors.currentCategory);
  const defaultColor = yield* select(settingsSelectors.noteColor);
  const newNoteContent = `{"blocks":[{"key":"","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`;

  const note: CreateNoteReqDto = {
    color: defaultColor,
    content: newNoteContent,
    folderId: currentCategoryData.id,
    height: 270,
    name: action.payload,
    width: 200,
    x: 25,
    y: 25,
    zIndex: biggestIndex + 1,
  };

  try {
    yield* call(NotesService.notesControllerCreate, note);
  } catch (error) {
    console.error(error);
  }

  yield* call(getCategoriesAndNotesSaga);
  yield* put(sessionActions.removeCurrentAction(currentActionNames.addingNote));
}
