"use strict";

module.exports = function(app, formModel) {
    app.get("/api/assignment/user/:userId/form", getformbyuser);
    app.get("/api/assignment/form/:formId", getbyformbyid);
    app.delete("/api/assignment/form/:formId", deleteform);
    app.post("/api/assignment/user/:userId/form", createform);
    app.put("/api/assignment/form/:formId", updateform);


    var uuid = require('uuid');

    function getformbyuser(req, res){
        var userid = req.params.userId;
        var users = formModel.findFormsByUserId(userid);
        res.json(users);
    }

    function getbyformbyid(req, res){
        var formid = req.params.formId;
        var forms = formModel.findFormById(formid);
        res.json(forms);
    }

    function deleteform(req, res){
        var formid = req.params.formId;
        formModel.deleteform(formid);
        res.send(204);
    }

    function createform(req, res){
        var userid = req.params.userId;
        var form = req.body;
        form._id = uuid.v1();
        var forms = formModel.createForm(userid, form);
        res.json(forms);
    }

    function updateform(req, res){
        var formid = req.params.formId;
        var form = req.body;
        var forms = formModel.updateForm(formid, form);
        res.json(forms);
    }
};