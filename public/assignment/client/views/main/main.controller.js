"use strict";

(function () {
    angular
        .module("FormBuilderApp")
        .controller("MainController", MainController);

    function MainController($scope, $location) {
        $scope.$location = $location;
        $scope.headerpath = 'views/header/header.view.html';
        $scope.sidepath = 'views/sidebar/sidebar.view.html';
    }
})();