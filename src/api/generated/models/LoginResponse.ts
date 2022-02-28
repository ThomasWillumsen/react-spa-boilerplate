/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type LoginResponse = {
    id: number;
    email: string;
    fullName: string | null;
    isAdmin: boolean;
    createdDate: string;
    lastModifiedDate: string;
    /**
     * JWT token containing user claims
     */
    jwt: string;
};