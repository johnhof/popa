var helpers = require(process.cwd() + '/api/lib/helpers');

//
// Register
//

exports.register = function  (server) {
  var api = helpers.initComponents(process.cwd() + '/api/components', server);

  // get generic repo information
  server.get('/api/github/:user/:repo', api.github.user.repo.controller.read);

  // update repo store
  server.put('/api/github/:user/:repo', api.github.user.repo.controller.update);

  // sent email
  server.post('/api/email', api.email.controller.create);
}