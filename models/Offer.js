const mongoose = require('mongoose');

const OfferSchema = new mongoose.Schema(
    {
        title: String,
        user: String, // bidder username
        img: String,
        imgId: String,
        description: String,
        postId: String,
        tradeWith: String,
        tradePostTitle: String,
    },
    { timestamps: true }
);

const Offer = mongoose.model('Offer', OfferSchema)
module.exports = { Offer }