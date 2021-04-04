console.log("ertwudrtrdhas");

const twit = require('twit');
const config = require('./configs/twitter.config');
const db = require('./helpers/db.helper');
const followingWorker = require('./workers/following.worker');
const followerWorker = require('./workers/follower.worker');

var Twitter = new twit(config);

async function getusername() {
    var followings = [];

    try {
        followings = await followingWorker.GetFollowingList();
    } catch (error) {
        console.log('Getting following failed', error);
    }
    if(followings && followings.length > 0){
        followings = followings.map(item => item.username);
    }
    console.log('get fol ',followings);
    var username = randomFol(followings);
    console.log('userf ', username);
    return username;
}

getusername();


var tweet = function () {
    var params = {
        status: 'Hey this is me tweeting' + '@' + getusername()
    }
    Twitter.get('statuses/update', params, function (err, data, response) {
        if (!err) {
            console.log("respo : ", data);
        }
        else {
            console.log('Something went wrong while Tweeting...');
        }
    });
}

// tweet();
// setInterval(tweet,1000*60*30);

function randomFol(arr) {
    var index = Math.floor(Math.random() * arr.length);
    return arr[index];
};

// var stream = Twitter.stream('user');

// stream.on('follow', followed);
// stream.on('unfollow', unfollowed);

async function followed(event) {
    console.log('Follow Event is running');

    var screenName = event.source.screen_name;
    var context = { screenName };
    try {
        await followerWorker.InsertOneFollower(context);
    } catch (error) {
        console.log('Adding follower failed', error);
    }
}

async function unfollowed(event) {
    console.log('Unfollow Event is running');
    var screenName = event.source.screen_name;
    var context = { screenName };
    try {
        await followerWorker.RemoveFollower(context);
    } catch (error) {
        console.log('Removing follower failed', error);
    }
}