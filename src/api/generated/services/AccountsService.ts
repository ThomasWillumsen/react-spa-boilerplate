/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AccountResponse } from '../models/AccountResponse';
import type { CreateAccountRequest } from '../models/CreateAccountRequest';
import type { LoginAccountRequest } from '../models/LoginAccountRequest';
import type { LoginResponse } from '../models/LoginResponse';
import type { ResetAccountPasswordRequest } from '../models/ResetAccountPasswordRequest';
import type { UpdateAccountIsAdminRequest } from '../models/UpdateAccountIsAdminRequest';
import type { UpdateAccountPasswordRequest } from '../models/UpdateAccountPasswordRequest';
import type { UpdateAccountRequest } from '../models/UpdateAccountRequest';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class AccountsService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Create a new account
     * @param requestBody 
     * @returns AccountResponse Success
     * @throws ApiError
     */
    public createAccount(
requestBody?: CreateAccountRequest,
): CancelablePromise<AccountResponse> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/v1/Accounts',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                409: `<p>Error codes:</p><ul><li><i>10301</i> - The provided email already exists and cannot be used</li></ul>`,
            },
        });
    }

    /**
     * Get accounts
     * @returns AccountResponse Success
     * @throws ApiError
     */
    public getAccounts(): CancelablePromise<Array<AccountResponse>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/Accounts',
        });
    }

    /**
     * Update an existing account
     * @param id 
     * @param requestBody 
     * @returns AccountResponse Success
     * @throws ApiError
     */
    public updateAccount(
id: number,
requestBody?: UpdateAccountRequest,
): CancelablePromise<AccountResponse> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/api/v1/Accounts/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                404: `<p>Error codes:</p><ul><li><i>10303</i> - The account doesn't exist</li></ul>`,
                409: `<p>Error codes:</p><ul><li><i>10301</i> - The provided email already exists and cannot be used</li></ul>`,
            },
        });
    }

    /**
     * Delete account. Related accounts will also be deleted
     * @param id 
     * @returns void 
     * @throws ApiError
     */
    public deleteAccount(
id: number,
): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/api/v1/Accounts/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `<p>Error codes:</p><ul><li><i>10303</i> - The account doesn't exist</li></ul>`,
            },
        });
    }

    /**
     * Update an account to have admin permissions
     * @param id 
     * @param requestBody 
     * @returns void 
     * @throws ApiError
     */
    public updateAccountIsAdmin(
id: number,
requestBody?: UpdateAccountIsAdminRequest,
): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/api/v1/Accounts/{id}/updateIsAdmin',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                404: `<p>Error codes:</p><ul><li><i>10303</i> - The account doesn't exist</li></ul>`,
            },
        });
    }

    /**
     * Login to an existing account
     * Returns a jwt token to be used with bearer authentication
     * @param requestBody 
     * @returns LoginResponse Success
     * @throws ApiError
     */
    public loginAccount(
requestBody?: LoginAccountRequest,
): CancelablePromise<LoginResponse> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/v1/Accounts/login',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `<p>Error codes:</p><ul><li><i>10101</i> - The provided email or password is incorrect</li></ul>`,
            },
        });
    }

    /**
     * Reset the password of an existing account.
     * If the email address exists, an email will be sent to the owner with a link to generate a new password.
     * @param requestBody 
     * @returns void 
     * @throws ApiError
     */
    public resetAccountPassword(
requestBody?: ResetAccountPasswordRequest,
): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/v1/Accounts/resetPassword',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Update the password of an account using the token from the reset password email.
     * @param requestBody 
     * @returns void 
     * @throws ApiError
     */
    public updateAccountPassword(
requestBody?: UpdateAccountPasswordRequest,
): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/api/v1/Accounts/updatePassword',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `<p>Error codes:</p><ul><li><i>10201</i> - The reset password token is invalid. Might have already been used</li></ul>`,
            },
        });
    }

}