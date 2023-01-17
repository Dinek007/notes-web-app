/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type NotificationModel = {
    name: string;
    expression: string;
    type: NotificationModel.type;
    userId: string;
    noteId: string;
    id: string;
};

export namespace NotificationModel {

    export enum type {
        REOCCURRING = 'reoccurring',
        ONE_TIME = 'oneTime',
    }


}
