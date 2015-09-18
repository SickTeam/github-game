(function () {
    'use strict';

    angular
        .module('github-game')
        .factory('apiService', apiService);

    apiService.$inject = ['$http', '$q', '$timeout'];

    function apiService($http, $q, $timeout) {
        let service = {
            createGame: createGame
        };

        return service;

        function createGame(owner, repo, username, token) {
            return $q((resolve, reject) =>
                $timeout(() => resolve({ gameId: 'secretgame', userId: 'secretuser' }), 1000) );
        }
    }
})();