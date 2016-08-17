angular.module('SimpleChat')
    .factory('Auth', function($http, $location, $q, User) {
        var currentUser = {};
        var token = localStorage.getItem('token');
        if (token) {
            currentUser = User.get();
        }

        return {
            getCurrentUser: function() {
                return currentUser;
            },
            login: function(user, cb) {
                $http.post('/api/login', user).then(function(res) {
                    if (res.data.token) {
                        currentUser = res.data.user;
                        token = res.data.token;
                        localStorage.setItem('token', res.data.token);
                        cb();
                    }
                }).catch(function(err) {
                    cb(err);
                });
            },
            logout: function() {
                currentUser = {};
                localStorage.removeItem('token');
                token = null;
                $location.url('/');
            },
            signup: function(user, cb) {
                $http.post('/api/signup', user).then(function(res) {
                    if (res.data.token) {
                        localStorage.setItem('token', res.data.token);
                        cb();
                    }
                }).catch(function(err) {
                    cb(err);
                });
            },
            getToken: function() {
                return token || localStorage.getItem('token');
            },
            isAuthorized: function(cb) {
                if (currentUser.hasOwnProperty('$promise')) {
                    currentUser.$promise.then(function(res) {
                        currentUser = res.toJSON();
                        cb(true);
                    }).catch(function(err) {
                        cb(false);
                    });
                } else if (currentUser.hasOwnProperty('email')) {
                    cb(true);
                } else {
                    cb(false);
                }
            }
        };
    });
