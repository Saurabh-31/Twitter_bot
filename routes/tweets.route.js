'use strict';

// const tweetController = require('../controllers/tweet.controller');

const express = require('express'),
    tweetRouter = express.Router();

    /* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// tweetRouter.route('/followSomeone').post(tweetController.followSomeone);
// tweetRouter.route('/getFollowersList').post(tweetController.getFollowersList);
// tweetRouter.route('/getFollowingList').post(tweetController.getFollowingList);
// tweetRouter.route('/getMineOrFollowerRecentTweets').post(tweetController.getMineOrFollowerRecentTweets);

module.exports = tweetRouter;