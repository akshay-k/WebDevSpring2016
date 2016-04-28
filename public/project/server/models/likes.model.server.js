var q = require("q");

module.exports = function (db, mongoose) {

    var LikesSchema = require("./likes.schema.server.js")(mongoose);
    var NewsSchema1 = require("./news-headlines.schema.server.js")(mongoose);
    var ArticleSchema1 = require("./article-search.schema.server.js")(mongoose);

    var LikesModel = mongoose.model('LikesModel', LikesSchema);
    var NewsModel3 = mongoose.model('NewsModel3', NewsSchema1);
    var ArticleModel3 = mongoose.model('ArticleModel3', ArticleSchema1);

    var api={
        savelikes: savelikes,
        getlikes: getlikes,
        savearticlelikes: savearticlelikes,
        getarticlelikes: getarticlelikes
    };
    return api;

    function savelikes(user, newsurlid){


        var likes ={
            createdAt: Date.now(),
            likes: "true",
            userid: user._id
        }

        return NewsModel3.findById(newsurlid)
            .then(
                function (app) {
                    app.likes.push(likes);
                    return app.save();
                }
            )
    }

    function getlikes(){
        if(NewsModel3.find()){
            return NewsModel3.find();
        }
    }

    function savearticlelikes(user, newsurlid){

        var likes ={
            createdAt: Date.now(),
            likes: "true",
            userid: user._id
        }

        return ArticleModel3.findById(newsurlid)
            .then(
                function (app) {
                    app.likes.push(likes);
                    return app.save();
                }
            )
    }

    function getarticlelikes(){
        return ArticleModel3.find();
    }
}