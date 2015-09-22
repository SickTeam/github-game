(function () {
    'use strict';

    angular
        .module('github-game')
        .factory('apiService', apiService);

    apiService.$inject = ['$http', '$q', '$timeout'];

    function apiService($http, $q, $timeout) {
        let service = {
            createGame: createGame,
            createPlayer: createPlayer,
            getGuesses: getGuesses,
            getPlayers: getPlayers,
            getRound: getRound,
            getSetup: getSetup,
            getState: getState,
            putSetup: putSetup,
            putState: putState
        };

        return service;

        function createGame(owner, repo, username) {
            return $q((resolve, reject) =>
                $timeout(() => resolve({ gameId: 'secretgame', userId: 'secretuser' }), 367)
            );
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
            return $q((resolve, reject) =>
                $timeout(() => resolve({ contributors: [{ name: 'mikaelec', active: true }, { name: 'deaddog', active: true }], excludeMerges: true, toLowerCase: false }), 367)
            );
        }

        function getState(gameId) {
            return $q((resolve, reject) =>
                $timeout(() => resolve({ state: 'started', round: 1 }), 367)
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