import koa from 'koa';
import bodyParser from 'koa-bodyparser'
import logger from 'koa-logger'
import route from 'koa-router'
import send from 'koa-send'
import serve from 'koa-static'
import colors from 'colors'
import fs from 'fs'
import config from '../config'

let server = koa();

server.use(bodyParser());
server.use(logger());
server.use(serve(config.cwd + '/public'));

// server.use();

server.listen(config.port);

console.log('\n' + fs.readFileSync(__dirname + '/popa.txt', 'utf8').blue);
console.log('\n  Listening on port '.green + config.port + '\n');
