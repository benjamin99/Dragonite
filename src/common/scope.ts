import { OAUTH_ERROR_CODE } from './error';
import { renderBearerTokenError, IBearerTokenErrorData } from './error';

/** consts */

export const eventBasicScope = 'event';
export const eventWriteScope = 'event:write';
export const eventAdminScope = 'event:admin';
export const reactionBasicScope = 'reaction';
export const reactionWriteScope = 'reaction:write';
export const reactionAdminScope = 'reaction:admin';
export const replyBasicScope = 'reply';
export const replyWriteScope = 'reply:write';
export const replyAdminScope = 'reply:admin';

/** related methods */

export function check(context: any, scope: string): IBearerTokenErrorData {
  if (!context.get('x-token-id')) {
    return {
      status: 401,
      error: OAUTH_ERROR_CODE.unauthorizedClient,
      description: 'Token is required'
    };
  }

  if (context.get('x-token-scope').split(' ').indexOf(scope) < 0) {
    return {
      status: 403,
      error: OAUTH_ERROR_CODE.insufficientScope,
      scope,
      description: 'Scope is insufficient'
    };
  }

  return null;
}

export function middleware(scope: string) {
  return function*(next) {
    const error = check(this, scope);
    if (error) {
      return renderBearerTokenError(context, error);
    }

    yield next;
  };
}


