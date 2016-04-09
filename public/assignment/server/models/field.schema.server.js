module.exports = function(mongoose){

    //var FormSchema = require("./forms.schema.server.js")(mongoose);

    var FieldSchema = mongoose.Schema({
        label: String,
        type: {
            type: String,
            enum: ['TEXT', 'TEXTAREA', 'EMAIL', 'PASSWORD', 'OPTIONS', 'DATE', 'RADIO', 'CHECKBOX'],
            default: 'TEXT'
        },
        placeholder: String,
        options: [{label: String,
                   value: String}]
    }, {collection: 'field'});
    return FieldSchema;
};