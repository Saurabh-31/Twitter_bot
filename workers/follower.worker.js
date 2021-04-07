'use strict';

const FollowerModel = require('../models/follower.model');

module.exports.InsertOneFollower = async (context) => {
    let newFollower = new FollowerModel(context);
    return await newFollower.save();
}

module.exports.RemoveFollower = async (context) => {
    return await FollowerModel.deleteMany(context);
}

module.exports.InsertManyFollower = async (context) => {
    return await FollowerModel.insertMany(context);
}

module.exports.GetFollowerList = async (context, limit, skip, sort, select) => {
    var offset = (skip - 1) * (limit + 1) - (skip - 1);
    offset = offset == -1 ? 0 : offset;

    return await FollowerModel
        .find(context)
        .sort({ createdOn: sort || '-1' })
        .skip(offset)
        .limit(limit)
        .select(select)
        .lean()
        .exec();
}