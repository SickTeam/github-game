(function () {
    'use strict';

    angular
        .module('github-game')
        .factory('messageService', messageService);

    messageService.$inject = ['$http', '$interval', '$q', '$timeout'];

    function messageService($http, $interval, $q, $timeout) {
        var CHECK_INTERVAL = 5000;
        var timestamp;
        var getMessages;

        var service = {
            start: start,
            stop: stop
        };

        return service;

        function start() {
            $interval(getMessages, CHECK_INTERVAL);
        }

        function stop() {
            $interval.cancel(getMessages);
        }

        function getMessages() {
            return $q(function (resolve, reject) {
                $timeout(() => resolve({ name: 'bogus', resource: { whatever: 'jah' } }), 350);
            }).then(function (data) {
                handleMessage(data.name, data.resource);
            });
        }

        function handleMessage(name, resource) {
            switch (name) {

            }
        }
    }
})();