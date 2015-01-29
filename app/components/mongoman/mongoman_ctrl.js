popa.controller('MongomanCtrl', ['$scope', 'Utils', 'Api', '$sce', function ($scope, Utils, Api, $sce) {
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