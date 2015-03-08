(function() {
  angular.module('githubgame')

    .controller('TokenController', ['$scope', '$rootScope', '$cookies', '$http', function ($scope, $rootScope, $cookies, $http) {
      $cookies.tokenValid = undefined;
      $scope.token = $cookies.token;

      $scope.saveToken = function (token) {
        $scope.editingToken = false;

        if (token != $cookies.token)
          $http({method: 'GET', url: 'https://api.github.com/user', headers: { 'Authorization': 'token ' + token}})
            .success(function (data, status, headers, config) {
              $rootScope.addAlert('Authorized as: <strong>' + data.login + '</strong>', 'success');
              $rootScope.token = token;
              $cookies.token = token;
            })
            .error(function (data, status, headers, config) {
              $rootScope.addAlert('Could not authorize token: <strong>' + token + '</strong>');
              $rootScope.token = '';
              $cookies.token = '';
            });
      };
    }]);

})();