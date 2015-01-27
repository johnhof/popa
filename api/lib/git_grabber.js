var _       = require('lodash');
var request = require('request');

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

      json.get = function (namespace, fallback) {
        return _.findValue(this, namespace, fallback);
      }

      return callback(json);
    });
  }

  //
  // all request objects return json with a `get(namespace)` function addeed
  //
  return {
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
    }
  }
}