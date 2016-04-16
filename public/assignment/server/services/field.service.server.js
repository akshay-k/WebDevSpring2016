"use strict";

module.exports = function(app, fieldModel) {
    app.get("/api/assignment/form/:formId/field", getFieldsByFormId);
    app.get("/api/assignment/form/:formId/field/:fieldId", getFieldById);
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteFieldById);
    app.post("/api/assignment/form/:formId/field", createField);
    app.put("/api/assignment/form/:formId/field/:fieldId", updateField);
    app.put("/api/application/:formId/page", updateFields);

    //var uuid = require('uuid');

    function getFieldsByFormId(req, res) {
        //var formid = req.params.formId;
        //var fields = fieldModel.findFieldsByFormId(formId);
        //res.json(fields);

        var formid = req.params.formId;
        fieldModel.findFieldsByFormId(formid)
            .then(
                function (doc) {
                    res.json(doc);
                },

                function (err) {
                    res.status(400).send(err);
                }
            )
    }

    function getFieldById(req, res) {
        //var formid = req.params.formId;
        //var fieldid = req.params.fieldId;
        //var fields = fieldModel.findFieldById(fieldid, formid);
        //res.json(fields);

        var formid = req.params.formId;
        var fieldid = req.params.fieldId;

        fieldModel.findFieldById(fieldid, formid)
            .then(
                function (doc) {
                    res.json(doc);
                },

                function (err) {
                    res.status(400).send(err);
                }
            )
    }

    function deleteFieldById(req, res) {
        //var formId = req.params.formId;
        //var fieldId = req.params.fieldId;
        //fieldModel.deleteField(fieldId, formId);
        //res.send(204);

        var formId = req.params.formId;
        var fieldId = req.params.fieldId;

        fieldModel.deleteField(fieldId, formId)
            .then(
                //function (doc) {
                //    res.json(doc);
                //},

                function (err) {
                    res.status(204).send(err);
                }
            )
    }

    function createField(req, res) {
        //var formid = req.params.formId;
        //var field = req.body;
        //field._id = uuid.v1();
        //var fields = fieldModel.createField(field, formid);
        //res.json(fields);

        var formid = req.params.formId;
        var field = req.body;

        fieldModel.createField(field, formid)
            .then(
                function (doc) {
                    res.json(doc);
                },

                function (err) {
                    res.status(400).send(err);
                }
            )
    }

    function updateField(req, res) {
        //var formid = req.params.formId;
        //var fieldid = req.params.fieldId;
        //var field = req.body;
        //var fields = fieldModel.updateField(field, fieldid, formid);
        //res.json(fields);

        var formid = req.params.formId;
        var fieldid = req.params.fieldId;
        var field = req.body;

        fieldModel.updateField(field, fieldid, formid)
            .then(
                function (doc) {
                    res.json(doc);
                },

                function (err) {
                    res.status(400).send(err);
                }
            )
    }

    function updateFields (req, res) {
        var formid = req.params.formId;
        var startIndex = req.query.startIndex;
        var endIndex = req.query.endIndex;

        console.log(startIndex, endIndex);
        if (startIndex && endIndex) {
            fieldModel
                .sortField(formid, startIndex, endIndex)
                .then(
                    function (stat) {
                        return res.json(200);
                    },
                    function (err) {
                        res.status(400).send(err);
                    }
                );
        }
    }

};