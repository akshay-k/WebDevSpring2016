"use strict";

(function () {
    angular
        .module("NewsPortal")
        .config(function ($routeProvider) {
            $routeProvider
                .when("/home", {
                    templateUrl: "views/home/home.view.html",
                    controller: "HomeController"
                })
                //.when("/profile", {
                //    templateUrl: "views/users/profile.view.html",
                //    controller: "ProfileController"
                //})
                //.when("/admin", {
                //    templateUrl: "views/admin/admin.view.html",
                //    controller: "AdminController"
                //})
                //.when("/forms", {
                //    templateUrl: "views/forms/forms.view.html",
                //    controller: "FormsController"
                //})
                //.when("/forms-fields", {
                //    templateUrl: "views/forms/forms-fields.view.html",
                //    controller: "FormsController"
                //})
                //.when("/register", {
                //    templateUrl: "views/users/register.view.html",
                //    controller: "RegisterController"
                //})
                //.when("/login", {
                //    templateUrl: "views/users/login.view.html",
                //    controller: "LoginController"
                //})
                //.when("/search", {
                //    templateUrl: "views/search/search.view.html",
                //    controller: "SearchController"
                //})
                .otherwise({
                    templateUrl: "views/home/home.view.html"
                })
        });
})();