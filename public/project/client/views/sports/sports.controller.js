(function(){
    angular
        .module("NewsApp")
        .controller("SportsController", SportsController);

    function SportsController(NewsService, $scope, $rootScope, $location){

        var vm = this;

        vm.sendUrl = sendUrl;

        function init(){
            NewsService
                .showSportsNews()
                .then(function(response){
                    $scope.data = response.data.results;
                    //console.log(response.data);
                })
        }
        init();

        function sendUrl(news){
            //console.log(news);
            NewsService
                .sendurl(news)
                .then(function (response) {
                    $location.url("/single/"+response.data._id);
                })

        }


        //$scope.render = function(){
        //    NewsService
        //        .showRecentNews()
        //        .then(function(response){
        //            $scope.data = response.data.results;
        //            console.log(response.data);
        //    });
        //}
    }
})();