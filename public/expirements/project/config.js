"use strict";

(function () {
    angular
        .module("NewsApp")
        .config(function ($routeProvider) {
            $routeProvider
                .when("/sports", {
                    templateUrl: "views/sports/sports.html"
                    //controller: "HomeController"
                })
                .when("/worldnews", {
                    templateUrl: "views/template/main.html"
                })
                .when("/tech", {
                    templateUrl: "views/tech/tech.html"
                    //controller: "ProfileController"
                })
                .when("/business", {
                    templateUrl: "views/business/business.html"
                    //controller: "AdminController"
                })
                .when("/movies", {
                    templateUrl: "views/movies/movies.html"
                    //controller: "FormsController"
                })
                .when("/entertainment", {
                    templateUrl: "views/movies/movies.html"
                    //controller: "FormsController"
                })
                .when("/books", {
                    templateUrl: "views/books/books.html"
                    //controller: "RegisterController"
                })
                .when("/culture", {
                    templateUrl: "views/culture/culture.html"
                    //controller: "LoginController"
                })
                .when("/classifieds", {
                    templateUrl: "views/classifieds/classifieds.html"
                    //controller: "SearchController"
                })
                .when("/blogs", {
                    templateUrl: "views/blogs/blogs.html"
                    //controller: "SearchController"
                })
                .otherwise({
                    templateUrl: "views/template/main.html"
                })
        });
})();