const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: String,
    userName: String,
    avatarImg: String,
    avatarId: String,
    password: String,
    firstName: String,
    lastName: String,
    isAdmin: Boolean,
    metadata: Array,
  },
  { timestamps: true }
);

// create an image model using the schema
const User = mongoose.model('User', UserSchema)
module.exports = { User }