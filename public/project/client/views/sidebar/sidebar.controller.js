"use strict";

(function () {
    angular
        .module("NewsApp")
        .controller("SidebarController", SidebarController);

    function SidebarController($scope, $rootScope, $location, UserService) {
        $scope.currentUser = $rootScope.user;
        $scope.isAdmin = $rootScope.user != null && $rootScope.user.roles.indexOf('admin')>-1;

        //$rootScope.$watch("user", function(){
        //    $scope.currentUser = $rootScope.user;
        //    $scope.isAdmin = $rootScope.user != null && $rootScope.user.roles == "admin";
        //})
    }
})();
    //    $scope.$location = $location;
    //
    //    $scope.logout = function(){
    //        $scope.currentUser = null;
    //        UserService.logout();
    //        $scope.username= null;
    //        $scope.password = null;
    //    }
    //
    //    $scope.getCurrentUser = function(){
    //        return UserService.getCurrentUser();
    //    }
    //
    //     $scope.isAdmin = function(){
    //        return UserService.getCurrentUser().roles=="admin";
    //    }
    //}
