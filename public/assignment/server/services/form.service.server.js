"use strict";

module.exports = function(app, formModel) {
    app.get("/api/assignment/user/:userId/form", getformbyuser);
    app.get("/api/assignment/form/:formId", getbyformbyid);
    app.delete("/api/assignment/form/:formId", deleteform);
    app.post("/api/assignment/user/:userId/form", createform);
    app.put("/api/assignment/form/:formId", updateform);


    //var uuid = require('uuid');

    function getformbyuser(req, res){

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