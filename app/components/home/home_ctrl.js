popa.controller('HomeCtrl', ['$scope', '$location', function ($scope, $location) {
  $scope.expanded = !!$location.search().expanded;

  $scope.expand = function expand () {
    $location.search('expanded');
    $scope.expanded = true;
  };

}]);