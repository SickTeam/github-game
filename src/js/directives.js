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
    }])

    .directive('ownerExists', ['$resource', '$timeout', 'ghUrl', function ($resource, $timeout, ghUrl) {
      return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, element, attrs, ngModel) {
          var stop_timeout;
          return scope.$watch(function() {
            return ngModel.$modelValue;
          }, function (name) {
            $timeout.cancel(stop_timeout);
     
            if (!name)
              return;
     
            var path = scope.isOrg ? '/orgs/' : '/users/';
            var Model = $resource(ghUrl + path + name, null, {
              query: { isArray: false }
            });
   
            stop_timeout = $timeout(function () {
               Model.query(null, function(models) {
                  console.log(models);
                  return ngModel.$setValidity('exists', true);
               });
            }, 500);
          });
        }
      };
    }]);

})();