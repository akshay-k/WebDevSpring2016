"use strict";

(function(){
    angular
        .module("NewsApp")
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
                //console.log("hello");
                alert("Enter Valid Credentials to Login");
                return;
            }
            UserService
                .findUserByCredentials({
                    username: vm.username,
                    password: vm.password
                })
                .then(function (response) {
                    if (response.data) {
                        UserService.setCurrentUser(response.data);
                        $location.url("/home");
                        //console.log(response);
                    }
                },
                    function (err) {
                        alert("Incorrect Credentials");
                    }
                );
        }
    }
})();