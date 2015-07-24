'use strict'

var config = (process.env.NODE_ENV === 'production') ? require('./production.json') : require('./development.json');

config.port        = process.env.PORT || config.port
config.environment = process.env.NODE_ENV || config.environment;
config.cwd         = process.cwd();

module.exports = config;
