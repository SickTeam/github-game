(function () {
    'use strict';

    angular
        .module('github-game')
        .directive('ownerExists', ownerExists);

    ownerExists.$inject = ['$timeout', 'gitHubService'];

    function ownerExists($timeout, gitHubService) {
        var directive = {
            link: link,
            restrict: 'A',
            require: 'ngModel'
        };
        return directive;

        function link(scope, element, attrs, ngModel) {
            var stop_timeout;
            return scope.$watch(function () { return ngModel.$modelValue; }, function (newName, oldName) {
                $timeout.cancel(stop_timeout);

                if (!newName) {
                    ngModel.$setPristine();
                    return;
                }

                stop_timeout = $timeout(function () {
                    scope.vs.checkingOwner = true;
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
                }, 1000);
            });
        }
    }

})();