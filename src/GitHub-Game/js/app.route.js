(function() {
  angular.module('githubgame')

    .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
      $locationProvider.html5Mode({ enabled: true, requireBase: false });
      $locationProvider.hashPrefix('!');
      $routeProvider
        .when('/start', {
          templateUrl: 'partials/start.partial.htm',
          controller: 'StartController'
        })
        .when('/game', {
          templateUrl: 'partials/game.partial.htm',
          controller: 'GameController'
        })
        .otherwise({
          templateUrl: 'partials/start.partial.htm',
          controller: 'StartController'
        });
    }]);

})();
