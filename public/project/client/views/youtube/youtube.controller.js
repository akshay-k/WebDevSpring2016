(function () {
    angular
        .module("NewsApp")
        .controller("YouTubeController", YouTubeController);

    function YouTubeController(VideoService) {
        var vm = this;

        //vm.getpage = getpage;

        function init(){
            VideoService
                .findVideoByArticle()
                .then(function (response) {
                    console.log(response.data);
                    //vm.user = $sce.trustAsResourceUrl(response.data);
                })
        }
        init();

        //$http
        //    .get('/youtube')
        //    .success(function (response) {
        //        //$scope.yt = response;
        //    });
    }
})();
