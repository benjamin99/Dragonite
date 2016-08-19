/// <reference path="../typings/index.d.ts" />

import * as http from 'http';
import * as koa from 'koa';
import * as bodyParser from 'koa-bodyparser';
import * as mount from 'koa-mount';
import * as Router from 'koa-router';
import * as events from './routes/events';
import * as devices from './routes/devices';
import {config} from './config';
import {refresh} from './utils/dbRefresh';
import {getDeviceById} from './middlewares/getDeviceById';
import {getEventById}  from './middlewares/getEventById';

/* consts */

const LOG_REQUESTS = config.log;

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

/* setup the router */

const router = new Router();
router.get('/', index);

// events
router.get('/events', events.list);
router.get('/events/:id',
  getEventById(),
  events.show);
router.post('/events', events.create);
router.post('/events/:id/confirms',
  getEventById(),
  events.makeConfirm);

router.options('/events', events.options);

// devices
router.get('/devices', devices.list);
router.get('/devices/:id',
  getDeviceById(),
  devices.show);
router.post('/devices', devices.create);

// backdoor
router.post('/db/refresh', refresh);


/* setup the application */

const app = new koa();
app.use(requestLogger);
app.use(bodyParser());
app.use(mount(`/v${config.version}`, router.routes()));
app.on('error', function (error, context) {
  console.error('server error: ', error, context);
});

http.createServer(app.callback()).listen(config.port, config.host, () => {
  console.log(`running on ${config.host}:${config.port}`);
});
