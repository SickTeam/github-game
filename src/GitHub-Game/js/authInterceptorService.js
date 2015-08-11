(function () {
    'use strict';

    angular
        .module('githubgame')
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
            if (auth && auth.isAuth) {
                config.headers.Authorization = 'token ' + auth.token;
            }

            return config;
        }

        function response(response) {
            var toastr = $injector.get('toastr');

            var remaining = response.headers('X-RateLimit-Remaining');
            if (remaining && remaining == 0) {
                toastr.error('No more API requests remaining, consider adding a Personal Access Token',
                    'Rate Spent');
            }
            else if (remaining && remaining < 20) {
                toastr.warning('Only ' + remaining + ' API requests remaining, consider adding a Personal Access Token',
                    'Rate Nearly Spent');
            }

            return response;
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
