"use strict";

(function () {
    angular
        .module("NewsApp")
        .controller("LikesController", LikesController);


    function LikesController(NewsService, $scope, $rootScope, $location, UserService) {

        var vm = this;

        //vm.sendUrl = sendUrl;

        var user;

        function init() {
            var data = [];
            UserService
                .getCurrentUser()
                .then(function (response) {
                    if (response) {
                        user = response;
                        NewsService
                            .getlikesforuser(user)
                            .then(function (result) {
                                //console.log(result.data[0].likes);
                                //console.log(result);
                                for (var i in result.data) {
                                    for (var j in result.data[i].likes) {
                                        //console.log(result.data[i].likes[j].userid);
                                        //console.log(user.data._id);

                                        if (user.data._id === result.data[i].likes[j].userid) {
                                            //console.log(result.data[i].articleurl);
                                            data.push(result.data[i]);
                                            //$scope.data = result.data[i];
                                        }
                                    }
                                }

                                $scope.data = data;

                                //$scope.data = result.data.results;
                            })


                        NewsService
                            .getlikesforsearchedarticles(user)
                            .then(function (result1) {
                                for(var a in result1.data){
                                    for(var b in result1.data[a].likes){

                                        if(user.data._id === result1.data[a].likes[b].userid){
                                            data.push(result1.data[a]);
                                        }
                                    }
                                }
                                $scope.data = data;
                            })

                    }
                })
        }

        init();

        //function sendUrl(news){
        //    //console.log(news);
        //    NewsService
        //        .sendurl(news)
        //        .then(function (response) {
        //            //console.log(response.data._id);
        //            $location.url("/single/"+response.data._id);
        //        })
        //
        //}
    }

})();