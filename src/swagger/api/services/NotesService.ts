/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateNoteReqDto } from '../models/CreateNoteReqDto';
import type { GetFolderNotesResDTO } from '../models/GetFolderNotesResDTO';
import type { NoteModel } from '../models/NoteModel';
import type { UpdateNoteReqDto } from '../models/UpdateNoteReqDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class NotesService {

    /**
     * @param requestBody
     * @returns NoteModel
     * @throws ApiError
     */
    public static notesControllerCreate(
        requestBody: CreateNoteReqDto,
    ): CancelablePromise<NoteModel> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/notes',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param folderId
     * @returns GetFolderNotesResDTO
     * @throws ApiError
     */
    public static notesControllerFindAll(
        folderId: string,
    ): CancelablePromise<GetFolderNotesResDTO> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/notes',
            query: {
                'folderId': folderId,
            },
        });
    }

    /**
     * @param noteId
     * @returns NoteModel
     * @throws ApiError
     */
    public static notesControllerFindOne(
        noteId: string,
    ): CancelablePromise<NoteModel> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/notes/{noteId}',
            path: {
                'noteId': noteId,
            },
        });
    }

    /**
     * @param noteId
     * @param requestBody
     * @returns NoteModel
     * @throws ApiError
     */
    public static notesControllerUpdate(
        noteId: string,
        requestBody: UpdateNoteReqDto,
    ): CancelablePromise<NoteModel> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/notes/{noteId}',
            path: {
                'noteId': noteId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param noteId
     * @returns any
     * @throws ApiError
     */
    public static notesControllerRemove(
        noteId: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/notes/{noteId}',
            path: {
                'noteId': noteId,
            },
        });
    }

}
