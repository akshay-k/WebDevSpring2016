(function() {
    angular
        .module("NewsApp")
        .controller("SearchController", searchController);

    function searchController(NewsService, $location, $scope, $routeParams) {
        var vm = this;

        vm.sendUrl = sendUrl;

        function init(){
            vm.$location = $location;

            //NewsService
            //    .getarticle()
            //    .then(function(response){
            //        //console.log(response.data[0].articleurl);
            //        var article = angular.copy(response.data[0].articleurl);
            //        //console.log(article);
            //        NewsService
            //            .findNewsByArticle(article)
            //            .then(function (response) {
            //                //console.log(response.data.response.docs);
            //                $scope.data = response.data.response.docs;
            //            })
            //        //console.log(response.data);
            //    })

            NewsService
                .findNewsByArticle($routeParams.articlename)
                .then(function (response) {
                    $scope.data = response.data.response.docs;
                })
        }
        init();


        function sendUrl(news){
            //console.log(news);
            NewsService
                .sendarticleurl(news)
                .then(function (response) {
                    //console.log(response.data);
                    $location.url("/search-results/"+response.data._id);
                })

        }
    }
})();