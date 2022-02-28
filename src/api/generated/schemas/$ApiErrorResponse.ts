/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $ApiErrorResponse = {
    description: `The typical error type that will be sent to the client when an error happens in the API`,
    properties: {
        errorCode: {
    type: 'number',
    isRequired: true,
    format: 'int32',
},
        errorMessage: {
    type: 'string',
    isRequired: true,
},
        validationErrors: {
    type: 'array',
    contains: {
        type: 'ModelValidationError',
    },
    isRequired: true,
},
    },
} as const;