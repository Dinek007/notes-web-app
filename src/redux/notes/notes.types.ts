import { EntityState } from "@reduxjs/toolkit"
import { NoteModel } from "../../swagger/api"

export interface NoteCategory {
    name: string
    description: string
    id: string
    notes: EntityState<NoteModel>
}

export interface Note {
    id: string
    title: string
    body: string
}

export interface CategoryData {
    name: string
    description: string
}

export interface NoteData {
    id: string
    title: string
    body: string
    category: string
}