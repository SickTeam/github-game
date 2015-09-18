(function () {
    angular

        .module('github-game')
        .controller('gameController', gameController);

    gameController.$inject = ['params', 'players'];

    function gameController(params, players) {
        var vm = this;

        activate();

        function activate() {
            vm.params = params;
            vm.players = players;
        }
    }

})();
