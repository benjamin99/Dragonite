import { render } from './render';

export const ERROR_CODE = {
  // 10xx: Common error
  unknown: 1000,
  notFound: 1001,
  forbidden: 1002,

  // 11xx: Validation error
  required: 1100,

  // 12xx: Resource error
  memberNotFound: 1200,
  deviceNotFound: 1201,
  eventNotFound: 1202
};

/** oauth error related */

export const OAUTH_ERROR_CODE = {
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

export interface IBearerTokenErrorData {
  status: number;
  error: string;
  scope?: string;
  description: string;
}

export interface IBearerTokenErrorBody {
  oauth_error: string;
  scope?: string;
  error_description: string;
}

export function renderBearerTokenError(context: any, data: IBearerTokenErrorData) {
  const headers = [
    `Bearer realm="Dragonite"`,
    `error="${data.error}"`,
    `error_description="${data.description}"`
  ];

  const body: IBearerTokenErrorBody = {
    oauth_error: data.error,
    error_description: data.description
  };

  if (data.scope) {
    headers.push(`scope=${data.scope}`);
    body.scope = data.scope;
  }

  context.set('WWW-Authenticate', headers.join(', '));
  render(context, data.status, body);
};

/** Error Hnadlers */

function handleJoiValidationError(context: any, error: any) {
  return render(context, 400, {
    error: ERROR_CODE.required,
    message: error.message
  });
}

export function middleware(options?: any) {
  return function*(next) {
    try {
      yield next;
    } catch (error) {
      
      if (error.name === 'ValidationError') {
        return handleJoiValidationError(this, error);
      }

      return render(this, 500, {
        error: ERROR_CODE.unknown,
        message: error.message || 'unknown error'
      });
    }
  };
}
