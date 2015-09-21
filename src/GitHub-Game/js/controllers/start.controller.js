(function () {
    angular
        .module('github-game')
        .controller('startController', startController);

    startController.$inject = ['$state', 'authService', 'apiService', 'previousGameIds'];

    function startController($state, authService, apiService, previousGameIds) {
        var vm = this;

        vm.createGame = createGame;

        activate();

        function activate() {
            vm.loadingCreate = false;

            vm.previousGameIds = previousGameIds;

            vm.vs = {//TODO Remove dummy data
                repoUrl: 'https://github.com/SickTeam/github-game',
                username: 'Acemon'
            };
        }

        function createGame() {
            vm.loadingCreate = true;

            var repo = splitRepo(vm.vs.repoUrl);
            if (!repo) {
                vm.loadingCreate = false;
                //TODO Handle this error
            }

            apiService.createGame(splitRepo.owner, splitRepo.repo, vm.vs.username)
                .then((data) => {
                    authService.addAuth(data.gameId, data.userId);
                    $state.go('game.setup', { gameId: data.gameId });
                }, (errorResponse) => {
                    vm.loadingCreate = false;
                });
        }

        function splitRepo(repoUrl) {
            var regExpSplit = /((http(s?):\/\/github.com\/)|(git@github.com:))([\w\-\_]*)\/([\w\-\_]*)(\.git)?/
                .exec(repoUrl);
            var owner = regExpSplit[5];
            var repo = regExpSplit[6];

            return (owner && repo) ? { owner, repo } : null;
        }
    }

})();