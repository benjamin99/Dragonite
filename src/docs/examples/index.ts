import * as Promise from 'bluebird';
import * as _ from 'lodash';
import * as path from 'path';
import * as glob from 'glob';

let staticExamples: Endpoint[];

export interface Mockup {
  endpoints: Endpoint[];
}

export interface Endpoint {
  path: string;
  method: string;
  status: number;
  reponse: string;
}

const globAsync: (path: string) => any = Promise.promisify(glob);

function *loadExamples(): IterableIterator<Endpoint[]> {
  const paths: string[] = yield globAsync(path.join(__dirname, '*.json'));
  const examples = _.map(paths, path => require(path) as Mockup);
  const endpoints = _.reduce(examples, function(r: Endpoint[], example: Mockup) {
    return r.concat(example.endpoints || []);
  }, []);

  return endpoints;
}

export function *load(): any  {
  if (!staticExamples) {
    staticExamples = yield loadExamples();
  }
  return staticExamples;
}

export function *reload(): any {
  staticExamples = yield loadExamples();
  return staticExamples;
}

