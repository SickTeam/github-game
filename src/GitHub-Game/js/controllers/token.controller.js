(function () {
    'use strict';

    angular
        .module('github-game')
        .controller('tokenController', tokenController);

    tokenController.$inject = ['$scope', '$modal', 'localStorageService', 'authService'];

    function tokenController($scope, $modal, localStorageService, authService) {
        var vm = this;

        vm.open = open;

        vm.isAuth = false;

        $scope.$watch(function () { return authService.auth.isAuth; }, function (newVal, oldVal) {
            vm.isAuth = newVal;
        });

        activate();

        function activate() {

        }

        function open() {
            var modalInstance = $modal.open({
                animation: true,
                templateUrl: 'html/editToken.modal.html',
                controller: 'editTokenModalController as tokenModal',
                size: 'lg',
            });
        }
    };
})();