/**
 * Created by RFreeman on 2/1/2017.
 */
let express = require('express');
let router = express.Router();

// reference Game model for CRUD
let Game = require('../models/game');

/* GET games index page */
router.get('/', function(req, res, next) {

   // use the model to query the games collection in mongodb
   Game.find(function(err, games) {
      if (err) {
         console.log(err);
         res.end(err);
         return;
      }
      // load the view and pass the games data to it
      // console.log(games);
      res.render('games/index', {
         games: games
      });
   });
});

// make public
module.exports = router;
