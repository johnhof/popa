var helpers = require(process.cwd() + '/api/lib/helpers');

//
// Register
//

exports.register = function  (server) {
  var components = helpers.initComponents(process.cwd() + '/api/components', server);

  // get generic repo information
  server.get('/github/:repo', components.github.repo.read);

  // attempt to convert readme into a documentation chema
  server.get('/github/:repo/documentation', components.github.repo.documentation.read);
}