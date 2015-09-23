(function () {
    'use strict';

    angular
        .module('github-game')
        .controller('gameActualController', gameActualController);

    gameActualController.$inject = ['$rootScope', 'params', 'players', 'setup', 'apiService'];

    function gameActualController($rootScope, params, players, setup, apiService) {
        var vm = this;

        vm.guessed = guessed;
        vm.makeGuess = makeGuess;
        vm.nextRound = nextRound;

        activate();

        function activate() {
            vm.params = params;
            vm.players = players;
            vm.contributors = setup.contributors
                .filter((obj) => obj.active)
                .map((obj) => ({
                    name: obj.name
                }));

            vm.round = vm.params.round;

            _resetRound();
            _getRound(vm.round);

            $rootScope.$on('roundstart', _handleRoundStart);
            $rootScope.$on('roundguess', _handleRoundGuess);
            $rootScope.$on('rounddone', _handleRoundDone);
        }

        function guessed() {
            return vm.contributors.reduce((prev, next) => prev || next.guessed, false);
        }

        function makeGuess(con) {
            apiService.putGuess(vm.params.gameId, vm.round, con.name)
                .then((response) => {
                    con.guessed = true;
                });
        }

        function nextRound() {
            vm.round = vm.nextRound;
            _resetRound();
            _getRound(vm.round);
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
            vm.nextRound = resource.round;
        }

        function _handleRoundGuess(resource) {
            vm.players[resource.username].hasGuess = true;
        }

        function _handleRoundDone(resource) {
            if (vm.round == resource.round) {
                vm.contibutor[resource.committer].correct = true;
                vm.sha = resource.sha;
                resource.guesses.forEach((guesser) => {
                    vm.players[guesses].guess = guesser.guess;
                });
            }
        }

        function _resetRound() {
            vm.commit = '';
            vm.sha = null;
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

            vm.nextRound = null;
        }
    }
})();
