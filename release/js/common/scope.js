"use strict";
const error_1 = require('./error');
const error_2 = require('./error');
/** consts */
exports.eventBasicScope = 'event';
exports.eventWriteScope = 'event:write';
exports.eventAdminScope = 'event:admin';
exports.reactionBasicScope = 'reaction';
exports.reactionWriteScope = 'reaction:write';
exports.reactionAdminScope = 'reaction:admin';
exports.replyBasicScope = 'reply';
exports.replyWriteScope = 'reply:write';
exports.replyAdminScope = 'reply:admin';
/** related methods */
function check(context, scope) {
    if (!context.get('x-token-id')) {
        return {
            status: 401,
            error: error_1.OAUTH_ERROR_CODE.unauthorizedClient,
            description: 'Token is required'
        };
    }
    if (context.get('x-token-scope').split(' ').indexOf(scope) < 0) {
        return {
            status: 403,
            error: error_1.OAUTH_ERROR_CODE.insufficientScope,
            scope,
            description: 'Scope is insufficient'
        };
    }
    return null;
}
exports.check = check;
function middleware(scope) {
    return function* (next) {
        const error = check(this, scope);
        if (error) {
            return error_2.renderBearerTokenError(context, error);
        }
        yield next;
    };
}
exports.middleware = middleware;
