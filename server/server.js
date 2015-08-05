'use strict'

import koa from 'koa'
import bodyParser from 'koa-bodyparser'
import logger from 'koa-logger'
import route from 'koa-router'
import send from 'koa-send'
import serve from 'koa-static'
import colors from 'colors'
import fs from 'fs'
import config from '../config'
import injections from './lib/injections'
import mixins from './lib/mixins'
import Router from 'koa-router'
import _ from 'lodash'

let helpers = require('./lib/helpers')

let server = koa();

// Mixins
mixins.apply();

server.use(bodyParser());
server.use(logger());
server.use(serve(config.cwd + '/public'));

// Injections
server.use(injections.github());

// routes
const methods = ['get', 'post', 'put', 'delete'];
let router    = new Router();

let controllers = helpers.loadDirModules(__dirname + '/components/');
let prefix      = config.api_prefix ? '/' + config.api_prefix : '';
_.each(controllers, function (controller, name) {
  _.each(methods, function (method) {
    if (_.isFunction(controller[method])) { router[method](prefix + '/' + name, controller[method]); }
  });
})

server.use(router.middleware());

// Exec server
server.listen(config.port);
console.log('\n' + fs.readFileSync(__dirname + '/popa.txt', 'utf8').blue);
console.log('\n  Listening on port '.green + config.port + '\n');
