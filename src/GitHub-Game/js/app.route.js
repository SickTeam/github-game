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
              url: '/game?owner&repo&contributors',
              templateUrl: 'html/game.layout.html',
              controller: 'gameController as game',
              resolve: {
                  params: function ($stateParams, $q) {
                      return $q.when($stateParams);
                  },
                  commits: function ($stateParams, gitHubService) {
                      var owner = $stateParams.owner;
                      var repo = $stateParams.repo;

                      return gitHubService.getCommits(owner, repo);
                  }
              }
          });
    }

})();
