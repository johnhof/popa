
var headerCtrl = angular.module('popa').controller('HeaderCtrl', ['$scope', 'Utils', '$location', function ($scope, Utils, $location) {


  // handle page load scrolling
  $scope.$on('$routeChangeSuccess', function () {
    console.log('route change')
    // scroll to the has if its in the path
    if ($location.hash()) {
      Utils.scrollTo('hash');

    // otherwise scroll to the top pf the page
    } else {
      Utils.scrollTo('top');
    }
  });
}]);
