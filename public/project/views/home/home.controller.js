(function(){
    angular
        .module("NewsApp")
        .controller("HomeController", HomeController);

    function HomeController(NewsService, $scope, $rootScope, $location){
        $scope.render = function(){
            NewsService
                .showRecentNews()
                .then(function(response){
                    $scope.data = response.data.results;
                    console.log(response.data);
            });
        }
    }
})();