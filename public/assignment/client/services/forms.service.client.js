"use strict";

(function () {
    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);

    function FormService ($http, $rootScope){

        var api = {
            createFormForUser: createFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById,
            getFormById: getFormById
        };
        return api;

        function createFormForUser(userId, form) {
            return $http.post("/api/assignment/user/"+userId+"/form", form);
        }

        function findAllFormsForUser(userId) {
            return $http.get("/api/assignment/user/"+userId+"/form");
        }

        function deleteFormById(formId) {
            return $http.delete("/api/assignment/form/"+formId);
        }

        function updateFormById(formId, newForm) {
            return $http.put("/api/assignment/form/"+formId, newForm);
        }

        function getFormById(formId) {
            return $http.get("/api/assignment/form/"+formId);
        }

        //var forms = [
        //    {"_id": "000", "title": "Contacts", "userId": 123},
        //    {"_id": "010", "title": "ToDo",     "userId": 123},
        //    {"_id": "020", "title": "CDs",      "userId": 234},
        //]
        //
        //var createFormForUser = function (userId, form, callback){
        //    form._id = (new Date).getTime();
        //    forms.push(form);
        //    callback(form);
        //}
        //
        //var findAllFormsForUser = function (userId, callback){
        //    var user_forms=[];
        //
        //    for(var f in forms)
        //    {
        //        if(forms[f].userId == userId )
        //        {
        //            user_forms.push(forms[f]);
        //        }
        //    }
        //    callback(user_forms);
        //
        //}
        //
        //var deleteFormById =  function (formId, callback){
        //    var found = null;
        //    for(var u in forms)
        //    {
        //        if(forms[u]._id == formId)
        //        {
        //            found = u;
        //            break;
        //        }
        //    }
        //    if(found != null) {
        //        users.splice(u,1);
        //    }
        //    callback(forms);
        //}
        //
        //var updateFormById =  function (formId, newForm, callback){
        //    for(var u in forms)
        //    {
        //        if(forms[u]._id == formId)
        //        {
        //            forms[u] = newForm;
        //            break;
        //        }
        //    }
        //    callback(newForm);
        //}
        //
        //return {
        //    createFormForUser: createFormForUser,
        //    findAllFormsForUser: findAllFormsForUser,
        //    deleteFormById: deleteFormById,
        //    updateFormById: updateFormById
        //}
    }
})();