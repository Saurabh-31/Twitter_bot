const mongoose = require('mongoose');
const dbConfig = require('../configs/db.config');

// const dbUrl = "mongo "mongodb://cluster0-shard-00-00.wfbvm.mongodb.net:27017,cluster0-shard-00-01.wfbvm.mongodb.net:27017,cluster0-shard-00-02.wfbvm.mongodb.net:27017/twitter_bot?replicaSet=atlas-cdzsan-shard-0" --ssl --authenticationDatabase admin --username saurabh --password saurabh123";
//mongo "mongodb://cluster0-shard-00-00.wfbvm.mongodb.net:27017,cluster0-shard-00-01.wfbvm.mongodb.net:27017,cluster0-shard-00-02.wfbvm.mongodb.net:27017/myFirstDatabase?replicaSet=atlas-cdzsan-shard-0" --ssl --authenticationDatabase admin --username saurabh --password <password>

mongoose.connect(process.env.MONGODB_URI || dbConfig.connection_string, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true },
    err => {
        if (!err) {
            console.log("Database connection succeeded");
        }
        else {
            console.log("Error while connecting to db: ", JSON.stringify(err));
            console.log(err);
        }
    })
