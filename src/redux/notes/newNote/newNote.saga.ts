import { call, put, select } from 'typed-redux-saga';
import { noteColorsPalette } from "../../../components/changeNoteColor.component";
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
import { getCategoriesAndNotesSaga } from "../getCategoriesAndNotes/getCategoriesAndNotes.saga";
import { notesSelectors } from "../notes.selectors";
import { notesActions } from "../notes.slice";

export function* newNoteSaga(action: notesActions["newNote"]) {
  yield* put(sessionActions.setCurrentAction(currentActionNames.addingNote));
  const biggestIndex = yield* select(notesSelectors.biggestZIndex);
  const currentCategoryData = yield* select(sessionSelectors.currentCategory);
  const newNoteContent = `{"blocks":[{"key":"","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`;
  const note: CreateNoteReqDto = {
    color: noteColorsPalette.yellow,
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