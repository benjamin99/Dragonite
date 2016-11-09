import * as http from 'http';
import * as koa from 'koa';
import * as bodyParser from 'koa-bodyparser';
import * as mount from 'koa-mount';
import * as Router from 'koa-router';
import * as events from './routes/events';
import * as devices from './routes/devices';
import * as members from './routes/members';
import * as reactions from './routes/reactions';
import * as replies from './routes/replies';
import * as scope from './common/scope';
import { config } from './config';
import { refresh } from './utils/dbRefresh';
import { middleware as errorMiddleware } from './common/error';
import { getDeviceById } from './middlewares/getDeviceById';
import { getEventById }  from './middlewares/getEventById';
import { getMemberById } from './middlewares/getMemberById';
import { checkTokenMemberId } from './middlewares/checkTokenMemberId';
import * as oauth from './oauth';

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

// oauth:
router.post('/oauth/token',
  oauth.createToken());

// devices
router.get('/me/decvices',
  checkTokenMemberId(),
  devices.list);

router.get('/devices/:token',
  checkTokenMemberId(),
  devices.show);

router.post('/devices',
  checkTokenMemberId(),
  devices.create);

router.delete('/devices/:token',
  checkTokenMemberId(),
  devices.destroy);
  
router.get('/devices', devices.list);

router.get('/devices/:id',
  getDeviceById(),
  devices.show);

// members

router.get('/members',
  members.list);

router.post('/members',
  members.create);

router.get('/members/:id',
  getMemberById(),
  members.show);

router.put('/members/:id',
  getMemberById(),
  members.update);

// events

router.get('/events', 
  scope.middleware(scope.eventBasicScope),
  events.list);

router.get('/events/:id',
  scope.middleware(scope.eventBasicScope),
  getEventById(),
  events.show);

router.post('/events', 
  scope.middleware(scope.eventWriteScope),
  events.create);

router.post('/events/:id/confirms',
  scope.middleware(scope.eventWriteScope),
  getEventById(),
  events.makeConfirm);

// reactions
router.get('/events/:id/reactions',
  scope.middleware(scope.eventBasicScope),
  scope.middleware(scope.reactionBasicScope),
  getEventById(),
  reactions.list);

router.post('/events/:id/reactions',
  scope.middleware(scope.eventWriteScope),
  scope.middleware(scope.reactionWriteScope),
  getMemberById(),
  getEventById(),
  reactions.create);

// replies
router.get('/events/:id/replies',
  scope.middleware(scope.eventBasicScope),
  scope.middleware(scope.replyBasicScope),
  getEventById(),
  replies.list);

router.post('/events/:id/replies',
  scope.middleware(scope.eventBasicScope),
  scope.middleware(scope.replyWriteScope),
  getEventById(),
  getMemberById(),
  replies.create);

// backdoor
router.post('/db/refresh', refresh);

/* setup the application */

const app = module.exports = new koa();

// for health check

app.use(function*(next) {
  if (this.url !== '/' || this.method !== 'GET') {
    return yield next;
  }

  this.status = 200;
  this.body = 'ok';
});

app.use(requestLogger);
app.use(bodyParser());

if (config.useOAuth) {
  app.use(oauth.checkToken());
}

app.use(errorMiddleware());
app.use(mount(`/v${config.version}`, router.routes()));
app.on('error', function (error, context) {
  console.error('server error: ', error, context);
});

http.createServer(app.callback()).listen(config.port, config.host, () => {
  console.log(`running on ${config.host}:${config.port}`);
});
