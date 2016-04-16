var express = require('express');
var bodyParser = require('body-parser');// to parse jason objects from header
var cookieParser = require('cookie-parser');// to parse cookies from header
var session = require('express-session');//node module . once loaded we need to configure
var mongoose = require('mongoose');
var passport = require('passport');

var app = express();

var connectionString = 'mongodb://127.0.0.1:27017/formmaker';

if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
    connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
        process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
        process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
        process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
        process.env.OPENSHIFT_APP_NAME;
}

var db = mongoose.connect(connectionString);

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
//app.use(session({ secret: process.env.SESSION_SECRET,
//                  resave: true,
//                  saveUninitialized: true}));

app.use(session({ secret: "Akshay",
    resave: true,
    saveUninitialized: true}));

app.use(passport.initialize());
app.use(passport.session());

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;
require("./public/assignment/server/app.js")(app, db, mongoose);
app.listen(port, ipaddress);