import { call, put, select } from 'typed-redux-saga';
import { FoldersService, NoteModel, NotesService } from '../../../swagger/api';
import { sessionSelectors } from '../../session/session.selectors';
import { currentCategoryNames, sessionActions } from '../../session/session.slice';
import { notesAdapter } from '../notes.adapter';
import { notesActions, SetNotesAndCategoriesPayload } from '../notes.slice';
import { NoteCategory } from '../notes.types';


export function* getCategories() {
  const responseGetAllCategories = yield* call(
    FoldersService.foldersControllerGetUserFolders
  );

  yield* put(notesActions.setCategoriesWithNotes(responseGetAllCategories));
}   