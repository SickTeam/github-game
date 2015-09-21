(function () {
    'use strict';

    angular
        .module('github-game')

        .constant('github-game.config', {
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

        .run(['$rootScope', '$state', 'authService', function ($rootScope, $state, authService) {
            authService.fillAuth();

            $rootScope.$on('$stateChangeStart', (event, toState, toParams, fromState, fromParams) => {
                if (toState.name.match(/game.*/)) {
                    var gameId = toParams.gameId;
                    var currentAuth = authService.setCurrentAuth(gameId);

                    if (!currentAuth) {
                        event.preventDefault();
                        $state.go('join', { gameId });
                    }
                }
            });
        }]);

})();
