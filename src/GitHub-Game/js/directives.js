(function () {
    angular.module('githubgame')

      .directive('keyEnter', function () {
          return function (scope, element, attrs) {
              element.bind("keydown keypress", function (event) {
                  if (event.which === 13) {
                      scope.$apply(function () {
                          scope.$eval(attrs.keyEnter);
                      });
                      event.preventDefault();
                  }
              });
          };
      })

      .directive('keyEscape', function () {
          return function (scope, element, attrs) {
              element.bind("keydown keypress", function (event) {
                  if (event.which === 27) {
                      scope.$apply(function () {
                          scope.$eval(attrs.keyEscape);
                      });
                      event.preventDefault();
                  }
              });
          };
      })

      .directive('clickFocus', ['$timeout', function ($timeout) {
          return function (scope, element, attrs) {
              scope.$watch(attrs.clickFocus,
                function (newValue) {
                    $timeout(function () {
                        if (newValue)
                            element[0].focus();
                        element[0].select();
                    });
                }, true);
          };
      }])

      .directive('ownerExists', ['$timeout', 'GitHubService',
          function ($timeout, GitHubService) {
              return {
                  restrict: 'A',
                  require: 'ngModel',
                  link: function (scope, element, attrs, ngModel) {
                      var stop_timeout;
                      return scope.$watch(function () {
                          return ngModel.$modelValue;
                      }, function (name) {
                          $timeout.cancel(stop_timeout);

                          if (!name)
                              return;

                          stop_timeout = $timeout(function () {
                              scope.checkingOwner = true;
                              if (scope.isOrg)
                                  GitHubService.getOrgRepos(name)
                                    .then(function (response) {
                                        scope.repos = response.data.map(function (x) {
                                            return x.name;
                                        });
                                    }, function () {
                                        return ngModel.$setValidity('exists', false);
                                    }).finally(function () {
                                        scope.checkingOwner = false;
                                    });
                              else
                                  GitHubService.getUserRepos(name)
                                    .then(function (response) {
                                        scope.repos = response.data.map(function (x) {
                                            return x.name;
                                        });
                                    }, function () {
                                        return ngModel.$setValidity('exists', false);
                                    }).finally(function () {
                                        scope.checkingOwner = false;
                                    });
                              return ngModel.$setValidity('exists', true);
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