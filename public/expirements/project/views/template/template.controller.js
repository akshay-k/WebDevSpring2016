"use strict";

(function () {
    angular
        .module("NewsApp")
        .controller("TemplateController", TemplateController);

    function TemplateController($scope, $location) {
        $scope.$location = $location;
        $scope.menustrip = 'views/template/menu-strip.html';
        console.log(menustrip);
    }
})();