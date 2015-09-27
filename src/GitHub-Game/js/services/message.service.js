(function () {
    'use strict';

    angular
        .module('github-game')
        .factory('messageService', messageService);

    messageService.$inject = ['$rootScope', '$http', '$interval', '$q', '$timeout', 'github-game.config'];

    function messageService($rootScope, $http, $interval, $q, $timeout, config) {
        var self = this;
        var CHECK_INTERVAL = 2000;
        var timestamp;
        var cancelMessages;
        var gameId;

        var service = {
            start: start,
            stop: stop
        };

        return service;

        function start(gameId) {
            self.gameId = gameId;
            cancelMessages = $interval(getMessages, CHECK_INTERVAL);
        }

        function stop() {
            self.gameId = null;
            $interval.cancel(cancelMessages);
        }

        function getMessages() {
            if (!self.timestamp)
                self.timestamp = new Date();

            return $http({
                method: 'GET',
                url: `${config.apiUrl}/game/${self.gameId}/messages`,
                headers: { 'If-Modified-Since': self.timestamp.toISOString() }
            }).then(function (response) {
                var newTimestamp = new Date(response.data.timestamp);
                var messages = response.data.messages;
                console.log(`${messages.length} new message(s) at ${newTimestamp.toISOString()}.`);

                self.timestamp = newTimestamp;

                for (var message in messages)
                    broadcastMessage(message.name, message.resource);
            }, (response) => {
                if (response.status === 304)
                    console.log("No new messages.");
            });
        }

        function broadcastMessage(name, resource) {
            $rootScope.$broadcast(name, resource);
        }
    }
})();
