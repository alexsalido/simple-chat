angular.module('SimpleChat')
    .provider('socketService', function socketServiceProvider() {
        var socket;
        /**
         * Initializes socket
         * @param {string} server - server url (url:port)
         * @param {string} token - jwt token
         */
        this.startSocket = function(server, token) {
            socket = io(server, {
                'query': 'token=' + token
            });
            socket.on('connect', function() {
                console.log('Successful connect to Socket.io');
            });
        };

        this.$get = function(Auth) {
            socket.on('error', function(err) {
                Auth.logout();
            });
            return {
                /**
                 * Sends message to server
                 * @param {object} message - message object
                 */
                sendMessage: function(message) {
                    socket.emit('message', {
                        message: message
                    });
                },
                /**
                 * Syncs messages array
                 * @param {function} cb - will execute each time a message is received with the message as an argument 
                 */
                syncMessages: function(cb) {
                    socket.on('message', function(data) {
                        cb(data.message);
                    });
                }
            };
        };
    });
