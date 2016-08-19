/// <reference path="../typings/index.d.ts" />
"use strict";
const http = require('http');
const koa = require('koa');
const bodyParser = require('koa-bodyparser');
const mount = require('koa-mount');
const Router = require('koa-router');
const events = require('./routes/events');
const config_1 = require('./config');
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
router.get('/events', events.list);
router.post('/events', events.create);
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
