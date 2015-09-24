(function () {
    'use strict';

    angular
        .module('github-game')
        .factory('apiService', apiService);

    apiService.$inject = ['$http', '$q', '$timeout', 'github-game.config'];

    function apiService($http, $q, $timeout, config) {
        let service = {
            createGame: createGame,
            createPlayer: createPlayer,
            getGuesses: getGuesses,
            getPlayers: getPlayers,
            getRound: getRound,
            getSetup: getSetup,
            getState: getState,
            putGuess: putGuess,
            putSetup: putSetup,
            putState: putState
        };

        return service;

        function createGame(owner, repo, username) {
            return $http({
                method: 'POST',
                url: `${config.apiUrl}game`,
                data: { owner: owner, repo: repo, username: username, token: '54fc997e975d15747ff7275958ae98d2d5eb1d38' }
            }).then((response) => {
                return response.data;
            });
        }

        function createPlayer(gameId, username) {
            return $q((resolve, reject) =>
                $timeout(() => resolve({ userId: 'secretuser2' }), 367)
            );
        }

        function getGuesses(gameId, round) {
            return $q((resolve, reject) =>
                $timeout(() => resolve([{ name: 'mikaelec', hasGuess: true, guess: 'deaddog' }, { name: 'deaddog', hasGuess: false, guess: null }]))
            );
        }

        function getPlayers(gameId) {
            return $q((resolve, reject) =>
                $timeout(() => resolve({ 'mikaelec': {}, 'deaddog': {} }), 367)
            );
        }

        function getRound(gameId, round) {
            return $q((resolve, reject) =>
                $timeout(() => resolve({ message: 'blah', linesAdd: 14, linesRemove: 10, committer: 'deaddog' }))
            );
        }

        function getSetup(gameId) {
            return $http({
                method: 'GET',
                url: `${config.apiUrl}game/${gameId}/setup`
            }).then((response) => {
                return response.data;
            });
        }

        function getState(gameId) {
            return $http({
                method: 'GET',
                url: `${config.apiUrl}game/${gameId}/state`
            }).then((response) => {
                return response.data;
            });

            return $q((resolve, reject) =>
                $timeout(() => resolve({ state: 'started', round: 1 }), 367)
            );
        }

        function putGuess(gameId, round, guess) {
            return $q((resolve, reject) =>
                $timeout(() => resolve(), 367)
            );
        }

        function putSetup(gameId, newSetup) {
            return $q((resolve, reject) =>
                $timeout(() => resolve(), 367)
            );
        }

        function putState(gameId, newState) {
            return $q((resolve, reject) =>
                $timeout(() => resolve(), 367)
            );
        }
    }
})();