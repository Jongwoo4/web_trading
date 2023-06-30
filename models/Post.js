const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema(
    {
        userName: String,
        postName: String,
        postDescription: String,
        postImg: String,
        postImgId: String,
        likes: Number,
        dislikes: Number,
        listingAddress: String,

    },
    { timestamps: true }
);

const Post = mongoose.model('Post', PostSchema)
module.exports = { Post }