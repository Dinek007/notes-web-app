/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateFolderDto } from '../models/CreateFolderDto';
import type { FolderModel } from '../models/FolderModel';
import type { GetAllUserFoldersResDTO } from '../models/GetAllUserFoldersResDTO';
import type { UpdateFolderDto } from '../models/UpdateFolderDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class FoldersService {

    /**
     * @param requestBody 
     * @returns FolderModel 
     * @throws ApiError
     */
    public static foldersControllerCreate(
requestBody: CreateFolderDto,
): CancelablePromise<FolderModel> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/folders',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @returns GetAllUserFoldersResDTO 
     * @throws ApiError
     */
    public static foldersControllerGetUserFolders(): CancelablePromise<GetAllUserFoldersResDTO> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/folders',
        });
    }

    /**
     * @param folderId 
     * @returns FolderModel 
     * @throws ApiError
     */
    public static foldersControllerFindUserFolder(
folderId: string,
): CancelablePromise<FolderModel> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/folders/{folderId}',
            path: {
                'folderId': folderId,
            },
        });
    }

    /**
     * @param folderId 
     * @param requestBody 
     * @returns FolderModel 
     * @throws ApiError
     */
    public static foldersControllerUpdateUserFolder(
folderId: string,
requestBody: UpdateFolderDto,
): CancelablePromise<FolderModel> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/folders/{folderId}',
            path: {
                'folderId': folderId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

}
