(function() {
  angular.module('githubgame')

    .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
      $locationProvider.html5Mode({ enabled: true, requireBase: false });
      $locationProvider.hashPrefix('!');
      $routeProvider
        .when('/start', {
          templateUrl: 'partials/start.partial.htm',
          controller: 'StartController'
        })
        .otherwise({
          templateUrl: 'partials/start.partial.htm',
          controller: 'StartController'
        });
    }]);

})();
