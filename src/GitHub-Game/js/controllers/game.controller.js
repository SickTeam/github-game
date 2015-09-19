(function () {
    angular

        .module('github-game')
        .controller('gameController', gameController);

    gameController.$inject = ['$rootScope', '$scope', 'params', 'players', 'messageService'];

    function gameController($rootScope, $scope, params, players, messageService) {
        var vm = this;

        activate();

        function activate() {
            vm.params = params;
            vm.players = players;

            $rootScope.$on('players', _handlePlayers);
            $scope.$on('$destroy', () => {
                messageService.stop();
            });

            messageService.start();
        }

        function _handlePlayers(resource) {
            vm.players.push(resource);
        }
    }

})();
