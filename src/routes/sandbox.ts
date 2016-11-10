import * as _ from 'lodash';
import * as pathToRegExp from 'path-to-regexp';
import * as examples from '../docs/examples';
import { render } from '../common/render';

declare type Endpoint = examples.Endpoint;

export class Sandbox {
  private sandboxPrefix: string;

  constructor(prefix: string) {
    this.sandboxPrefix = prefix;
  }

  public middleware() {
    const sandbox = this;
    return function*(next) {
      const endpoints: Endpoint[] = yield examples.load();

      const endpoint = sandbox.endpointWithURL(endpoints, this.request.url, this.request.method);
      if (endpoint) {
        return render(this, endpoint.status, endpoint.response);
      }

      yield next;
    };
  }

  private endpointWithURL(endpoints: Endpoint[], requestedUrl: string, method: string) {
    return _.find(endpoints, endpoint => {
      const regex = pathToRegExp(`*\\${this.sandboxPrefix}` + endpoint.path);
      return regex.test(requestedUrl) 
        && endpoint.method.toLowerCase() === method.toLowerCase();
    });
  }
}
