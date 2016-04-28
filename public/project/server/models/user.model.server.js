//var mock = require("./user.mock.json");

var q = require("q");

module.exports = function(db, mongoose){

    var UserSchema = require("./user.schema.server.js")(mongoose);

    var UserModel = mongoose.model('NewsUser', UserSchema);

    var api = {
        findUserByCredentials: findUserByCredentials,
        createUser: createUser,
        deleteUser: deleteUser,
        updateUser: updateUser,
        findUserByUsername: findUserByUsername,
        findUserByUserId: findUserByUserId,
        findAllUsers: findAllUsers,
        findUserByFacebookId: findUserByFacebookId,
        findUserLikeName: findUserLikeName,
        follow: follow,
        unfollow: unfollow,
        findUsersByUsernames: findUsersByUsernames,
        findUserByGoogleId: findUserByGoogleId
    };
    return api;

    function findUserByUserId(userid){
        return UserModel.findById(userid);
    }

    function createUser(user){
        return UserModel.create(user);
    }

    function findUserByCredentials(credentials){

        var deferred = q.defer();
        //console.log("hello");
        UserModel.findOne (
            {username: credentials.username,
            password: credentials.password},

            function (err, doc) {
                if(err){
                    deferred.reject(err);
                }else{
                    deferred.resolve(doc);
                }
            }
        );
        return deferred.promise;

        //return UserModel.find({'username': credentials.username, 'password': credentials.password});
    }

    function deleteUser(userid){
        return UserModel.remove({_id: userid});
    }

    function updateUser(userid, user){
        if(user.username == "root"){
            user.roles = ["admin"];
        }

        delete user ["_id"];

        return UserModel.findByIdAndUpdate(userid, user, {new: true});
    }

    function findUserByUsername(username){
        //console.log(username);
        var deferred = q.defer();
        UserModel.findOne({username: username}, function (err, doc) {
            if(err){
                deferred.reject(err);
            }else{
                deferred.resolve(doc);
            }
        });

        return deferred.promise;

        //return UserModel.find({username: username});
    }

    function findAllUsers(){
        return UserModel.find();
    }

    function findUserByFacebookId(facebookId) {
        return UserModel.findOne({'facebook.id': facebookId});
    }

    function findUserByGoogleId(googleId) {
        return UserModel.findOne({'google.id': googleId});
    }

    function findUserLikeName(fname) {
            return UserModel
                .find({
                    username: new RegExp(fname, "i")
                });
                //.where('lastName').equals(new RegExp(lname, "i"))
                //.limit(12);
        }

    function follow(username, followname) {

        var response = [];
        return UserModel
            .findOne({username: username})
            .then(
                function(user){
                    if (user) {
                        if (user.following.indexOf(followname) == -1) {
                            user.following.push(followname);
                        }
                        user.markModified("following");
                        response.push(user);
                        user.save();
                    }
                    return UserModel
                        .findOne({username: followname})
                }
            )
            .then(
                function(follow) {
                    if (follow) {
                        if (follow.followers.indexOf(username) == -1) {
                            follow.followers.push(username);
                        }
                        follow.markModified("followers");
                        response.push(follow);
                        follow.save();
                    }
                    return response;
                }
            )
    }

    function unfollow(username, followname) {
        var response = [];
        return UserModel
            .findOne({username: username})
            .then(
                function(user){
                    if (user) {
                        if (user.following.indexOf(followname) != -1) {
                            user.following.splice(user.following.indexOf(followname),1);
                        }
                        user.markModified("following");
                        response.push(user);
                        user.save();
                    }
                    return UserModel
                        .findOne({username: followname})
                }
            )
            .then(
                function(follow) {
                    if (follow) {
                        if (follow.followers.indexOf(username) != -1) {
                            follow.followers.splice(follow.followers.indexOf(username),1);
                        }
                        follow.markModified("followers");
                        response.push(follow);
                        follow.save();
                    }
                    return response;
                }
            )
    }

    function findUsersByUsernames(usernames) {
        return UserModel.find({'username': {$in: usernames}});
    }

}