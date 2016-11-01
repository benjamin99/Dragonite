"use strict";
const render_1 = require('./render');
exports.ERROR_CODE = {
    // 10xx: Common error
    unknown: 1000,
    notFound: 1001,
    forbidden: 1002,
    // 11xx: Validation error
    // 12xx: Resource error
    memberNotFound: 1200,
    deviceNotFound: 1201,
    eventNotFound: 1202
};
/** oauth error related */
exports.OAUTH_ERROR_CODE = {
    invalidRequest: 'invalid_request',
    invalidClient: 'invalid_client',
    invalidGrant: 'invalid_grant',
    invalidScope: 'invalid_scope',
    invalidToken: 'invalid_token',
    insufficientScope: 'insufficient_scope',
    unauthorizedClient: 'unauthorized_client',
    unsupportedGrantType: 'unsupported_grant_type',
    accessDenied: 'access_denied',
    unsupportedResponseType: 'unsupported_response_type',
    serverError: 'server_error',
    temporarilyUnavailable: 'temporarily_unavailable'
};
function renderBearerTokenError(context, data) {
    const headers = [
        `Bearer realm="Dragonite"`,
        `error="${data.error}"`,
        `error_description="${data.description}"`
    ];
    const body = {
        oauth_error: data.error,
        error_description: data.description
    };
    if (data.scope) {
        headers.push(`scope=${data.scope}`);
        body.scope = data.scope;
    }
    context.set('WWW-Authenticate', headers.join(', '));
    render_1.render(context, data.status, body);
}
exports.renderBearerTokenError = renderBearerTokenError;
;
