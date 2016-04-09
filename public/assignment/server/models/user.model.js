"use strict";

module.exports = function() {
    var mock = require("./user.mock.json");
    var api = {
        findUserByCredentials: findUserByCredentials,
        createUser: createUser,
        deleteUser: deleteUser,
        updateUser: updateUser,
        findUserByUsername: findUserByUsername,
        findUserByUserId: findUserByUserId,
        findAllUsers: findAllUsers
        //logout: logout
    };
    return api;


    function createUser(user) {
        mock.push(user);
        return user;
    }

    function findUserByCredentials(credentials){
        for(var u in mock){
            if(mock[u].username === credentials.username &&
                mock[u].password === credentials.password){
                return mock[u];
            }
        }
        return null;
    }

    function deleteUser(user){
        for(var u in mock){
            if(mock[u]._id == user){
                mock.splice(u,1);
                break;
            }
        }
        return mock;
    }

    function updateUser(id,user){
        for(var u in mock){
            if(mock[u]._id == id){
                mock[u].firstName = user.firstName;
                mock[u].lastName = user.lastName;
                mock[u].userName = user.userName;
                mock[u].password = user.password;
                mock[u].email = user.email;
                mock[u].roles = user.roles;
                break;
            }
        }
        return mock;
    }

    function findUserByUsername(user){
        for(var u in mock){
            if(mock[u].username === user){
                return mock[u];
            }
        }
        return null;
    }

    function findUserByUserId(user){
        var users = [];
        for(var u in user){
            var usr = findUserById(user[u]);
            if(usr){
                users.push(usr);
            }
        }
        return users;
    }

    function findUserById(userId){
        for(var u in mock){
            if(mock[u],_id == userId){
                return mock[u];
            }
        }
        return null;
    }

    function findAllUsers(){
        return mock;
    }

    //function logout(credentials){
    //        credentials.username= null;
    //        credentials.password = null;
   // }
}