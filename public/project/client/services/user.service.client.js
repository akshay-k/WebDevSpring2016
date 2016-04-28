"use strict";

(function(){
    angular
        .module("NewsApp")
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
            findUserByUserId: findUserByUserId,
            searchUserByUsername: searchUserByUsername,
            search: search,
            handleFollow: handleFollow,
            findUsersByUsernames: findUsersByUsernames
        };
        return api;


        function findUserByUsername (username){
            return $http.get("/api/project/user?username="+username);
        }

        function searchUserByUsername(searchuser){
            //console.log(username);
            //return $http.get("/api/project/searchuser/username",searchuser);

            return $http.post("/api/project/searchuser/user", {search: searchuser});
        }

        function findUserByCredentials (credentials) {

            return $http.post("/api/project/user/login",credentials);

        }

        function findAllUsers (callback) {
            return $http.get("/api/project/admin/user");
        }

        function createUser (user) {
            return $http.post("/api/project/user",user);
        }

        function  deleteUserById(userId) {

            return $http.delete("/api/project/admin/user/"+userId);
        }

        function updateUser(userId, user) {

            return $http.put("/api/project/user/"+userId,user);
        }

        function setCurrentUser(user) {
            $rootScope.currentUser = user;
        }

        function getCurrentUser() {
            return $http.get("/api/project/loggedin");
        }

        function logout() {
            return $http.post("/api/project/user/logout");
        }

        function adminAdd(user) {
            return $http.post("/api/project/admin/user", user);
        }

        function adminUpdate(userId, user) {
            return $http.put("/api/project/admin/user/"+userId, user);
        }

        function findUserByUserId(userId){
            return $http.get("/api/project/user/"+userId);
        }

        function search(fname) {
            fname = fname.length == 0? '_':fname;
            return $http.get("/news/user/search/"+fname);
        }

        function handleFollow(username, followname, stat) {
            return $http.put("/user/follow/", {
                username: username,
                followname: followname,
                stat: stat
            });
        }

        function findUsersByUsernames(usernames) {
            return $http.post("/newsuser/user/", usernames);
        }
    }
})();