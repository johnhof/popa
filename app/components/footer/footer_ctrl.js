
var headerCtrl = angular.module('popa').controller('FooterCtrl', ['$scope', '$location', function ($scope, $location) {
  $scope.sprites = [{
    href : 'https://www.facebook.com/john.hofrichter',
    name : 'ion-social-facebook'
  },{
    href : 'https://github.com/johnhof',
    name : 'ion-social-github'
  },{
    href : 'https://www.linkedin.com/in/johnhofrichter',
    name : 'ion-social-linkedin'
  }];

  checkBlacklist();
  $scope.$on('$routeChangeSuccess', checkBlacklist);
  function checkBlacklist () {
    $scope.blacklisted = /^\/$/.test($location.path())
  }
}]);
