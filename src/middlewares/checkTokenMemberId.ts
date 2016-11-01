import { OAUTH_ERROR_CODE, renderBearerTokenError } from '../common/error';

export function checkTokenMemberId() {
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

    yield next;
  };
}
