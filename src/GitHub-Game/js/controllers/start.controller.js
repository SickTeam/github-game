(function () {
    angular
        .module('github-game')
        .controller('startController', startController);

    startController.$inject = ['$state', 'authService', 'apiService'];

    function startController($state, authService, apiService) {
        var vm = this;

        vm.createGame = createGame;

        activate();

        function activate() {
            vm.vs = {
                repository: '',
                username: ''
            };
        }

        function createGame() {
            var repo = splitRepo(vm.vs.repository);

            apiService.createGame(splitRepo.owner, splitRepo.repo, vm.vs.username)
                .then(function (data) {
                    authService.setToken(data.gameId, data.userId);
                    $state.go('game.setup', { gameId: data.gameId });
                });
        }

        function splitRepo(repository) {
            return { owner: 'sw701e14', repo: 'code' };
        }
    }

})();