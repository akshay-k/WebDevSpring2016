"use strict";

(function () {
    angular
        .module("NewsApp")
        .controller("SearchResultsController", SearchResultsController);

    function SearchResultsController(NewsService, $location, $sce, $routeParams){

        var vm = this;

        vm.createComment = createComment;
        vm.likeArticle = likeArticle;

        function init(){
            vm.$location = $location;

            NewsService
                .getarticleurl($routeParams.id)
                .then(function (response) {
                    //console.log(response);
                    //console.log(response.data[0].articleurl);
                    vm.user = $sce.trustAsResourceUrl(response.data.articleurl);
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
                .postcommentsforsearchedarticles(user, $routeParams.id)
                .then(function (response) {
                    loadComments();
                })
        }

        function loadComments(){
            NewsService
                .getcommentsforarticleforsearchedarticles($routeParams.id)
                .then(function (response) {
                    //console.log(response.data.comments);
                    vm.comments = response.data.comments;
                })
        }

        function likeArticle(user){
            //console.log(user);
            NewsService
                .likesearcharticle(user, $routeParams.id)
                .then(function (response) {
                    alert("Article Liked");
                })
        }
    }
})();