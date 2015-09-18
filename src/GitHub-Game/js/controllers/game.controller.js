(function () {
    angular

        .module('github-game')
        .controller('gameController', gameController);

    gameController.$inject = ['params'];

    function gameController(params) {
        var vm = this;

        vm.params = params;

        activate();

        function activate() {

        }
    }

})();
