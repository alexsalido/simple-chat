angular.module('SimpleChat')
    .controller('LoginCtrl', function($scope, $location, $http) {
        $scope.user = {};

        $scope.submit = function(form) {
            $scope.error = {}; //reset errors
            $http.post('/api/login', $scope.user).then(function(res) {
                $location.url('/chat');
                $scope.user = {}; //reset user
            }).catch(function(err) {
                $scope.error = err.data.error;
                if ($scope.error) {
                    form[$scope.error.type].$error.dbError = true;
                }
            });
        }
    });
