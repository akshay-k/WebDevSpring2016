"use strict";

(function(){
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($scope, $rootScope, $location, UserService){
        $scope.currentuser = angular.copy($rootScope.user);
        //$rootScope.$watch("user", function(){
        //    currentUser = $rootScope.user;
        //})
        //currentuser = $rootScope.user;
        console.log($rootScope.user != null && $rootScope.user.roles.indexOf("admin") > -1);

        $scope.updateUser = function(newuser) {
            //newuser["_id"] = $scope.currentuser._id;
            //newuser["roles"] = $scope.currentuser.roles;

            UserService.updateUser(newuser._id, newuser, function(updatedUser){
                $rootScope.user = angular.copy(updatedUser);
            })
        }
    }
})();