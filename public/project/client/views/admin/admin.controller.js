"use strict";

(function(){
    angular
        .module("NewsApp")
        .controller("AdminController", AdminController);

    function AdminController($scope, $location, UserService) {
        //$scope.currentUser = $rootScope.user;

        UserService.findAllUsers(function (users) {
            $scope.allusers = users;
        })

        $scope.sortData = "username";
        $scope.reverseSort = false;
        $scope.editDetails = {};


        $scope.loadUsers = function () {
            UserService.findAllUsers(function (users) {
                $scope.allUsers = angular.copy(users);
            });
        };
        $scope.loadUsers();

        $scope.addNewUser = function (newUser) {

            newUser.firstName = null;
            newUser.secondName = null;
            newUser.email = null;
            if (!Array.isArray(newUser.roles)) {
                newUser.roles = newUser.roles.replace(/\s+/g, '').split(',');
            }
            UserService.createUser(newUser, function (accept) {
                $scope.edit = {};
            });
        };

        $scope.updateCurrentUser = function (user) {
            if (!Array.isArray(user.roles)) {
                user.roles = user.roles.replace(/\s+/g, '').split(',');
            }
            UserService.updateUser(user._id, user, function (accept) {
                $scope.edit = {};
            });
        };

        $scope.removeCurrentUser = function (userId) {
            UserService.deleteUserById(userId, function (accept) {
            });
        };

        $scope.editCurrentUser = function (selecteduser) {
            $scope.edit = angular.copy(selecteduser);
        };
    }
})();