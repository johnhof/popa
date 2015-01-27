var config       = require('config.json')('./config.json');
var express      = require('express');
var routes       = require(process.cwd() + '/api/routes');
var errorHandler = require(process.cwd() + '/api/lib/errorHandler');
var json         = require('express-json');
var bodyParser   = require('body-parser');
var colors       = require('colors');
var server       = express();

//
// Simple server to deliver angular source
//

console.log('\n\n++++  starting server  +++'.yellow + '\n');

// static deliverly
for (staticDir in config.staticMap) {
  server.use(staticDir, express.static(__dirname + config.staticMap[staticDir]));
}


// prime routes to set headers and log out route details
server.use(function init (req, res, next) {
  console.log('  ' + (req.method).cyan.dim + ' ' + (req.url).grey.dim)
  res.set({ 'Content-Type': 'application/json' });
  return next();
});

// register API routes
routes.register(server);

// add route erro rhandler
server.use(errorHandler);


// any route not used by the API should return the standart page
server.get('*', function (req, res) {
  console.log('    ' + req.method.blue + ' ' + req.url.gray);
  res.sendFile(__dirname + '/dist/index.html');
});

//
//start server
//
server.listen(config.port);
console.log('\n\n  Listening on port '.green + (config.port + '').blue + '\n');