'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TweetSchema = new Schema({
    id_str: { type: String, default: null },
    text: { type: String, default: null },
    created_at: { type: Date, default: Date.now }
})

const tweet = mongoose.model('Tweets', TweetSchema, 'Tweets');

module.exports = tweet;