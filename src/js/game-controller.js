(function() {
  angular.module('githubgame')

    .controller('GameController', ['$scope', '$rootScope', '$routeParams', 'Commits', function ($scope, $rootScope, $routeParams, Commits) {
      Commits.query( { owner: $routeParams.owner, repo: $routeParams.repo }, function (data, headers) {
        $scope.commits = data.map(function (x) {
          return x.sha;
        });
      });
    }]);

})();
