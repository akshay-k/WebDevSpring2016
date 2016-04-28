"use strict";

(function () {
    angular
        .module("NewsApp")
        .controller("SidebarController", SidebarController);

    function SidebarController($location, NewsService, $window) {

        var vm = this;

        vm.search = search;

        function init(){
            vm.$location = $location;
        }
        init();

        function search(article){
            //var art = angular.toJson(article);
            //NewsService
            //    .setarticle(article)
            //    .then(function () {;
            //        $window.location.reload();
            //        $location.url("/search/");
            //    })

            if(article == null){
                alert("Enter a article");
                return;
            }

            $location.url("/search/"+article);
        }
    }
})();