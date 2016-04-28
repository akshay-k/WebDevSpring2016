var q = require("q");

module.exports = function (db, mongoose) {

    var CommentsSchema = require("./comments.schema.server.js")(mongoose);
    var NewsSchema = require("./news-headlines.schema.server.js")(mongoose);
    var ArticleSchema = require("./article-search.schema.server.js")(mongoose);

    var CommentsModel = mongoose.model('CommentsModel', CommentsSchema);
    var NewsModel2 = mongoose.model('NewsModel2', NewsSchema);
    var ArticleModel2 = mongoose.model('ArticleModel2', ArticleSchema);

    var api = {
        savecomments: savecomments,
        findCommentsByArticleUrlId: findCommentsByArticleUrlId,
        savearticlesearchcomments: savearticlesearchcomments,
        findCommentsBySearchedArticleUrlId: findCommentsBySearchedArticleUrlId
    };
    return api;

    function savecomments(user, newsurlid){

        var comments ={
            createdAt : Date.now(),
            comments: user.comments,
            username: user.username,
            emails: user.emails
        }

        return NewsModel2.findById(newsurlid)
            .then(
                function (app) {
                    app.comments.push(comments);
                    return app.save();
                }
            )
    }

    function findCommentsByArticleUrlId(articleurlid){
        return NewsModel2.findById(articleurlid).select("comments");
    }


    function savearticlesearchcomments(user, newsurlid){

        var comments ={
            createdAt : Date.now(),
            comments: user.comments,
            username: user.username,
            emails: user.emails
        }

        return ArticleModel2.findById(newsurlid)
            .then(
                function (app) {
                    app.comments.push(comments);
                    return app.save();
                }
            )
    }

    function findCommentsBySearchedArticleUrlId(articleurlid){
        return ArticleModel2.findById(articleurlid).select("comments");
    }

}