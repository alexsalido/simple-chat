angular.module('SimpleChat')
    .factory('User', function($resource) {
        return $resource('/api/user', {}, {
            get: {
                method: 'GET',
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            }
        });
    });
