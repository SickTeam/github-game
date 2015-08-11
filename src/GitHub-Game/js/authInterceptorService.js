(function () {
    'use strict';

    angular
        .module('githubgame')
        .factory('authInterceptorService', authInterceptorService);

    authInterceptorService.$inject = ['$q', '$injector'];

    function authInterceptorService($q, $injector) {

        var service = {
            request: request,
            responseError: responseError
        };

        return service;

        function request(config) {
            //Necessary to avoid circular dependencies
            var authService = $injector.get('authService');

            config.headers = config.headers || {};

            var auth = authService.auth;
            if (auth && auth.isAuth) {
                config.headers.Authorization = 'token ' + auth.token;
            }

            return config;
        }

        function responseError(rejection) {
            //Necessary to avoid circular dependencies
            var $state = $injector.get('$state');
            var toastr = $injector.get('toastr');

            if (rejection.status === 401) {
                toastr.error('Not uathorized');
            }
            return $q.reject(rejection);
        }
    }
})();
