/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ResetService {

    /**
     * @param noteId 
     * @returns any 
     * @throws ApiError
     */
    public static resetControllerRemoveNote(
noteId: string,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/reset/note/{noteId}',
            path: {
                'noteId': noteId,
            },
        });
    }

    /**
     * @param folderId 
     * @returns any 
     * @throws ApiError
     */
    public static resetControllerRemoveFolder(
folderId: string,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/reset/folder/{folderId}',
            path: {
                'folderId': folderId,
            },
        });
    }

}
