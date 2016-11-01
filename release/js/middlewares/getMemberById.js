"use strict";
const Members_1 = require('../models/Members');
const error_1 = require('../common/error');
function getMemberById(options) {
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
        const member = this.state.member = yield Members_1.Member.findOne({ _id: +this.get('x-token-member') });
        if (!member) {
            this.status = 404;
            this.type = 'json';
            this.body = {
                error: error_1.ERROR_CODE.memberNotFound,
                message: 'cannot found the member with the requested memberId'
            };
            return;
        }
        yield next;
    };
}
exports.getMemberById = getMemberById;
;
