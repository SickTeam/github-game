(function () {
    angular
        .module('github-game')
        .controller('startController', startController);

    startController.$inject = ['$state', 'toastr', 'gitHubService'];

    function startController($state, toastr, gitHubService) {
        var vm = this;

        vm.viewState = {
            repoName: '',
            ownerName: ''
        };

        vm.pickRepo = function (item, model, label) {
            gitHubService.getContributors(vm.viewState.ownerName, item)
                .then(function (response) {
                    vm.contributors = response.data.map(function (x) {
                        return { login: x.login, contributions: x.contributions, selected: true };
                    });
                }, function (response) {
                    toastr.error('Could not retrieve contributors for ' + vm.viewState.ownerName + '.', 'Error');
                });
        };

        vm.startGame = function (ownerName, repoName, contributors) {
            var contribs = '';
            contributors.forEach(function (x) {
                if (x.selected) {
                    if (contribs !== '')
                        contribs = contribs + ',' + x.login;
                    else
                        contribs = x.login;
                }
            });
            $state.go('game', { owner: ownerName, repo: repoName, contributors: contribs });
        };
    }

})();