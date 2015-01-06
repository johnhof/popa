popa.config(['$routeProvider', function ($routeProvider) {

  $routeProvider.

    // Home
    when('/', {
      templateUrl : 'views/home.html',
      controller  : 'HomeCtrl'
    }).

    // 404
    otherwise({
      templateUrl : 'views/404.html',
    });

  }
]);