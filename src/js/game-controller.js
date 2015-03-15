(function() {
  angular.module('githubgame')

    .controller('GameController', ['$scope', '$rootScope', '$routeParams', 'Commits', function ($scope, $rootScope, $routeParams, Commits) {
      $scope.contributors = $routeParams.contributors.split(',');
      $scope.contributors = $scope.contributors.map(function (x) {
        return { login: x, trueNeg: false, truePos: false, falsePos: false };
      });
      $scope.commits = [];
      $scope.stats = { correct: 0, incorrect: 0, total: 0, remaining: 0};

      $scope.$on('commit-get', function (event, sha) {
        Commits.get( { owner: $routeParams.owner, repo: $routeParams.repo, sha: sha}, function (data, headers) {
          $scope.$broadcast('commit-retrieved', { sha: sha, message: data.commit.message, committer: data.author.login, additions: data.stats.additions, deletions: data.stats.deletions });
        });
      });

      $scope.$on('commit-retrieved', function (event, commit) {
        $scope.commit = commit;
        $scope.stats.remaining--;
        $scope.guessed = false;
        $scope.ready = true;
        $scope.contributors.forEach(function (x) {
          x.trueNeg = x.truePos = x.falsePos = false;
        });
      });

      $scope.makeGuess = function (con) {
        $scope.guessed = true;
        $scope.ready = true;
        $scope.stats.total++;
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
        $scope.ready = false;
        $scope.$broadcast('commit-get', $scope.commits.pop());
      };

      var getCommits = function (page) {
        Commits.query( { owner: $routeParams.owner, repo: $routeParams.repo, page: page },
          function (data, headers) {
            if (data !== undefined && data.length > 0) {
              var d = data;
              var isContributor = function (x) {
                for (var i = 0; i < $scope.contributors.length; i++) {
                  if (x == $scope.contributors[i].login)
                    return true;
                }
                return false;
              };
              d = d.filter(function (x) {
                return isContributor(x.author.login);
              });
              d = d.map(function (x) {
                return x.sha;
              });
              $scope.commits = $scope.commits.concat(d);

              getCommits(page+1);
            }
            else {
              $scope.commits = (function (arr) {
                for (var j, x, i = arr.length; i; j = Math.floor(Math.random() * i), x = arr[--i], arr[i] = arr[j], arr[j] = x);
                return arr;
              })($scope.commits);
              $scope.stats.remaining = $scope.commits.length;
              $scope.$broadcast('commit-get', $scope.commits.pop());
            }
          });
      };

      getCommits(1);

    }]);

})();
