var app = angular.module('SimpleChat', ['ngMaterial', 'ngRoute'])
    .controller('MainCtrl', function($scope, $route, $routeParams, $location) {})
    .controller('ChatCtrl', function($scope, $routeParams) {

        $scope.sendMessage = function() {}
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
    })
    .config(function($routeProvider, $locationProvider) {
        $routeProvider.when('/', {
            templateUrl: '/views/login.html'
        }).when('/signup', {
            templateUrl: '/views/register.html'
        }).when('/chat', {
            templateUrl: '/views/chat.html',
            controller: 'ChatCtrl'
        });
    });
