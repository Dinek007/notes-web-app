import { createSelector } from '@reduxjs/toolkit'
import { StoreKeys } from '../store.keys'
import { CreatedSelectors, StoreState } from '../store.types'
import { noteCategoriesAdapter } from './notes.adapter'
import { sessionSelectors } from '../session/session.selectors'

const notesSlice: CreatedSelectors[StoreKeys.Notes] = (
  state: StoreState
) => state[StoreKeys.Notes]

const noteCategories = createSelector(notesSlice, reducerState =>
  noteCategoriesAdapter
    .getSelectors()
    .selectEntities(reducerState.categories)
)

const currentCategoryNotes = createSelector(
  noteCategories,
  sessionSelectors.currentCategory,
  (base, category) => {
    return base[category.id]
  }
)

const foldersAndNotesCount = createSelector(
  notesSlice,
  (base) => {
    const fodersCount = base.categories.ids.length
    let notesCount: number = 0
    for (let folderId of base.categories.ids) {
      notesCount += base.categories.entities[folderId].notes.ids.length
    }

    return {
      folders: fodersCount,
      notes: notesCount
    }
  }
)

export const notesSelectors = {
  noteCategories,
  currentCategoryNotes,
  foldersAndNotesCount
}
