"use strict";

(function(){
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, UserService){

        var vm = this;

        vm.createUser = createUser;

        function init(){

        }
        init();

        function createUser(user){
            if(user.password != user.verifypassword){
                alert("Password don't match");
                return;
            }
            UserService
                .createUser(user)
                .then(function (response) {
                    var currentUser = response.data;
                    if(currentUser != null){
                        UserService.setCurrentUser(user);
                        $location.url("/profile");
                    }
                });
        }
        //$scope.createUser = function() {
        //        var verifypassword = $scope.currentuser.verifypassword;
        //        if ($scope.currentuser.password != verifypassword) {
        //            alert("Passwords dont match!");
        //            return;
        //        }
        //        $scope.currentuser["firstName"] = null;
        //        $scope.currentuser["lastName"] = null;
        //        $scope.currentuser["roles"] = [];
        //        UserService.createUser($scope.currentuser, function(newUser) {
        //            $rootScope.user = newUser;
        //            $location.path("/profile");
        //        });
        //}
    }
})();