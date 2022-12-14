import { ActionCreatorsMapObject, createSlice, EntityState, PayloadAction } from '@reduxjs/toolkit'
import { CreateNoteReqDto, FolderModel, NoteModel, UpdateNoteReqDto } from '../../swagger/api';
import { StoreKeys } from '../store.keys'
import { noteCategoriesAdapter, notesAdapter } from './notes.adapter';
import { CategoryData, NoteCategory, NoteData } from './notes.types';

export type ActionsType<A extends ActionCreatorsMapObject> = {
  [actionName in keyof A]: ReturnType<A[actionName]>;
};

export class notesState {
  public categories: EntityState<NoteCategory> =
    noteCategoriesAdapter.getInitialState()

}

export type SetNotesAndCategoriesPayload = {
  categories: FolderModel[]
  notes: {
    [folderId: string]: NoteModel[]
  }
}

export type updateNotePayload = {
  id: string,
  noteElements: UpdateNoteReqDto
}

export const notesSlice = createSlice({
  initialState: { ...new notesState() },
  name: StoreKeys.Notes,
  reducers: {
    newCategory: (state, _action: PayloadAction<CategoryData>) => state,
    removeCategory: (state, _action: PayloadAction<string>) => state,

    newNote: (state, _action) => state,
    removeNote: (state, _action: PayloadAction<string>) => state,
    updateNote: (state, _action: PayloadAction<updateNotePayload>) => state,

    getCategoriesAndNotes: (state, _action) => state,

    // ustawic na meny i odbieranie notatek
    setCategoriesWithNotes: (state, action: PayloadAction<SetNotesAndCategoriesPayload>) => {
      const { categories, notes } = action.payload
      console.log('aaaaaaaa', notes)
      const categoriesWithNotes: NoteCategory[] = []

      for (let category of categories) {
        console.log('czy jest folder', notes[category.id])
        const categoryNotes = notes[category.id] ? notes[category.id] : []
        categoriesWithNotes.push({
          ...category,
          notes: notesAdapter.setAll({ ids: [], entities: {} }, categoryNotes)
        })
      }
      console.log('categoriesWithNotes', categoriesWithNotes)
      noteCategoriesAdapter.setAll(state.categories, categoriesWithNotes)
    },

  }
})

export const notesActions = notesSlice.actions
export const notesReducer = notesSlice.reducer

export type notesActions = ActionsType<typeof notesActions>;