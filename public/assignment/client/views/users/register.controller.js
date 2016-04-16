"use strict";

(function(){
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, UserService){

        var vm = this;

        vm.createUser = createUser;

        function init(){
            vm.$location = $location;
        }
        init();

        function createUser(user){
            if( user.password == null || user.verifypassword == null ||user.password != user.verifypassword){
                alert("Password don't match");
                return;
            }
            UserService
                .createUser(user)
                .then(function (response) {
                    var currentUser = response.data;
                    if(currentUser != null){
                        UserService.setCurrentUser(response.data);
                        $location.url("/profile");
                    }
                    else{
                        alert("Username already present");
                    }
                });
        }
    }
})();