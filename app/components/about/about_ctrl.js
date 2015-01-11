
var headerCtrl = angular.module('popa').controller('AboutCtrl', ['$scope',  'Utils', function ($scope, Utils) {
  $scope.scrollTo = Utils.scrollTo;
  $scope.setHash  = Utils.setHash;

  $scope.likes = [
    'Rock Climbing',
    'Woodworking',
    'Cycling',
    'Hiking',
    'Camping',
    'Playing hockey and soccer',
    'Watching the Pittsburgh Penguins win',
    'Good Whiskey',
    'Good Beer',
  ];

  $scope.dislikes = [
    'Cold weather',
    'Watching the Penguins lose',
    'Finding the office coffey pot empty',
    'Distance Running',
    'Swimming',
  ];

  $scope.scrollTo = Utils.scrollTo('hash');
}]);
