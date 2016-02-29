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

    function UserService() {

        var users = [
            {        "_id":123, "firstName":"Alice",            "lastName":"Wonderland",
                "username":"alice",  "password":"alice",   "roles": ["student"], "email": ["alice@wonderland.com"]               },
            {        "_id":234, "firstName":"Bob",              "lastName":"Hope",
                "username":"bob",    "password":"bob",     "roles": ["admin"], "email": ["bob@hope.com"]                },
            {        "_id":345, "firstName":"Charlie",          "lastName":"Brown",
                "username":"charlie","password":"charlie", "roles": ["faculty"], "email":["charlie@brown.com"]                },
            {        "_id":456, "firstName":"Dan",              "lastName":"Craig",
                "username":"dan",    "password":"dan",     "roles": ["faculty", "admin"], "email":["dan@craig.com"]},
            {        "_id":567, "firstName":"Edward",           "lastName":"Norton",
                "username":"ed",     "password":"ed",      "roles": ["student"], "email":["edward@norton.com"]                }
        ]

        var findUserByCredentials = function (username, password, callback) {
            var found = null;
            for(var u in users)
            {
                if(users[u].username == username && users[u].password == password)
                {
                    found = users[u];
                    break;
                }
            }
            callback(found);
        }

        var findAllUsers = function (callback) {
            callback(users);
        }

        var createUser = function (user, callback) {
            user["_id"] = (new Date).getTime();
            users.push(user);
            callback(user);
        }

        var deleteUserById = function (userId, callback) {
            var found = null;
            for(var u in users)
            {
                if(users[u]._id == userId)
                {
                    found = u;
                    break;
                }
            }
            if(found != null) {
                users.splice(u,1);
            }
            callback(users);
        }

        var updateUser = function (userId, user, callback) {
            for(var u in users)
            {
                if(users[u]._id == userId)
                {
                    users[u] = user;
                    break;
                }
            }
            callback(user);
        }

        return {
            findUserByCredentials: findUserByCredentials,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser
        }
    }
})();