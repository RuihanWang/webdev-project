var express = require('express');
var app = express();


var cookieParser = require('cookie-parser');
var session = require('express-session');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var passport = require('passport');

// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(session({
    secret:'rr',
    resave:true,
    saveUninitialized:true


    }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({ secret: process.env.SESSION_SECRET }));

app.use(passport.initialize());
app.use(passport.session());

require("./assignment/app.js")(app);
//require ("./test/app.js")(app);

var ipaddress = process.env.OPENSHIFT_NODEJS_IP;
var port      = process.env.OPENSHIFT_NODEJS_PORT || 3000;

app.listen(port, ipaddress);
