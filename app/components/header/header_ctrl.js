
var headerCtrl = angular.module('popa').controller('HeaderCtrl', ['$scope', 'Utils', '$location', '$routeParams', 'Links', function ($scope, Utils, $location, $routeParams, Links) {
  $scope.newTab = Utils.newTab;
  $scope.links  = Links;

  // handle page load scrolling
  $scope.$on('$routeChangeSuccess', function () {

    // close the open nav bar on route change
    angular.element('.navbar-toggle:not(.collapsed)').trigger('click');

    // scroll to the has if its in the path
    if ($location.hash()) {
      Utils.scrollTo('hash');

    // otherwise scroll to the top pf the page
    } else {
      Utils.scrollTo('top');
    }
  });
}]);
