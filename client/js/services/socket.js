angular.module('SimpleChat')
    .provider('socketService', function socketServiceProvider() {
        var socket;
        this.startSocket = function(server, token) {
            socket = io(server, {
                'query': 'token=' + token
            });

            socket.on('connect', function() {
                console.log('Successful connect to Socket.io');
            });
        };

        this.$get = function() {
            return {
                sendMessage: function(message) {
                    socket.emit('message', {
                        message: message
                    });
                },
                syncMessages: function(cb) {
                    socket.on('message', function(data) {
                        cb(data.message);
                    });
                }
            };
        };
    });
