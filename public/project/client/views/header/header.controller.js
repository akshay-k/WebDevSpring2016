"use strict";

(function(){
    angular
        .module("NewsApp")
        .controller("HeaderController", HeaderController);

    function HeaderController ($location, UserService, NewsService, $window){

       var vm = this;

        vm.logout = logout;
        vm.search = search;

        function init(){
            vm.$location = $location;
        }
        init();

        function logout(){
            UserService
                .logout()
                .then(function () {
                    UserService.setCurrentUser(null);
                    $location.url("/home");
                });
        }

        function search(article){
            //var art = angular.toJson(article);
            NewsService
                .setarticle(article)
                .then(function () {
                        $window.location.reload();
                        $location.url("/search");
                })
        }
    }
})();