"use strict";

(function () {
    angular
        .module("NewsApp")
        .controller("MainController", MainController);

    function MainController($scope, $location) {
        $scope.$location = $location;
        $scope.headerpath = 'views/header/header.view.html';
        $scope.sidepath = 'views/sidebar/sidebar.view.html';
        $scope.header = 'views/template/header.html';
        $scope.menustrip = 'views/template/menu-strip.html';
        $scope.maincontent = 'views/template/main.html';
        $scope.footer = 'views/template/footer.html';
    }
})();