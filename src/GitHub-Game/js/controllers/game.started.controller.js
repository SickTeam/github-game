(function () {
    'use strict';

    angular
        .module('github-game')
        .controller('gameActualController', gameActualController);

    gameActualController.$inject = ['$rootScope', 'params', 'players', 'apiService'];

    function gameActualController($rootScope, params, players, apiService) {
        var vm = this;

        activate();

        function activate() {
            vm.params = params;

            apiService.getRound(vm.params.gameId, vm.params.round)
                .then((response) => {

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
