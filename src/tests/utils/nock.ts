import * as _nock from 'nock';

function defaultBodyFilter(body) { return true; };

function normalized(content: any) {
  let result = content;
  for (let key in content) {
    if (content.hasOwnProperty(key)) {
      let value: string = content[key];
      if (typeof value !== 'string') {
        continue;
      }
      result[key] = normalizedString(value);
    }
  }

  return result;
}

function normalizedString(value: string): any {
  if (value[0] === '/' && value.slice(-1) === '/') {
    return RegExp(value.substring(1, value.length - 1));
  }
  return value;
}

export type filterFunction = (param: any) => boolean;

export interface Options {
  host: string;
  routes?: Route[];
}

export interface Route {
  endpoint: string;
  method: string;
  status: number;
  response: any;
  basicAuth?: string;
  query?: any | filterFunction | boolean;
  body?: any | filterFunction;
  times?: number;
}

export function mock(options?: Options): _nock.Scope {
  let scope = _nock(options.host);

  for (let route of options.routes || []) {
    
    if (route.method in ['post', 'put']) {
      let body = route.body ? normalized(route.body) : defaultBodyFilter;
      scope = scope[route.method](route.endpoint, body); 
    } else {
      scope = scope[route.method](route.endpoint);
    }

    if (route.basicAuth) {
      scope = scope.matchHeader('Authorization', normalizedString(route.basicAuth));
    }

    // TODO: should fix the issues
    scope = (scope as any) 
            .query(route.query ? normalized(route.query) : true)
            .times(route.times || Infinity)
            .reply(route.status, route.response);
  }

  return scope;
}

export function cleanAll() {
  _nock.cleanAll();
}