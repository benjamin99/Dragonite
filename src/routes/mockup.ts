import * as Promise from 'bluebird';
import * as joi from 'joi';
import * as router from 'koa-router';
import * as examples from '../docs/examples';

declare type Mockup = examples.Mockup;
declare type Endpoint = examples.Endpoint;

const joiValidate: (value: any, schema: joi.Schema) => void = Promise.promisify(joi.validate);

export function middleware() {
  return function*() {
    const mockups = yield examples.load();
    console.log(mockups);
  };
};