(function() {
  angular.module('githubgame')

    .config(function($resourceProvider) {
      $resourceProvider.defaults.stripTrailingSlashes = false;
      })

    .constant('ghUrl', 'https://api.github.com')

    .factory('Repos', ['$resource', 'ghUrl', function ($resource, ghUrl) {
      return $resource(ghUrl + '/repos/:owner/:repo/contributors');
    }])

    .factory('Commits', ['$resource', 'ghUrl', function ($resource, ghUrl) {
      return $resource(ghUrl + '/repos/:owner/:repo/commits/:sha?per_page=100&page=:pagenum', { pagenum: '1'});
    }]);

})();