"use strict";

(function(){
    angular
        .module("FormBuilderApp")
        .controller("HeaderController", HeaderController);

    function HeaderController ($location, UserService){

       var vm = this;

        vm.logout = logout;

        function init(){
            vm.$location = $location;
        }
        init();

        function logout(){
            UserService
                .logout()
                .then(function () {
                    UserService.setCurrentUser(null);
                    $location.url("/home");
                });
        }


        //$scope.currentUser = $rootScope.user;
        //$rootScope.$watch("user", function(){
        //    $scope.currentUser = $rootScope.user;
        //})
        //
        //$scope.logout = function(){
        //    $rootScope.user = null;
        //}
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