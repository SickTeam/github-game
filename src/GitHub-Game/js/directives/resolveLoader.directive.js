(function () {
    'use strict';

    angular
        .module('github-game')
        .directive('resolveLoader', resolveLoader);

    resolveLoader.$inject = ['$rootScope', '$timeout'];

    function resolveLoader($rootScope, $timeout) {
        var directive = {
            link: link,
            restrict: 'A',
            replace: true
        };
        return directive;

        function link(scope, element, attrs) {
            $rootScope.$on('$stateChangeStart', function (event, currentRoute, previousRoute) {
                if (previousRoute) return;

                $timeout(function () {
                    element.removeClass('ng-hide');
                });
            });

            $rootScope.$on('$stateChangeSuccess', function () {
                element.addClass('ng-hide');
            });
        }
    }

})();