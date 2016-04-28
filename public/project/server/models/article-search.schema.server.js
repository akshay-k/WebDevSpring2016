module.exports = function (mongoose) {

    var CommentsSchema = require("./comments.schema.server.js")(mongoose);

    var LikesSchema = require("./likes.schema.server.js")(mongoose);

    var ArticleSearchSchema = mongoose.Schema({
        createdAt: {type: Date, default: Date.now},
        articleurl: String,
        comments: [CommentsSchema],
        likes: [LikesSchema]
    }, {collection: 'articlessearch'});
    return ArticleSearchSchema;
};