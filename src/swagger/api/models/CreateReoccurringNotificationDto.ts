/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type CreateReoccurringNotificationDto = {
    name: string;
    noteId: string;
    dayOfWeek: CreateReoccurringNotificationDto.dayOfWeek;
    hours: number;
    minutes: number;
};

export namespace CreateReoccurringNotificationDto {

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
