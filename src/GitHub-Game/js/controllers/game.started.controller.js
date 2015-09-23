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
            vm.players = players;
            vm.contributors = setup.contributors
                .filter((obj) => obj.active)
                .map((obj) => ({
                    name: obj.name
                }));

            _resetRound();
            _getRound(vm.params.round);

            $rootScope.$on('roundstart', _handleRoundStart);
            $rootScope.$on('roundguess', _handleRoundGuess);
            $rootScope.$on('rounddone', _handleRoundDone);
        }

        function _getRound(round) {
            apiService.getRound(vm.params.gameId, round)
                .then((response) => {
                    vm.message = response.message;
                    vm.linesAdd = response.linesAdd;
                    vm.linesRemove = response.linesRemove;

                    return apiService.getGuesses(vm.params.gameId, round)
                        .then((response) => {
                            response.forEach((guesser) => {
                                var player = vm.players[guesser.name];
                                player.hasGuess = guesser.hasGuess;
                                player.guess = guesser.guess;
                            });
                        });
                }, (errorResponse) => {

                });
        }

        function _handleRoundStart(resource) {

        }

        function _handleRoundGuess(resource) {

        }

        function _handleRoundDone(resource) {

        }

        function _resetRound() {
            vm.commit = '';
            vm.linesAdd = 0;
            vm.linesRemove = 0;

            vm.contributors.forEach((contributor) => {
                contributor.guessed = false;
                contributor.correct = null;
            });
            for (var key in vm.players) {
                vm.players[key].hasGuess = false;
                vm.players[key].guess = null;
            }
        }
    }
})();
