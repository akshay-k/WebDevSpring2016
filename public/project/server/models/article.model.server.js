var q = require("q");

module.exports = function (db, mongoose) {

    var ArticleSchema = require("./article-search.schema.server.js")(mongoose);

    var ArticleModel = mongoose.model('ArticleModel', ArticleSchema);

    var api = {
        saveuri: saveuri,
        //saveArticle: saveArticle,
        //getArticle: getArticle,
        deleteurl: deleteurl,
        checkIfArticleUrlExists: checkIfArticleUrlExists,
        geturlbyid: geturlbyid
    };
    return api;


    function saveuri(newsurl){
        //var url = newsurl.url;

        //console.log(newsurl);

        var article = {
            createdAt : Date.now(),
            articleurl : newsurl
        }

        return ArticleModel.create(article);

        //console.log(newsurl);
        //url = newsurl;
    }

    function geturlbyid(urlid){
        return ArticleModel.findOne({_id: urlid});
    }

    //function saveArticle(article){
    //
    //    var art ={
    //        createdAt : Date.now(),
    //        articleurl : article
    //    }
    //
    //    return NewsModel.create(art);
    //}
    //
    //function getArticle(){
    //    return NewsModel.find();
    //}

    function deleteurl(){
        return NewsModel.remove({});
    }

    function checkIfArticleUrlExists(newsurl){
        return ArticleModel.findOne({articleurl : newsurl});
    }

}