const express = require('express')
var cors = require('cors')
const fs = require('fs');
const path = require('path');
var app = express()

app.use("/api", express.static(path.join(__dirname, '/public')))
app.use(cors())

const log = console.log;
const bodyParser = require('body-parser')
app.use(bodyParser.json());

const session = require("express-session");
const MongoStore = require('connect-mongo')



var user = require("./routes/User.js");
var post = require("./routes/Post.js");
var upload = require("./routes/Upload.js");
var offer = require("./routes/Offer.js");
var report = require("./routes/Report.js");
var gmaps = require("./routes/GoogleMaps.js");
var chat =  require("./routes/Chat.js");

app.use(
    session({
        secret: "our hardcoded secret", // make a SESSION_SECRET environment variable when deploying (for example, on heroku)
        resave: false,
        saveUninitialized: true,
        cookie: {
            expires: 600000,
            httpOnly: true
        },
        // store the sessions on the database in production
        store: MongoStore.create({mongoUrl: process.env.MONGODB_URI || 'mongodb://trade:SPkymPOS7DmjpWhP@cluster0-shard-00-00.rqkz3.mongodb.net:27017,cluster0-shard-00-01.rqkz3.mongodb.net:27017,cluster0-shard-00-02.rqkz3.mongodb.net:27017/TradeVerse?authSource=admin&replicaSet=atlas-lztgrv-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true', 
	}) 
    })
);

app.use('/api/users', user);
app.use('/api/post', post);
app.use('/api/upload', upload);
app.use('/api/offer', offer);
app.use('/api/report', report);
app.use('/api/listingcoords', gmaps);
app.use('/api/chat', chat);

app.use(express.static(path.join(__dirname, "/frontend/build")));

// All routes other than above will go to index.html
app.get("*", (req, res) => {
    // check for page routes that we expect in the frontend to provide correct status code.
    // send index.html
    res.sendFile(path.join(__dirname, "/frontend/build/index.html"));
});


const port = process.env.PORT || 3001
app.listen(port, () => {
	log(`Listening on port ${port}...`)
});