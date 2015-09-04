(function() {
    'use strict';

    angular
        .module('github-game')
        .directive('contributorsSelected', contributorsSelected);

    contributorsSelected.$inject = [];
    
    function contributorsSelected () {
        var directive = {
            link: link,
            restrict: 'A',
            require: 'ngModel',
        };
        return directive;

        function link(scope, element, attrs, ngModel) {
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
    }

})();