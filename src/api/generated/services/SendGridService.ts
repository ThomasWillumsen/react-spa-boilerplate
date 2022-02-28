/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SendGridWebhookEventRequest } from '../models/SendGridWebhookEventRequest';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class SendGridService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Receive Sendgrid webhook
     * @param requestBody 
     * @returns any Success
     * @throws ApiError
     */
    public post(
requestBody?: Array<SendGridWebhookEventRequest>,
): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/v1/SendGrid',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

}