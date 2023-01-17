/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateOneTimeNotificationDto } from '../models/CreateOneTimeNotificationDto';
import type { CreateReoccurringNotificationDto } from '../models/CreateReoccurringNotificationDto';
import type { NotificationDto } from '../models/NotificationDto';
import type { NotificationModel } from '../models/NotificationModel';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class NotificationsService {

    /**
     * @param requestBody 
     * @returns NotificationModel 
     * @throws ApiError
     */
    public static notificationsControllerCreate(
requestBody: CreateOneTimeNotificationDto,
): CancelablePromise<NotificationModel> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/notifications/one-time',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param requestBody 
     * @returns NotificationModel 
     * @throws ApiError
     */
    public static notificationsControllerCreateReoccurring(
requestBody: CreateReoccurringNotificationDto,
): CancelablePromise<NotificationModel> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/notifications/reoccurring',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param noteId 
     * @returns NotificationDto 
     * @throws ApiError
     */
    public static notificationsControllerFindOne(
noteId: string,
): CancelablePromise<NotificationDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/notifications/{noteId}',
            path: {
                'noteId': noteId,
            },
        });
    }

    /**
     * @param notificationId 
     * @returns any 
     * @throws ApiError
     */
    public static notificationsControllerRemove(
notificationId: string,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/notifications/{notificationId}',
            path: {
                'notificationId': notificationId,
            },
        });
    }

}
