(function () {
    angular.module('github-game')

      .constant('ghUrl', 'https://api.github.com')

      .factory('gitHubService', ['$http', 'ghUrl', function ($http, ghUrl) {
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

          function getCommits(owner, repo, page) {
              page = page || 1;

              Commits.query({ owner: $routeParams.owner, repo: $routeParams.repo, page: page },
                function (data, headers) {
                    if (data !== undefined && data.length > 0) {
                        var d = data;
                        var isContributor = function (x) {
                            for (var i = 0; i < $scope.contributors.length; i++) {
                                if (x == $scope.contributors[i].login)
                                    return true;
                            }
                            return false;
                        };
                        d = d.filter(function (x) {
                            return isContributor(x.author.login);
                        });
                        d = d.map(function (x) {
                            return x.sha;
                        });
                        $scope.commits = $scope.commits.concat(d);

                        getCommits(page + 1);
                    }
                    else {
                        $scope.commits = (function (arr) {
                            for (var j, x, i = arr.length; i; j = Math.floor(Math.random() * i), x = arr[--i], arr[i] = arr[j], arr[j] = x);
                            return arr;
                        })($scope.commits);
                        $scope.stats.remaining = $scope.commits.length;
                        $scope.$broadcast('commit-get', $scope.commits.pop());
                    }
                });
          }

          function getUserRepos(user) {
              return $http.get(ghUrl + '/users/' + user + '/repos');
          }
      }]);

})();