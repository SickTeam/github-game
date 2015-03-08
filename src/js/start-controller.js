(function() {
  angular.module('githubgame')

    .controller('StartController', ['$scope', '$rootScope', 'Repos', 'Commits', function ($scope, $rootScope, Repos, Commits) {
      $scope.check = function (ownerName, repoName) {
        Repos.query({ owner: ownerName, repo: repoName },
          function (r, headers) {
            var totalCommits = 0;
            $scope.contributors = r.length;

            r.forEach(function (x) {
              totalCommits += x.contributions;
            });
            $scope.commits = totalCommits;
            $scope.checked = true;
          },
          function (headers) {
            $rootScope.addAlert('Owner and/or repo not found', 'danger');
            $scope.checked = false;
          });

        Commits.query({ owner: ownerName, repo: repoName},
          function (r, headers) {
            console.log(r);
          });
      };
    }]);

})();
