(function () {
    angular.module('github-game')

      .config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
          function ($stateProvider, $urlRouterProvider, $locationProvider) {
              $locationProvider.html5Mode(true);
              $urlRouterProvider.otherwise("/");

              $stateProvider
                .state('start', {
                    url: '/',
                    templateUrl: 'html/start.layout.html',
                    controller: 'startController as start'
                })
                .state('game', {
                    url: '/game',
                    templateUrl: 'html/game.layout.html',
                    controller: 'gameController'
                });
          }]);

})();
