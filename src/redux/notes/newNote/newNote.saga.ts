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
  yield * put(sessionActions.setCurrentAction(currentActionNames.addingNote));

  const biggestIndex = yield * select(notesSelectors.biggestZIndex);
  const currentCategoryData = yield * select(sessionSelectors.currentCategory);
  const defaultColor = yield * select(settingsSelectors.noteColor);
  const noteSize = yield * select(settingsSelectors.noteSize);

  const newNoteContent = `{"blocks":[{"key":"","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`;

  const note: CreateNoteReqDto = {
    color: defaultColor,
    content: newNoteContent,
    folderId: currentCategoryData.id,
    name: action.payload,
    width: Number(noteSize.width.split("px")[0]),
    height: Number(noteSize.height.split("px")[0]),
    x: 1000,
    y: 1000,
    zIndex: biggestIndex + 1,
  };

  try {
    yield * call(NotesService.notesControllerCreate, note);
  } catch (error) {
    console.error(error);
  }

  yield * call(getCategoriesAndNotesSaga);
  yield *
    put(sessionActions.removeCurrentAction(currentActionNames.addingNote));
}
