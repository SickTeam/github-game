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
                    params: ['$stateParams', '$q', function ($stateParams, $q) {
                        return $q.when($stateParams);
                    }]
                }
            })
            .state('game.setup', {
                url: '/setup'
            })
            .state('game.actual', {
                url: '/actual'
            })
            .state('game.finished', {
                url: '/finished'
            });
    }

})();
