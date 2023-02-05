import { ActionCreatorsMapObject, createSlice, EntityState, PayloadAction } from '@reduxjs/toolkit'
import {
  CreateNoteReqDto,
  CreateReoccurringNotificationDto,
  FolderModel,
  GetAllUserFoldersResDTO,
  GetFolderNotesResDTO,
  NoteModel,
  NotificationDto,
  NotificationModel,
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

  public reminder: NotificationModel;
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

export type sendReminderPayload = {
  name: string;
  noteId: string;
  type: NotificationModel.type;
  date: {
    triggerTime?: string;
    dayOfWeek?: CreateReoccurringNotificationDto.dayOfWeek;
    hours?: number;
    minutes?: number;
    timezoneOffset?: number;
  };
};

export const notesSlice = createSlice({
  initialState: { ...new notesState() },
  name: StoreKeys.Notes,
  reducers: {
    sendReminder: (state, _action: PayloadAction<sendReminderPayload>) => state,
    setReminder: (state, action: PayloadAction<NotificationModel>) => {
      state.reminder = action.payload;
    },
    getReminder: (state, _action: PayloadAction<string>) => state,
    removeReminder: (state, _action: PayloadAction<string>) => {
      state.reminder = undefined;
    },
    resetNotesState: (state, _action) => {
      state.categories = noteCategoriesAdapter.getInitialState();
    },
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
    setCategoriesWithNotes: (
      state,
      action: PayloadAction<GetAllUserFoldersResDTO>
    ) => {
      const folders = action.payload?.folders.map((folder) => {
        const notes: EntityState<NoteModel> = { entities: {}, ids: [] };
        return { ...folder, notes };
      });

      noteCategoriesAdapter.setAll(state.categories, folders);
    },
    getNotes: (state, _action: PayloadAction<string>) => state,
    setNotes: (
      state,
      action: PayloadAction<{ notes: GetFolderNotesResDTO; folderId: string }>
    ) => {
      const { notes, folderId } = action.payload;

      noteCategoriesAdapter.updateOne(state.categories, {
        id: folderId,
        changes: {
          notes: notesAdapter.setAll({ ids: [], entities: {} }, notes.notes),
        },
      });
    },
  },
});

export const notesActions = notesSlice.actions
export const notesReducer = notesSlice.reducer

export type notesActions = ActionsType<typeof notesActions>;