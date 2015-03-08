(function() {
  angular.module('githubgame')

    .controller('StartController', ['$scope', '$rootScope', '$http', 'Repos', 'Commits', function ($scope, $rootScope, $http, Repos, Commits) {
      $scope.pickRepo = function (item, model, label) {
        Repos.query({ owner: $scope.ownerName, repo: item },
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
