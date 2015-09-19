(function () {
    'use strict';

    angular
        .module('github-game')
        .factory('authInterceptorService', authInterceptorService);

    authInterceptorService.$inject = ['$q', '$injector'];

    function authInterceptorService($q, $injector) {

        var service = {
            request: request,
            response: response,
            responseError: responseError
        };

        return service;

        function request(config) {
            //Necessary to avoid circular dependencies
            var authService = $injector.get('authService');

            config.headers = config.headers || {};

            var auth = authService.auth;
            if (auth && auth.isAuth && !config.headers.Authorization) {
                config.headers.Authorization = 'token ' + auth.token;
            }

            return config;
        }

        function response(response) {
            return response;
        }

        function responseError(rejection) {
            //Necessary to avoid circular dependencies
            var $state = $injector.get('$state');
            var toastr = $injector.get('toastr');

            if (rejection.status === 401) {
                toastr.error('Bad Access Token or you just ran out of API requests', 'Unauthorized');
            }
            return $q.reject(rejection);
        }
    }
})();
