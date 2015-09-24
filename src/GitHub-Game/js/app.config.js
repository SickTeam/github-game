(function () {
    'use strict';

    angular
        .module('github-game')

        .constant('github-game.config', {
            apiUrl: 'http://localhost:54328/woot/',
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
                        var round = toParams.round;

                        apiService.getState(gameId)
                            .then((data) => {
                                var currentAuth = authService.setCurrentAuth(gameId);
                                var newParams = { gameId: gameId, round: data.round || null };

                                if (!currentAuth) {
                                    event.preventDefault();
                                    $state.go('join', newParams);
                                    return;
                                }

                                if (!subState || (subState !== data.state)) {
                                    event.preventDefault();
                                    $state.go(`${state}.${data.state}`, newParams);
                                    return;
                                }

                                if (subState === 'started' && round !== newParams.round) {
                                    event.preventDefault();
                                    $state.go(`${state}.started`, newParams);
                                    return;
                                }
                            }, (errorResponse) => {
                                //TODO Handle error when getting game state (probably 404)
                            });
                    }
                });
            }]);

})();
