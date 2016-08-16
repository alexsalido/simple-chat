var app = angular.module('SimpleChat', ['ngMaterial', 'ngRoute'])
    .controller('MainCtrl', function($scope, $route, $routeParams, $location) {})
    .config(function($routeProvider, $locationProvider, socketServiceProvider) {
        $routeProvider.when('/', {
            templateUrl: '/views/login.html'
        }).when('/signup', {
            templateUrl: '/views/register.html'
        }).when('/chat', {
            templateUrl: '/views/chat.html',
            controller: 'ChatCtrl'
        });

        socketServiceProvider.startSocket('192.168.1.233:3000/');
    });
