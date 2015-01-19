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


    // Contact
    when('/contact', {
      templateUrl : 'views/contact.html',
      controller  : 'ContactCtrl'
    }).

    // About
    when('/mongoman', {
      templateUrl : 'views/mongoman.html',
      controller  : 'MongomanCtrl'
    }).

    // About
    when('/mongoman/documentation', {
      templateUrl : 'views/mongo_documentation.html',
      controller  : 'MongomanCtrl'
    }).

    // 404
    otherwise({
      templateUrl : 'views/404.html'
    });
  }
]);