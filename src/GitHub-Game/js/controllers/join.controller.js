(function () {
    'use strict';

    angular
        .module('github-game')
        .controller('joinController', joinController);

    joinController.$inject = ['params'];

    function joinController(params) {
        var vm = this;

        activate();

        function activate() {
            vm.params = params;
        }
    }
})();
