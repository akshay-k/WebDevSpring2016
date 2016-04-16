var q = require("q");

module.exports = function (db, mongoose) {

    var FieldSchema = require("./field.schema.server.js")(mongoose);
    var FormSchema = require("./form.schema.server.js")(mongoose);

    var FieldModel = mongoose.model('Field', FieldSchema);
    var FormModel = mongoose.model('FormModel', FormSchema);

    var api = {
        findFieldsByFormId: findFieldsByFormId,
        findFieldById: findFieldById,
        deleteField: deleteField,
        createField: createField,
        updateField: updateField,
        sortField: sortField
    };
    return api;

    function findFieldsByFormId(formId) {
        //var fields = [];
        //for (var u in mock) {
        //    if (mock[u]._id == formId) {
        //        fields = mock[u].fields;
        //        break;
        //    }
        //}
        //return fields;

        return FormModel.findById(formId).select("fields");

    }

    function findFieldById(fieldId, formId) {
        //for (var u in mock) {
        //    if (mock[u]._id == formId) {
        //        var fields = mock[u].fields;
        //        for (var f in fields) {
        //            if (fields[f]._id == fieldId) {
        //                return fields[f];
        //            }
        //        }
        //        break;
        //    }
        //}
        //return null;
        if(FormModel.find({formId: formId})) {
            return FieldModel.findById(fieldId);
        }
    }

    function deleteField(fieldId, formId) {
        //for (var u in mock) {
        //    if (mock[u]._id == formId) {
        //        var fields = mock[u].fields;
        //        for (var f in fields) {
        //            if (fields[f]._id == fieldId) {
        //                mock[u].fields.splice(f,1);
        //                break;
        //            }
        //        }
        //        break;
        //    }
        //}

        //var deferred = q.defer();
        //
        //FieldModel.remove({_id: fieldId}, function (err) {
        //    if(err){
        //        deferred.reject(err);
        //    }
        //    else{
        //        FieldModel.find(function (err, doc) {
        //            if(err){
        //                deferred.reject(err);
        //            }
        //            else{
        //                deferred.resolve(doc);
        //            }
        //        });
        //    }
        //});
        //
        //return deferred.promise;

        return FormModel.findById(formId)
            .then(
                function (application) {
                    application.fields.id(fieldId).remove();
                    application.updated = Date.now();
                    return application.save();
                }
            )
    }

    function createField(field, formId) {
        //console.log(mock);
        //for (var u in mock) {
        //    if (mock[u]._id == formId) {
        //        mock[u].fields.push(field);
        //        return field;
        //    }
        //}

        //var deferred = q.defer();
        ////console.log(field);
        //FormModel.findById(formId)
        //    .then(
        //        function (forms) {
        //            forms.fields.push(
        //                FieldModel.create(field, function (err, doc) {
        //
        //                        if(err){
        //                            deferred.reject(err);
        //                }
        //                else{
        //                    deferred.resolve(doc);
        //                }
        //            })
        //            )
        //        }
        //    )
        //
        //
        //return deferred.promise;

        //return Application.findById(applicationId)
        //    .then(
        //        function(application) {
        //            application.pages.push(page);
        //            return application.save();
        //        }
        //    );

        return FormModel.findById(formId)
            .then(
                function (app) {
                    app.fields.push(field);
                    app.updated = Date.now();
                    return app.save();
                }
            );
    }

    function updateField(field, fieldId, formId) {
        //for (var u in mock) {
        //    if (mock[u]._id == formId) {
        //        var fields = mock[u].fields;
        //
        //        for (var f in fields) {
        //            if (fields[f]._id == fieldId) {
        //
        //                for (var eachKey in field) {
        //                    if (field.hasOwnProperty(eachKey)) {
        //                        mock[u].fields[f][eachKey] = field[eachKey];
        //                    }
        //                }
        //                return field;
        //            }
        //        }
        //        break;
        //    }
        //}
        //return null;

        //var deferred = q.defer();
        //
        //FieldModel.findByIdAndUpdate(
        //    fieldId,
        //    field,
        //    {new: true},
        //    function (err, doc) {
        //        if(!err){
        //            deferred.resolve(doc);
        //        }
        //        else{
        //            deferred.reject(err);
        //        }
        //    }
        //);
        //
        //return deferred.promise;

        return FormModel.findById(formId)
            .then(
                function (application) {
                    var fieldobj = application.fields.id(fieldId);
                    fieldobj.label = field.label;
                    fieldobj.type = field.type;
                    fieldobj.placeholder = field.placeholder;
                    fieldobj.options = field.options;
                    application.updated = Date.now();
                    return application.save();
                }
            )
    }

    function sortField(formId, startIndex, endIndex) {
        return FormModel
            .findById(formId)
            .then(
                function(application) {
                    application.fields.splice(endIndex, 0, application.fields.splice(startIndex, 1)[0]);

                    // notify mongoose 'fields' field changed
                    application.markModified("fields");

                    application.save();
                }
            );
    }

}