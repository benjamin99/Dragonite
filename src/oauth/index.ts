import * as _ from 'lodash';
import { render } from '../common/render';
import { memberDefaultScopes } from '../common/scope';

function addTokenHeaders(contex: any, token: string) {
  // TODO: get the proper headers from the oken:
  contex.request.headers['x-token-id'] = token ? '123123' : undefined;
  contex.request.headers['x-token-memeber'] = token ? '1' : undefined;
  contex.request.headers['x-token-scope'] = token ? memberDefaultScopes.join(' ') : undefined;
}

export function checkToken(options?: any) {
  return function*(next) {
    addTokenHeaders(this, this.get('Authorization'));
    yield next;
  };
};

export function createToken(options?: any) {
  return function*() {
    const authorization = this.get('Authorization');
    const grantType = this.get('grant_type');

    // TODO:
    // should implement the following features ...

    return render(this, 200, {
      access_token: '97TFZLuISHaNxkF/lhwBhg==',
      token_type: 'Bearer',
      scope: memberDefaultScopes.join(' ')
    });
  };
};
