(function(){
    angular
        .module("NewsApp")
        .controller("SearchController", searchController);

    function searchController(NewsService,$scope,$rootScope,$location) {
        //var vm = this;
        //
        ////vm.search = search;
        //
        //function init() {
        //
        //}
        //init();

        $scope.search = function (article) {
            //var name = $scope.article.name;
            NewsService
                .findNewsByArticle(article)
                .then(function(response){
                    $scope.data = response.data.response.docs;
                    //$scope.data = response.data.response.docs.multimedia;
                   //$scope.data = response.data.results;
                    console.log(response.data);
                });
        }
    }
})();