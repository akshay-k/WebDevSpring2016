"use strict";

(function () {
    angular
        .module("NewsApp")
        .controller("MainController", MainController);

    function MainController($scope, $location) {
        $scope.$location = $location;
        $scope.headerpath = 'client/views/header/header.view.html';
        $scope.sidepath = 'client/views/sidebar/sidebar.view.html';
    }
})();