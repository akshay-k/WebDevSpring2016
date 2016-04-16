(function(){
    angular
        .module("NewsPortal")
        .factory("NewsService", NewsService);

    function NewsService($http){
        var api ={
            findNewsByArticle: findNewsByArticle,
            showRecentNews: showRecentNews
        };

        return api;

        function findNewsByArticle(article){
            return $http.get("http://api.nytimes.com/svc/search/v2/articlesearch.json?callback=svc_search_v2_articlesearch&q="+article+"&sort=newest&hl=true&api-key=d8879a7ee078676a7882cb1c113dc6e5%3A17%3A74405850");
            //return $http.get("http://api.nytimes.com/svc/news/v3/content/all/"+article+"/.json?api-key=d5294ac0221560f8eaf177d9e1029a57%3A5%3A74405850")
        }

        function showRecentNews(){
            //return $http.get("http://api.nytimes.com/svc/news/v3/content/all/all/.json?limit=10&api-key=d5294ac0221560f8eaf177d9e1029a57%3A5%3A74405850");
            return $http.get("http://api.nytimes.com/svc/news/v3/content/all/all/1.json?api-key=d5294ac0221560f8eaf177d9e1029a57:5:74405850");
        }
    }
})();