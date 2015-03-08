(function() {
  angular.module('githubgame')

    .constant('ghUrl', 'https://api.github.com')

    .factory('Repo', ['$rootScope', '$resource', 'ghUrl', function ($rootScope, $resource, ghUrl) {
      return $resource(ghUrl + '/repos/:owner/:repo/contributors');
    }]);

})();