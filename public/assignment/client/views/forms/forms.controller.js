"use strict";

(function(){
    angular
        .module("FormBuilderApp")
        .controller("FormsController", FormsController);

    function FormsController($rootScope, $location, FormService){

        var vm = this;
        vm.loadForms = loadForms;
        vm.addForm = addForm;
        vm.updateForm = updateForm;
        vm.deleteForm = deleteForm;
        vm.selectForm = selectForm;

        function init() {
            vm.$location = $location;
            vm.sortType = 'title';
            vm.reverseSort = false;
            vm.user_id = $rootScope.currentUser._id;
            vm.select = {};
            vm.loadForms();
        }
        init();

        function loadForms() {
            FormService
                .findAllFormsForUser(vm.user_id)
                .then(function(response) {
                    vm.allForms = angular.copy(response.data);
                    //console.log(vm.allForms);
                });
        }

        function addForm(newForm) {

            if (Object.keys(newForm).length == 0) {
                return;
            }
            //console.log(newForm.title);

            newForm["userId"] = vm.user_id;
            newForm["title"] = newForm.title;
            newForm["fields"] = [];
            FormService
                .createFormForUser(vm.user_id, newForm)
                .then(function(){
                    vm.select = {};
                    loadForms();
                });
        }

        function updateForm(newForm) {
            if (Object.keys(newForm).length == 0) {
                return;
            }
            FormService
                .updateFormById(newForm._id, newForm)
                .then(function(){
                    vm.select = {};
                    loadForms();
                });

        }

        function deleteForm(formId) {
            FormService
                .deleteFormById(formId)
                .then(function(){
                    loadForms();
                });

        }

        function selectForm(selected) {
            vm.select = angular.copy(selected);
        }
    }
})();