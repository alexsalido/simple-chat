angular.module('SimpleChat')
    .controller('ChatCtrl', function($scope, socketService, $timeout, Auth) {
        var conversationBox = document.getElementById('conversation-box');
        $scope.user = Auth.getCurrentUser();

        $scope.logout = Auth.logout;

        $scope.message = '';

        $scope.conversation = [{
            message: 'Hello!',
            type: 'received'
        }, {
            message: 'How are you?',
            type: 'received'
        }, {
            message: 'Good, thanks!',
            type: 'sent'
        }];

        /** Scrolls conversationBox to bottom when message is sent/received */
        function scrollToBottom() {
            $timeout(function() {
                conversationBox.scrollTop = conversationBox.scrollHeight;
            }, 0);
        }

        /** Sends message to server. */
        $scope.sendMessage = function() {
            if ($scope.message !== '') {
                $scope.conversation.push({
                    message: $scope.message,
                    type: 'sent'
                });
                socketService.sendMessage($scope.message);
                $scope.message = '';
                scrollToBottom();
            }
        };

        /**
         * Triggers when message is received.
         * @param {string} message - Message received from server
         */
        $scope.messageReceived = function(message) {
            $scope.conversation.push({
                message: message,
                type: 'received'
            });
            scrollToBottom();
        };

        socketService.syncMessages($scope.messageReceived);
    });
