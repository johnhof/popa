'use strict'

var config   = (process.env.NODE_ENV === 'production') ? require('./production.json') : require('./development.json');
var defaults = require('defaults-deep');

try {
  var local = require('./local.json');
  config = defaults(local, config);
} catch (e) {}

config.port        = process.env.PORT || config.port
config.environment = process.env.NODE_ENV || config.environment;
config.cwd         = process.cwd();

module.exports = config;
