(function(){
    angular
        .module("NewsApp")
        .controller("DetailsController", detailsController);

    function detailsController($routeParams,
                               NewsService,
                               $rootScope,
                               $location
    ) {
        var vm = this;
        var article = $routeParams.article;
        //var currentUser = $rootScope.currentUser;

        function init() {
            NewsService
                .findNewsByArticle (article)
                .then(function(response){
                    vm.data = response.data;
                });

        }
        init();
    }
})();