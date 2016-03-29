"use strict";

module.exports = function(app, formModel) {
    app.get("/api/assignment/form/:formId/field", getFieldsByFormId);
    app.get("/api/assignment/form/:formId/field/:fieldId", getFieldById);
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteFieldById);
    app.post("/api/assignment/form/:formId/field", createField);
    app.put("/api/assignment/form/:formId/field/:fieldId", updateField);

    var uuid = require('uuid');

    function getFieldsByFormId(req, res) {
        var formid = req.params.formId;
        var fields = formModel.findFieldsByFormId(formId);
        res.json(fields);
    }

    function getFieldById(req, res) {
        var formid = req.params.formId;
        var fieldid = req.params.fieldId;
        var fields = formModel.findFieldById(fieldid, formid);
        res.json(fields);
    }

    function deleteFieldById(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        formModel.deleteField(fieldId, formId);
        res.send(204);
    }

    function createField(req, res) {
        var formid = req.params.formId;
        var field = req.body;
        field._id = uuid.v1();
        var fields = formModel.createField(field, formid);
        res.json(fields);
    }

    function updateField(req, res) {
        var formid = req.params.formId;
        var fieldid = req.params.fieldId;
        var field = req.body;
        var fields = formModel.updateField(field, fieldid, formid);
        res.json(fields);
    }

};
