var helpers = require(process.cwd() + '/api/lib/helpers');

//
// Register
//

exports.register = function  (server) {
  var api = helpers.initComponents(process.cwd() + '/api/components', server);

  // get generic repo information
  server.get('/api/github/:user/:repo', api.github.user.repo.read);

  // attempt to convert readme into a documentation chema
  server.get('/api/github/:user/:repo/documentation', api.github.user.repo.documentation.read);
}