var app = angular.module('SimpleChat', ['ngMaterial', 'ngRoute', 'ngMessages', 'ngResource'])
    .controller('MainCtrl', function($scope, $route, $routeParams, $location) {

    })
    .config(function($routeProvider, $locationProvider, socketServiceProvider) {
        $routeProvider.when('/', {
            templateUrl: '/views/login.html',
            controller: 'LoginCtrl',
            resolve: {
                checkAuthorization: function($q, $location, Auth) {
                    var q = $q.defer();
                    Auth.isAuthorized(function(authorized) {
                        if (!authorized) {
                            q.resolve();
                        } else {
                            $location.url('/chat');
                            q.reject();
                        }
                    });
                    return q.promise;
                },
            }
        }).when('/signup', {
            templateUrl: '/views/signup.html',
            controller: 'SignupCtrl',
            resolve: {
                checkAuthorization: function($q, $location, Auth) {
                    var q = $q.defer();
                    Auth.isAuthorized(function(authorized) {
                        if (!authorized) {
                            q.resolve();
                        } else {
                            $location.url('/chat');
                            q.reject();
                        }
                    });
                    return q.promise;
                },
            }
        }).when('/chat', {
            templateUrl: '/views/chat.html',
            controller: 'ChatCtrl',
            resolve: {
                checkAuthorization: function($q, $location, Auth) {
                    var q = $q.defer();
                    Auth.isAuthorized(function(authorized) {
                        if (authorized) {
                            socketServiceProvider.startSocket('192.168.1.233:3000', Auth.getToken());
                            q.resolve();
                        } else {
                            $location.url('/');
                            q.reject();
                        }
                    });
                    return q.promise;
                },
            }
        }).otherwise({
            redirectTo: '/'
        });
    });
