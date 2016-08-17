var app = angular.module('SimpleChat', ['ngMaterial', 'ngRoute', 'ngMessages'])
    .controller('MainCtrl', function($scope, $route, $routeParams, $location) {

    })
    .config(function($routeProvider, $locationProvider, socketServiceProvider) {
        $routeProvider.when('/', {
            templateUrl: '/views/login.html',
            controller: 'LoginCtrl',
            resolve: {
                checkAuthorization: function($q, $location, Auth) {
                    var q = $q.defer();
                    if (!Auth.authorized()) {
                        q.resolve();
                    } else {
                        q.reject();
                        $location.url('/chat');
                    }
                    return q.promise;
                }
            }
        }).when('/signup', {
            templateUrl: '/views/signup.html',
            controller: 'SignupCtrl',
            resolve: {
                checkAuthorization: function($q, $location, Auth) {
                    var q = $q.defer();
                    if (!Auth.authorized()) {
                        q.resolve();
                    } else {
                        q.reject();
                        $location.url('/chat');
                    }
                    return q.promise;
                }
            }
        }).when('/chat', {
            templateUrl: '/views/chat.html',
            controller: 'ChatCtrl',
            resolve: {
                checkAuthorization: function($q, $location, Auth) {
                    var q = $q.defer();
                    if (Auth.authorized()) {
                        socketServiceProvider.startSocket('192.168.1.233:3000/', Auth.getToken());
                        q.resolve();
                    } else {
                        q.reject();
                        $location.url('/');
                    }
                    return q.promise;
                }
            }
        }).otherwise({
            redirectTo: '/'
        });
    });
