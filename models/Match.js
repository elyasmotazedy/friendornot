const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const MatchSchema = new Schema({
  user: {
    id: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    name: {
      type: String,
    },
    avatar: {
      type: String,
    },
  },
  partner: {
    type: Object,
  },
  location: {
    type: Object,
    required: true,
  },
  userGender: {
    type: String,
    required: true,
  },
  genderRequest: {
    type: String,
    required: true,
  },
  room: {
    type: String,
    required: true,
  },
  available: {
    type: Boolean,
    required: true,
    default: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Match = mongoose.model("match", MatchSchema);

module.exports = Match;
