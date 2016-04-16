(function(){
    angular
        .module("NewsApp")
        .controller("MainController", MainController);

    function MainController(NewsService, $scope, $rootScope, $location){
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