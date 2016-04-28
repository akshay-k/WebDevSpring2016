"use strict";

module.exports= function (app, commentsModel) {

    app.post("/api/project/newsheadlines/:urlid/comments", postcomments);
    app.get("/api/project/newsheadlines/:urlid/comments", getcomments);

    app.post("/api/project/articlesearch/:urlid/comments", postarticlesearchcomments);
    app.get("/api/project/articlesearch/:urlid/comments", getarticlesearchcomments);

    function postcomments(req, res){
        //console.log(req.params.urlid);
        commentsModel
            .savecomments(req.body, req.params.urlid)
            .then(
                function (response) {
                    if(response){
                        res.json(response);
                        //console.log(response);
                    }
                },

                function (err) {
                    res.status(400).send(err);
                }
            )
    }

    function getcomments(req, res){

        var urlid = req.params.urlid;

        commentsModel
            .findCommentsByArticleUrlId(urlid)
            .then(
                function (doc) {
                    res.json(doc);
                },

                function (err) {
                    res.status(400).send(err);
                }
            )
    }

    function postarticlesearchcomments(req, res){
        //console.log(req.params.urlid);
        commentsModel
            .savearticlesearchcomments(req.body, req.params.urlid)
            .then(
                function (response) {
                    if(response){
                        res.json(response);
                        //console.log(response);
                    }
                },

                function (err) {
                    res.status(400).send(err);
                }
            )
    }

    function getarticlesearchcomments(req, res){

        var urlid = req.params.urlid;

        commentsModel
            .findCommentsBySearchedArticleUrlId(urlid)
            .then(
                function (doc) {
                    res.json(doc);
                },

                function (err) {
                    res.status(400).send(err);
                }
            )
    }
}