(function () {
    'use strict';

    angular
        .module('github-game')
        .controller('gameSetupController', gameSetupController);

    gameSetupController.$inject = ['$rootScope', '$state', 'params', 'setup', 'apiService'];

    function gameSetupController($rootScope, $state, params, setup, apiService) {
        var vm = this;

        vm.save = save;
        vm.start = start;

        activate();

        function activate() {
            vm.contributors = setup.contributors;
            vm.options = _extractOptions(setup);
            vm.params = params;

            vm.loadingSave = false;

            $rootScope.$on('setup', _handleSetup);
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

        function _handleSetup(resource) {
            for (var key in resource)
                if (key === 'contributors')
                    vm.contributors = resource[key];
                else
                    vm.options[key] = resource[key];
        }
    }
})();
