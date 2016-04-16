"use strict";

(function(){
    angular
        .module("NewsApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($scope, $rootScope, $location, UserService){

        $scope.createUser = function() {
            var verifypassword = $scope.currentuser.verifypassword;
            if ($scope.currentuser.password != verifypassword) {
                alert("Passwords dont match!");
                return;
            }
            $scope.currentuser["firstName"] = null;
            $scope.currentuser["lastName"] = null;
            $scope.currentuser["roles"] = [];
            UserService.createUser($scope.currentuser, function(newUser) {
                $rootScope.user = newUser;
                $location.path("/profile");
            });
        }
    }
})();