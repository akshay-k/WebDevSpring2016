//module.exports = function(app, db, mongoose){
//
//    var userModel = require("./models/user.model.server.js")(db,mongoose);
//    var userService = require("./services/user.service.server.js")(app, userModel);
//
//    var formModel = require("./models/form.model.server.js")(db, mongoose);
//    var formService = require("./services/form.service.server.js")(app, formModel);
//
//    var fieldModel = require("./models/field.model.server.js")(db, mongoose);
//    var fieldService = require("./services/field.service.server.js")(app, fieldModel);
//}

var mongoose = require('mongoose');

module.exports = function(app, db, userModel){

    //var userModel = require("./models/user.model.server.js")(db,mongoose);
    require("./services/user.service.server.js")(app, userModel);

    var formModel = require("./models/form.model.server.js")(db, mongoose);
    var formService = require("./services/form.service.server.js")(app, formModel);

    var fieldModel = require("./models/field.model.server.js")(db, mongoose);
    var fieldService = require("./services/field.service.server.js")(app, fieldModel);
}