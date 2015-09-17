(function () {
    angular
        .module('github-game')
        .controller('startController', startController);

    startController.$inject = [];

    function startController() {
        var vm = this;

        activate();

        function activate() {
            vm.vs = {
                repository: '',
                username: '',
                token: ''
            };
        }
    }

})();