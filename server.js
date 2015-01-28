var config       = require('config.json')('./config.json');
var express      = require('express');
var routes       = require(process.cwd() + '/api/routes');
var errorHandler = require(process.cwd() + '/api/lib/errorHandler');
var json         = require('express-json');
var bodyParser   = require('body-parser');
var colors       = require('colors');
var mon          = require('mongoman');
var server       = express();

console.log('\n\n++++  starting server  +++'.yellow + '\n');

// connect to mongo
mon.goose.connection.on("open", function (ref) {
  console.log("\n  Connected to mongo server!\n".blue);
  setupServer();
});

mon.goose.connection.on("error", function (err) {
  console.log("\n!! Could not connect to mongo server !! \n    Try running `[sudo] mongod` in another terminal\n".red);
  process.kill();
});

mon.connect();

// Set up express server

function setupServer () {
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

  // any route not used by the API should return the standart page
  server.get('*', function (req, res) {
    res.set({ 'Content-Type': 'text/html; charset=utf-8' });
    res.sendFile(__dirname + '/dist/index.html');
  });

  // add route error handler
  server.use(errorHandler);

  // mixims

  require(__dirname + '/api/lib/mixins');


  //
  //start server
  //
  server.listen(config.port);
  console.log('\n  Listening on port '.green + (config.port + '').blue + '\n');
}