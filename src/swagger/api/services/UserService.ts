/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { LoginReqDTO } from '../models/LoginReqDTO';
import type { LoginResDTO } from '../models/LoginResDTO';
import type { SignupReqDTO } from '../models/SignupReqDTO';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class UserService {

    /**
     * @param requestBody
     * @returns LoginResDTO
     * @throws ApiError
     */
    public static userControllerLogin(
        requestBody: LoginReqDTO,
    ): CancelablePromise<LoginResDTO> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/user/login',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param requestBody
     * @returns LoginResDTO
     * @throws ApiError
     */
    public static userControllerSignUp(
        requestBody: SignupReqDTO,
    ): CancelablePromise<LoginResDTO> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/user/signUp',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

}
