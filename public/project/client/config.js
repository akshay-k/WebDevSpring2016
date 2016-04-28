"use strict";

(function () {
    angular
        .module("NewsApp")
        .config(function ($routeProvider) {
            $routeProvider
                .when("/home", {
                    templateUrl: "views/home/home.view.html",
                    controller: "HomeController",
                    controllerAs: "model",
                    resolve:{ loggedin: getloggedin}
                })
                .when("/worldnews",{
                    templateUrl: "views/world-news/worldnews.view.html",
                    controller: "WorldNewsController",
                    controllerAs: "model",
                    resolve:{ loggedin: getloggedin}
                })
                .when("/sports", {
                    templateUrl: "views/sports/sports.view.html",
                    controller: "SportsController",
                    controllerAs: "model",
                    resolve:{ loggedin: getloggedin}
                })
                .when("/tech", {
                    templateUrl: "views/tech/tech.view.html",
                    controller: "TechController",
                    controllerAs: "model",
                    resolve:{ loggedin: getloggedin}
                })
                .when("/business", {
                    templateUrl: "views/business/business.view.html",
                    controller: "BusinessController",
                    controllerAs: "model",
                    resolve:{ loggedin: getloggedin}
                })
                .when("/movies", {
                    templateUrl: "views/movies/movies.view.html",
                    controller: "MoviesController",
                    controllerAs: "model",
                    resolve:{ loggedin: getloggedin}
                })
                .when("/books", {
                    templateUrl: "views/books/books.view.html",
                    controller: "BooksController",
                    controllerAs: "model",
                    resolve:{ loggedin: getloggedin}
                })
                .when("/profile", {
                    templateUrl: "views/users/profile.view.html",
                    controller: "ProfileController",
                    controllerAs: "model",
                    resolve: { loggedin: checkloggedin}
                })
                .when("/admin", {
                    templateUrl: "views/admin/admin.view.html",
                    controller: "AdminController",
                    controllerAs: "model",
                    resolve: {loggedin: checkadmin}
                })
                .when("/register", {
                    templateUrl: "views/users/register.view.html",
                    controller: "RegisterController",
                    controllerAs: "model"
                })
                .when("/login", {
                    templateUrl: "views/users/login.view.html",
                    controller: "LoginController",
                    controllerAs: "model"
                })
                .when("/single/:id", {
                    templateUrl: "views/single-article/single.html",
                    controller: "SinglePageController",
                    controllerAs: "model",
                    resolve:{ loggedin: getloggedin}
                })
                .when("/search/:articlename", {
                    templateUrl: "views/search/search.view.html",
                    controller: "SearchController",
                    controllerAs: "model",
                    resolve:{ loggedin: getloggedin}
                })
                .when("/search-results/:id", {
                    templateUrl: "views/search-results/search-results.view.html",
                    controller: "SearchResultsController",
                    controllerAs: "model",
                    resolve:{ loggedin: getloggedin}
                })
                .when("/liked-articles", {
                    templateUrl: "views/liked-articles/liked-articles.view.html",
                    controller: "LikesController",
                    controllerAs: "model",
                    resolve:{ loggedin: checkloggedin}
                })
                .when("/search-users", {
                    templateUrl: "views/search-users/search-users.view.html",
                    controller: "SearchUsersController",
                    controllerAs: "model",
                    resolve:{ loggedin: checkloggedin}
                })
                .when("/users-following", {
                    templateUrl: "views/users-following/users-following.view.html",
                    controller: "UsersFollowersController",
                    controllerAs: "model",
                    resolve:{ loggedin: checkloggedin}
                })
                .when("/messages", {
                    templateUrl: "views/messages/message-users.view.html",
                    controller: "MessageController",
                    controllerAs: "model",
                    resolve:{ loggedin: checkloggedin}
                })
                .when("/youtube", {
                    templateUrl: "views/youtube/youtube.view.html"
                    //controller: "YouTubeController",
                    //controllerAs: "model",
                    //resolve:{ loggedin: getloggedin}
                })
                .otherwise({
                    templateUrl: "views/home/home.view.html",
                    controller: "HomeController",
                    controllerAs: "model",
                    resolve:{ loggedin: getloggedin}
                })
        });

    var getloggedin =  function getLoggedIn(UserService, $q, $rootScope, $http) {
        var deferred = $q.defer();

        //UserService
        //    .getCurrentUser()
        //    .then(function(response){
        //        var currentUser = response.data;
        //        UserService.setCurrentUser(currentUser);
        //        deferred.resolve();
        //    });

        $http.get("/api/project/loggedin")
            .success(function (user) {
                if(user !== '0'){
                    $rootScope.currentUser = user;
                }

                deferred.resolve();
        })

        return deferred.promise;
    }

    var checkloggedin = function checkLoggedIn(UserService, $q, $location, $http, $rootScope) {

        var deferred = $q.defer();

        //UserService
        //    .getCurrentUser()
        //    .then(function(response) {
        //        var currentUser = response.data;
        //        if(currentUser) {
        //            UserService.setCurrentUser(currentUser);
        //            deferred.resolve();
        //        } else {
        //            UserService.setCurrentUser(null);
        //            deferred.reject();
        //            $location.url("/login");
        //        }
        //    });

        $http.get("/api/project/loggedin")
            .success(function (user) {

                if(user !== '0'){
                    $rootScope.currentUser = user;
                    deferred.resolve();
                }
                else{
                    deferred.reject();
                    $location.url("/login");
                }
            })

        return deferred.promise;
    }

    var checkadmin =  function checkAdmin(UserService, $q, $location, $http, $rootScope) {

        var deferred = $q.defer();

        //UserService
        //    .getCurrentUser()
        //    .then(function(response) {
        //        var currentUser = response.data;
        //        if(currentUser && currentUser.roles.indexOf('admin')>-1) {
        //            deferred.resolve();
        //        } else {
        //            deferred.reject();
        //            $location.url("/home");
        //        }
        //    });

        $http.get("/api/project/loggedin")
            .success(function (user) {
                if(user !== '0' && user.roles.indexOf('admin')>-1){
                    $rootScope.currentUser = user;
                    deferred.resolve();
                }

                else{
                    deferred.reject();
                    $location.url("/home");
                }
            })

        return deferred.promise;
    }

})();