(function () {
    angular

        .module('github-game')
        .controller('gameController', gameController);

    gameController.$inject = ['$scope', 'gitHubService', 'params', 'commits'];

    function gameController($scope, gitHubService, params, commits) {
        var vm = this;

        vm.contributors = params.contributors.split(',');
        vm.contributors = vm.contributors.map(function (x) {
            return { login: x, trueNeg: false, truePos: false, falsePos: false };
        });
        vm.commits = commits;
        vm.stats = { correct: 0, incorrect: 0, total: 0, remaining: commits.length };

        $scope.$on('commit-get', function (event, sha) {
            gitHubService.getCommit(params.owner, params.repo, sha)
                .then(function (result) {
                    $scope.$broadcast('commit-retrieved', {
                        sha: result.data.sha,
                        message: result.data.commit.message,
                        committer: result.data.author.login,
                        additions: result.data.stats.additions,
                        deletions: result.data.stats.deletions
                    });
                });
        });

        $scope.$on('commit-retrieved', function (event, commit) {
            vm.commit = commit;
            vm.stats.remaining--;
            vm.guessed = false;
            vm.ready = true;
            vm.contributors.forEach(function (x) {
                x.trueNeg = x.truePos = x.falsePos = false;
            });
        });

        vm.makeGuess = function (con) {
            vm.guessed = true;
            vm.ready = true;
            vm.stats.total++;
            if (con.login == vm.commit.committer) {
                vm.stats.correct++;
                con.truePos = true;
            }
            else {
                vm.stats.incorrect++;
                con.falsePos = true;
                vm.contributors.forEach(function (x) {
                    if (x.login == vm.commit.committer)
                        x.trueNeg = true;
                });
            }
        };

        vm.nextCommit = function () {
            vm.commit = undefined;
            vm.ready = false;
            $scope.$broadcast('commit-get', vm.commits.pop());
        };

        vm.nextCommit();
    }

})();
