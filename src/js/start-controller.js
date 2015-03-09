(function() {
  angular.module('githubgame')

    .controller('StartController', ['$scope', '$rootScope', '$http', 'Contributors', 'Commits', function ($scope, $rootScope, $http, Contributors, Commits) {
      $scope.pickRepo = function (item, model, label) {
        Contributors.query({ owner: $scope.ownerName, repo: item },
          function (r, headers) {
            $scope.contributors = r.map(function (x) {
              return { login: x.login, contributions: x.contributions, selected: true };
            });
          },
          function (headers) {
            $rootScope.addAlert('Owner and/or repo not found', 'danger');
          });
      };
    }]);

})();
