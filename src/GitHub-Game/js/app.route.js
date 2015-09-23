(function () {
    angular
        .module('github-game')
        .config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];

    function config($stateProvider, $urlRouterProvider, $locationProvider, $q, $timeout) {
        $locationProvider.html5Mode(true);
        $urlRouterProvider.otherwise("/");

        $stateProvider
            .state('start', {
                url: '/',
                templateUrl: 'html/start.layout.html',
                controller: 'startController as start',
                resolve: {
                    previousGameIds: ['$q', 'authService',
                        ($q, authService) => {
                            return $q.when(authService.getPreviousGameIds());
                        }
                    ]
                }
            })
            .state('game', {
                url: '/game/:gameId',
                templateUrl: 'html/game.layout.html',
                controller: 'gameController as game',
                params: { round: null },
                resolve: {
                    params: ['$stateParams', '$q',
                        ($stateParams, $q) => $q.when($stateParams)
                    ],
                    players: ['params', 'apiService',
                        (params, apiService) => apiService.getPlayers(params.gameId)
                    ],
                    setup: ['params', 'apiService',
                        (params, apiService) => apiService.getSetup(params.gameId)
                    ]
                }
            })
            .state('game.setup', {
                url: '/setup',
                views: {
                    'game-content@game': {
                        templateUrl: 'html/game.setup.html',
                        controller: 'gameSetupController as gameSetup'
                    }
                }
            })
            .state('game.started', {
                url: '/started',
                views: {
                    'game-content@game': {
                        templateUrl: 'html/game.started.html',
                        controller: 'gameActualController as gameStarted'
                    }
                }
            })
            .state('game.finished', {
                url: '/finished',
                views: {
                    'game-content@game': {
                        templateUrl: 'html/game.finished.html',
                        controller: 'gameFinishedController as gameFinished'
                    }
                }
            })
            .state('join', {
                url: '/join/:gameId',
                templateUrl: 'html/join.html',
                controller: 'joinController as join',
                resolve: {
                    params: ['$stateParams', '$q',
                        ($stateParams, $q) => $q.when($stateParams)
                    ]
                }
            });
    }

})();
