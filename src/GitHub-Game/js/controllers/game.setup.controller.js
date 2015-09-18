(function () {
    'use strict';

    angular
        .module('github-game')
        .controller('gameSetupController', gameSetupController);

    gameSetupController.$inject = ['params', 'setup'];

    function gameSetupController(params, setup) {
        var vm = this;

        vm.save = save;
        vm.start = start;

        activate();

        function activate() {
            vm.contributors = setup.contributors;
            vm.options = _extractOptions(setup);
        }

        function save() {

        }

        function start() {

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
