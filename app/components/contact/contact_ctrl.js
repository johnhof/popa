popa.controller('ContactCtrl', ['$scope', 'Links', function ($scope, Links) {
  $scope.links = [{
    label   : 'Email',
    href    : Links.email.href,
    display : Links.email.path,
    target  : ''
  }, {
    label   : 'Linkedin',
    href    : Links.linkedin.href,
    display : Links.linkedin.path,
    target  : '_blank'
  }, {
    label   : 'Facebook',
    href    : Links.facebook.href,
    display : Links.facebook.path,
    target  : '_blank'
  }, {
    label   : 'Github',
    href    : Links.github.href,
    display : Links.github.path,
    target  : '_blank'
  }];

  $scope.lat = '40.45916';
  $scope.lon = '-79.916868'
}]);
