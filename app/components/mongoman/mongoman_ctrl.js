popa.controller('MongomanCtrl', ['$scope', 'Utils', 'Api', function ($scope, Utils, Api) {
  prettyPrint();

  $scope.scrollTo = Utils.scrollTo;

  Api.github.repo.get({
    user : 'johnhof',
    repo : 'mongoman'
  }, function (repo) {
    var encodedReadme = _.findValue(repo, 'readme.content', '');
    $scope.documentation = window.atob(encodedReadme);
  });
}]);