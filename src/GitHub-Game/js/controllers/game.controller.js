(function () {
    angular

        .module('github-game')
        .controller('gameController', gameController);
    
    gameController.$inject = ['$stateParams', 'params'];

    function gameController($stateParams, params) {
        console.log(params);
        //$scope.contributors = $routeParams.contributors.split(',');
        //$scope.contributors = $scope.contributors.map(function(x) {
        //  return { login: x, trueNeg: false, truePos: false, falsePos: false };
        //});
        //$scope.commits = [];
        //$scope.stats = { correct: 0, incorrect: 0, total: 0, remaining: 0};

        //$scope.$on('commit-get', function(event, sha) {
        //  Commits.get( { owner: $routeParams.owner, repo: $routeParams.repo, sha: sha}, function(data, headers) {
        //    $scope.$broadcast('commit-retrieved', { sha: sha, message: data.commit.message, committer: data.author.login, additions: data.stats.additions, deletions: data.stats.deletions });
        //  });
        //});

        //$scope.$on('commit-retrieved', function(event, commit) {
        //  $scope.commit = commit;
        //  $scope.stats.remaining--;
        //  $scope.guessed = false;
        //  $scope.ready = true;
        //  $scope.contributors.forEach(function(x) {
        //    x.trueNeg = x.truePos = x.falsePos = false;
        //  });
        //});

        //$scope.makeGuess = function(con) {
        //  $scope.guessed = true;
        //  $scope.ready = true;
        //  $scope.stats.total++;
        //  if (con.login == $scope.commit.committer) {
        //    $scope.stats.correct++;
        //    con.truePos = true;
        //  }
        //  else {
        //    $scope.stats.incorrect++;
        //    con.falsePos = true;
        //    $scope.contributors.forEach(function(x) {
        //      if (x.login == $scope.commit.committer)
        //        x.trueNeg = true;
        //    });
        //  }
        //};

        //$scope.nextCommit = function() {
        //  $scope.ready = false;
        //  $scope.$broadcast('commit-get', $scope.commits.pop());
        //};

    }

})();
