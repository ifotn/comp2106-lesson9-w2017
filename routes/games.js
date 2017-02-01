/**
 * Created by RFreeman on 2/1/2017.
 */
let express = require('express');
let router = express.Router();

/* GET games index page */
router.get('/', function(req, res, next) {
   res.render('games/index');
});

// make public
module.exports = router;
