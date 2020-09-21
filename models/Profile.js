const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  location: {
    type: Object,
    required: true
  },
  hobbies: {
    type: [String]
  },
  bio: {
    type: String,
    default: ''
  },
  gender: {
    type: String,
  },
  social: {
    website: {
      type: String,
    },
    youtube: {
      type: String,
    },
    twitter: {
      type: String,
    },
    facebook: {
      type: String,
    },
    linkedin: {
      type: String,
    },
    instagram: {
      type: String,
    },
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Profile = mongoose.model("profile", ProfileSchema);

module.exports = Profile;
