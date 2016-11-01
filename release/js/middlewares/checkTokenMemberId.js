"use strict";
const error_1 = require('../common/error');
function checkTokenMemberId() {
    return function* (next) {
        if (!this.get('x-token-id')) {
            return error_1.renderBearerTokenError(this, {
                status: 401,
                error: error_1.OAUTH_ERROR_CODE.invalidClient,
                description: 'Token is required'
            });
        }
        if (!this.get('x-token-member')) {
            return error_1.renderBearerTokenError(this, {
                status: 403,
                error: error_1.OAUTH_ERROR_CODE.invalidToken,
                description: 'Token is not for member'
            });
        }
        yield next;
    };
}
exports.checkTokenMemberId = checkTokenMemberId;
