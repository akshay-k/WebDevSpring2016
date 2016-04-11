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
                })

            //vm.updateUser = updateUser;
        }
        init();


        function updateUser(user){
            UserService
                .updateUser(user._id, user)
                .then(function (response) {
                    //if(response.data){
                    //    console.log("Hello");
                    //    UserService.setCurrentUser(user);
                    //}
                    //vm.updatedUser = response.data;
                    //UserService.setCurrentUser(vm.updatedUser);

                    //UserService
                    //    .getCurrentUser()
                    //    .then(function (response) {
                    //        UserService.setCurrentUser(response.data);
                    //        //console.log(response);
                    //    })

                    var user = response.data;
                    UserService.setCurrentUser(user);

                });
            //UserService
            //    .findUserByUserId(user._id)
            //    .then(function (response) {
            //        console.log(response);
            //        vm.updatedUser = response.data;
            //        UserService.setCurrentUser(vm.updatedUser);
            //    });
            //UserService
            //    .getCurrentUser()
            //    .then(function (response) {
            //        //vm.currentuser = response.data;
            //        UserService.setCurrentUser(response.data);
            //        console.log(response);
            //    })
        }

        //$scope.currentuser = angular.copy($rootScope.user);
        ////$rootScope.$watch("user", function(){
        ////    currentUser = $rootScope.user;
        ////})
        ////currentuser = $rootScope.user;
        //console.log($rootScope.user != null && $rootScope.user.roles.indexOf("admin") > -1);
        //
        //$scope.updateUser = function(newuser) {
        //    //newuser["_id"] = $scope.currentuser._id;
        //    //newuser["roles"] = $scope.currentuser.roles;
        //
        //    UserService.updateUser(newuser._id, newuser, function(updatedUser){
        //        $rootScope.user = angular.copy(updatedUser);
        //    })
        //}
    }
})();