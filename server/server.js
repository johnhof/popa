'use strict'

import koa from 'koa'
import bodyParser from 'koa-bodyparser'
import logger from 'koa-logger'
import serve from 'koa-static'
import fs from 'fs'
import colors from 'colors'
import _ from 'lodash'
import config from '../config'
import middleware from './lib/middleware'
import injections from './lib/injections'
import mixins from './lib/mixins'
import router from './router'

let server = koa();

// Mixins
mixins.apply();

// Third party middleware
server.use(bodyParser());
server.use(logger());

// Serve static files
server.use(serve(config.cwd + '/public'));

// Error handling
server.use(middleware.error_handler());

// Injections
server.use(injections.github());
server.use(injections.utilities());

// Router
server.use(router());

// Exec server
server.listen(config.port);
console.log('\n' + fs.readFileSync(__dirname + '/popa.txt', 'utf8').blue);
console.log('\n  Listening on port '.green + config.port + '\n');
