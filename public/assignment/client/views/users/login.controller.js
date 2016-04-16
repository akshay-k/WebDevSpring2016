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
                //console.log("hello");
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
                    }
                },
                    function (err) {
                        alert("Incorrect Credentials");
                    }
                );
        }
    }
})();