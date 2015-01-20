
//
// Simple server to deliver angular source
//

require('colors');
console.log('\n++++  starting server  ++++'.yellow);

var express = require('express');
var server  = express();
var config  = require('config.json')('./config.json');

// static delivery
for (staticDir in config.static) {
  server.use(staticDir, express.static(__dirname + config.static[staticDir]));
}

//start server
server.listen(config.port);
console.log('\n  Listening on port '.green + (config.port + '').blue + '\n');

// route
server.get('*', function (req, res) {
  console.log('    ' + req.method.blue + ' ' + req.url.gray);
  res.sendFile(__dirname + '/dist/index.html');
});