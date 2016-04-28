module.exports = function(mongoose){

    var UserSchema = mongoose.Schema({
        username: String,
        password: String,
        google:   {
            id:    String,
            token: String
        },
        facebook:   {
            id:    String,
            token: String
        },
        following: [String],
        followers: [String],
        firstName: String,
        lastName: String,
        roles: [String],
        emails: [String],
        phones: [String],
        usertype: String
    }, {collection: 'newsuser'});
    return UserSchema;
};