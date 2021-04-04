'use strict';

const FollowingModel = require('../models/following.model');

module.exports.InsertOneFollowing = async (context) => {
    let newFollowing = new FollowingModel(context);
    return await newFollowing.save();
}

module.exports.RemoveFollowing = async (context) => {
    return await FollowingModel.remove(context).lean().exec();
}

module.exports.InsertManyFollowing = async (context) => {
    return await FollowingModel.insertMany(context);
}

module.exports.GetFollowingList = async (context, limit, skip, sort, select) => {
    var offset = (skip - 1) * (limit + 1) - (skip - 1);
    offset = offset == -1 ? 0 : offset;

    return await FollowingModel
        .find(context)
        .sort({ createdOn: sort || '-1' })
        .skip(offset)
        .limit(limit)
        .select(select)
        .lean()
        .exec();
}