popa.config(['$routeProvider', function ($routeProvider) {

  $routeProvider.

    // Home
    when('/', {
      templateUrl : 'views/home.html',
      controller  : 'HomeCtrl'
    }).

    // About
    when('/about', {
      templateUrl : 'views/about.html',
      controller  : 'AboutCtrl'
    }).

    // 404
    otherwise({
      templateUrl : 'views/404.html'
    });
  }
]);