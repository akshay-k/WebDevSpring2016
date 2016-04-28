var passport = require('passport');
var mongoose = require('mongoose');

module.exports = function (app, db) {

    var assignmentUserModel = require("./assignment/server/models/user.model.server.js")(db, mongoose);
    var projectUserModel = require("./project/server/models/user.model.server.js")(db, mongoose);

    require("./assignment/server/app.js")(app, db, assignmentUserModel);
    require("./project/server/app.js")(app, db, projectUserModel);

    passport.serializeUser(function (user, done) {
        //console.log(user);
        done(null, user);
    });

    passport.deserializeUser(function (user, done) {
        //console.log(user);
        var userModel = null;
        if(user.usertype == 'projectuser'){
            userModel = projectUserModel;
        }
        else{
            userModel = assignmentUserModel;
        }
        userModel
            .findUserByUserId(user._id)
            .then(
                function (user) {
                    done(null, user);
                },

                function (err) {
                    done(err, null);
                }
            );
    });
};