/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ModelValidationError } from './ModelValidationError';

/**
 * The typical error type that will be sent to the client when an error happens in the API
 */
export type ApiErrorResponse = {
    errorCode: number;
    errorMessage: string;
    /**
     * will contain validation errors if any
     */
    validationErrors: Array<ModelValidationError>;
};