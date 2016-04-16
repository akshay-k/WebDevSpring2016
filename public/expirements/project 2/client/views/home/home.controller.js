(function(){
    angular
        .module("NewsPortal")
        .controller("HomeController", HomeController);

    function HomeController(NewsService, $scope, $rootScope, $location){
        $scope.render = function(){
            console.log("hello");
            NewsService
                .showRecentNews()
                .then(function(response){
                    $scope.data = response.data.results;
                    console.log(response.data);
                });
        }
    }
})();