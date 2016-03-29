var express = require('express');
var bodyParser = require('body-parser');// to parse jason objects from header
var cookieParser = require('cookie-parser');// to parse cookies from header
var session = require('express-session');//node module . once loaded we need to configure
var app = express();
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(session ({secret: "ABC"}));
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;
require("./public/assignment/server/app.js")(app);
app.listen(port, ipaddress);