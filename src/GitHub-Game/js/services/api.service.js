(function () {
    'use strict';

    angular
        .module('github-game')
        .factory('apiService', apiService);

    apiService.$inject = ['$http', '$q', '$timeout'];

    function apiService($http, $q, $timeout) {
        let service = {
            createGame: createGame,
            getPlayers: getPlayers,
            getSetup: getSetup,
            putSetup: putSetup,
            putState: putState
        };

        return service;

        function createGame(owner, repo, username) {
            return $q((resolve, reject) =>
                $timeout(() => resolve({ gameId: 'secretgame', userId: 'secretuser' }), 1000)
            );
        }

        function getPlayers(gameId) {
            return $q((resolve, reject) =>
                $timeout(() => resolve(['mikaelec', 'deaddog']), 1000)    
            );
        }

        function getSetup(gameId) {
            return $q((resolve, reject) =>
                $timeout(() => resolve({ contributors: [{ name: 'mikaelec', active: true }, { name: 'deaddog', active: true }], excludeMerges: true, toLowerCase: false }), 1000)
            );
        }

        function putSetup(gameId, newSetup) {
            return $q((resolve, reject) =>
                $timeout(() => resolve(), 1000)    
            );
        }

        function putState(gameId, newState) {
            return $q((resolve, reject) =>
                $timeout(() => resolve(), 1000)    
            );
        }
    }
})();