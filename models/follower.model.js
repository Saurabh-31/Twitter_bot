'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FollowerSchema = new Schema({
    name: { type: String, default: null },
    username: { type: String, index: { unique: true }, default: null },
    createdOn: { type: Date, default: Date.now },
    updatedOn: { type: Date, default: Date.now }
})

const follower = mongoose.model('Followers', FollowerSchema, 'Followers');

module.exports = follower;