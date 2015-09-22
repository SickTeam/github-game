(function () {
    'use strict';

    angular
        .module('github-game')
        .controller('gameActualController', gameActualController);

    gameActualController.$inject = ['$rootScope', 'params', 'players', 'setup', 'apiService'];

    function gameActualController($rootScope, params, players, setup, apiService) {
        var vm = this;

        activate();

        function activate() {
            vm.params = params;
            vm.contributors = setup.contributors.filter((obj) => obj.active).map((obj) => obj.name);

            apiService.getRound(vm.params.gameId, vm.params.round)
                .then((response) => {
                    vm.message = response.message;
                    vm.linesAdd = response.linesAdd;
                    vm.linesRemove = response.linesRemove;
                }, (errorResponse) => {

                });

            $rootScope.$on('roundstart', _handleRoundStart);
            $rootScope.$on('roundguess', _handleRoundGuess);
            $rootScope.$on('rounddone', _handleRoundDone);
        }

        function _handleRoundStart(resource) {

        }
        
        function _handleRoundGuess(resource) {

        }

        function _handleRoundDone(resource) {

        }
    }
})();
