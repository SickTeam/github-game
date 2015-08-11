(function () {
    'use strict';

    angular
        .module('githubgame')
        .controller('tokenController', tokenController);

    tokenController.$inject = ['$rootScope', '$http', '$modal', 'localStorageService', 'toastr'];

    function tokenController($rootScope, $http, $modal, localStorageService, toastr) {
        var vm = this;

        vm.open = open;

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
    };
})();