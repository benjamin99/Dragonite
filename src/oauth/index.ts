import { render } from '../common/render';
import { memberDefaultScopes } from '../common/scope';

export function checkToken(options?: any) {
  return function*(next) {
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
