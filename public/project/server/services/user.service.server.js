"use strict";

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var GoogleStrategy   = require('passport-google-oauth').OAuth2Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var bcrypt = require("bcrypt-nodejs");

module.exports = function(app, userModel) {

    var auth = authorized;

    app.post("/api/project/user", newuser);
    app.post("/api/project/admin/user", auth, addadmin);
    app.get("/api/project/admin/user", getusers);
    app.post("/api/project/user/logout", logout);
    app.get("/api/project/loggedin", loggedin);
    app.post("/api/project/user/login", passport.authenticate('NewsApp'), login);
    app.get("/api/project/user/:id", auth, getuserbyid);
    app.get("/api/project/user?username=", getuserbyusername);
    app.post("/api/project/searchuser/user", searchuserbyusername);
    app.put("/api/project/user/:id", auth, updateuserbyid);
    app.put("/api/project/admin/user/:id", auth, adminupdate);
    app.delete("/api/project/admin/user/:id", auth, deleteuserbyid);

    app.get("/news/user/search/:fname", auth, searchUser);
    app.put("/user/follow/", auth, handleFollowing);
    app.post("/newsuser/user/", auth, findUsersByUsernames  );


    app.get   ('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect: '/project/client/#/profile',
            failureRedirect: '/project/client/#/login'
        }));

    app.get   ('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));
    app.get   ('/auth/google/callback',
        passport.authenticate('google', {
            successRedirect: '/project/client/#/profile',
            failureRedirect: '/project/client/#/login'
        }));

    var googleConfig = {
        clientID        : process.env.GOOGLE_CLIENT_ID,
        clientSecret    : process.env.GOOGLE_CLIENT_SECRET,
        callbackURL     : process.env.GOOGLE_CALLBACK_URL
    };

    var facebookConfig = {
        clientID        : process.env.FACEBOOK_CLIENT_ID,
        clientSecret    : process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL     : process.env.FACEBOOK_CALLBACK_URL
    };

    passport.use('facebook', new FacebookStrategy(facebookConfig, facebookStrategy));
    passport.use('google', new GoogleStrategy(googleConfig, googleStrategy));
    passport.use('NewsApp', new LocalStrategy(projectlocalStrategy));
    //passport.serializeUser(serializeUser);
    //passport.deserializeUser(deserializeUser);

    function facebookStrategy(token, refreshToken, profile, done) {
        //console.log("facebookhello");
        //console.log(profile.id);
        userModel
            .findUserByFacebookId(profile.id)
            .then(
                function(user) {
                    //console.log(user);
                    if(user) {
                        return done(null, user);
                    } else {
                        var names = profile.displayName.split(" ");
                        var newFacebookUser = {
                            lastName:  names[1],
                            firstName: names[0],
                            usertype: "projectuser",
                            emails:     profile.emails ? profile.emails[0].value:"",
                            facebook: {
                                id:    profile.id,
                                token: token
                            }
                        };
                        return userModel.createUser(newFacebookUser);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            )
            .then(
                function(user){
                    return done(null, user);
                },
                function(err){
                    if (err) { return done(err); }
                }
            );
    }

    function googleStrategy(token, refreshToken, profile, done) {
        userModel
            .findUserByGoogleId(profile.id)
            .then(
                function(user) {
                    if(user) {
                        return done(null, user);
                    } else {
                        var newGoogleUser = {
                            lastName: profile.name.familyName,
                            firstName: profile.name.givenName,
                            usertype: "projectuser",
                            email: profile.emails[0].value,
                            google: {
                                id:          profile.id,
                                token:       token
                            }
                        };
                        return userModel.createUser(newGoogleUser);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            )
            .then(
                function(user){
                    return done(null, user);
                },
                function(err){
                    if (err) { return done(err); }
                }
            );
    }

    function projectlocalStrategy(username, password, done){
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
    //    //userModel
    //    //    .findUserByUserId(user._id)
    //    //    .then(
    //    //        function (user) {
    //    //            delete user.password;
    //    //            done(null, user);
    //    //        },
    //    //        function (err) {
    //    //            done(err, null);
    //    //        }
    //    //    );
    //
    //    if(user.usertype == 'projectuser'){
    //        userModel
    //            .findUserByUserId(user._id)
    //            .then(
    //                function (user) {
    //                    delete user.password;
    //                    done(null, user);
    //                },
    //                function (err) {
    //                    done(err, null);
    //                }
    //            );
    //    }
    //
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

    function searchuserbyusername(req, res){
        //console.log(req.body);
        userModel
            .findUserByUsername(req.body.search)
            .then(
                function (user) {
                    res.json(user);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function newuser(req,res){

        var user = req.body;
        //user.roles = ['student'];
        user.usertype = 'projectuser';

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
        //console.log(req.session.user);
        res.send(req.isAuthenticated() ? req.user: '0');
    }

    function addadmin(req, res) {
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


    function searchUser(req, res) {
        var fname = req.params.fname;
        //var lname = req.params.lname;

        fname = fname=="_"? "": fname;
        //lname = lname=="_"? "": lname;

        userModel
            .findUserLikeName(fname)
            .then(
                function(results) {
                    res.json(results);
                },
                function(err) {
                    console.log(err);
                    res.status(400).send(err);
                }
            )
    }

    function handleFollowing(req, res) {
        var username = req.body.username;
        var followname = req.body.followname;
        var mode = req.body.stat;

        if (mode == 0) {
            userModel
                .unfollow(username, followname)
                .then(
                    function (pair) {
                        res.json(pair);
                    },
                    function (err) {
                        res.status(400).send(err);
                    }
                );
        } else  {
            userModel
                .follow(username, followname)
                .then(
                    function (pair) {
                        res.json(pair);
                    },
                    function (err) {
                        res.status(400).send(err);
                    }
                );
        }
    }

    function findUsersByUsernames(req, res) {
        var usernames = req.body;
        userModel
            .findUsersByUsernames(usernames)
            .then(
                function (users) {
                    res.json(users);
                },
                function (err) {
                    //console.log(err);
                    res.status(400).send(err);
                });
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