//(function () {
//    angular
//        .module("FormBuilderApp")
//        .factory("UserService", UserService);
//
//    function UserService () {
//        var currentUser = null;
//
//        var users = [
//            {        "_id":123, "firstName":"Alice",            "lastName":"Wonderland",
//                "username":"alice",  "password":"alice",   "roles": ["student"]                },
//            {        "_id":234, "firstName":"Bob",              "lastName":"Hope",
//                "username":"bob",    "password":"bob",     "roles": ["admin"]                },
//            {        "_id":345, "firstName":"Charlie",          "lastName":"Brown",
//                "username":"charlie","password":"charlie", "roles": ["faculty"]                },
//            {        "_id":456, "firstName":"Dan",              "lastName":"Craig",
//                "username":"dan",    "password":"dan",     "roles": ["faculty", "admin"]},
//            {        "_id":567, "firstName":"Edward",           "lastName":"Norton",
//                "username":"ed",     "password":"ed",      "roles": ["student"]                }
//        ];
//
//        var logout = function () {
//            currentUser = null;
//        }
//        var findUserByCredentials = function (username, password) {
//            for (var u in users) {
//                if (users[u].username == username && users[u].password == password) {
//                    currentUser = users[u];
//                    return users[u];
//                }
//            }
//            return null;
//        };
//
//        var getCurrentUser = function () {
//            return currentUser;
//        }
//
//        var createUser = function(username, password){
//            var user = {username: username, password: password, roles: null};
//            users.push(user);
//            currentUser = user;
//            return currentUser;
//            //alert(users.length);
//        }
//
//        return {
//            findUserByCredentials: findUserByCredentials,
//            logout: logout,
//            getCurrentUser: getCurrentUser,
//            createUser: createUser
//        };
//    };
//})();
"use strict";

(function(){
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService($http, $rootScope) {

        var api = {
            findUserByCredentials: findUserByCredentials,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser,
            findUserByUsername: findUserByUsername,
            setCurrentUser: setCurrentUser,
            logout: logout,
            getCurrentUser:getCurrentUser,
            adminAdd: adminAdd,
            adminUpdate: adminUpdate,
            findUserByUserId: findUserByUserId
        };
        return api;


        function findUserByUsername (username){
            return $http.get("/api/assignment/user?username="+username);
        }

        function findUserByCredentials (credentials) {

            return $http.post("/api/assignment/user/login",credentials);

        }

        function findAllUsers (callback) {
            return $http.get("/api/assignment/admin/user");
        }

        function createUser (user) {
            return $http.post("/api/assignment/user",user);
        }

        function  deleteUserById(userId) {

            return $http.delete("/api/assignment/admin/user/"+userId);
        }

        function updateUser(userId, user) {

            return $http.put("/api/assignment/user/"+userId,user);
        }

        function setCurrentUser(user) {
            $rootScope.currentUser = user;
        }

        function getCurrentUser() {
            return $http.get("/api/assignment/loggedin");
        }

        function logout() {
            return $http.post("/api/assignment/user/logout");
        }

        function adminAdd(user) {
            return $http.post("/api/assignment/admin/user", user);
        }

        function adminUpdate(userId, user) {
            return $http.put("/api/assignment/admin/user/"+userId, user);
        }

        function findUserByUserId(userId){
            return $http.get("/api/assignment/user/"+userId);
        }
    }
})();