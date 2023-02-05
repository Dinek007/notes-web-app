import { call, put, select } from "typed-redux-saga";
import {
  FoldersService,
  GetFolderNotesResDTO,
  NoteModel,
  NotesService,
} from "../../../swagger/api";
import { sessionSelectors } from "../../session/session.selectors";
import {
  currentCategoryNames,
  sessionActions,
} from "../../session/session.slice";
import { notesAdapter } from "../notes.adapter";
import { notesSelectors } from "../notes.selectors";
import { notesActions, SetNotesAndCategoriesPayload } from "../notes.slice";
import { NoteCategory } from "../notes.types";

export function* getNotes() {
  const currentCategory = yield* select(sessionSelectors.currentCategory);
  const currentNotes = yield* select(notesSelectors.currentCategoryNotes);

  if (!currentCategory.id) return;

  if (
    currentNotes?.notes?.entities &&
    !Object.keys(currentNotes?.notes?.entities).length
  ) {
    yield * put(sessionActions.setFoldersAndNotesLoading(true));
  }

  try {
    const responseGetAllNotes = yield* call(
      NotesService.notesControllerFindAll,
      currentCategory.id
    );

    yield* put(
      notesActions.setNotes({
        notes: responseGetAllNotes,
        folderId: currentCategory.id,
      })
    );
  } catch (error) {
    console.error(error);
  }

  yield* put(sessionActions.setFoldersAndNotesLoading(false));
}
