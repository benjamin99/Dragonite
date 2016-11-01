import { Member } from '../models/Members';
import { ERROR_CODE, OAUTH_ERROR_CODE, renderBearerTokenError } from '../common/error';

export function getMemberById(options?: any) {
  return function*(next) {

    if (!this.get('x-token-id')) {
      return renderBearerTokenError(this, {
        status: 401,
        error: OAUTH_ERROR_CODE.invalidClient,
        description: 'Token is required'
      });
    }

    if (!this.get('x-token-member')) {
      return renderBearerTokenError(this, {
        status: 403,
        error: OAUTH_ERROR_CODE.invalidToken,
        description: 'Token is not for member'
      });
    }

    const member = this.state.member = yield Member.findOne({ _id: +this.get('x-token-member') });
    if (!member) {
      this.status = 404;
      this.type = 'json';
      this.body = {
        error: ERROR_CODE.memberNotFound,
        message: 'cannot found the member with the requested memberId'
      };
      return;
    }

    yield next;
  };
};
