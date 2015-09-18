﻿(function () {
    'use strict';

    angular
        .module('github-game')
        .factory('apiService', apiService);

    apiService.$inject = ['$http', '$q', '$timeout'];

    function apiService($http, $q, $timeout) {
        let service = {
            createGame: createGame,
            getPlayers: getPlayers,
            getSetup: getSetup
        };

        return service;

        function createGame(owner, repo, username, token) {
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
    }
})();