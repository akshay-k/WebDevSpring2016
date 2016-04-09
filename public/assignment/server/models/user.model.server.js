//var mock = require("./user.mock.json");

var q = require("q");

module.exports = function(db, mongoose){

    var UserSchema = require("./user.schema.server.js")(mongoose);

    var UserModel = mongoose.model('User', UserSchema);

    var api = {
        findUserByCredentials: findUserByCredentials,
        createUser: createUser,
        deleteUser: deleteUser,
        updateUser: updateUser,
        findUserByUsername: findUserByUsername,
        findUserByUserId: findUserByUserId,
        findAllUsers: findAllUsers
    };
    return api;

    //function init(){
    //    var ins = UserModel.findOneAndUpdate(
    //        for(var i=1; i<mock.length; i++){
    //
    //        }
    //    )
    //}

    function findUserByUserId(userid){
        //var deferred = q.defer();
        //UserModel.findById({_id: userid}, function (err, doc) {
        //
        //    if(err){
        //        deferred.reject(err);
        //    }else{
        //
        //        deferred.resolve(doc);
        //    }
        //});
        //return deferred.promise;

        return UserModel.findById(userid);
    }

    function createUser(user){
        //var deferred = q.defer();
        //
        //UserModel.create(user, function (err, doc){
        //    if(err){
        //        deferred.reject(err);
        //    }else{
        //        deferred.resolve(doc);
        //    }
        //});
        //
        //return deferred.promise;

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
        //var deferred = q.defer();
        //
        //UserModel.remove({_id: userid}, function (err, users) {
        //    if(err){
        //        deferred.reject(err);
        //    }else{
        //        UserModel.find(function (err, doc) {
        //            if(err){
        //                deferred.reject(err);
        //            }else{
        //                deferred.resolve(doc);
        //            }
        //        });
        //    }
        //});
        //
        //return deferred.promise;

        return UserModel.remove({_id: userid});
    }

    function updateUser(userid, user){
        //var deferred = q.defer();
        ////console.log(userid);
        //UserModel
        //    .findByIdAndUpdate (
        //        userid,
        //        user,
        //        {new: true},
        //        function (err, stats) {
        //            if (!err) {
        //                deferred.resolve(stats);
        //            } else {
        //                deferred.reject(err);
        //            }
        //        }
        //    );
        //
        //return deferred.promise;

        if(user.username == "root"){
            user.roles = ["admin"];
        }

        delete user ["_id"];

        return UserModel.update({_id: userid}, {$set: user});

    }

    function findUserByUsername(user){
        var deferred = q.defer();

        UserModel.findOne({user: user}, function (err, doc) {
            if(err){
                deferred.reject(err);
            }else{
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

    function findAllUsers(){
        //var deferred = q.defer();
        //
        //UserModel.find(function (err, doc) {
        //    if(err){
        //        deferred.reject(err);
        //    }else{
        //        deferred.resolve(doc);
        //    }
        //});
        //
        //return deferred.promise;

        return UserModel.find();
    }

}