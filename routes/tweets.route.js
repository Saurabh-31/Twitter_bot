'use strict';

const tweetController = require('../controllers/tweet.controller');

const express = require('express'),
    tweetRouter = express.Router();

tweetRouter.route('/followSomeone').post(tweetController.followSomeone);
tweetRouter.route('/getFollowersList').get(tweetController.getFollowersList);
tweetRouter.route('/getFollowingList').get(tweetController.getFollowingList);
tweetRouter.route('/getMineOrFollowerRecentTweets').post(tweetController.getMineOrFollowerRecentTweets);

module.exports = tweetRouter;