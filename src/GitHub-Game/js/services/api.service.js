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
            getPlayers: getPlayers,
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

        function getPlayers(gameId) {
            return $q((resolve, reject) =>
                $timeout(() => resolve(['mikaelec', 'deaddog']), 367)    
            );
        }

        function getSetup(gameId) {
            return $q((resolve, reject) =>
                $timeout(() => resolve({ contributors: [{ name: 'mikaelec', active: true }, { name: 'deaddog', active: true }], excludeMerges: true, toLowerCase: false }), 367)
            );
        }

        function getState(gameId) {
            return $q((resolve, reject) =>
                $timeout(() => resolve({ state: 'setup' }), 367)
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