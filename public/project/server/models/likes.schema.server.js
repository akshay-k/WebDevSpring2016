module.exports = function (mongoose) {

    var LikesSchema = mongoose.Schema({
        createdAt: {type: Date, default: Date.now},
        likes: Boolean,
        userid: String
    }, {collection: 'likes'});
    return LikesSchema;
};