'use strict'

let koa        = require('koa');
let bodyParser = require('koa-bodyparser');
var logger     = require('koa-logger');
var route      = require('koa-router');
let send       = require('koa-send')
let server     = koa();

server.use(bodyParser());
server.use(logger());

server.use(function *() {
  let ctx = this;
  if (this.path === '/hart.png') {
    yield send(ctx, process.cwd() + '/app/hart.png');
  } else {
    yield send(ctx, process.cwd() + '/app/index.html');
  }
});

server.listen(9000);
