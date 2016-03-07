"use strict";

(function () {
    angular
        .module("NewsApp")
        .factory("FormService", FormService);

    function FormService (){

        var forms = [
            {"_id": "000", "title": "Contacts", "userId": 123},
            {"_id": "010", "title": "ToDo",     "userId": 123},
            {"_id": "020", "title": "CDs",      "userId": 234},
        ]

        var createFormForUser = function (userId, form, callback){
            form._id = (new Date).getTime();
            forms.push(form);
            callback(form);
        }

        var findAllFormsForUser = function (userId, callback){
            var user_forms=[];

            for(var f in forms)
            {
                if(forms[f].userId == userId )
                {
                    user_forms.push(forms[f]);
                }
            }
            callback(user_forms);

        }

        var deleteFormById =  function (formId, callback){
            var found = null;
            for(var u in forms)
            {
                if(forms[u]._id == formId)
                {
                    found = u;
                    break;
                }
            }
            if(found != null) {
                users.splice(u,1);
            }
            callback(forms);
        }

        var updateFormById =  function (formId, newForm, callback){
            for(var u in forms)
            {
                if(forms[u]._id == formId)
                {
                    forms[u] = newForm;
                    break;
                }
            }
            callback(newForm);
        }

        return {
            createFormForUser: createFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById
        }
    }
})();