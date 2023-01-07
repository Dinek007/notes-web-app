import { ActionCreatorsMapObject, createSlice, EntityState, PayloadAction } from '@reduxjs/toolkit'
import {
  CreateNoteReqDto,
  FolderModel,
  NoteModel,
  UpdateFolderDto,
  UpdateNoteReqDto,
} from "../../swagger/api";
import { StoreKeys } from "../store.keys";
import { noteCategoriesAdapter, notesAdapter } from "./notes.adapter";
import { CategoryData, NoteCategory, NoteData } from "./notes.types";

export type ActionsType<A extends ActionCreatorsMapObject> = {
  [actionName in keyof A]: ReturnType<A[actionName]>;
};

export class notesState {
  public categories: EntityState<NoteCategory> =
    noteCategoriesAdapter.getInitialState();
}

export type SetNotesAndCategoriesPayload = {
  categories: FolderModel[];
  notes: {
    [folderId: string]: NoteModel[];
  };
};

export type updateNotePayload = {
  noteId: string;
  folderId: string;
  noteElements: UpdateNoteReqDto;
};

export type updateFolderPayload = {
  folderId: string;
  folderElements: UpdateFolderDto;
};

export const notesSlice = createSlice({
  initialState: { ...new notesState() },
  name: StoreKeys.Notes,
  reducers: {
    newCategory: (state, _action: PayloadAction<CategoryData>) => state,
    removeCategory: (state, _action: PayloadAction<string>) => state,
    newNote: (state, _action: PayloadAction<string>) => state,
    removeNote: (state, _action: PayloadAction<string>) => state,
    updateNote: (state, action: PayloadAction<updateNotePayload>) => {
      const { folderId, noteId } = action.payload;

      notesAdapter.updateOne(state.categories.entities[folderId].notes, {
        id: noteId,
        changes: action.payload.noteElements,
      });
    },
    updateCategory: (state, _action: PayloadAction<updateFolderPayload>) =>
      state,
    getCategoriesAndNotes: (state, _action) => state,
    setCategoriesWithNotes: (
      state,
      action: PayloadAction<SetNotesAndCategoriesPayload>
    ) => {
      const { categories, notes } = action.payload;
      const categoriesWithNotes: NoteCategory[] = [];

      for (let category of categories) {
        const categoryNotes = notes[category.id] ? notes[category.id] : [];
        categoriesWithNotes.push({
          ...category,
          notes: notesAdapter.setAll({ ids: [], entities: {} }, categoryNotes),
        });
      }
      noteCategoriesAdapter.setAll(state.categories, categoriesWithNotes);
    },
  },
});

export const notesActions = notesSlice.actions
export const notesReducer = notesSlice.reducer

export type notesActions = ActionsType<typeof notesActions>;