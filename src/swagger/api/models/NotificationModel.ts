/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type NotificationModel = {
    name: string;
    expression: string;
    type: NotificationModel.type;
    triggerTime?: string;
    userId: string;
    noteId: string;
    id: string;
    dayOfWeek?: NotificationModel.dayOfWeek;
    hours?: number;
    minutes?: number;
    timezoneOffset?: number;
};

export namespace NotificationModel {

    export enum type {
        REOCCURRING = 'reoccurring',
        ONE_TIME = 'oneTime',
    }

    export enum dayOfWeek {
        SUN = 'SUN',
        MON = 'MON',
        TUE = 'TUE',
        WED = 'WED',
        THU = 'THU',
        FRI = 'FRI',
        SAT = 'SAT',
    }


}
