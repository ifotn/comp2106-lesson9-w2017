var express = require('express');
var router = express.Router();

// adding ref's for signup and login
let passport = require('passport');
let Account = require('../models/account');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'COMP2106 - Video Game Library',
    message: 'Node home page',
      user: req.user
  });
});

/* GET register */
router.get('/register', function(req, res, next) {
  res.render('register', {
    title: 'Please Register',
      user: req.user
  });
});

/* GET login */
router.get('/login', function(req, res, next) {

  // create a variable to store any login messages
    let messages = req.session.messages || [] ;

    // clear the session messages
    req.session.messages = [];

  res.render('login', {
    title: 'Please Login',
      messages: messages,
      user: req.user
  });
});

/* POST register */
router.post('/register', function(req, res, next) {
  // use the Account model to create a new user with passport
  Account.register(new Account({ username: req.body.username }), req.body.password, function(err, account) {
    if (err) { // failure
      console.log(err);
      res.redirect('error', { title: 'Create Account Error'});
    }
    res.redirect('/login'); // success
  });
});

/* POST login */
router.post('/login', passport.authenticate('local', {
  successRedirect: '/games',
    failureRedirect: '/login',
    failureMessage: 'Invalid Login'
}));

/* GET logout */
router.get('/logout', function(req, res, next) {
  req.logout();
  res.redirect('/');
});

/* GET /facebook - show FB login popup */
router.get('/facebook',
    passport.authenticate('facebook', {
      scope: 'email'
    }));

/* GET /facebook/callback - after fb login attempt, decide where to go */
router.get('/facebook/callback',
    passport.authenticate('facebook', {
      failureRedirect: '/login',
      scope: 'email'
    }),
    function(req, res) {
        // Successful authentication, redirect to games.
        res.redirect('/games');
    });

/* GET /google - show google login prompt */
router.get('/google',
    passport.authenticate('google', { scope: ['profile', 'email'] }));

/* GET /google/callback - redirect after google login attempt */
router.get('/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/login',
        scope: 'email'
    }),
    function(req, res) {
        // Successful authentication, redirect to games.
        res.redirect('/games');
    });

module.exports = router;
