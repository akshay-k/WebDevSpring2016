"use strict";

(function(){
    angular
        .module("NewsApp")
        .controller("HeaderController", HeaderController);

    function HeaderController ($rootScope, $scope, $location, UserService){
        $scope.currentUser = $rootScope.user;
        $rootScope.$watch("user", function(){
            $scope.currentUser = $rootScope.user;
        })

        $scope.logout = function(){
            $rootScope.user = null;
        }
        //$scope.$location = $location;
        //
        //$scope.logout = function(){
        //    $scope.currentUser = null;
        //    UserService.logout();
        //    $scope.username= null;
        //    $scope.password = null;
        //}
        //
        //$scope.getCurrentUser = function(){
        //    console.log(UserService.getCurrentUser());
        //    return UserService.getCurrentUser();
        //}
    }
})();