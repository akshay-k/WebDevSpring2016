"use strict";

(function(){
    angular
        .module("FormBuilderApp")
        .controller("AdminController", AdminController);

    function AdminController($scope, $location, UserService) {

        var vm = this;

        vm.loadUsers = loadUsers;
        vm.addUser = addUser;
        vm.updateUser = updateUser;
        vm.removeUser = removeUser;
        vm.editUser = editUser;
        vm.allUsers = [];


        function init() {
            vm.sortType = 'username';
            vm.reverseSort = false;
            vm.edit = {};
            vm.loadUsers();
        }
        init();

        function loadUsers() {
            UserService
                .findAllUsers()
                .then(function(response) {
                    vm.allUsers = angular.copy(response.data);
                });
        }

        function addUser(newUser) {

            if (Object.keys(newUser).length == 0) {
                return;
            }
            newUser.firstName = null;
            newUser.secondName = null;
            newUser.email = null;
            if (!Array.isArray(newUser.roles)) {
                newUser.roles = newUser.roles.replace(/\s+/g, '').split(',');
            }
            UserService
                .adminAdd(newUser)
                .then(function(response){
                    vm.edit = {};
                    vm.allUsers = response.data;
                });
        }

        function updateUser(newUser) {
            if (Object.keys(newUser).length == 0) {
                return;
            }
            if (!Array.isArray(newUser.roles)) {
                newUser.roles = newUser.roles.replace(/\s+/g, '').split(',');
            }
            UserService
                .adminUpdate(newUser._id, newUser)
                .then(function(response){
                    vm.edit = {};
                    vm.allUsers = response.data;
                });
        }

        function removeUser(userId) {
            UserService
                .deleteUserById(userId)
                .then(function(){
                });
            loadAllUsers();
        }

        function editUser(selected) {
            vm.edit = angular.copy(selected);
        }

        //$scope.currentUser = $rootScope.user;

        //UserService.findAllUsers(function (users) {
        //    $scope.allusers = users;
        //})
        //
        //$scope.sortData = "username";
        //$scope.reverseSort = false;
        //$scope.editDetails = {};
        //
        //
        //$scope.loadUsers = function () {
        //    UserService.findAllUsers(function (users) {
        //        $scope.allUsers = angular.copy(users);
        //    });
        //};
        //$scope.loadUsers();
        //
        //$scope.addNewUser = function (newUser) {
        //
        //    newUser.firstName = null;
        //    newUser.secondName = null;
        //    newUser.email = null;
        //    if (!Array.isArray(newUser.roles)) {
        //        newUser.roles = newUser.roles.replace(/\s+/g, '').split(',');
        //    }
        //    UserService.createUser(newUser, function (accept) {
        //        $scope.edit = {};
        //    });
        //};
        //
        //$scope.updateCurrentUser = function (user) {
        //    if (!Array.isArray(user.roles)) {
        //        user.roles = user.roles.replace(/\s+/g, '').split(',');
        //    }
        //    UserService.updateUser(user._id, user, function (accept) {
        //        $scope.edit = {};
        //    });
        //};
        //
        //$scope.removeCurrentUser = function (userId) {
        //    UserService.deleteUserById(userId, function (accept) {
        //    });
        //};
        //
        //$scope.editCurrentUser = function (selecteduser) {
        //    $scope.edit = angular.copy(selecteduser);
        //};
    }
})();