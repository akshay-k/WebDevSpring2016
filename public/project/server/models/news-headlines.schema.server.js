module.exports = function (mongoose) {

    var CommentsSchema = require("./comments.schema.server.js")(mongoose);

    var LikesSchema = require("./likes.schema.server.js")(mongoose);

//    var NewsHeadlinesSchema = mongoose.Schema({
//    createdAt: {type: Date, default: Date.now},
//    articleurl: String
//},{collection: 'newsheadlinesurl'});
//return NewsHeadlinesSchema;

    var NewsHeadlinesSchema = mongoose.Schema({
        createdAt: {type: Date, default: Date.now},
        articleurl: String,
        //comments: [CommentsSchema],
        comments: [CommentsSchema],
        likes: [LikesSchema],
        //username : String
    }, {collection: 'articles'});
    return NewsHeadlinesSchema;
};