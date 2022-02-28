/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $UpdateAccountRequest = {
    properties: {
        email: {
    type: 'string',
    isRequired: true,
    pattern: '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$',
},
        fullName: {
    type: 'string',
    isRequired: true,
},
    },
} as const;