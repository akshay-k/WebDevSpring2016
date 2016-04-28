"use strict";

(function () {
    angular
        .module("NewsApp")
        .controller("SinglePageController", SinglePageController);

    function SinglePageController(NewsService, $location, $sce, $routeParams){

        var vm = this;

        vm.createComment = createComment;
        vm.likeArticle = likeArticle;

        function init(){
            vm.$location = $location;

            NewsService
                .geturl($routeParams.id)
                .then(function (response) {
                    //console.log(response.data[0].articleurl);
                    //console.log(response.data.articleurl);
                    //vm.user = $sce.trustAsResourceUrl(response.data[0].articleurl);
                    vm.user = $sce.trustAsResourceUrl(response.data.articleurl);
                    //vm.user = "http://www.nytimes.com/2016/04/21/world/asia/china-jianbing-new-york-beijing.html"
                })

            loadComments();
        }
        init();

        function createComment(user){
            if(user.username == null || user.emails == null || user.comments == null){
                alert("All fields Mandatory");
                return;
            }

            NewsService
                .postcomments(user, $routeParams.id)
                .then(function (response) {
                    loadComments();
                })
        }

        function loadComments(){
            NewsService
                .getcommentsforarticle($routeParams.id)
                .then(function (response) {
                    //console.log(response.data.comments);
                    vm.comments = response.data.comments;
                })
        }

        function likeArticle(user){
            //console.log(user);
            NewsService
                .likearticle(user, $routeParams.id)
                .then(function (response) {
                    alert("Article Liked");
                })
        }
    }
})();