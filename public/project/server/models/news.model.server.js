var q = require("q");

module.exports = function (db, mongoose) {

    var NewsSchema = require("./news-headlines.schema.server.js")(mongoose);

    var NewsModel = mongoose.model('NewsModel', NewsSchema);

    var api = {
        saveuri: saveuri,
        geturlbyid: geturlbyid,
        deleteurl: deleteurl,
        //getRecentNews: getRecentNews,
        //findNewsByArticle: findNewsByArticle,
        saveArticle: saveArticle,
        getArticle: getArticle,
        checkIfArticleExistis: checkIfArticleExistis
    };
    return api;

    function saveuri(newsurl){
        //var url = newsurl.url;

        var article = {
            createdAt : Date.now(),
            articleurl : newsurl
        }

        return NewsModel.create(article);
        //console.log(newsurl);
        //url = newsurl;
    }

    function geturlbyid(urlid){
        return NewsModel.findOne({_id: urlid});
    }

    function deleteurl(){
        return NewsModel.remove({});
    }

    //function getRecentNews(){
    //    //return $http.get("http://api.nytimes.com/svc/news/v3/content/all/all/1.json?api-key=d5294ac0221560f8eaf177d9e1029a57:5:74405850");
    //}
    //
    //function findNewsByArticle(article){
    //    //return $http.get("http://api.nytimes.com/svc/search/v2/articlesearch.json?callback=svc_search_v2_articlesearch&q=" + article + "&sort=newest&hl=true&api-key=d8879a7ee078676a7882cb1c113dc6e5%3A17%3A74405850");
    //}

    function saveArticle(article){

        var art ={
            createdAt : Date.now(),
            articleurl : article
        }

        return NewsModel.create(art);
    }

    function getArticle(){
        return NewsModel.find();
    }

    function checkIfArticleExistis(newsurl){
        return NewsModel.findOne({articleurl : newsurl});
    }
}