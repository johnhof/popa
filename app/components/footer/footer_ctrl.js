
var headerCtrl = angular.module('popa').controller('FooterCtrl', ['$scope', '$location', 'Utils', function ($scope, $location, Utils) {
  $scope.sprites = Utils.spriteSet(['facebook','github', 'linkedin']);

  // make sure not to diplay on blacklisted pages
  checkCustonList();
  $scope.$on('$routeChangeSuccess', checkCustonList);
  function checkCustonList () {
    // blacklisted paths
    $scope.blacklisted = /^\/$/.test($location.path());

    // light footer paths
    $scope.light = /^\/about$/.test($location.path())
  }
}]);
