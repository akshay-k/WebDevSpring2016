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

}