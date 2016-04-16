"use strict";

(function(){
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController(UserService){

        var vm = this;

        vm.updateUser = updateUser;

        function init(){
            UserService
                .getCurrentUser()
                .then(function(response) {
                    vm.newUser = response.data;
                    vm.newUser['password'] = "";
                })

            //vm.updateUser = updateUser;
        }
        init();

        function updateUser(user){
            UserService
                .updateUser(user._id, user)
                .then(function (response) {
                    var user = response.data;
                    UserService.setCurrentUser(user);
                });
        }
    }
})();