'use strict'

let koa        = require('koa');
let bodyParser = require('koa-bodyparser');
var logger     = require('koa-logger');
var route      = require('koa-router');
let send       = require('koa-send');
let serve      = require('koa-static')
let server     = koa();


server.use(bodyParser());
server.use(logger());

server.use(serve(process.cwd() + '/public'));

// server.use();

server.listen(process.env.PORT || 9000);
