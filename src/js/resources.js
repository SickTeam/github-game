(function() {
  angular.module('githubgame')

    .constant('ghUrl', 'https://api.github.com')

    .factory('Repos', ['$resource', 'ghUrl', function ($resource, ghUrl) {
      return $resource(ghUrl + '/repos/:owner/:repo/contributors');
    }])

    .factory('Commits', ['$resource', 'ghUrl', function ($resource, ghUrl) {
      return $resource(ghUrl + '/repos/:owner/:repo/commits/:sha');
    }]);

})();