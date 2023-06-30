'use strict';

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://trade:SPkymPOS7DmjpWhP@cluster0-shard-00-00.rqkz3.mongodb.net:27017,cluster0-shard-00-01.rqkz3.mongodb.net:27017,cluster0-shard-00-02.rqkz3.mongodb.net:27017/TradeVerse?authSource=admin&replicaSet=atlas-lztgrv-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true', 
{ useNewUrlParser: true, useUnifiedTopology: true});

module.exports = { mongoose }