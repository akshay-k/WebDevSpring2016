module.exports = function (mongoose) {

    var FieldsSchema = require("./field.schema.server.js")(mongoose);

    var FormSchema = mongoose.Schema({
        userId: String,
        title: String,
        fields: [FieldsSchema],
        created: { type: Date, default: Date.now },
        updated: {type: Date, default: Date.now}
    }, {collection: 'form'});
    return FormSchema;
};