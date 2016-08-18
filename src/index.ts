/// <reference path="../typings/index.d.ts" />

import * as http from 'http';
import * as koa from 'koa';
import * as bodyParser from 'koa-bodyparser';
import * as mount from 'koa-mount';
import * as Router from 'koa-router';
import {create} from './routes/events';

/* consts */

const LOG_REQUESTS = true;
const API_VERSION = 1;
const APP_HOST = '127.0.0.1';
const APP_PORT = 3000;

/* setup the default views */

function *index() {
  this.type = 'json';
  this.status = 200;
  this.body = { 'success': true };
}

function *requestLogger(next) {
  yield next;
  if (LOG_REQUESTS) {
    console.log(`[${this.request.method}]: ${this.status} ${this.request.path}`);
  }
}

function *createEvents() {

  // get the request info:
  const body = this.request.body;
  const event = create(body.title, body.content);
  yield event.save();

  this.type = 'json';
  this.status = 201;
  this.body = {
    title: event.title,
    content: event.content
  };
}

/* setup the router */

const router = new Router();
router.get('/', index);
router.post('/events', createEvents);

/* setup the application */

const app = new koa();
app.use(requestLogger);
app.use(bodyParser());
app.use(mount(`/v${API_VERSION}`, router.routes()));
app.on('error', function (error, context) {
  console.error('server error: ', error, context);
});

http.createServer(app.callback()).listen(APP_PORT, APP_HOST, () => {
  console.log(`running on ${APP_HOST}:${APP_PORT}`);
});
