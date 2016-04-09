"use strict";

module.exports = function(app, userModel) {
    app.post("/api/assignment/user", newuser);
    app.post("/api/assignment/admin/add", addadmin);
    app.get("/api/assignment/user", getusers);
    app.get("/api/assignment/user/:id", getuserbyid);
    //app.get("/api/assignment/user?username=", getuserbyusername);
    app.post("/api/assignment/user/login", findUserByCredentials);
    app.post("/api/assignment/user/logout", logout);
    app.get("/api/assignment/loggedin", loggedin);
    app.put("/api/assignment/user/:id", updateuserbyid);
    app.put("/api/assignment/admin/update/:id", adminupdate);
    app.delete("/api/assignment/user/:id", deleteuserbyid);

    //var uuid = require('uuid');

    function getuserbyusername(req, res){
        //var username = req.query.username;
        //var users = userModel.findUserByUsername(username);
        //req.session.currentUser = users;
        ////console.log(users);
        //res.json(users);

        var username = req.query.username;
        var users = userModel.findUserByUsername(username)
            .then(
                function (doc) {
                    req.session.currentUser = doc;
                    res.json(doc);
                },

                function (err) {
                    err.status(400).send(err);
                }
            )

        //var username = req.params.username;
        //var user = null;
        //
        //// use model to find user by id
        //userModel.findUserByUsername(username)
        //    .then(
        //
        //        // first retrieve the user by user id
        //        function (doc) {
        //
        //            user = doc;
        //
        //            // fetch movies this user likes
        //            return userModel.findUserByUsername(doc.user);
        //        },
        //
        //        // reject promise if error
        //        function (err) {
        //            res.status.send(err);
        //        }
        //    )
    }

    function newuser(req,res){
        var user = req.body;
        user.roles = ['student'];

        userModel.createUser(user)
            .then(
                function (doc) {
                    req.session.currentUser = doc;
                    res.json(user);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );

        //userModel
        //    .findUserByUsername(user.username)
        //    .then(
        //        function (usr) {
        //            if(usr){
        //                res.json(null);
        //            }
        //            else{
        //                return userModel.createUser(user);
        //            }
        //        },
        //        function (err) {
        //            res.status(400).send(err);
        //        }
        //    )
        //    .then(
        //        function (usr) {
        //            if(usr){
        //                req.login(usr, function (err) {
        //                    if(err){
        //                        res.status(400).send(err);
        //                    }
        //                    else{
        //                        res.json(usr);
        //                    }
        //                });
        //            }
        //        },
        //        function (err) {
        //            res.status(400).send(err);
        //        }
        //    );


        //var user = req.body;
        //user._id = uuid.v1();
        //user = userModel.createUser(user);
        //req.session.currentUser = user;
        //res.json(user);
    }

    function getusers(req, res){
        //if(req.query.hasOwnProperty("username")){
        //    if(req.query.hasOwnProperty("password")){
        //        getuserbycredentials(req, res);
        //    }
        //    else{
        //        getuserbyusername(req, res);
        //    }
        //}
        //else{
        //    var users = userModel.findAllUsers();
        //    //console.log( show_all_methods(userModel));
        //    res.json(users);
        //}

        if(req.query.hasOwnProperty("username")){
            if(req.query.hasOwnProperty("password")){
                getuserbycredentials(req, res);
            }
            else{
                getuserbyusername(req, res);
            }
        }
        else{
            userModel.findAllUsers()
                .then(
                    function (doc) {
                        res.json(doc);
                    },

                    function (err) {
                        res.status(400).send(err);
                    }
                )
        }
    }

    function getuserbyid(req, res){

        //var userId = req.params.userId;
        //var user = userModel.findUserByUserId(userId);
        //res.json(user);

        var userId = req.params.id;
        userModel.findUserByUserId(userId)
            .then(
                function (doc){
                    res.json(doc);
                },

                function (err) {
                    res.status(400).send(err);
                }
            )
        //var userId = req.params.userId;
        //var user = null;
        //
        //userModel.findUserByUserId(userId)
        //    .then(
        //        function(doc){
        //            user = doc;
        //
        //            return userModel.findUserByUserId(doc.user);
        //        },
        //
        //        function (err) {
        //            res.send(err);
        //        }
        //    )
    }

    function findUserByCredentials(req, res){
        //var credentials = req.body;
        //var user = userModel.findUserByCredentials(credentials);
        //req.session.currentUser = user;
        //res.json(user);

        var credentials = req.body;
        userModel.findUserByCredentials(credentials)
            .then(
                function(doc){
                    req.session.currentUser = doc;
                    res.json(doc);
                },

                function (err) {
                    res.status(400).send(err);
                }
            )

        //var credentials = req.body;
        //var user = userModel.findUserByCredentials(credentials)
        //    .then(
        //        function (doc) {
        //            res.json(doc);
        //        },
        //
        //        function (err) {
        //            res.status.send(err);
        //        }
        //    )
    }

    function updateuserbyid(req,res){
        //var user = req.body;
        //var id = req.params.userId;
        //req.session.currentUser = user;
        //var users = userModel.updateUser(id,user);
        //res.json(users);

        var user = req.body;
        var id = req.params.id;

        if(typeof user.roles == "string"){
            user.roles = user.roles.split(",");
        }

        userModel.updateUser(id, user)
            .then(
                function (doc) {
                    //console.log(doc);
                    req.session.currentUser = doc;
                    res.json(doc);
                },

                function (err) {
                    res.status(400).send(err);
                }
            )

        //var userId = req.params.userId;
        //var user = null;
        //
        //userModel.updateUser(userId)
        //    .then(
        //        function (doc) {
        //            user = doc;
        //
        //            return userModel.updateUser(doc.user);
        //        },
        //
        //        function (err) {
        //            res.send(err);
        //        }
        //    )
    }

    function  deleteuserbyid(req, res){
        //var userId = req.params.userId;
        //var user = userModel.deleteUser(userId);
        //res.json(user);

        var userId = req.params.id;

        var user = userModel.deleteUser(userId)
            .then(
                function (doc) {
                    req.session.currentUser = doc;
                    res.json(doc);
                },

                function (err) {
                    res.status(400).send(err);
                }
            )

        //var userId = req.params.userId;
        //var user = null;
        //
        //userModel.deleteUser(userId)
        //    .then(
        //        function (doc) {
        //            user = doc;
        //
        //            return userModel.deleteUser(doc.user);
        //        },
        //
        //        function(err){
        //            res.send(err);
        //        }
        //    )
    }

    function logout(req, res){
        req.session.destroy();
        res.send(200);
    }

    function loggedin(req, res) {
        res.json(req.session.currentUser);
    }

    function addadmin(req, res){
        //var user = req.body;
        ////user._id = uuid.v1();
        //user = userModel.createUser(user);
        //res.json(userModel.updateUser(user._id,user));

        var user = req.body;
        //var userid = req.params.id;
        userModel.createUser(user)
            .then(
                function (doc) {
                    res.json(doc);
                },

                function (err) {
                    res.status(400).send(err);
                }
            )
    }

    function adminupdate(req, res){
        //var userid = req.params.id;
        //var user = req.body;
        //var users = userModel.updateUser(userid, user);
        //res.json(users);

        var userid = req.params.id;
        var user = req.body;

        userModel.updateUser(userid, user)
            .then(
                function (doc) {
                    res.json(doc);
                },

                function (err) {
                    res.status(400).send(err);
                }
            )
    }

}