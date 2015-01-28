
//
// api
//
//  wrapper for simplifying requests to the API
//
popa.service('Api', ['$http',  '$resource', function ($http, $resource) {

  // return a function which thinly wraps the $http object
  var api = function (settings) {
    return $http(settings);
  }

  //
  // Resources
  //

  //
  // Session
  //
  api.github = {

    user : $resource('/api/github/:user', {
      user : '@user'
    }, {
      update  : { method : 'PUT' },
      read    : { method : 'GET' }
    }),

    repo : $resource('/api/github/:user/:repo', {
      user : '@user' ,
      repo : '@repo'
    },  {
      update  : { method : 'PUT' },
      read    : { method : 'GET' }
    }),
  }

  return api;
}])