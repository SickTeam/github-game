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
                controller: 'startController as start'
            })
            .state('game', {
                abstract: true,
                url: '/game/:gameId',
                templateUrl: 'html/game.layout.html',
                controller: 'gameController as game',
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
            .state('game.actual', {
                url: '/actual',
                views: {
                    'game-content@game': {
                        templateUrl: 'html/game.actual.html',
                        controller: 'gameActualController as gameActual'
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
            });
    }

})();
