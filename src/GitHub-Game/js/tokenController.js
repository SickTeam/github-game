(function () {
    'use strict';

    angular
        .module('githubgame')
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
                templateUrl: 'html/tokenModal.html',
                controller: 'tokenModalController as tokenModal',
                size: 'lg',
            });
        }
    };
})();