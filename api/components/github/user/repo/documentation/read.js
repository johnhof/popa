var async      = require('async');
var _          = require('lodash')
var Model      = require(process.cwd() + '/api/lib/model');
var GitGrabber = require(process.cwd() + '/api/lib/git_grabber');

module.exports = function (server) {
  return function (req, res, next) {
    // request prep
    var grab  = GitGrabber(server, next);
    var model = new Model({});
  }
}

