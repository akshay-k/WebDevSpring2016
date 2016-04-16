var q = require("q");

module.exports = function (db, mongoose) {

    var FormSchema = require("./form.schema.server.js")(mongoose);

    var FormModel = mongoose.model('Form', FormSchema);

    var api = {
        createForm: createForm,
        findFormById: findFormById,
        findFormsByUserId: findFormsByUserId,
        findAllForms: findAllForms,
        updateForm: updateForm,
        deleteForm: deleteForm,
        findFormByTitle: findFormByTitle
    };
    return api;

    function createForm(userId, form) {
        //form.userId = userId;
        //mock.push(form);
        //return form;

        var deferred = q.defer();

        FormModel.create(form, function (err, doc) {

            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

    function findFormById(formId) {
        //for(var u in mock) {
        //    if( mock[u]._id == formId ) {
        //        return mock[u];
        //    }
        //}
        //return null;

        return FormModel.findById(formId);
    }

    function findFormsByUserId(userId) {
        //var forms = [];
        //for (var u in mock) {
        //    if (mock[u].userId == userId) {
        //        forms.push (mock[u]);
        //    }
        //}
        //return forms;

        return FormModel.find({userId: userId});
    }

    function findAllForms() {
        //return mock;

        var deferred = q.defer();

        FormModel.find(function (err, doc) {
            if(err){
                deferred.reject(err);
            }
            else{
             deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

    function updateForm(formId, updatedForm) {
        //for(var u in mock) {
        //    if( mock[u]._id == formId ) {
        //        mock[u].title = updatedForm.title;
        //        mock[u].userId = updatedForm.userId;
        //        mock[u].fields = updatedForm.fields;
        //
        //        return mock[u];
        //    }
        //}
        //return null;

        var deferred = q.defer();

        FormModel.findByIdAndUpdate(
            formId,
            updatedForm,
            {new: true},
            function (err, doc) {
                if(!err){
                    deferred.resolve(doc);
                }
                else{
                    deferred.reject(err);
                }
            }
        );

        return deferred.promise;
    }

    function deleteForm(formId) {
        /*for(var u in mock) {
            if( mock[u]._id == formId ) {
                mock.splice(u,1);
                break;
            }
        }*/

        var deferred = q.defer();

        FormModel.remove({_id: formId}, function (err) {
            if(err){
                deferred.reject(err);
            }
            else{
                FormModel.find(function (err, doc) {
                    if(err){
                        deferred.reject(err);
                    }
                    else{
                        deferred.resolve(doc);
                    }
                });
            }
        });

        return deferred.promise;
    }

    function findFormByTitle(title) {
        //for(var u in mock) {
        //    if( mock[u].title === title) {
        //        return mock[u];
        //    }
        //}
        //return null;

        var deferred = q.defer();

        FormModel.findOne({title: title}, function (err, doc) {
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }
}