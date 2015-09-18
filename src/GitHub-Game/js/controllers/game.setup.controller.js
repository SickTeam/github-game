(function () {
    'use strict';

    angular
        .module('github-game')
        .controller('gameSetupController', gameSetupController);

    gameSetupController.$inject = ['params', 'setup'];

    function gameSetupController(params, setup) {
        var vm = this;

        vm.contributors = setup.contributors;

        activate();

        function activate() {

        }
    }
})();
