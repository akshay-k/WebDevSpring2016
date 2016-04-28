module.exports = function (mongoose) {

    var CommentsSchema = mongoose.Schema({
        createdAt: {type: Date, default: Date.now},
        //name: String,
        //email: String,
        comments: String,
        username: String,
        emails: [String]
    }, {collection: 'comments'});
    return CommentsSchema;
};