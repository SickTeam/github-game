(function() {
  angular.module('githubgame')

    .controller('StartController', ['$scope', '$rootScope', 'Repo', function ($scope, $rootScope, Repo) {
      $scope.check = function (ownerName, repoName) {
        Repo.query({ owner: ownerName, repo: repoName },
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
      };
    }]);

})();
