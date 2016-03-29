//(function(){
//    angular
//        .module("FormBuilderApp")
//        .controller("LoginController", LoginController);
//
//    function LoginController($scope, $location, UserService){
//        $scope.$location = $location;
//        $scope.login = function(){
//            var username = $scope.username;
//            var password = $scope.password;
//            if(username == null || password == null) {
//                alert("Credentials cannot be empty");
//            }
//            else {
//                $scope.currentUser = UserService.findUserByCredentials(username, password);
//                $location.path("/home");
//            }
//        }
//    }
//})();
"use strict";

(function(){
    angular
        .module("NewsApp")
        .controller("LoginController", LoginController);

    function LoginController($scope, $rootScope, $location, UserService){
        $scope.login = function(){
            var username = $scope.username;
            var password = $scope.password;
            UserService.findUserByCredentials(username, password, function(user) {
                if(user == null) {
                    alert("Incorrect Credentials");
                    return;
                }
                $rootScope.user = user;
                $location.path("/home");
            });
        }
    }
})();