(function() {
  angular.module('githubgame')

    .controller('TokenController', ['$scope', '$rootScope', '$http', 'localStorageService', 'toastr',
        function ($scope, $rootScope, $http, localStorageService, toastr) {
      $scope.token = localStorageService.get('token');
      if ($scope.token)
        $http.defaults.headers.common.Authorization = 'token ' + $scope.token;

      $scope.saveToken = function(token) {
        $scope.editingToken = false;
        if (!token) {
            localStorageService.set('token', '');
          return;
        }
        if (token != localStorageService.get('token'))
          $http({method: 'GET', url: 'https://api.github.com/user', headers: { 'Authorization': 'token ' + token}})
            .success(function(data, status, headers, config) {
              $rootScope.token = token;
              localStorageService.set('token', token);
              $http.defaults.headers.common.Authorization = 'token ' + token;
            })
            .error(function(data, status, headers, config) {
              toastr.error('Could not authorize token: <strong>' + token + '</strong>');
              $rootScope.token = '';
              localStorageService.set('token', '');
              $http.defaults.headers.common.Authorization = undefined;
            });
      };
    }]);

})();