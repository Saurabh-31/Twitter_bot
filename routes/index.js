var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

// (function (applicationRoutes) {

//   'use strict';

//   require('../helpers/db.helper');
//   var cors = require('cors');

//   applicationRoutes.init = function (app) {


//     const tweetsRoutes = require('./tweets.route');
//     app.use('/api/twitter/', tweetsRoutes);

//   }

// })(module.exports);