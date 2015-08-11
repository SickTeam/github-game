(function () {
    'use strict';

    angular
        .module('githubgame')
        .controller('tokenController', tokenController);

    tokenController.$inject = ['$rootScope', '$http', '$modal', 'localStorageService', 'toastr'];

    function tokenController($rootScope, $http, $modal, localStorageService, toastr) {
        var vm = this;

        vm.open = open;
        vm.saveToken = saveToken;

        activate();

        function activate() {
            vm.token = localStorageService.get('token');
            if (vm.token)
                $http.defaults.headers.common.Authorization = 'token ' + vm.token;
        }

        function open() {
            var modalInstance = $modal.open({
                animation: true,
                templateUrl: 'html/tokenModal.html',
                controller: 'tokenModalController as tokenModal',
                size: 'lg',
            });
        }

        function saveToken(token) {
            vm.editingToken = false;
            if (!token) {
                localStorageService.set('token', '');
                return;
            }
            if (token != localStorageService.get('token'))
                $http({ method: 'GET', url: 'https://api.github.com/user', headers: { 'Authorization': 'token ' + token } })
                  .success(function (data, status, headers, config) {
                      $rootScope.token = token;
                      localStorageService.set('token', token);
                      $http.defaults.headers.common.Authorization = 'token ' + token;
                  })
                  .error(function (data, status, headers, config) {
                      toastr.error('Could not authorize token: <strong>' + token + '</strong>');
                      $rootScope.token = '';
                      localStorageService.set('token', '');
                      $http.defaults.headers.common.Authorization = undefined;
                  });
        }
    };
})();