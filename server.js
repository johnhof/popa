
//
// Simple server to deliver angular source
//

require('colors');
console.log('\n\n++++  starting server  +++'.yellow + '\n');

var express = require('express');
var server  = express();
var config  = require('config.json')('./config.json');

console.log(require('fs').readdirSync('./'));

// static delivery
for (staticDir in config.static) {
  server.use(staticDir, express.static(__dirname + config.static[staticDir]));
}

//start server
server.listen(config.port);
console.log('\n\n  Listening on port '.green + (config.port + '').blue + '\n');

// route
server.get('*', function (req, res) {
  console.log('    ' + req.method.blue + ' ' + req.url.gray);
  res.sendFile(__dirname + '/dist/index.html');
});