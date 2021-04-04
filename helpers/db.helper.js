const mongoose = require('mongoose');
const dbConfig = require('../configs/db.config');

// const dbUrl = "mongodb://localhost:27017/twitter_bot";

mongoose.connect(process.env.MONGODB_URI || dbConfig.dbUrl, { useNewUrlParser: true, useUnifiedTopology: true },
    err => {
        if (!err) {
            console.log("Database connection succeeded");
        }
        else {
            console.log("Error while connecting to db: ", JSON.stringify(err));
        }
    })
