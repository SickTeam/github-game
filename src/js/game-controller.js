(function() {
  angular.module('githubgame')

    .controller('GameController', ['$scope', '$rootScope', '$routeParams', 'Commits', function ($scope, $rootScope, $routeParams, Commits) {
      $scope.contributors = $routeParams.contributors.split(',');
      $scope.contributors = $scope.contributors.map(function (x) {
        return { login: x, trueNeg: false, truePos: false, falsePos: false };
      });
      console.log($scope.contributors);
      Commits.query( { owner: $routeParams.owner, repo: $routeParams.repo }, function (data, headers) {
        $scope.commits = data.map(function (x) {
          return x.sha;
        });
        $scope.$broadcast('commit-get', $scope.commits.pop());
      });

      $scope.$on('commit-get', function (event, sha) {
        Commits.get( { owner: $routeParams.owner, repo: $routeParams.repo, sha: sha}, function (data, headers) {
          $scope.commit = data;
        });
        $scope.committer = $scope.contributors[0];
      });

      $scope.makeGuess = function (con) {
        
      };
    }]);

})();
