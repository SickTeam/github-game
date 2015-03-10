(function() {
  angular.module('githubgame')

    .controller('GameController', ['$scope', '$rootScope', '$routeParams', 'Commits', function ($scope, $rootScope, $routeParams, Commits) {
      $scope.contributors = $routeParams.contributors.split(',');
      $scope.contributors = $scope.contributors.map(function (x) {
        return { login: x, trueNeg: false, truePos: false, falsePos: false };
      });
      $scope.stats = { correct: 0, incorrect: 0, total: 0};

      $scope.$on('commit-get', function (event, sha) {
        Commits.get( { owner: $routeParams.owner, repo: $routeParams.repo, sha: sha}, function (data, headers) {
          $scope.$broadcast('commit-retrieved', { message: data.commit.message, committer: data.author.login, additions: data.stats.additions, deletions: data.stats.deletions });
        });
      });

      $scope.$on('commit-retrieved', function (event, commit) {
        $scope.commit = commit;
        $scope.guessed = false;
        $scope.contributors.forEach(function (x) {
          x.trueNeg = x.truePos = x.falsePos = false;
        });
      });

      $scope.makeGuess = function (con) {
        $scope.stats.total++;
        $scope.guessed = true;
        if (con.login == $scope.commit.committer) {
          $scope.stats.correct++;
          con.truePos = true;
        }
        else {
          $scope.stats.incorrect++;
          con.falsePos = true;
          $scope.contributors.forEach(function (x) {
            if (x.login == $scope.commit.committer)
              x.trueNeg = true;
          });
        }
      };

      $scope.nextCommit = function () {
        $scope.$broadcast('commit-get', $scope.commits.pop());
      };

      Commits.query( { owner: $routeParams.owner, repo: $routeParams.repo }, function (data, headers) {
        $scope.commits = data.map(function (x) {
          return x.sha;
        });
        $scope.$broadcast('commit-get', $scope.commits.pop());
      });

    }]);

})();
