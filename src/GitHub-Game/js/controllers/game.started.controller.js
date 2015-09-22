(function () {
    'use strict';

    angular
        .module('github-game')
        .controller('gameActualController', gameActualController);

    gameActualController.$inject = ['$rootScope', 'params'];

    function gameActualController($rootScope, params) {
        var vm = this;

        activate();

        function activate() {
            vm.params = params;
            console.log(params);

            $rootScope.$on('roundstart', _handleRoundStart);
            $rootScope.$on('roundguess', _handleRoundGuess);
            $rootScope.$on('rounddone', _handleRoundDone);
        }

        function _handleRoundStart(resource) {

        }
        
        function _handleRoundGuess(resource) {

        }

        function _handleRoundDone(resource) {

        }
    }
})();
