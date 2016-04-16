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
        return FormModel.findById(formId);
    }

    function findFormsByUserId(userId) {
        return FormModel.find({userId: userId});
    }

    function findAllForms() {
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