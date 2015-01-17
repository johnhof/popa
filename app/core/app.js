//
// App setup
//


'use strict';


var popa = angular.module('popa', [

  // utility modules
  'ngRoute',
  'ngResource'
]);


popa.run(['$rootScope', '$http', function ($rootScope, $http) {
  // Preload large images on app load
  _.each([
      'hero-me.jpg'
    ], function (image) {
      $http.get('../images/' + image);
    });
}]);


popa.constant('Patterns', {
  email    : /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  password : /^.*(?=.{4,10})(?=.*\d)(?=.*[a-zA-Z]).*$/
});


popa.constant('Sizes', {
  headerHeight : 70,
  mobileBreak  : 768
});