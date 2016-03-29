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
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController(UserService, $location){

        var vm = this;

        vm.login = login;

        function init(){
            vm.$location = $location;
        }
        init();
        //console.log("hello");
        function login(){
            if(!vm.username || !vm.password){
                console.log("hello");
                return user;
            }
            UserService
                .findUserByCredentials({
                    username: vm.username,
                    password: vm.password
                })
                .then(function (response) {
                    if(response.data){
                        UserService.setCurrentUser(response.data);
                        $location.url("/home");
                    }
                    else {
                        alert("Incorrect Credentials");
                    }
                });
        }
        //$scope.login = function(){
        //    var username = $scope.username;
        //    var password = $scope.password;
        //    UserService.findUserByCredentials(username, password, function(user) {
        //        if(user == null) {
        //            alert("Incorrect Credentials");
        //            return;
        //        }
        //        $rootScope.user = user;
        //        $location.path("/home");
        //    });
        //}
    }
})();