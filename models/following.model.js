'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FollowingSchema = new Schema({
    name: { type: String, default: null },
    username: { type: String, index: { unique: true }, default: null },
    createdOn: { type: Date, default: Date.now },
    updatedOn: { type: Date, default: Date.now }
})

const following = mongoose.model('Followings', FollowingSchema, 'Followings');

module.exports = following;