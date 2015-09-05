(function () {
    angular.module('github-game')

      .constant('ghUrl', 'https://api.github.com')

      .factory('gitHubService', ['$http', '$q', 'ghUrl', function ($http, $q, ghUrl) {
          var PER_PAGE = 100;

          var service = {
              getCurrentUser: getCurrentUser,
              getContributors: getContributors,
              getCommit: getCommit,
              getCommits: getCommits,
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

          function getCommits(owner, repo) {
              return getContributors(owner, repo)
                  .then(function (result) {
                      var promises = [];
                      angular.forEach(result.data, function (contributor) {
                          for (var i = 1; (i * PER_PAGE - PER_PAGE) < contributor.contributions; ++i) {
                              var promise = $http({
                                  method: 'GET',
                                  url: ghUrl + '/repos/' + owner + '/' + repo + '/commits',
                                  params: { author: contributor.login, per_page: PER_PAGE, page: i }
                              });
                              promises.push(promise);
                          }
                      });

                      return $q.all(promises);
                  })
                  .then(function (result) {
                      var SHAs = [];

                      angular.forEach(result, function (commitsArr) {
                          angular.forEach(commitsArr.data, function (commit) {
                              SHAs.push(commit.sha);
                          });
                      });

                      for (var j, x, i = SHAs.length; i; j = Math.floor(Math.random() * i), x = SHAs[--i], SHAs[i] = SHAs[j], SHAs[j] = x);

                      return SHAs;
                  });
          }

          function getUserRepos(user) {
              return $http.get(ghUrl + '/users/' + user + '/repos');
          }
      }]);

})();