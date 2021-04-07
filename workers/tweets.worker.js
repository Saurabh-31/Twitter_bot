'use strict';

const TweetModel = require('../models/tweets.model');

module.exports.InsertOneTweet = async (context) => {
    let newTweet = new TweetModel(context);
    return await newTweet.save();
}

module.exports.InsertManyTweet = async (context) => {
    return await TweetModel.insertMany(context);
}

module.exports.GetTweetList = async (context, limit, skip, sort, select) => {
    var offset = (skip - 1) * (limit + 1) - (skip - 1);
    offset = offset == -1 ? 0 : offset;

    return await TweetModel
        .find(context, { _id: 0, __v: 0})
        .sort({ created_at: sort || '-1' })
        .skip(offset)
        .limit(limit)
        .select(select)
        .lean()
        .exec();
}