'use strict'

const Koa    = require('koa');
const HELMET = require('koa-helmet');
const STATIC = require('koa-static');
const LOGGER = require('koa-logger');

const PORT = process.env.POPA_PORT || 8080;

const APP = module.exports = new Koa();

APP.use(LOGGER());

APP.use(HELMET());

APP.use(STATIC('build'));

APP.listen(PORT);
console.log(`Listening on port: ${PORT}`);
