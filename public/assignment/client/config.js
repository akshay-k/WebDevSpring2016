"use strict";

(function () {
    angular
        .module("FormBuilderApp")
        .config(function ($routeProvider) {
            $routeProvider
                .when("/home", {
                    templateUrl: "views/home/home.view.html",
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
                .when("/forms", {
                    templateUrl: "views/forms/forms.view.html",
                    controller: "FormsController",
                    controllerAs: "model",
                    resolve: {loggedin: checkloggedin}
                })
                .when("/form/:formId/fields", {
                    templateUrl: "views/forms/forms-fields.view.html",
                    controller: "FieldsController",
                    controllerAs: "model",
                    resolve: {loggedin: checkloggedin}
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
                .otherwise({
                    redirectTo: "/"
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

        $http.get("/api/assignment/loggedin")
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

        $http.get("/api/assignment/loggedin")
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

        $http.get("/api/assignment/loggedin")
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