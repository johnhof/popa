var _       = require('lodash');
var async   = require('async');
var request = require('request');
var mon     = require('mongoman')

var host    = 'https://api.github.com';
var headers = {
  'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:24.0) Gecko/20100101 Firefox/24.0',
};

//
// Return an istance of GitGrabber
//
module.exports = function (server, errorHandler) {
  //
  // core function makes and validates requests
  //
  function getGit(path, params, callback) {
    var url = host + (/^\//.test(path) ? path : '/' + path);
    request({
      uri     : url,
      json    : true,
      qs      : params,
      headers : headers
    }, function (error, response, json) {
      if (error || !(response.statusCode === 200 && json)) {
        return errorHandler({
          error   : 'Unexpected response from Github',
          details : {
            request  : url,
            status   : response.statusCode,
            returned : json || 'no body returned'
          }
        });
      }

      return callback(json);
    });
  }

  //
  // all request objects return json with a `get(namespace)` function addeed
  //
  var grabber = {
    repo : function (settings, callback) {
      if (!(settings.repo && settings.user)) {
        throw new Error('invalid arguments supplied to GitGrabber');
      }

      return getGit('repos/' + settings.user + '/' + settings.repo, settings.params, callback);
    },

    readme : function (settings, callback) {
      if (!(settings.repo && settings.user)) {
        throw new Error('invalid arguments supplied to GitGrabber');
      }

      return getGit('repos/' + settings.user + '/' + settings.repo + '/readme', settings.params, callback);
    },

    issues : function (settings, callback) {
      if (!(settings.repo && settings.user)) {
        throw new Error('invalid arguments supplied to GitGrabber');
      }

      return getGit('repos/' + settings.user + '/' + settings.repo + '/issues', settings.params, callback);
    },

    pullRequests : function (settings, callback) {
      if (!(settings.repo && settings.user)) {
        throw new Error('invalid arguments supplied to GitGrabber');
      }

      return getGit('repos/' + settings.user + '/' + settings.repo + '/pulls', settings.params, callback);
    },

    languages : function (settings, callback) {
      if (!(settings.repo && settings.user)) {
        throw new Error('invalid arguments supplied to GitGrabber');
      }

      return getGit('repos/' + settings.user + '/' + settings.repo + '/languages', settings.params, callback);
    },



    //
    // Repo model Builder
    //



    updateRepo : function (req, res, cb) {
      // request prep
      var repoModel = mon.new('Repo');

      async.parallel([
        // General repo information
        function mainContent (callback) {
          grabber.repo(req.params, function (repo) {
            var owner = repo.owner || {};

            repoModel.name  = repo.name;
            repoModel.owner = {
              name : owner.login,
              href : owner.html_url
            };

            repoModel.full_name     = repo.full_name;
            repoModel.href          = repo.html_url;
            repoModel.description   = repo.description;
            repoModel.network_count = repo.network_count;

            return callback();
          });
        },
        // Readme content
        function readme (callback) {
          grabber.readme(req.params, function (readme) {
            repoModel.readme = {
              encoding : readme.encoding,
              content  : readme.content
            };

            return callback();
          });
        },
        // Readme content
        function issues (callback) {
          grabber.issues(req.params, function (issues) {
            repoModel.open_issues = _.map(issues || [], function (issue) {
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
            });

            return callback();
          });
        },
        // Pull request content
        function pullRequests (callback) {
          grabber.pullRequests(req.params, function (issues) {
            repoModel.open_pulls = _.map(issues || [], function (issue) {
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
            });

            return callback();
          });
        },
        // Language statistics
        function languagestats (callback) {
          grabber.languages(req.params, function (languages) {
            repoModel.languages = languages
            return callback();
          });
        }
      ], function (error) {
        if (error) {
          return cb(error);
        } else {
          repoModel.save(cb);
        }
      });
    }
  };

  return grabber;
}