const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const shortestPathSchema = new Schema({
  start: {
    type: String,
    required: true,
  },
  end: {
    type: String,
    required: true,
  },
  path: {
    type: Array,
    required: true,
  },
  distance: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  player: {
    type: String,
    required: true,
  },
  graph: {
    type: Array,
    required: true,
  },
});

const shortestPathModel = mongoose.model("shortestPath", shortestPathSchema);

module.exports = shortestPathModel;
