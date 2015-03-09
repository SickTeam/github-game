(function() {
  angular.module('githubgame')

    .controller('GameController', ['$scope', '$rootScope', '$routeParams', function ($scope, $rootScope, $routeParams) {
      $scope.params = $routeParams;
    }]);

})();
