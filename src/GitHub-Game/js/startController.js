(function () {
    angular
        .module('githubgame')
        .controller('startController', startController);

    startController.$inject = ['toastr', 'GitHubService'];

    function startController(toastr, GitHubService) {
        var vm = this;

        vm.viewState = {
            repoName: '',
            ownerName: ''
        };

        vm.pickRepo = function (item, model, label) {
            GitHubService.getContributors(vm.viewState.ownerName, item)
                .then(function (response) {
                    vm.contributors = response.data.map(function (x) {
                        return { login: x.login, contributions: x.contributions, selected: true };
                    });
                }, function (response) {
                    toastr.error('Could not retrieve contributors for ' + vm.viewState.ownerName + '.', 'Error');
                });
        };

        vm.startGame = function (ownerName, repoName, contributors) {
            //var contribs = '';
            //contributors.forEach(function (x) {
            //    if (x.selected) {
            //        if (contribs !== '')
            //            contribs = contribs + ',' + x.login;
            //        else
            //            contribs = x.login;
            //    }
            //});
            //$location.url('/game?owner=' + ownerName + '&repo=' + repoName + '&contributors=' + contribs);
        };
    }

})();