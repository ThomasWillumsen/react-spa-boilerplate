/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $AccountResponse = {
    properties: {
        id: {
    type: 'number',
    isRequired: true,
    format: 'int32',
},
        email: {
    type: 'string',
    isRequired: true,
},
        fullName: {
    type: 'string',
    isRequired: true,
    isNullable: true,
},
        isAdmin: {
    type: 'boolean',
    isRequired: true,
},
        createdDate: {
    type: 'string',
    isRequired: true,
    format: 'date-time',
},
        lastModifiedDate: {
    type: 'string',
    isRequired: true,
    format: 'date-time',
},
    },
} as const;