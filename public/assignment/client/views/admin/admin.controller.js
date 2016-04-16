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
            //newUser.firstName = null;
            //newUser.secondName = null;
            newUser.email = null;
            if (!Array.isArray(newUser.roles)) {
                newUser.roles = newUser.roles.replace(/\s+/g, '').split(',');
            }
            UserService
                .adminAdd(newUser)
                .then(function(response){
                    vm.edit = {};
                    //vm.allUsers = response.data;
                    loadUsers();
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
                    //vm.allUsers = response.data;
                    loadUsers();
                });
        }

        function removeUser(userId) {
            UserService
                .deleteUserById(userId)
                .then(function(){
                    loadUsers();
                });

        }

        function editUser(selected) {
            vm.edit = angular.copy(selected);
            vm.edit.password = "";
        }
    }
})();