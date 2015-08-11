(function () {
    'use strict';

    angular
        .module('githubgame')

        .constant('githubgame.config', {
            apiBaseUri: 'https://api.github.com/',
            clientId: 'GitHub-Game'
        })

        .config(['$httpProvider', function ($httpProvider) {
            $httpProvider.interceptors.push('authInterceptorService');
        }])

        .config(['toastrConfig', function (toastrConfig) {
            angular.extend(toastrConfig, {
                maxOpened: 3,
                preventOpenDuplicates: true
            });
        }])

        .run(['authService', function (authService) {
            authService.fillAuth();
        }]);

})();