
var headerCtrl = angular.module('popa').controller('FooterCtrl', ['$scope',  function ($scope) {
  $scope.sprites = [{
    href : 'https://www.facebook.com/john.hofrichter',
    src  : 'facebook.png'
  },{
    href : 'https://github.com/johnhof',
    src  : 'github.png'
  },{
    href : 'https://www.linkedin.com/in/johnhofrichter',
    src  : 'linkedin.png'
  }];
}]);
