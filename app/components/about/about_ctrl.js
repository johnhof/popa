
var headerCtrl = angular.module('popa').controller('AboutCtrl', ['$scope',  'Utils', function ($scope, Utils) {
  $scope.scrollTo = Utils.scrollTo;
  $scope.setHash  = Utils.setHash;

  $scope.scrollTo = Utils.scrollTo('hash');
}]);
