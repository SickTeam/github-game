(function () {
    angular.module('githubgame')

      .controller('StartController', ['$scope', '$rootScope', '$location', 'toastr', 'GitHubService',
          function ($scope, $rootScope, $location, toastr, GitHubService) {
              $scope.pickRepo = function (item, model, label) {
                  GitHubService.getContributors($scope.ownerName, item)
                      .then(function (response) {
                          $scope.contributors = response.data.map(function (x) {
                              return { login: x.login, contributions: x.contributions, selected: true };
                          });
                      }, function (response) {
                          toastr.error('ALERT');
                      });
              };

              $scope.startGame = function (ownerName, repoName, contributors) {
                  var contribs = '';
                  contributors.forEach(function (x) {
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
