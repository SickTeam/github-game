(function () {
    'use strict';

    angular
        .module('github-game')
        .factory('messageService', messageService);

    messageService.$inject = ['$rootScope', '$http', '$interval', '$q', '$timeout', 'github-game.config'];

    function messageService($rootScope, $http, $interval, $q, $timeout, config) {
        var CHECK_INTERVAL = 2000;
        var timestamp;
        var cancelMessages;

        var service = {
            start: start,
            stop: stop
        };

        return service;

        function start() {
            cancelMessages = $interval(getMessages, CHECK_INTERVAL);
        }

        function stop() {
            $interval.cancel(cancelMessages);
        }

        function getMessages() {
            return $q(function (resolve, reject) {
                $timeout(() => resolve({ timestamp: new Date(), messages: [{ name: 'bogus', resource: { whatever: 'jah' } }] }), 50);
            }).then(function (data) {
                console.log(`${data.messages.length} new message(s) at ${data.timestamp.toJSON()}.`);
                timestamp = data.timestamp;
                for (var message in data.messages) {
                    broadcastMessage(data.name, data.resource);
                }
            });
        }

        function broadcastMessage(name, resource) {
            $rootScope.$broadcast(name, resource);
        }
    }
})();
