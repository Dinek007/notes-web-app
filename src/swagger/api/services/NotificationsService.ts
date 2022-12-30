/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateOneTimeNotificationDto } from '../models/CreateOneTimeNotificationDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class NotificationsService {

    /**
     * @param requestBody 
     * @returns string 
     * @throws ApiError
     */
    public static notificationsControllerCreate(
requestBody: CreateOneTimeNotificationDto,
): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/notifications/one-time',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

}
