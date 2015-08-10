(function () {
    angular.module('githubgame')

      .constant('ghUrl', 'https://api.github.com')

      .factory('GitHubService', ['$http', 'ghUrl', function ($http, ghUrl) {
          var service = {
              getContributors: getContributors,
              getCommits: getCommits,
              getUserRepos: getUserRepos,
              getOrgRepos: getOrgRepos
          };

          return service;

          function getContributors(owner, repo) {
              return $http.get(ghUrl + '/repos/' + owner + '/' + repo + '/contributors');
          }

          function getCommits(owner, repo, sha) {
              return $http.get(ghUrl + '/repos/' + owner + '/' + repo + '/commits/' + sha, { per_page: 100, page: 1 });
          }

          function getUserRepos(user) {
              return $http.get(ghUrl + '/users/' + user + '/repos');
          }

          function getOrgRepos(org) {
              return $http.get(ghUrl + '/orgs/' + org + '/repos');
          }
      }]);

})();