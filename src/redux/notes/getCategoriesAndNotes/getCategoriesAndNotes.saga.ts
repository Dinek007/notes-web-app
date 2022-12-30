import { call, put, select } from 'typed-redux-saga';
import { FoldersService, NoteModel, NotesService } from '../../../swagger/api';
import { sessionSelectors } from '../../session/session.selectors';
import { currentCategoryNames, sessionActions } from '../../session/session.slice';
import { notesAdapter } from '../notes.adapter';
import { notesActions, SetNotesAndCategoriesPayload } from '../notes.slice';
import { NoteCategory } from '../notes.types';


export function* getCategoriesAndNotesSaga() {
    let notes: { [folderId: string]: NoteModel[] } = {}

    const responseGetAllCategories = yield* call(
        FoldersService.foldersControllerGetUserFolders)

    for (let folder of responseGetAllCategories.folders) {
        const responseGetAllNotes = yield* call(
            NotesService.notesControllerFindAll,
            folder.id
        )
        notes[folder.id] = responseGetAllNotes.notes
    }

    yield* put(notesActions.setCategoriesWithNotes({
        categories: responseGetAllCategories.folders,
        notes: notes
    }))
}   