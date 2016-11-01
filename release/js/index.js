"use strict";
const http = require('http');
const koa = require('koa');
const bodyParser = require('koa-bodyparser');
const mount = require('koa-mount');
const Router = require('koa-router');
const events = require('./routes/events');
const devices = require('./routes/devices');
const members = require('./routes/members');
const reactions = require('./routes/reactions');
const replies = require('./routes/replies');
const config_1 = require('./config');
const dbRefresh_1 = require('./utils/dbRefresh');
const getDeviceById_1 = require('./middlewares/getDeviceById');
const getEventById_1 = require('./middlewares/getEventById');
const getMemberById_1 = require('./middlewares/getMemberById');
const checkTokenMemberId_1 = require('./middlewares/checkTokenMemberId');
/* consts */
const LOG_REQUESTS = config_1.config.log;
/* setup the default views */
function* index() {
    this.type = 'json';
    this.status = 200;
    this.body = { 'success': true };
}
function* requestLogger(next) {
    yield next;
    if (LOG_REQUESTS) {
        console.log(`[${this.request.method}]: ${this.status} ${this.request.path}`);
    }
}
/* setup the router */
const router = new Router();
router.get('/', index);
// devices
router.get('/me/decvices', checkTokenMemberId_1.checkTokenMemberId(), devices.list);
router.get('/devices/:token', checkTokenMemberId_1.checkTokenMemberId(), devices.show);
router.post('/devices', checkTokenMemberId_1.checkTokenMemberId(), devices.create);
router.delete('/devices/:token', checkTokenMemberId_1.checkTokenMemberId(), devices.destroy);
// members
router.get('/members', members.list);
router.get('/members/:id', getMemberById_1.getMemberById(), members.show);
router.put('/members/:id', getMemberById_1.getMemberById(), members.update);
// events
router.get('/events', events.list);
router.get('/events/:id', getEventById_1.getEventById(), events.show);
router.post('/events', events.create);
router.post('/events/:id/confirms', getEventById_1.getEventById(), events.makeConfirm);
// reactions
router.get('/events/:id/reactions', getEventById_1.getEventById(), reactions.list);
router.post('/events/:id/reactions', getMemberById_1.getMemberById(), getEventById_1.getEventById(), reactions.create);
// replies
router.get('/events/:id/replies', getEventById_1.getEventById(), replies.list);
router.post('/events/:id/replies', getEventById_1.getEventById(), getMemberById_1.getMemberById(), replies.create);
// devices
router.get('/devices', devices.list);
router.get('/devices/:id', getDeviceById_1.getDeviceById(), devices.show);
router.post('/devices', devices.create);
// backdoor
router.post('/db/refresh', dbRefresh_1.refresh);
/* setup the application */
const app = new koa();
app.use(requestLogger);
app.use(bodyParser());
app.use(mount(`/v${config_1.config.version}`, router.routes()));
app.on('error', function (error, context) {
    console.error('server error: ', error, context);
});
http.createServer(app.callback()).listen(config_1.config.port, config_1.config.host, () => {
    console.log(`running on ${config_1.config.host}:${config_1.config.port}`);
});
