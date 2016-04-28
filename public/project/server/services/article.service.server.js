"use strict";

module.exports= function (app, articleModel) {

    app.post("/api/project/articlesearch/saveurl", savearticleurl);
    app.get("/api/project/articlesearch/geturl/:id", geturlbyid);
    //app.post("/api/project/articlesearch", savearticle);
    //app.get("/api/project/articleget", getarticle);

    function savearticleurl(req, res){
        //console.log(req.body.web_url);


        articleModel.
        checkIfArticleUrlExists(req.body.web_url)
        .then(
            function (news) {
                if(news){
                    res.json(news);
                }
                else{
                    return articleModel.saveuri(req.body.web_url);
                }
            },

            function (err) {
                res.status(400).send(err);
            }
        )
    }

    function geturlbyid(req, res) {
        //console.log(req.params.id);
        articleModel
            .geturlbyid(req.params.id)
            .then(
                function (news) {
                    //console.log(news);
                    //newsModel
                    //.deleteurl()
                    //.then(function (response) {
                    res.json(news);
                    //});
                    //res.json(news);
                },

                function (err) {
                    res.status(400).send(err);
                }
            );
    }
    //function savearticle(req, res){
    //    //console.log(req.body.search);
    //    newsModel
    //        .saveArticle(req.body.search)
    //        .then(
    //            function (response) {
    //                res.json(response);
    //            },
    //
    //            function (err) {
    //                res.status(400).send(err);
    //            }
    //        );
    //}
    //
    //function getarticle(req, res){
    //    newsModel
    //        .getArticle()
    //        .then(
    //            function (article) {
    //                //console.log(response);
    //                newsModel
    //                    .deleteurl()
    //                    .then(function (response) {
    //                        res.json(article);
    //                    });
    //            },
    //
    //            function (err) {
    //                res.status(400).send(err);
    //            }
    //        );
    //}
}