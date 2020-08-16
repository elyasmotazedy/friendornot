const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const MatchSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  location: {
    type: Object,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  room: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Match = mongoose.model("match", MatchSchema);

module.exports = Match;
