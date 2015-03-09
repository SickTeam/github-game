(function() {
  angular.module('githubgame')

    .constant('ghUrl', 'https://api.github.com')

    .factory('Contributors', ['$resource', 'ghUrl', function ($resource, ghUrl) {
      return $resource(ghUrl + '/repos/:owner/:repo/contributors');
    }])

    .factory('Commits', ['$resource', 'ghUrl', function ($resource, ghUrl) {
      return $resource(ghUrl + '/repos/:owner/:repo/commits/:sha');
    }])

    .factory('UserRepos', ['$resource', 'ghUrl', function ($resource, ghUrl) {
      return $resource(ghUrl + '/users/:user/repos');
    }])

    .factory('OrgRepos', ['$resource', 'ghUrl', function ($resource, ghUrl) {
      return $resource(ghUrl + '/orgs/:org/repos');
    }]);

})();