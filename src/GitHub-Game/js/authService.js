(function () {
    'use strict';

    angular
        .module('githubgame')
        .factory('authService', tokenService);

    tokenService.$inject = ['$http', 'localStorageService'];

    function tokenService($http, localStorageService) {
        var auth = {
            isAuth: false,
            token: ''
        };

        var service = {
            auth: auth,
            fillAuth: fillAuth
        };

        return service;

        function fillAuth() {
            var auth = localStorageService.get('auth');
            if (auth) {
                service.auth.isAuth = auth.isAuth;
                service.auth.token = auth.token;
            }
        }

        function setToken(token) {
            service.auth.isAuth = true;
            service.auth.token = token;

            localStorageService.set('auth', service.auth);
        }
    }
})();