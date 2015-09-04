(function () {
    'use strict';

    angular
        .module('github-game')
        .controller('tokenModalController', tokenModalController);

    tokenModalController.$inject = ['$modalInstance', 'authService', 'gitHubService'];

    function tokenModalController($modalInstance, authService, gitHubService) {
        var vm = this;

        vm.cancel = cancel;
        vm.ok = ok;
        vm.test = test;

        activate();

        function activate() {
            vm.viewState = {
                token: authService.auth.token
            };
        }

        function cancel() {
            $modalInstance.dismiss('cancel');
        }

        function ok() {
            authService.setToken(vm.viewState.token);
            $modalInstance.close();
        }

        function test(tokenInput) {
            vm.testing = true;

            return gitHubService.getCurrentUser(tokenInput.$modelValue)
                .then(function (response) {
                    tokenInput.$setValidity('tested', true);
                }, function (response) {

                }).finally(function () {
                    vm.testing = false;
                });
        }
    }
})();
