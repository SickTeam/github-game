(function () {
    'use strict';

    angular
        .module('github-game')
        .controller('gameSetupController', gameSetupController);

    gameSetupController.$inject = ['$state', 'params', 'setup', 'apiService'];

    function gameSetupController($state, params, setup, apiService) {
        var vm = this;

        vm.save = save;
        vm.start = start;

        activate();

        function activate() {
            vm.contributors = setup.contributors;
            vm.options = _extractOptions(setup);
            vm.params = params;
            
            vm.loadingSave = false;
        }

        function save() {
            vm.loadingSave = true;

            var newSetup = {};

            apiService.putSetup(vm.params.gameId, newSetup)
                .then(response => {
                    
                })
                .finally(() => vm.loadingSave = false);
        }

        function start() {
            vm.loadingStart = true;

            apiService.putState(vm.params.gameId, 'start')
                .then((response) => {
                    $state.go('game.actual', vm.params);
                })
                .finally(() => vm.loadingStart = false);
        }

        function _extractOptions(options) {
            var extracted = [];

            for (var key in options) {
                if (key !== 'contributors') {
                    var obj = {
                        name: key,
                        active: options[key]
                    };
                    extracted.push(obj);
                }
            }

            return extracted;
        }
    }
})();
