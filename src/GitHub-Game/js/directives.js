(function () {
    angular.module('githubgame')

      .directive('ownerExists', ['$timeout', 'gitHubService',
          function ($timeout, gitHubService) {
              return {
                  restrict: 'A',
                  require: 'ngModel',
                  link: function (scope, element, attrs, ngModel) {
                      var stop_timeout;
                      return scope.$watch(function () { return ngModel.$modelValue; }, function (newName, oldName) {
                          $timeout.cancel(stop_timeout);

                          if (!newName) {
                              ngModel.$setPristine();
                              return;
                          }

                          stop_timeout = $timeout(function () {
                              scope.vs.checkingOwner = true;
                              if (scope.vs.isOrg) {
                                  gitHubService.getOrgRepos(newName)
                                    .then(function (response) {
                                        scope.vs.repos = response.data.map(function (x) {
                                            return x.name;
                                        });
                                        return ngModel.$setValidity('exists', true);
                                    }, function () {
                                        return ngModel.$setValidity('exists', false);
                                    }).finally(function () {
                                        scope.vs.checkingOwner = false;
                                    });
                              }
                              else {
                                  gitHubService.getUserRepos(newName)
                                    .then(function (response) {
                                        scope.vs.repos = response.data.map(function (x) {
                                            return x.name;
                                        });
                                        return ngModel.$setValidity('exists', true);
                                    }, function () {
                                        return ngModel.$setValidity('exists', false);
                                    }).finally(function () {
                                        scope.vs.checkingOwner = false;
                                    });
                              }
                          }, 500);
                      });
                  }
              }
          }])

      .directive('contributorsSelected', [function () {
          return {
              restrict: 'A',
              require: 'ngModel',
              link: function (scope, element, attrs, ngModel) {
                  return scope.$watch('contributors', function (contribs) {
                      if (!contribs)
                          return ngModel.$setValidity('enoughChecked', false);
                      else
                          return ngModel.$setValidity('enoughChecked',
                            (function (x) {
                                var noChecked = 0;
                                for (var i = 0; i < x.length; i++)
                                    if (x[i].selected)
                                        noChecked++;
                                return noChecked > 1;
                            })(contribs));
                  }, true);
              }
          };
      }]);

})();