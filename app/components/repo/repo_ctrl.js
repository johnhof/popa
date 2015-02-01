popa.controller('RepoCtrl', ['$scope', '$routeParams', 'Utils', 'Api', function ($scope, $routeParams, Utils, Api) {
  $scope.scrollTo = Utils.scrollTo;

  Api.github.repo.get({
    user : 'johnhof',
    repo : $routeParams.repo
  }, function (repo) {
    var encodedReadme = _.findValue(repo, 'readme.content', '');

    $scope.repo = repo;
    $scope.repo.readme = window.atob(encodedReadme);
  }, function () {
      $scope.repoError = true;
  });
}]);