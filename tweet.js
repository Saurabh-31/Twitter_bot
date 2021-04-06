console.log("ertwudrtrdhas");

const twit = require('twit');
const config = require('./configs/twitter.config');
const db = require('./helpers/db.helper');
const tweetController = require('./controllers/tweet.controller');
const followingWorker = require('./workers/following.worker');
const followerWorker = require('./workers/follower.worker');
const tweetWorker = require('./workers/tweets.worker');

var Twitter = new twit(config);

async function getusername() {
    var followings = [];

    try {
        followings = await followingWorker.GetFollowingList();
    } catch (error) {
        console.log('Getting following failed', error);
    }
    if (followings && followings.length > 0) {
        followings = followings.map(item => item.username);
    }
    console.log('get fol ', followings);
    var username = randomFol(followings);
    console.log('userf ', username);
    return username;
}


var tweet = async function () {
    var username = await getusername();
    var params = {
        status: 'Hey this is me tweeting ' + '@' + username + ' and I just want to say that you are awesome'
    }
    var statuses = {};
    Twitter.post('statuses/update', params, async function (err, data, response) {
        if (!err) {
            // console.log("respo : ", data);
            statuses = data;
            if (data.text) {
                statuses = { id_str: data.id_str, text: data.text, created_at: data.created_at }
            }
            console.log('tweets :', statuses);
            if (statuses && statuses != {}) {
                try {
                    await tweetWorker.InsertOneTweet(statuses);
                } catch (error) {
                    console.log('Insert err ', error);
                }
            }
        }
        else {
            console.log('Something went wrong while Tweeting...', err);
        }
    });
}

tweet();
setInterval(tweet, 1000 * 60 * 30);

tweetController.getFollowingList("Saurabh43653005");
setInterval(() => {
    tweetController.getFollowingList("Saurabh43653005");    
}, 1000 * 60 * 30);

tweetController.getFollowersList("Saurabh43653005");
setInterval(() => {
    tweetController.getFollowersList("Saurabh43653005");
}, 1000 * 60 * 30);

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