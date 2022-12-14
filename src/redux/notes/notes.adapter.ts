import { createEntityAdapter } from '@reduxjs/toolkit'
import { NoteModel } from '../../swagger/api'
import { Note, NoteCategory } from './notes.types'

export const noteCategoriesAdapter = createEntityAdapter<NoteCategory>({
  selectId: base => base.id
})

export const notesAdapter = createEntityAdapter<NoteModel>()
