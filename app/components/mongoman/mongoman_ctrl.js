popa.controller('MongomanCtrl', ['$scope', 'Utils', 'Api', '$sce', function ($scope, Utils, Api, $sce) {
  prettyPrint();

  Api.github.repo.get({
    user : 'johnhof',
    repo : 'mongoman'
  }, function (repo) {
    var encodedReadme = _.findValue(repo, 'readme.content', '');
    var markdown      = window.atob(encodedReadme);
    var mdAsHtml      = marked(markdown);
    $scope.documentation = $sce.trustAsHtml(mdAsHtml);
    prettyPrint();
  });
}]);