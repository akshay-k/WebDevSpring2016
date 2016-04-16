"use strict";

module.exports = function(app, formModel) {
    app.get("/api/assignment/user/:userId/form", getformbyuser);
    app.get("/api/assignment/form/:formId", getbyformbyid);
    app.delete("/api/assignment/form/:formId", deleteform);
    app.post("/api/assignment/user/:userId/form", createform);
    app.put("/api/assignment/form/:formId", updateform);


    //var uuid = require('uuid');

    function getformbyuser(req, res){
        //var userid = req.params.userId;
        //var users = formModel.findFormsByUserId(userid);
        //res.json(users);

        var userid = req.params.userId;
        formModel.findFormsByUserId(userid)
            .then(
                function(doc){
                    res.json(doc);
                },

                function (err) {
                    res.status(400).send(err);
                }
            )
    }

    function getbyformbyid(req, res){
        //var formid = req.params.formId;
        //var forms = formModel.findFormById(formid);
        //res.json(forms);

        var formid = req.params.formId;

        formModel.findFormById(formid)
            .then(
                function (doc) {
                    res.json(doc);
                },

                function (err) {
                    res.status(400).send(err);
                }
            )
    }

    function deleteform(req, res){
        //var formid = req.params.formId;
        //formModel.deleteform(formid);
        //res.send(204);

        var formid = req.params.formId;

        formModel.deleteForm(formid)
            .then(
                function (doc) {
                    res.json(doc);
                    res.send(204);
                },

                function (err) {
                    res.status(400).send(err);
                }
            )
    }

    function createform(req, res){
        //var userid = req.params.userId;
        //var form = req.body;
        //form._id = uuid.v1();
        //var forms = formModel.createForm(userid, form);
        //res.json(forms);

        var userid = req.params.userId;
        var form = req.body;

        formModel.createForm(userid, form)
            .then(
                function(doc){
                    res.json(doc);
                },

                function (err) {
                    res.status(400).send(err);
                }
            )
    }

    function updateform(req, res){
        //var formid = req.params.formId;
        //var form = req.body;
        //var forms = formModel.updateForm(formid, form);
        //res.json(forms);

        var formid = req.params.formId;
        var form = req.body;

        formModel.updateForm(formid, form)
            .then(
                function (doc) {
                    res.json(doc);
                },

                function (err) {
                    res.status(400).send(err);
                }
            )
    }
};