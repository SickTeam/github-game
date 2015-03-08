(function() {
  angular.module('githubgame')

    .directive('keyEnter', function () {
      return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
          if(event.which === 13) {
              scope.$apply(function (){
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
          if(event.which === 27) {
              scope.$apply(function (){
                  scope.$eval(attrs.keyEscape);
              });
              event.preventDefault();
          }
        });
      };
    })

    .directive('clickFocus', ['$timeout', function($timeout) {
      return function(scope, element, attrs) {
        scope.$watch(attrs.clickFocus, 
          function (newValue) { 
            $timeout(function() {
                if (newValue)
                  element[0].focus();
                  element[0].select();
            });
          }, true);
      };    
    }]);

})();