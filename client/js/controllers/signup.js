angular.module('SimpleChat')
    .controller('SignupCtrl', function($scope, $location, $http) {
        $scope.user = {};

        $scope.submit = function(form) {
            $scope.error = {}; //reset errors
            var user = $scope.user;
            if (user.password !== user.confirmation) {
                form.password.$error.invalid = true;
            } else {
                $http.post('/api/signup', user).then(function(res) {
                    $location.url('/chat');
                    $scope.user = {}; //reset user
                }).catch(function(err) {
                    $scope.error = err.data.error;
                    if ($scope.error) {
                        form[$scope.error.type].$error.dbError = true;
                    }
                });
            }
        };
    });
