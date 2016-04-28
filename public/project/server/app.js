//module.exports = function(app, db, mongoose){
//
//    var userModel = require("./models/user.model.server.js")(db,mongoose);
//    var userService = require("./services/user.service.server.js")(app, userModel);
//
//    //var formModel = require("./models/form.model.server.js")(db, mongoose);
//    //var formService = require("./services/form.service.server.js")(app, formModel);
//    //
//    //var fieldModel = require("./models/field.model.server.js")(db, mongoose);
//    //var fieldService = require("./services/field.service.server.js")(app, fieldModel);
//
//    var newsModel = require("./models/news.model.server.js")(db, mongoose);
//    var newsService = require("./services/news.service.server.js")(app, newsModel);
//
//    //var articleModel = require("./models/article.model.server.js")(db, mongoose);
//    //var articleService = require("./services/article.service.server.js")(app, articleModel);
//}

var mongoose = require('mongoose');

module.exports = function(app, db, userModel){

    //var userModel = require("./models/user.model.server.js")(db,mongoose);
    require("./services/user.service.server.js")(app, userModel);

    //var formModel = require("./models/form.model.server.js")(db, mongoose);
    //var formService = require("./services/form.service.server.js")(app, formModel);
    //
    //var fieldModel = require("./models/field.model.server.js")(db, mongoose);
    //var fieldService = require("./services/field.service.server.js")(app, fieldModel);

    var newsModel = require("./models/news.model.server.js")(db, mongoose);
    var newsService = require("./services/news.service.server.js")(app, newsModel);

    var commentsModel = require("./models/comments.model.server.js")(db, mongoose);
    var commentsService = require("./services/comments.service.server.js")(app, commentsModel);

    var articleModel = require("./models/article.model.server.js")(db, mongoose);
    var articleService = require("./services/article.service.server.js")(app, articleModel);

    var likesModel = require("./models/likes.model.server.js")(db, mongoose);
    var likesService = require("./services/likes.service.server.js")(app, likesModel);

}