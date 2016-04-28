"use strict";

module.exports = function (app, newsModel) {

    app.post("/api/project/newsheadlines/saveurl", saveurl);
    app.get("/api/project/newsheadlines/geturl/:id", geturlbyid);

    //app.post("/api/project/articlesearch/saveurl", savearticleurl);
    //app.post("/api/project/articlesearch", savearticle);
    //app.get("/api/project/articleget", getarticle);
    //app.get("/api/project/newsheadlines/showrecentnews", showrecentnews);
    //app.get("/api/project/newsheadlines/findnewsbyarticle?article=", findnewsbyarticle);

    function saveurl(req, res) {

        //var art = req.body;

        //console.log(req.body.url);

        newsModel
            .checkIfArticleExistis(req.body.url)
            .then(
                function (news) {
                    if (news) {
                        res.json(news);
                    }
                    else {
                        return newsModel.saveuri(req.body.url);
                    }
                },

                function (err) {
                    res.status(400).send(err);
                }
            )
    }

    //var newsurl = req.body;
    //console.log(req.body);
    //    newsModel
    //        .saveuri(req.body.url)
    //        .then(
    //            function (news) {
    //                res.json(news);
    //            },
    //
    //            function (err) {
    //                res.status(400).send(err);
    //            }
    //        );
    //}

    function geturlbyid(req, res) {
        //console.log(req.params.id);
        newsModel
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


    //function showrecentnews(req, res){
    //    newsModel
    //        .getRecentNews()
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
    //function findnewsbyarticle(req, res)
    //{
    //    newsModel
    //        .findNewsByArticle(req.params.artcile)
    //        .then(
    //            function (news) {
    //                res.json(news);
    //            },
    //
    //            function (err) {
    //                res.status(400).send(err);
    //            }
    //        );
    //}


}