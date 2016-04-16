"use strict";

(function () {
    angular
        .module("NewsApp")
        .config(function ($routeProvider) {
            $routeProvider
                .when("/home", {
                    templateUrl: "client/views/home/home.view.html",
                    controller: "HomeController"
                })
                .when("/profile", {
                    templateUrl: "views/users/profile.view.html",
                    controller: "ProfileController"
                })
                .when("/admin", {
                    templateUrl: "views/admin/admin.view.html",
                    controller: "AdminController"
                })
                .when("/forms", {
                    templateUrl: "views/forms/forms.view.html",
                    controller: "FormsController"
                })
                .when("/forms-fields", {
                    templateUrl: "views/forms/forms-fields.view.html",
                    controller: "FormsController"
                })
                .when("/register", {
                    templateUrl: "views/users/register.view.html",
                    controller: "RegisterController"
                })
                .when("/login", {
                    templateUrl: "clientviews/users/login.view.html",
                    controller: "LoginController"
                })
                .when("/search", {
                    templateUrl: "client/views/search/search.view.html",
                    controller: "SearchController"
                })
                .otherwise({
                    redirectTo: "/"
                })
        });
})();