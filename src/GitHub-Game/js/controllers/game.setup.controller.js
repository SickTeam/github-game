(function () {
    'use strict';

    angular
        .module('github-game')
        .controller('gameSetupController', gameSetupController);

    gameSetupController.$inject = ['params', 'setup'];

    function gameSetupController(params, setup) {
        var vm = this;

        vm.contributors = setup.contributors;
        vm.options = extractOptions(setup);

        activate();

        function activate() {

        }

        function extractOptions(options) {
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
