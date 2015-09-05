(function () {
    angular.module('github-game')

      .constant('ghUrl', 'https://api.github.com')

      .factory('gitHubService', ['$http', 'ghUrl', function ($http, ghUrl) {
          var service = {
              getCurrentUser: getCurrentUser,
              getContributors: getContributors,
              getCommit: getCommit,
              getUserRepos: getUserRepos
          };

          return service;

          function getCurrentUser(token) {
              return $http.get(ghUrl + '/user', token ? { headers: { Authorization: 'token ' + token } } : {});
          }

          function getContributors(owner, repo) {
              return $http.get(ghUrl + '/repos/' + owner + '/' + repo + '/contributors');
          }

          function getCommit(owner, repo, sha) {
              return $http.get(ghUrl + '/repos/' + owner + '/' + repo + '/commits/' + sha, { per_page: 100, page: 1 });
          }

          function getUserRepos(user) {
              return $http.get(ghUrl + '/users/' + user + '/repos');
          }
      }]);

})();