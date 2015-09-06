(function () {
    'use strict';

    angular
        .module('github-game')
        .directive('resolveLoaderButton', resolveLoaderButton);

    resolveLoaderButton.$inject = ['$rootScope', '$timeout'];

    function resolveLoaderButton($rootScope, $timeout) {
        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element, attrs) {
            var unregister = $rootScope.$on('$stateChangeStart', function () {
                element.addClass('disabled');
                var i = element.find('i');
                i.removeClass('fa-arrow-right');
                i.addClass('fa-spinner fa-spin');
            });

            scope.$on('$destroy', unregister);
        }
    }

})();