'use strict';

const httpStatus = require('http-status');
const twit = require('twit');
const config = require('../configs/twitter.config');
const followingWorker = require('../workers/following.worker');
const followerWorker = require('../workers/follower.worker');
const tweetWorker = require('../workers/tweets.worker');

const followSomeone = async (req, res, next) => {
    try {
        const body = req.body;
        const screen_name = body.screen_name;

        var Twitter = new twit(config);

        var params = {
            screen_name: screen_name
        }

        var user = {};
        var getres = await Twitter.post('friendships/create', params, followed);
        console.log('getres', getres);
        function followed(err, data, response) {
            if (!err) {
                console.log('data :', data);
                user = data;
                console.log('users1 :', user);
                let resBody = {};
                if (user) {
                    resBody = { data: user, status_message: httpStatus[httpStatus.OK] }
                }
                res.status(httpStatus.OK).json(resBody);
            } else {
                throw err;
            }

        }
    } catch (err) {
        console.log("error : ", err);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ status_message: httpStatus[httpStatus.INTERNAL_SERVER_ERROR] });
    }
}

const getFollowersList = async (req, res, next) => {
    try {
        const body = req.body;
        const screen_name = body.screen_name;

        var Twitter = new twit(config);

        var params = {
            screen_name: 'Saurabh'
        }

        var users = [];
        var getres = await Twitter.get('followers/list', params, gettingList);
        console.log('getres', getres);
        async function gettingList(err, data, response) {
            if (!err) {
                console.log('data :', data);
                users = data.users;
                console.log('users1 :', users);
                users = users.map(item => {
                    let res = {};
                    if (item.screen_name) {
                        res = { name: item.name, username: item.screen_name }
                    }
                    return res;
                });
                try {
                    await followerWorker.InsertManyFollower(users);
                } catch (error) {
                    console.log('Insert err ', error);
                }
                let resBody = {};
                if (users && users.length > 0) {
                    resBody = { data: users, status_message: httpStatus[httpStatus.OK] }
                }
                res.status(httpStatus.OK).json(resBody);
            }
            else {
                throw err;
            }
        }
    } catch (error) {
        console.log("error", error);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ status_message: httpStatus[httpStatus.INTERNAL_SERVER_ERROR] });
    }
}

const getFollowingList = async (req, res, next) => {
    try {
        const body = req.body;
        const screen_name = body.screen_name;

        var Twitter = new twit(config);

        var params = {
            screen_name: 'Saurabh43653005'
        }

        console.log('hfsek');
        var users = [];
        var getres = await Twitter.get('friends/list', params, gettingList);
        console.log('getres', getres);
        async function gettingList(err, data, response) {
            if (!err) {
                console.log('data :', data);
                users = data.users;
                console.log('users1 :', users);
                users = users.map(item => {
                    let res = {};
                    if (item.screen_name) {
                        res = { name: item.name, username: item.screen_name }
                    }
                    return res;
                });
                try {
                    await followingWorker.InsertManyFollowing(users);
                } catch (error) {
                    console.log('Insert err ', error);
                }

                let resBody = {};
                if (users && users.length > 0) {
                    resBody = { data: users, status_message: httpStatus[httpStatus.OK] }
                }
                res.status(httpStatus.OK).json(resBody);
            }
            else {
                throw err;
            }
        }
        // await console.log('users2 :', users);

    } catch (error) {
        console.log("error", error);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ status_message: httpStatus[httpStatus.INTERNAL_SERVER_ERROR] });
    }
}

const getMineOrFollowerRecentTweets = async (req, res, next) => {
    try {
        const body = req.body;
        const screen_name = body.screen_name;

        var Twitter = new twit(config);
        var since_id = '';

        var tweetlist = await tweetWorker.GetTweetList({}, 20);
        if (tweetlist && tweetlist.length > 0) {
            since_id = tweetlist[0].id_str;
        }

        console.log('t1 ', tweetlist);

        var params = {
            screen_name: screen_name,
            since_id: since_id
        }

        Twitter.get('statuses/home_timeline', params, gettingTweets);
        var statuses = [];
        async function gettingTweets(err, data, response) {
            if (!err) {
                // console.log('data :', data);
                statuses = data;
                statuses = statuses.map(item => {
                    let res = {};
                    if (item.text) {
                        res = { id_str: item.id_str, text: item.text, created_at: item.created_at }
                    }
                    return res;
                });
                console.log('tweets :', statuses);
                if (statuses && statuses.length > 0) {
                    try {
                        await tweetWorker.InsertManyTweet(statuses);
                    } catch (error) {
                        console.log('Insert err ', error);
                    }
                }
                tweetlist = tweetlist.slice(0, 20 - statuses.length);
                console.log('t2 ', tweetlist);
                statuses = [...statuses,...tweetlist];
                let resBody = {};
                if (statuses && statuses.length > 0) {
                    resBody = { data: statuses, status_message: httpStatus[httpStatus.OK] }
                }
                res.status(httpStatus.OK).json(resBody);
            }
            else {
                throw err;
            }
        }
    } catch (error) {
        console.log("error", error);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ status_message: httpStatus[httpStatus.INTERNAL_SERVER_ERROR] });
    }
}

module.exports = {
    followSomeone,
    getFollowersList,
    getFollowingList,
    getMineOrFollowerRecentTweets
}