(function() {
  angular.module('githubgame')

    .controller('StartController', ['$scope', '$rootScope', '$location', 'Contributors', 'Commits', function($scope, $rootScope, $location, Contributors, Commits) {
      $scope.pickRepo = function(item, model, label) {
        Contributors.query({ owner: $scope.ownerName, repo: item },
          function(r, headers) {
            $scope.contributors = r.map(function(x) {
              return { login: x.login, contributions: x.contributions, selected: true };
            });
          },
          function(headers) {
            $rootScope.addAlert('Owner and/or repo not found', 'danger');
          });
      };

      $scope.startGame = function(ownerName, repoName, contributors) {
        var contribs = '';
        contributors.forEach(function(x) {
          if (x.selected) {
            if (contribs !== '')
              contribs = contribs + ',' + x.login;
            else
              contribs = x.login;
          }
        });
        $location.url('/game?owner=' + ownerName + '&repo=' + repoName + '&contributors=' + contribs);
      };
    }]);

})();
