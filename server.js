'use strict';

let koa = require('koa');
let serve = require('koa-static');
let logger = require('koa-logger');
let colors = require('colors');
let fs = require('fs');
let app = koa();

console.log('\n' + fs.readFileSync('./popa.txt').toString().blue + '\n');

app.use(logger());

app.use(serve('./public', {
  index: './html/index.html',
}));

app.listen(process.env.PORT);
console.log('  Listening at: ' + process.env.PORT);
