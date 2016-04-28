"use strict";

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require("bcrypt-nodejs");

module.exports = function(app, userModel) {

    var auth = authorized;

    app.post("/api/assignment/user", newuser);
    app.post("/api/assignment/admin/user", auth, addadmin);
    app.get("/api/assignment/admin/user", getusers);
    app.post("/api/assignment/user/logout", logout);
    app.get("/api/assignment/loggedin", loggedin);
    app.post("/api/assignment/user/login", passport.authenticate('FormBuilderApp'), login);
    app.get("/api/assignment/user/:id", auth, getuserbyid);
    app.get("/api/assignment/user?username=", getuserbyusername);
    app.put("/api/assignment/user/:id", auth, updateuserbyid);
    app.put("/api/assignment/admin/user/:id", auth, adminupdate);
    app.delete("/api/assignment/admin/user/:id", auth, deleteuserbyid);

    passport.use('FormBuilderApp', new LocalStrategy(assignmentlocalStrategy));
    //passport.serializeUser(serializeUser);
    //passport.deserializeUser(deserializeUser);

    //function localStrategy(username, password, done){
    //    userModel
    //        .findUserByCredentials({username: username, password: password})
    //        .then(
    //            function (user) {
    //                if(!user){return done(null, false);}
    //                return done(null, user);
    //            },
    //            function (err) {
    //                if(err){return done(err);}
    //            }
    //        );
    //}

    function assignmentlocalStrategy(username, password, done){
        userModel
            .findUserByUsername(username)
            .then(
                function (user) {
                    if(user && bcrypt.compareSync(password, user.password)){
                        //console.log("hello");
                        return done(null, user);
                    }
                    else{
                        //console.log("Bye");
                        return done(null, false);
                    }
                },

                function (err) {
                    if(err){
                        return done(err);
                    }
                }
            );
    }

    function login(req, res) {
        var user = req.user;
        delete user.password;
        res.json(user);
    }

    //function serializeUser(user, done){
    //    delete user.password;
    //    done(null, user);
    //}
    //
    //function deserializeUser(user, done){
    //    userModel
    //        .findUserByUserId(user._id)
    //        .then(
    //            function (user) {
    //                delete user.password;
    //                done(null, user);
    //            },
    //            function (err) {
    //                done(err, null);
    //            }
    //        );
    //}

    function authorized(req, res, next){
        if(!req.isAuthenticated()){
            res.send(401);
        }
        else{
            next();
        }
    }

    function isAdmin(user){
        if(user.roles.indexOf('admin') > -1){
            return true;
        }
        return false;
    }

    function getuserbyusername(req, res){
        //var username = req.query.username;
        //var users = userModel.findUserByUsername(username)
        //    .then(
        //        function (doc) {
        //            req.session.currentUser = doc;
        //            res.json(doc);
        //        },
        //
        //        function (err) {
        //            err.status(400).send(err);
        //        }
        //    )

        userModel
            .findUserByUsername(req.params.username)
            .then(
                function (user) {
                    delete user.password;
                    res.json(user);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function newuser(req,res){
        //var user = req.body;
        //user.roles = ['student'];
        //
        //userModel.createUser(user)
        //    .then(
        //        function (doc) {
        //            req.session.currentUser = doc;
        //            res.json(user);
        //        },
        //        function (err) {
        //            res.status(400).send(err);
        //        }
        //    );

        var user = req.body;
        user.roles = ['student'];

        userModel
            .findUserByUsername(user.username)
            .then(
                function (usr) {
                    if(usr){
                        res.json(null);
                    }
                    else{
                        user.password = bcrypt.hashSync(user.password);
                        return userModel.createUser(user);
                    }
                },

                function (err) {
                    res.status(400).send(err);
                }
            )
            .then(
                function (user) {
                    if(user){
                        req.login(user, function (err) {
                            if(err){
                                res.status(400).send(err);
                            }
                            else{
                                res.json(user);
                            }
                        });
                    }
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
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
        //    userModel.findAllUsers()
        //        .then(
        //            function (doc) {
        //                res.json(doc);
        //            },
        //
        //            function (err) {
        //                res.status(400).send(err);
        //            }
        //        )
        //}

        if(isAdmin(req.user)){
            userModel
                .findAllUsers()
                .then(
                    function (user) {
                        //console.log(res.json(user));
                        res.json(user);
                    },

                    function () {
                        res.status(400).send(err);
                    }
                );
        }
        else{
            res.status(403);
        }
    }

    function getuserbyid(req, res){
        //var userId = req.params.id;
        //userModel.findUserByUserId(userId)
        //    .then(
        //        function (doc){
        //            res.json(doc);
        //        },
        //
        //        function (err) {
        //            res.status(400).send(err);
        //        }
        //    )

        userModel
            .findUserByUserId(req.params.id)
            .then(
                function (user) {
                    return userModel.findAllUsers();
                },

                function (err) {
                    res.status(400).send(err);
                }
            )
            .then(
                function (users) {
                    res.json(users);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function updateuserbyid(req,res){
        //var user = req.body;
        //var id = req.params.id;
        //
        //userModel.updateUser(id, user)
        //    .then(
        //        function (updatedUser) {
        //            req.session.currentUser = updatedUser;
        //            res.json(updatedUser);
        //        },
        //        function (err) {
        //            console.log(err);
        //            res.status(400).send(err);
        //        }
        //    );

        var user = req.body;
        if(!isAdmin(req.user)){
            delete user.roles;
        }
        if(typeof user.roles == "string"){
            user.roles = user.roles.split(",");
        }

        if(user.password.length > 0) {
            user.password = bcrypt.hashSync(user.password);
        }
        else{
            delete user.password;
        }

        userModel
            .updateUser(req.params.id, user)
            .then(
                function (updateduser) {
                    res.json(updateduser);
                },

                function (err) {
                    res.status(400).send(err);
                }
            )
            .then(
                function (users) {
                    res.json(users);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function  deleteuserbyid(req, res){
        //var userId = req.params.id;
        //
        //var user = userModel.deleteUser(userId)
        //    .then(
        //        function (doc) {
        //            req.session.currentUser = doc;
        //            res.json(doc);
        //        },
        //
        //        function (err) {
        //            res.status(400).send(err);
        //        }
        //    )

        if(isAdmin(req.user)){

            userModel
                .deleteUser(req.params.id)
                .then(
                    function () {
                        return userModel.findAllUsers();
                    },

                    function (err) {
                        res.status(400).send(err);
                    }
                )
                .then(
                    function (users) {
                        res.json(users);
                    },

                    function (err) {
                        res.status(400).send(err);
                    }
                );
        }
        else{
            res.status(403);
        }
    }

    function logout(req, res){
        req.logOut();
        //req.session.destroy();
        res.send(200);
    }

    function loggedin(req, res) {
        //console.log(req.session.currentUser);
        //res.json(req.session.currentUser);

        res.send(req.isAuthenticated() ? req.user: '0');
    }

    function addadmin(req, res) {
        //var user = req.body;
        ////var userid = req.params.id;
        //userModel.createUser(user)
        //    .then(
        //        function (doc) {
        //            res.json(doc);
        //        },
        //
        //        function (err) {
        //            res.status(400).send(err);
        //        }
        //    )

        var user = req.body;

        if (isAdmin(req.user)) {
            userModel
                .findUserByUsername(user.username)
                .then(
                    function (usr) {
                        if (usr) {
                            res.json(null);
                        }
                        else {
                            user.password = bcrypt.hashSync(user.password);
                            userModel.createUser(user)
                                .then(
                                    function (doc) {
                                        res.json(doc);
                                    }
                                );
                        }
                    },

                    function (err) {
                        res.status(400).send(err);
                    }
                )
                .then(
                    function (user) {
                        if (user) {
                            req.login(user, function (err) {
                                if (err) {
                                    res.status(400).send(err);
                                }
                                else {
                                    res.json(user);
                                }
                            });
                        }
                    },
                    function (err) {
                        res.status(400).send(err);
                    }
                );
        }
    }

    function adminupdate(req, res){
        //var userid = req.params.id;
        //var user = req.body;
        //
        //userModel.updateUser(userid, user)
        //    .then(
        //        function (doc) {
        //            res.json(doc);
        //        },
        //
        //        function (err) {
        //            res.status(400).send(err);
        //        }
        //    )

        var user = req.body;
        if(!isAdmin(req.user)){
            delete user.roles;
        }
        if(typeof user.roles == "string"){
            user.roles = user.roles.split(",");
        }

        if(user.password.length > 0) {
            user.password = bcrypt.hashSync(user.password);
        }
        else{
            delete user.password;
        }

        userModel
            .updateUser(req.params.id, user)
            .then(
                function (updateduser) {
                    res.json(updateduser);
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            .then(
                function (users) {
                    res.json(users);
                },

                function(err){
                    res.status(400).send(err);
                }
            );
    }


    //function findUserByCredentials(req, res){
    //    //var credentials = req.body;
    //    //userModel.findUserByCredentials(credentials)
    //    //    .then(
    //    //        function(doc){
    //    //            req.session.currentUser = doc;
    //    //            res.json(doc);
    //    //        },
    //    //
    //    //        function (err) {
    //    //            res.status(400).send(err);
    //    //        }
    //    //    )
    //
    //    var credentials = req.body;
    //
    //    userModel.findUserByCredentials(credentials)
    //        .then(
    //            function (user) {
    //                return userModel.findAllUsers();
    //            },
    //
    //            function (err) {
    //                res.status(400).send(err);
    //            }
    //        )
    //        .then(
    //            function (users) {
    //                res.json(users);
    //            },
    //
    //            function (err) {
    //                res.status(400).send(err);
    //            }
    //        );
    //}

}