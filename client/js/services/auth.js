angular.module('SimpleChat')
    .factory('Auth', function($http, $location, $q) {
        return {
            login: function(user, cb) {
                $http.post('/api/login', user).then(function(res) {
                    if (res.data.token) {
                        localStorage.setItem('token', res.data.token);
                        cb();
                    }
                }).catch(function(err) {
                    cb(err);
                });
            },
            logout: function() {
                localStorage.removeItem('token');
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
                return localStorage.getItem('token');
            },
            authorized: function() {
                if (this.getToken()) {
                    return true;
                } else {
                    return false;
                }
            }
        };
    });
