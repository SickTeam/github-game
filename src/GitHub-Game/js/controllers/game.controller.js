(function () {
    angular

        .module('github-game')
        .controller('gameController', gameController);

    gameController.$inject = ['$rootScope', '$scope', '$state', 'params', 'players', 'messageService'];

    function gameController($rootScope, $scope, $state, params, players, messageService) {
        var vm = this;

        activate();

        function activate() {
            vm.params = params;
            vm.players = players;

            $rootScope.$on('players', _handlePlayers);
            $rootScope.$on('state', _handleState);
            $scope.$on('$destroy', () => {
                messageService.stop();
            });

            messageService.start(vm.params.gameId);
        }

        function _handlePlayers(resource) {
            vm.players.push(resource);
        }

        function _handleState(event, resource) {
            $state.go(`game.${resource.state}`, vm.params);
        }
    }

})();
