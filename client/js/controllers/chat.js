angular.module('SimpleChat')
    .controller('ChatCtrl', function($scope, $routeParams, socketService, $timeout, Auth) {
        var conversationBox = document.getElementById('conversation-box');

        $scope.logout = Auth.logout;

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

        function scrollToBottom() {
            $timeout(function() {
                conversationBox.scrollTop = conversationBox.scrollHeight;
            }, 0);
        }

        $scope.sendMessage = function() {
            $scope.conversation.push({
                message: $scope.message,
                type: 'sent'
            });
            socketService.sendMessage($scope.message);
            $scope.message = '';
            scrollToBottom();
        };

        $scope.messageReceived = function(message) {
            $scope.conversation.push({
                message: message,
                type: 'received'
            });
            scrollToBottom();
        };

        socketService.syncMessages($scope.messageReceived);
    });
