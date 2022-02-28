/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { EmailEventEnum } from './EmailEventEnum';

export type SendGridWebhookEventRequest = {
    event: string;
    eventAsEnum?: EmailEventEnum;
    reference: string;
    timestamp: number;
};