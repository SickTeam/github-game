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

    .directive('ownerExists', ['$resource', '$timeout', 'UserRepos', 'OrgRepos', 'ghUrl', function ($resource, $timeout, UserRepos, OrgRepos, ghUrl) {
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
              scope.checkingOwner = true;
              Model.query(null, function (models) {
                if (scope.isOrg)
                  OrgRepos.query({ org: name }, function (repos) {
                    scope.repos = repos.map(function (val) {
                      return val.name;
                    });
                  });
                else
                  UserRepos.query({ user: name }, function (repos) {
                    scope.repos = repos.map(function (val) {
                      return val.name;
                    });
                  });
                scope.checkingOwner = false;
                return ngModel.$setValidity('exists', true);
              }, function () { scope.checkingOwner = false; });
            }, 500);
          });
        }
      };
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