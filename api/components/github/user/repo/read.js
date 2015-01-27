var async      = require('async');
var _          = require('lodash');
var Joi        = require('joi');
var Model      = require(process.cwd() + '/api/lib/model');
var GitGrabber = require(process.cwd() + '/api/lib/git_grabber');

module.exports = function (server) {
  return function (req, res, next) {
    // request prep
    var grab  = GitGrabber(server, next);
    var model = new Model({
      open_issues   : Joi.array(),
      readme        : Joi.object(),
      languages     : Joi.object(),
      open_pulls    : Joi.array(),
      name          : Joi.string(),
      owner         : Joi.object(),
      href          : Joi.string(),
      description   : Joi.string(),
      network_count : Joi.number()
    });


    async.parallel([

      // General repo information
      //
      function mainContent (callback) {
        grab.repo(req.params, function (repo) {
          var owner = repo.owner || {};

          model.add({
            name  : repo.name,
            owner : {
              name : owner.login,
              href : owner.html_url
            },
            href          : repo.html_url,
            description   : repo.description,
            // network_count : repo.network_count
          });

          return callback();
        });
      },

      // Readme content
      //
      function readme (callback) {
        grab.readme(req.params, function (readme) {
          model.add({
            readme        : {
              encoding : readme.encoding,
              content  : readme.content
            }
          });

          return callback();
        });
      },

      // Readme content
      //
      function issues (callback) {
        grab.issues(req.params, function (issues) {
          var minList = _.map(issues || [], function (issue) {
            var assignee = issue.assignee || {};
            return {
              title    : issue.title,
              href     : issue.html_url,
              labels   : issue.labels,
              assignee : {
                name   : assignee.login,
                avatar : assignee.avatar_url
              }
            }
          })

          model.add({ open_issues : minList });
          return callback();
        });
      },

      // Pull request content
      //
      function pullRequests (callback) {
        grab.pullRequests(req.params, function (issues) {
          var minList = _.map(issues || [], function (issue) {
            var user = issue.user || {};
            return {
              title    : issue.title,
              href     : issue.html_url,
              labels   : issue.labels,
              submitter : {
                name   : user.login,
                avatar : user.avatar_url
              }
            }
          })

          model.add({ open_pulls : minList });
          return callback();
        });
      },

      // Language stats\istics
      //
      function languagestats (callback) {
        grab.languages(req.params, function (languages) {
          model.add({ languages : languages });
          return callback();
        });
      }
    ], function (error) {
      if (error) { return next(error); }
      res.status(200).json(model.data);
    });
  }
}