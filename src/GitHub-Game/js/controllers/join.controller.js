(function () {
    'use strict';

    angular
        .module('github-game')
        .controller('joinController', joinController);

    joinController.$inject = ['$state', 'params', 'authService', 'apiService'];

    function joinController($state, params, authService, apiService) {
        var vm = this;

        vm.joinGame = joinGame;

        activate();

        function activate() {
            vm.loadingJoin = false;

            vm.params = params;

            vm.vs = {
                username: 'abekat'
            };
        }

        function joinGame() {
            vm.loadingJoin = true;

            apiService.createPlayer(vm.vs.username)
                .then((data) => {
                    authService.addAuth(vm.params.gameId, data.userId);
                    $state.go('game', { gameId: vm.params.gameId });
                }, (errorResponse) => {
                    vm.loadingJoin = false;
                });
        }
    }
})();
