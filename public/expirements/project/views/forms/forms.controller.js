"use strict";

(function(){
    angular
        .module("NewsApp")
        .controller("FormsController", FormsController);

    function FormsController($scope, $rootScope, $location, FormService){

        var user_id = $rootScope.user._id;

        FormService.findAllFormsForUser(user_id, function (forms) {
            $scope.Forms = forms;
        })

        $scope.sortType = "title";
        $scope.reverseSort = false;
        $scope.select = {};

        $scope.loadForms = function(){
            FormService.findAllFormsForUser(user_id, function(forms) {
                $scope.allForms = angular.copy(forms);
            });
        };
        $scope.loadForms();

        $scope.addForm = function(newForm) {
            FormService.createFormForUser(user_id, newForm, function(success) {
                $scope.select = {};
            });
        };

        $scope.updateForm = function(newForm) {
            FormService.updateFormById(newForm._id, newForm, function(success) {
                $scope.select = {};
            });
        };

        $scope.deleteForm = function(formId) {
            FormService.deleteFormById(formId, function(success) {
            });
        };

        $scope.selectForm = function(selected) {
            $scope.select = angular.copy(selected);
        };
    }
})();