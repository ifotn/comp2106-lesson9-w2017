var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// passport dependencies
let passport = require('passport');
let session = require('express-session');
let localStrategy = require('passport-local').Strategy;

var index = require('./routes/index');
var users = require('./routes/users');
// add the new games controller / router
var games = require('./routes/games');

var app = express();

// mongodb connection
let mongoose = require('mongoose');
let config = require('./config/globals');
mongoose.connect(config.db);

let db = mongoose.connection;
db.once('open', function() {
  console.log('Connected to mongodb');
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// passport config BEFORE controller references
app.use(session({
  secret: 'some string value here',
    resave: true,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

// use the Account model to manage users
let Account = require('./models/account');
passport.use(Account.createStrategy());

// facebook auth
let FacebookStrategy = require('passport-facebook').Strategy;

// get config values
passport.use(new FacebookStrategy({
        clientID: globals.facebook.clientID,
        clientSecret: globals.facebook.clientSecret,
        callbackURL: globals.facebook.callbackURL,
        profileFields: ['id', 'displayName', 'emails']
    },
    function(accessToken, refreshToken, profile, cb) {
        Account.findOrCreate({
          facebookId: profile.id,
            username: profile.emails[0].value
        }, function (err, user) {
            return cb(err, user);
        });
    }
));


// read / write user login info to mongodb
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

app.use('/', index);
app.use('/users', users);
app.use('/games', games);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', { title: 'COMP2106 - Video Game Library'});
});

module.exports = app;
