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
        return FormModel.findById(formId).select("fields");

    }

    function findFieldById(fieldId, formId) {
        if(FormModel.find({formId: formId})) {
            return FieldModel.findById(fieldId);
        }
    }

    function deleteField(fieldId, formId) {
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