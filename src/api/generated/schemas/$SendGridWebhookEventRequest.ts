/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $SendGridWebhookEventRequest = {
    properties: {
        event: {
    type: 'string',
    isRequired: true,
},
        eventAsEnum: {
    type: 'EmailEventEnum',
},
        reference: {
    type: 'string',
    isRequired: true,
    format: 'uuid',
},
        timestamp: {
    type: 'number',
    isRequired: true,
    format: 'int64',
},
    },
} as const;