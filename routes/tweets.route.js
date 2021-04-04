'use strict';

const tweetController = require('../controllers/tweet.controller');

const express = require('express'),
    tweetRouter = express.Router();

tweetRouter.route('/followSomeone').post(tweetController.followSomeone);
tweetRouter.route('/getFollowersList').post(tweetController.getFollowersList);
tweetRouter.route('/getFollowingList').post(tweetController.getFollowingList);
tweetRouter.route('/getMineOrFollowerRecentTweets').post(tweetController.getMineOrFollowerRecentTweets);

module.exports = tweetRouter;