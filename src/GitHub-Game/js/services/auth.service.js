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

        var currentAuth = '';

        var service = {
            addAuth: addAuth,
            getCurrentAuth: getCurrentAuth,
            fillAuth: fillAuth
        };

        return service;

        function addAuth(gameId, userId) {
            self.auth[gameId] = userId;
            setAuth(self.auth);
        }

        function getAuth() {
            return localStorageService.get(AUTH_ID);
        }

        function getCurrentAuth() {
            return self.currentAuth;
        }

        function fillAuth() {
            var auth = getAuth();
            if (auth) {
                self.auth = auth;
            }
            else {
                self.auth = {};
                setAuth(self.auth);
            }
        }

        function setAuth(newAuth) {
            console.log(newAuth);
            localStorageService.set(AUTH_ID, newAuth);
        }

        function setCurrentAuth(gameId) {
            self.currentAuth = self.auth[gameId];
        }
    }
})();