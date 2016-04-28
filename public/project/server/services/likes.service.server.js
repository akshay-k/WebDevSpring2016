"use strict";

module.exports = function (app, likesModel) {

    app.post("/api/project/newsheadlines/:urlid/likes", insertlikes);
    app.get("/api/project/newsheadlines/:userid/likes", getlikedarticles);

    app.post("/api/project/articlesearch/:urlid/likes", insertarticlelikes);
    app.get("/api/project/articlesearch/:userid/likes", getarticlelikes);

    function insertlikes(req, res){

        likesModel
            .savelikes(req.body, req.params.urlid)
            .then(
                function (response) {
                    if(response){
                        res.json(response);
                    }
                },

                function (err) {
                    res.status(400).send(err);
                }
            )

    }

    function getlikedarticles(req, res){

        likesModel
            .getlikes()
            .then(
                function (doc) {
                    res.json(doc);
                    //console.log(doc);
                },

                function (err) {
                    res.status(400).send(err);
                }
            )
    }

    function insertarticlelikes(req, res){

        likesModel
            .savearticlelikes(req.body, req.params.urlid)
            .then(
                function (response) {
                    if(response){
                        res.json(response);
                    }
                },

                function (err) {
                    res.status(400).send(err);
                }
            )
    }

    function getarticlelikes(req, res){

        likesModel
            .getarticlelikes()
            .then(
                function (doc) {
                    res.json(doc);
                    //console.log(doc);
                },

                function (err) {
                    res.status(400).send(err);
                }
            )
    }
}