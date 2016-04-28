"use strict";

(function(){
    angular
        .module("NewsApp")
        .factory("NewsService", NewsService);

    function NewsService($http, $rootScope) {

        var api = {
            findNewsByArticle: findNewsByArticle,
            showRecentNews: showRecentNews,
            sendurl: sendurl,
            geturl: geturl,
            showWorldNews:showWorldNews,
            showSportsNews: showSportsNews,
            showTechnologyNews: showTechnologyNews,
            showBusinessNews: showBusinessNews,
            showMovieNews: showMovieNews,
            showBooksNews: showBooksNews,
            sendarticleurl: sendarticleurl,
            postcomments: postcomments,
            getcommentsforarticle: getcommentsforarticle,
            getarticleurl: getarticleurl,
            getcommentsforarticleforsearchedarticles: getcommentsforarticleforsearchedarticles,
            postcommentsforsearchedarticles: postcommentsforsearchedarticles,
            likearticle: likearticle,
            getlikesforuser: getlikesforuser,
            likesearcharticle: likesearcharticle,
            getlikesforsearchedarticles: getlikesforsearchedarticles
        };
        return api;


        function findNewsByArticle(article) {

            //return $http.get("/api/project/newsheadlines/findnewsbayarticle?article="+article);
            return $http.get("http://api.nytimes.com/svc/search/v2/articlesearch.json?callback=svc_search_v2_articlesearch&q=" + article + "&sort=newest&hl=true&api-key=d8879a7ee078676a7882cb1c113dc6e5%3A17%3A74405850");
        }

        function showRecentNews() {
            return $http.get("http://api.nytimes.com/svc/news/v3/content/all/all/1.json?api-key=d5294ac0221560f8eaf177d9e1029a57:5:74405850");
        }

        function showWorldNews(){
            return $http.get("http://api.nytimes.com/svc/news/v3/content/all/world/.json?limit=10&api-key=d5294ac0221560f8eaf177d9e1029a57%3A5%3A74405850");
        }

        function showSportsNews(){
            return $http.get("http://api.nytimes.com/svc/news/v3/content/all/sports/.json?api-key=d5294ac0221560f8eaf177d9e1029a57%3A5%3A74405850");
        }

        function showTechnologyNews(){
            return $http.get("http://api.nytimes.com/svc/news/v3/content/all/technology/.json?api-key=d5294ac0221560f8eaf177d9e1029a57%3A5%3A74405850");
        }

        function showBusinessNews(){
            return $http.get("http://api.nytimes.com/svc/news/v3/content/all/business/.json?api-key=d5294ac0221560f8eaf177d9e1029a57%3A5%3A74405850");
        }

        function showMovieNews(){
            return $http.get("http://api.nytimes.com/svc/news/v3/content/all/movies/.json?api-key=d5294ac0221560f8eaf177d9e1029a57%3A5%3A74405850");
        }

        function showBooksNews(){
            return $http.get("http://api.nytimes.com/svc/news/v3/content/all/books/.json?api-key=d5294ac0221560f8eaf177d9e1029a57%3A5%3A74405850");
        }

        function sendurl(newsurl){
            return $http.post("/api/project/newsheadlines/saveurl",newsurl);
        }

        function geturl(urlid){
            return $http.get("/api/project/newsheadlines/geturl/"+urlid);
        }

        function sendarticleurl(newsurl){
            //console.log(newsurl);
            return $http.post("/api/project/articlesearch/saveurl", newsurl);
        }

        function getarticleurl(urlid){
            return $http.get("/api/project/articlesearch/geturl/"+urlid);
        }

        //function setarticle(article){
        //    //console.log(article);
        //    return $http.post("/api/project/articlesearch", {search: article});
        //}
        //
        //function getarticle(){
        //    return $http.get("/api/project/articleget");
        //}

        function postcomments(comments, urlid){
            return $http.post("/api/project/newsheadlines/"+urlid+"/comments",comments);
        }

        function getcommentsforarticle(articleid){
            return $http.get("/api/project/newsheadlines/"+articleid+"/comments");
        }

        function postcommentsforsearchedarticles(comments, urlid){
            return $http.post("/api/project/articlesearch/"+urlid+"/comments",comments);
        }

        function getcommentsforarticleforsearchedarticles(articleid){
            return $http.get("/api/project/articlesearch/"+articleid+"/comments");
        }

        function likearticle(user, urlid){
            return $http.post("/api/project/newsheadlines/"+urlid+"/likes",user);
        }

        function getlikesforuser(user){
            return $http.get("/api/project/newsheadlines/"+user+"/likes");
        }

        function likesearcharticle(user, urlid){
            return $http.post("/api/project/articlesearch/"+urlid+"/likes",user);
        }

        function getlikesforsearchedarticles(user){
            return $http.get("/api/project/articlesearch/"+user+"/likes");
        }

    }
})();