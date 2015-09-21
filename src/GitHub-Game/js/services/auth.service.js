(function () {
    'use strict';

    angular
        .module('github-game')
        .factory('authService', authService);

    authService.$inject = ['$http', 'localStorageService'];

    function authService($http, localStorageService) {
        var AUTH_ID = 'auth';

        var self = this;
        var auth = {};

        var currentAuth;

        var service = {
            addAuth: addAuth,
            getCurrentAuth: getCurrentAuth,
            getPreviousGameIds: getPreviousGameIds,
            fillAuth: fillAuth,
            setCurrentAuth: setCurrentAuth
        };

        return service;

        function addAuth(gameId, userId) {
            self.auth[gameId] = userId;
            _setAuth(self.auth);
        }

        function getCurrentAuth() {
            return self.currentAuth;
        }

        function getPreviousGameIds() {
            var gameIds = [];
            for (var gameId in self.auth)
                gameIds.push(gameId);

            return gameIds;
        }

        function fillAuth() {
            var auth = _getAuth();
            if (auth) {
                self.auth = auth;
            }
            else {
                self.auth = {};
                _setAuth(self.auth);
            }
        }

        function setCurrentAuth(gameId) {
            return self.currentAuth = self.auth[gameId];
        }

        function _getAuth() {
            return localStorageService.get(AUTH_ID);
        }

        function _setAuth(newAuth) {
            localStorageService.set(AUTH_ID, newAuth);
        }
    }
})();