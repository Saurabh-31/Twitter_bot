const mongoose = require('mongoose');
const dbConfig = require('../configs/db.config');

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
