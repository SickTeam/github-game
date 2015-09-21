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

        .run(['$rootScope', '$state', 'authService', 'apiService',
            ($rootScope, $state, authService, apiService) => {
                authService.fillAuth();

                $rootScope.$on('$stateChangeStart', (event, toState, toParams, fromState, fromParams) => {
                    var split = toState.name.split('.');
                    var state = split[0];
                    var subState = state.length > 0 && split[1];

                    if (state === 'game') {
                        var gameId = toParams.gameId;

                        apiService.getState(gameId)
                            .then((data) => {
                                var currentAuth = authService.setCurrentAuth(gameId);

                                if (!currentAuth) {
                                    event.preventDefault();
                                    $state.go('join', { gameId });
                                    return;
                                }

                                if (!subState || (subState !== data.state)) {
                                    event.preventDefault();
                                    $state.go(`${state}.${data.state}`, { gameId });
                                    return;
                                }
                            }, (errorResponse) => {

                            });
                    }
                });
            }]);

})();
