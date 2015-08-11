(function () {
    'use strict';

    angular
        .module('githubgame')
        .controller('tokenModalController', tokenModalController);

    tokenModalController.$inject = ['$modalInstance'];

    function tokenModalController($modalInstance) {
        var vm = this;

        vm.cancel = cancel;
        vm.ok = ok;
        vm.test = test;

        activate();

        function activate() {

        }

        function cancel() {
            $modalInstance.dismiss('cancel');
        }

        function ok() {
            $modalInstance.close();
        }

        function test() {

        }
    }
})();
